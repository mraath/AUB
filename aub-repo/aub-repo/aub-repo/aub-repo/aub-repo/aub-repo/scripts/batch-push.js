const { execSync } = require('child_process');
const path = require('path');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getChangedFiles() {
    const status = execSync('git status --porcelain', {
        encoding: 'utf8',
        maxBuffer: 1024 * 1024 * 10
    });

    return status
        .split('\n')
        .filter(Boolean)
        .map(line => line.slice(3).trim())
        .filter(file => file);
}

async function gitAdd(file) {
    // Escape spaces and special characters in filename
    const escapedFile = file.replace(/"/g, '\\"');
    execSync(`git add "${escapedFile}"`, {
        stdio: 'inherit',
        maxBuffer: 1024 * 1024 * 10
    });
}

async function batchPushChanges() {
    try {
        console.log('Getting list of changed files...');
        const changes = await getChangedFiles();

        if (changes.length === 0) {
            console.log('✓ No changes to commit');
            return;
        }

        console.log(`Found ${changes.length} changed files`);

        let currentBatchSize = 50; // Make this mutable
        const batches = Math.ceil(changes.length / currentBatchSize);

        for (let i = 0; i < changes.length; i += currentBatchSize) {
            const batch = changes.slice(i, i + currentBatchSize);
            const batchNum = Math.floor(i / currentBatchSize) + 1;
            
            console.log(`\nProcessing batch ${batchNum}/${batches} (${batch.length} files)`);

            try {
                // Add files one at a time
                for (const file of batch) {
                    try {
                        await gitAdd(file);
                        await sleep(100); // Small delay between files
                    } catch (addError) {
                        console.error(`Warning: Could not add file "${file}": ${addError.message}`);
                        continue;
                    }
                }

                // Check if any files were actually added
                const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' });
                if (!stagedFiles.trim()) {
                    console.log('No files staged in this batch, skipping commit');
                    continue;
                }

                // Commit the batch
                const commitMessage = `batch ${batchNum}/${batches}: ${batch.length} files`;
                execSync(`git commit -m "${commitMessage}"`, {
                    stdio: 'inherit',
                    maxBuffer: 1024 * 1024 * 10
                });

                // Push with longer timeout
                console.log('Pushing changes...');
                execSync('git push', {
                    stdio: 'inherit',
                    maxBuffer: 1024 * 1024 * 10,
                    timeout: 120000 // 2 minute timeout
                });

                console.log(`✓ Successfully pushed batch ${batchNum}`);
                
                // Longer delay between batches
                if (i + currentBatchSize < changes.length) {
                    console.log('Waiting 10 seconds before next batch...');
                    await sleep(10000);
                }
            } catch (error) {
                console.error(`\n✗ Error in batch ${batchNum}:`, error.message);
                console.log('\nAttempting to recover...');
                
                try {
                    execSync('git reset HEAD~1', { stdio: 'inherit' });
                    console.log('✓ Successfully reset failed batch');
                    
                    // Reduce batch size and retry
                    i -= batch.length;
                    currentBatchSize = Math.max(10, Math.floor(currentBatchSize / 2));
                    console.log(`Reduced batch size to ${currentBatchSize}`);
                    await sleep(15000); // Longer recovery delay
                } catch (recoveryError) {
                    console.error('✗ Recovery failed:', recoveryError.message);
                    process.exit(1);
                }
            }
        }

        console.log('\n✓ All changes have been committed and pushed successfully');

    } catch (error) {
        console.error('✗ Script failed:', error.message);
        process.exit(1);
    }
}

batchPushChanges().catch(console.error);