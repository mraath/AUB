const fs = require('fs/promises');
const path = require('path');
const { convertJsonToMd } = require('../utils/jsonToMd');

async function processDirectory(directory) { // Recursive function
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath); // Recursive call for subdirectories
    } else if (entry.isFile() && path.extname(entry.name) === '.json') {
      const mdPath = path.join(directory, entry.name.replace('.json', '.md'));
      await convertJsonToMd(fullPath, mdPath);
    }
  }
}

async function convertAllJson() {
  const contentDir = path.join(__dirname, '../content'); // Path to content directory

  console.log("Content Directory:", contentDir); // Debugging

  try {
    await processDirectory(contentDir); // Start the recursive processing
  } catch (err) {
    console.error("Error converting JSON files:", err);
  }
}

convertAllJson();