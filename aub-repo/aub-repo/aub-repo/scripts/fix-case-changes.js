const { execSync } = require('child_process');
const path = require('path');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processFiles() {
    try {
        // Use Windows dir command to list files
        const command = 'dir /s /b /a-d "content\\*.*"';
        const files = execSync(command, { 
            encoding: 'utf8',
            maxBuffer: 1024 * 1024 * 10 
        })
        .split('\r\n')
        .filter(Boolean);

        console.log(`Found ${files.length} files to process`);

        // Process files in smaller batches
        const batchSize = 10;
        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            
            for (const file of batch) {
                // Convert file path to relative path
                const relativePath = path.relative(process.cwd(), file);
                const lowerPath = relativePath.toLowerCase();
                
                if (relativePath !== lowerPath) {
                    console.log(`Processing: ${relativePath} -> ${lowerPath}`);
                    try {
                        // Use temporary name to handle case changes
                        const tempPath = `${relativePath}_temp`;
                        execSync(`git mv "${relativePath}" "${tempPath}"`, { stdio: 'inherit' });
                        execSync(`git mv "${tempPath}" "${lowerPath}"`, { stdio: 'inherit' });
                    } catch (error) {
                        console.error(`Failed to rename: ${relativePath}`);
                    }
                }
            }
            
            // Use JavaScript setTimeout instead of timeout command
            await sleep(500);
        }

        console.log('Rename operations completed successfully');
    } catch (error) {
        console.error('Script failed:', error.message);
        process.exit(1);
    }
}

// Run the async function
processFiles().catch(console.error);