// check-static-pages.js
const fs = require('fs');
const path = require('path');

// --- Configuration ---
// The directory where your static files are built.
// For Next.js, this is typically 'out'.
// For Scully, this is usually 'dist/static' as defined in your scully.africaunwind.config.ts
const STATIC_BUILD_DIR = 'out'; // <--- CHANGED THIS BACK TO 'out' FOR NEXT.JS

// --- Script Logic ---
function checkPages() {
    let missingPages = [];
    let foundPages = [];

    console.log(`\n--- Starting Static Page Check ---`);
    console.log(`Checking static pages in: ${STATIC_BUILD_DIR}`);

    if (!fs.existsSync(STATIC_BUILD_DIR)) {
        console.error(`Error: Static build directory '${STATIC_BUILD_DIR}' not found. Please run your build command first.`);
        process.exit(1);
    }

    // Read and parse the URLs from scullyurls.txt
    let EXPECTED_PAGE_PATHS = [];
    try {
        const urlsContent = fs.readFileSync('scullyurls.txt', 'utf8');
        
        // Use a more robust regex to find all strings enclosed in single quotes
        const matches = urlsContent.matchAll(/'([^']+)'/g); 
        EXPECTED_PAGE_PATHS = Array.from(matches)
            .map(match => match[1]) // Extract the captured group (the path inside the quotes)
            .filter(path => path.startsWith('/')) // Ensure it's a valid path
            .filter(path => path.length > 0); // Filter out any empty strings if any
            
        // Add the root path if it's not explicitly in the list
        if (!EXPECTED_PAGE_PATHS.includes('/')) {
            EXPECTED_PAGE_PATHS.unshift('/');
        }

        console.log(`Loaded ${EXPECTED_PAGE_PATHS.length} expected page paths from scullyurls.txt.`);
    } catch (error) {
        console.error(`Error reading or parsing scullyurls.txt: ${error.message}`);
        console.error(`Please ensure 'scullyurls.txt' is in the root directory and correctly formatted.`);
        process.exit(1);
    }

    if (EXPECTED_PAGE_PATHS.length === 0) {
        console.warn("Warning: No expected page paths were found or parsed from scullyurls.txt. Please check the file content.");
        process.exit(0); // Exit gracefully if no paths to check
    }

    for (const pagePath of EXPECTED_PAGE_PATHS) {
        let filePath = '';
        if (pagePath === '/') {
            // Home page is typically index.html in the root of the build directory
            filePath = path.join(STATIC_BUILD_DIR, 'index.html');
        } else {
            // For other paths, e.g., /blog -> out/blog/index.html
            // Remove leading slash, join with build dir, and append index.html
            filePath = path.join(STATIC_BUILD_DIR, pagePath.substring(1), 'index.html');
        }

        if (fs.existsSync(filePath)) {
            foundPages.push(pagePath);
        } else {
            missingPages.push(pagePath);
        }
    }

    console.log('\n--- Check Results ---');
    if (missingPages.length > 0) {
        console.error(`🚨 ${missingPages.length} MISSING PAGES detected:`);
        missingPages.forEach(p => console.error(`- ${p}`));
        console.log('\n✅ Pages found:');
        foundPages.forEach(p => console.log(`- ${p}`));
        process.exit(1); // Exit with an error code to fail the build/CI
    } else {
        console.log(`🎉 All ${foundPages.length} expected pages found!`);
        foundPages.forEach(p => console.log(`- ${p}`));
    }
}

checkPages();