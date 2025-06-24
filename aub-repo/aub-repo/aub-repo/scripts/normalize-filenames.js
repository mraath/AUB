const fs = require('fs');
const path = require('path');

function normalizeName(dir) {
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const lowerItem = item.toLowerCase();
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories first
      normalizeName(fullPath);
      
      // Then rename the directory if needed
      if (item !== lowerItem) {
        const tempName = path.join(dir, `${lowerItem}_temp`);
        const finalName = path.join(dir, lowerItem);
        fs.renameSync(fullPath, tempName);
        fs.renameSync(tempName, finalName);
        console.log(`Renamed directory: ${item} → ${lowerItem}`);
      }
    } else {
      // Rename files
      if (item !== lowerItem) {
        fs.renameSync(
          fullPath,
          path.join(dir, lowerItem)
        );
        console.log(`Renamed file: ${item} → ${lowerItem}`);
      }
    }
  });
}

const contentDir = path.join(process.cwd(), 'public/content');
normalizeName(contentDir);