const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
  // Read changed and deleted files, splitting by newlines
  const changedFiles = fs.existsSync('changed-files.txt')
    ? fs.readFileSync('changed-files.txt', 'utf8').trim().split('\n').filter(line => line && line.trim())
    : [];
  const deletedFiles = fs.existsSync('deleted-files.txt')
    ? fs.readFileSync('deleted-files.txt', 'utf8').trim().split('\n').filter(line => line && line.trim())
    : [];

  console.log('Changed files to process:', changedFiles.length ? changedFiles : 'None');
  console.log('Deleted files to process:', deletedFiles.length ? deletedFiles : 'None');

  // Create output directory
  const outputDir = 'content-temp';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Define image sizes
  const sizes = [
    { name: 'small', width: 320 },
    { name: 'medium', width: 640 },
    { name: 'large', width: 1280 },
    { name: 'xlarge', width: 1920 },
  ];

  // Optimize changed files
  for (const file of changedFiles) {
    if (!fs.existsSync(file)) {
      console.error(`Skipping ${file}: File does not exist`);
      continue;
    }

    const stats = fs.statSync(file);
    if (!stats.isFile()) {
      console.error(`Skipping ${file}: Not a file`);
      continue;
    }

    const relPath = path.relative('public/content', file);
    const baseName = path.basename(file, path.extname(file));

    console.log(`Processing file: ${file}`);

    for (const size of sizes) {
      const outputFile = path.join(outputDir, relPath.replace(path.basename(file), `${baseName}-${size.name}.webp`));
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });

      try {
        await sharp(file)
          .resize({ width: size.width, withoutEnlargement: true })
          .toFormat('webp', { quality: 80 })
          .toFile(outputFile);
        console.log(`Optimized: ${file} -> ${outputFile}`);
      } catch (error) {
        console.error(`Failed to optimize ${file} for ${size.name}: ${error.message}`);
      }
    }
  }

  // Handle deleted files (remove from content-temp)
  for (const file of deletedFiles) {
    const relPath = path.relative('public/content', file);
    const baseName = path.basename(file, path.extname(file));

    for (const size of sizes) {
      const outputFile = path.join(outputDir, relPath.replace(path.basename(file), `${baseName}-${size.name}.webp`));
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
        console.log(`Deleted: ${outputFile}`);
      }
    }
  }
}

optimizeImages().catch((error) => {
  console.error(`Error in optimizeImages: ${error.message}`);
  process.exit(1);
});