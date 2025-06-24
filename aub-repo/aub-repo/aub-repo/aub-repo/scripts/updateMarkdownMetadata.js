const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content');

async function updateMarkdownMetadata(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await updateMarkdownMetadata(fullPath);
    } else if (entry.isFile() && entry.name === 'card.json') {
      const jsonFilePath = fullPath;
      const markdownFilePath = path.join(path.dirname(fullPath), 'card.md');

      try {
        const jsonFileContent = await fs.readFile(jsonFilePath, 'utf-8');
        const jsonData = JSON.parse(jsonFileContent);

        if (jsonData.data && jsonData.data.schema) {
          const markdownFileContent = await fs.readFile(markdownFilePath, 'utf-8');
          const { data, content } = matter(markdownFileContent);

          // Clean up the schema JSON string
          let schemaString = jsonData.data.schema.replace(/\\n/g, '').replace(/\\r/g, '');
          schemaString = schemaString.replace(/\/\*.*?\*\//g, ''); // Remove comments

          // Parse the schema JSON string
          let schema = null;
          try {
            schema = JSON.parse(schemaString);
          } catch (error) {
            console.error(`Error parsing schema in ${jsonFilePath}:`, error);
          }

          if (schema) {
            data.schema = schema;
            const updatedMarkdownContent = matter.stringify(content, data);
            await fs.writeFile(markdownFilePath, updatedMarkdownContent, 'utf-8');
            console.log(`Updated schema in ${markdownFilePath}`);
          }
        } else {
          console.log(`No schema found in ${jsonFilePath}`);
        }
      } catch (error) {
        console.error(`Error processing ${jsonFilePath}:`, error);
      }
    }
  }
}

updateMarkdownMetadata(contentDir)
  .then(() => console.log('All JSON files have been processed.'))
  .catch((error) => console.error('Error processing JSON files:', error));