const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getFirstTwoParagraphs(markdown) {
  // Remove all headings (lines starting with #)
  const withoutHeadings = markdown
    .split('\n')
    .filter(line => !line.trim().startsWith('#'))
    .join('\n');

  // Split by double newlines to get paragraphs
  const paragraphs = withoutHeadings
    .split(/\n\s*\n/)
    .filter(p => p.trim());

  // Return first two paragraphs
  return paragraphs
    .slice(0, 2)
    .join('\n\n')
    .trim();
}

function formatTitle(rawTitle, relativePath) {
  if (!rawTitle || rawTitle === 'Untitled') {
    // Extract last part of path and format it
    return relativePath
      .split('/')
      .filter(Boolean) // Remove empty strings
      .pop() // Get last segment
      .split('-') // Split by hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join with spaces
  }
  return rawTitle;
}

function generateSearchIndex() {
  const contentDir = path.join(process.cwd(), 'public/content');
  const searchIndex = [];

  function getFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        getFiles(filePath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: mdContent } = matter(content);
        
        // Get proper folder hierarchy
        const relativeFolderPath = path.relative(contentDir, path.dirname(filePath))
          .replace(/\\/g, '/');
        const folderName = path.basename(path.dirname(filePath));
        
        // Look for images in the correct content folder structure
        const optimizedImagesPath = path.join(
          process.cwd(), 
          'public', 
          'content', 
          relativeFolderPath
        );
        
        // Default image path construction
        let firstImage = 'content/default.webp';
        
        if (fs.existsSync(optimizedImagesPath)) {
          const images = fs.readdirSync(optimizedImagesPath)
            .filter(f => f.endsWith('.webp'));
          if (images.length > 0) {
            firstImage = `content/${relativeFolderPath}/${images[0]}`;
          } else if (data.title) {
            // Fallback to constructed image name if title exists
            firstImage = `content/${relativeFolderPath}/1${data.title.replace(/\s+/g, '')}.webp`;
          }
        }

        // Generate correct URL path for the card
        const urlPath = '/' + path.relative(contentDir, filePath)
          .replace(/\.md$/, '')
          .replace(/\\/g, '/')
          .replace('/card', '');

        // Format title and get clean description
        const title = formatTitle(data.title, relativeFolderPath);
        const description = getFirstTwoParagraphs(mdContent);

        // Match exact structure expected by Cards
        searchIndex.push({
          folderName: relativeFolderPath,
          title,
          description,
          image: firstImage,
          type: data.type || 'page',
          path: relativeFolderPath,
          isFolder: false,
          url: urlPath
        });
      }
    });
  }

  try {
    getFiles(contentDir);
    
    // Sort results by folder depth (number of forward slashes)
    searchIndex.sort((a, b) => {
      const depthA = (a.folderName.match(/\//g) || []).length;
      const depthB = (b.folderName.match(/\//g) || []).length;
      return depthA - depthB;
    });
    
    // Write to both public and out directories
    ['public', 'out'].forEach(dir => {
      const outputDir = path.join(process.cwd(), dir);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, 'search-index.json');
      fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
      console.log(`Search index written to ${outputPath}`);
    });

    console.log(`Generated index with ${searchIndex.length} items`);
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

generateSearchIndex();