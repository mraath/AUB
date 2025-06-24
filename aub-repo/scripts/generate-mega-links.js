const fs = require('fs/promises');
const path = require('path');
const { execSync } = require('child_process');

async function generateLinks() {
  const mappings = {};
  async function processDir(localDir, megaPrefix) {
    const entries = await fs.readdir(localDir, { withFileTypes: true });
    for (const entry of entries) {
      const localPath = path.join(localDir, entry.name);
      const megaPath = path.join(megaPrefix, entry.name).replace(/\\/g, '/');
      const imageUrlPath = `/content/${megaPath.replace(/^\/content\//, '')}`;
      if (entry.isDirectory()) {
        await processDir(localPath, megaPath);
      } else {
        try {
          const link = execSync(`mega-export -a "${megaPath}"`, { encoding: 'utf8' }).trim();
          mappings[imageUrlPath] = link.match(/https:\/\/mega\.nz\/file\/[^\s]+/)[0];
        } catch (error) {
          console.error(`Error exporting ${megaPath}:`, error);
        }
      }
    }
  }
  await processDir('public/content', '/content');
  await fs.writeFile(path.join(__dirname, 'image-mappings.json'), JSON.stringify(mappings, null, 2), 'utf8');
  console.log('Generated image-mappings.json');
}

generateLinks().catch(console.error);