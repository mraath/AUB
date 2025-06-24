const fs = require('fs/promises');
const path = require('path');

async function generateRedirects() {
  try {
    const mappingsPath = path.join(__dirname, 'image-mappings.json');
    const mappings = JSON.parse(await fs.readFile(mappingsPath, 'utf8'));
    const redirects = Object.entries(mappings).map(([imagePath, megaUrl]) => {
      return `${imagePath} ${megaUrl} 302`;
    });
    await fs.writeFile(path.join(__dirname, '../out/_redirects'), redirects.join('\n'), 'utf8');
    console.log('Generated _redirects file');
  } catch (error) {
    console.error('Error generating _redirects:', error.message);
  }
}

generateRedirects().catch(console.error);