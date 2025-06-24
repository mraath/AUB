const path = require('path');
const fs = require('fs/promises');
const { processImagesInDirectory } = require('../utils/image-utils');

async function removeFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Removed optimized image: ${filePath}`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error removing file ${filePath}:`, error);
    }
  }
}

async function updateHashes(hashesFilePath, hashes) {
  try {
    await fs.writeFile(hashesFilePath, JSON.stringify(hashes, null, 2), 'utf8');
    console.log(`Updated image-hashes.json with batch of hashes`);
  } catch (error) {
    console.error(`Error updating image-hashes.json:`, error);
  }
}

async function runImageProcessing() {
  const contentDirectory = path.join(__dirname, '../content');
  const publicDirectory = path.join(__dirname, '../public/content');
  const hashesFilePath = path.join(__dirname, 'image-hashes.json');
  const BATCH_SIZE = 50;

  console.log("Content Directory:", contentDirectory);
  console.log("Public Directory:", publicDirectory);

  try {
    // Ensure public directory exists
    await fs.mkdir(publicDirectory, { recursive: true });

    // Load existing hashes
    let existingHashes = {};
    try {
      const hashesData = await fs.readFile(hashesFilePath, 'utf8');
      existingHashes = JSON.parse(hashesData);
      console.log("Loaded existing image-hashes.json.");
    } catch (e) {
      console.log("No existing hashes file found, starting fresh.");
    }

    // Get current images in content directory (including subdirectories)
    async function getAllImages(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      let images = [];
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          images = images.concat(await getAllImages(fullPath));
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(entry.name).toLowerCase())) {
          images.push(fullPath);
        }
      }
      return images;
    }

    const currentImages = new Set(await getAllImages(contentDirectory));

    // Handle deletions
    const deletedImages = Object.keys(existingHashes).filter(imagePath => !currentImages.has(imagePath));
    for (const deletedImage of deletedImages) {
      const relativePath = path.relative(contentDirectory, deletedImage);
      const baseName = path.basename(deletedImage, path.extname(deletedImage));
      const outputDir = path.join(publicDirectory, path.dirname(relativePath));
      const sizes = ['small', 'medium', 'large', 'xlarge'];
      for (const size of sizes) {
        const optimizedPath = path.join(outputDir, `${baseName}-${size}.webp`);
        await removeFile(optimizedPath);
      }
      delete existingHashes[deletedImage];
      await updateHashes(hashesFilePath, existingHashes); // Update after each deletion
      console.log(`Removed hash entry and optimized images for deleted image: ${deletedImage}`);
    }

    // Process images
    const processedImages = await processImagesInDirectory(
      contentDirectory,
      publicDirectory,
      existingHashes
    );

    // Update hashes in batches
    let processedCount = 0;
    let batchHashes = { ...existingHashes };
    let updated = false;

    for (const image of processedImages) {
      if (image.hash && image.path) {
        batchHashes[image.path] = image.hash;
        processedCount++;
        if (processedCount % BATCH_SIZE === 0) {
          await updateHashes(hashesFilePath, batchHashes);
          updated = true;
        }
      }
    }

    // Write any remaining hashes
    if (processedCount % BATCH_SIZE !== 0 && processedImages.length > 0) {
      await updateHashes(hashesFilePath, batchHashes);
      updated = true;
    }

    if (processedImages.length === 0 && deletedImages.length === 0) {
      console.log("No new, changed, or deleted images to process.");
    } else {
      console.log(`Processed ${processedImages.length} images, removed ${deletedImages.length} deleted images.`);
    }

    if (!updated && deletedImages.length > 0) {
      console.log("image-hashes.json already updated during deletions.");
    } else if (!updated && processedImages.length > 0) {
      console.log("image-hashes.json updated with final batch.");
    }

  } catch (error) {
    console.error("Error during image processing:", error);
  }
}

runImageProcessing();