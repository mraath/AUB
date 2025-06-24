const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

function renameFilesToIndex(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          renameFilesToIndex(filePath);
        } else if (file === 'card.html') {
          const newFilePath = path.join(dir, 'index.html');
          fs.rename(filePath, newFilePath, (err) => {
            if (err) {
              console.error(`Error renaming file ${filePath} to ${newFilePath}:`, err);
            } else {
              console.log(`Renamed ${filePath} to ${newFilePath}`);
            }
          });
        }
      });
    });
  });
}

renameFilesToIndex(outDir);