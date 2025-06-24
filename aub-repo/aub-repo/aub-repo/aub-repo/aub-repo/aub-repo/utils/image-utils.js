const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

async function generateFileHash(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    return hash;
  } catch (err) {
    return null; // Return null if file not found
  }
}

async function optimizeAndResizeImage(inputPath, outputPath, hashes) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const hash = await generateFileHash(inputPath);

    const baseName = path.basename(inputPath, path.extname(inputPath));
    const ext = '.webp'; // Force WebP

    const outputDir = path.dirname(outputPath);
    const smallPath = path.join(outputDir, `${baseName}-small${ext}`);
    const mediumPath = path.join(outputDir, `${baseName}-medium${ext}`);
    const largePath = path.join(outputDir, `${baseName}-large${ext}`);
    const extraLargePath = path.join(outputDir, `${baseName}-xlarge${ext}`); // Define extraLargePath HERE!

    if (hashes[inputPath] && hashes[inputPath] === hash) {
      console.log(`No changes for ${inputPath}, skipping.`);
      return { baseName, ext };
    }

    await fs.mkdir(outputDir, { recursive: true });

    await image.resize({ width: 300 }).toFile(smallPath);
    await image.resize({ width: 600 }).toFile(mediumPath);
    await image.resize({ width: 900 }).toFile(largePath);
    await image.resize({ width: 1200 }).toFile(extraLargePath); // Use extraLargePath

    console.log(`Optimized and resized ${inputPath}`);
    return { baseName, ext, hash };
  } catch (err) {
    console.error(`Error processing ${inputPath}: ${err}`);
    return null;
  }
}

async function processImagesInDirectory(directory, outputDirectory, hashes) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  let processedImages = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    const outputPath = path.join(outputDirectory, entry.name.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp')); // Force WebP
    if (entry.isDirectory()) {
      await fs.mkdir(outputPath, { recursive: true });
      const subDirImages = await processImagesInDirectory(fullPath, outputPath, hashes);
      processedImages = processedImages.concat(subDirImages);
    } else if (entry.isFile() && ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(entry.name).toLowerCase())) {
      const imageDetails = await optimizeAndResizeImage(fullPath, outputPath, hashes);
      if (imageDetails) {
        processedImages.push({
          ...imageDetails,
          path: fullPath
        });
      }
    }
  }
  return processedImages;
}

module.exports = { processImagesInDirectory };