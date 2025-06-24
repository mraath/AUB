const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/content');

function fixDoubleWebpExtensions(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const oldPath = path.join(dir, file.name);
      const correctedName = file.name.replace(/webp\.webp$/, ".webp");
      const newPath = path.join(dir, correctedName);

      if (file.isDirectory()) {
        fixDoubleWebpExtensions(oldPath); // Recursively process subdirectories
      } else if (file.isFile() && oldPath !== newPath) {
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(`Error renaming ${oldPath} to ${newPath}:`, err);
          } else {
            console.log(`Fixed file: ${oldPath} → ${newPath}`);
          }
        });
      }
    });
  });
}

fixDoubleWebpExtensions(outDir);
