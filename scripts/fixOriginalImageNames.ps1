const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../content');

// Function to sanitize image names
function sanitizeImageName(name) {
  return name
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[()]/g, ''); // Remove parentheses
}

// Function to rename images recursively
function renameImages(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const oldPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        renameImages(oldPath); // Recursively process subdirectories
      } else if (file.isFile() && /\.(webp|jpg|jpeg|png|gif)$/i.test(file.name)) {
        const sanitizedName = sanitizeImageName(file.name);
        const newPath = path.join(dir, sanitizedName);

        if (oldPath !== newPath) {
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error(`Error renaming file ${oldPath} to ${newPath}:`, err);
            } else {
              console.log(`Renamed file: ${oldPath} → ${newPath}`);
            }
          });
        }
      }
    });
  });
}

renameImages(outDir);
