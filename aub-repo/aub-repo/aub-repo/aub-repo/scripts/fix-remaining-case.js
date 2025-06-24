const fs = require('fs');
const path = require('path');

function verifyAndFixCase(dir) {
    let fixed = 0;
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative(process.cwd(), fullPath);
        const stat = fs.statSync(fullPath);
        const lowerItem = item.toLowerCase();

        // Check and fix if needed
        if (item !== lowerItem) {
            const parentDir = path.dirname(fullPath);
            const tempPath = path.join(parentDir, `${lowerItem}_temp`);
            const finalPath = path.join(parentDir, lowerItem);

            try {
                fs.renameSync(fullPath, tempPath);
                fs.renameSync(tempPath, finalPath);
                console.log(`✓ Fixed: ${relativePath} → ${path.relative(process.cwd(), finalPath)}`);
                fixed++;
            } catch (error) {
                console.error(`✗ Failed to fix: ${relativePath}`);
                console.error(`  Error: ${error.message}`);
            }
        }

        // Recursively process subdirectories
        if (stat.isDirectory()) {
            // Use the new path if it was renamed
            const dirToProcess = item !== lowerItem ? 
                path.join(dir, lowerItem) : fullPath;
            fixed += verifyAndFixCase(dirToProcess);
        }
    }

    return fixed;
}

try {
    const contentDir = path.join(process.cwd(), 'public/content');
    
    if (!fs.existsSync(contentDir)) {
        console.error('✗ Content directory not found!');
        process.exit(1);
    }

    console.log('🔍 Checking and fixing non-lowercase paths...\n');
    
    const fixedCount = verifyAndFixCase(contentDir);
    
    if (fixedCount > 0) {
        console.log(`\n✓ Fixed ${fixedCount} paths to lowercase`);
    } else {
        console.log('\n✓ All paths were already lowercase');
    }
} catch (error) {
    console.error('Error during process:', error);
    process.exit(1);
}