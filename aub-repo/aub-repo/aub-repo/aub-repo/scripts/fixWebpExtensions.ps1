const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/content');

function fixWebpExtensions(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const oldPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        fixWebpExtensions(oldPath); // Recursively fix files in subdirectories
      } else if (file.isFile() && !file.name.endsWith('.webp')) {
        const newPath = oldPath + '.webp'; // Append ".webp" extension

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

fixWebpExtensions(outDir);
