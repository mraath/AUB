const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/content');

function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove special characters
}

function renameFoldersAndImages(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const oldPath = path.join(dir, file.name);
      const newPath = path.join(dir, sanitizeName(file.name));

      if (file.isDirectory()) {
        if (oldPath !== newPath) {
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.error(`Error renaming folder ${oldPath} to ${newPath}:`, err);
            } else {
              console.log(`Renamed folder ${oldPath} to ${newPath}`);
              renameFoldersAndImages(newPath); // Continue renaming inside the renamed folder
            }
          });
        } else {
          renameFoldersAndImages(oldPath); // Continue renaming inside the folder
        }
      } else if (file.isFile() && file.name.endsWith('.webp')) {
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

renameFoldersAndImages(outDir);