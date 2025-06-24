import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

//import '../styles/style.css';
import styles from './Post.module.css';

import MenuNav from "../components/legacy/menunav";
import AUHeader from "../components/layout/AUHeader";
import AUArticle from "../components/layout/AUArticle";
import GridContainer from '../components/legacy/GridContainer';
import AUGallery from "../components/layout/AUGallery";
import Cards from '../components/legacy/cards';
import Back from '../components/legacy/back';
import Steps from '../components/legacy/steps';
import Instagram from '../components/legacy/instagram';
import FooterNav from "../components/legacy/footernav";

export default function Post({ frontmatter, content, images, subfolders, parentCards, h1Title, h2Title, h3Title, whatWeLoveItems, params, level }) {
  const noGallery = frontmatter?.['no-gallery'] === 1;
  const noCards = frontmatter?.['no-cards'] === 1;
  const AllDestinations = frontmatter?.['all-destinations'] === 1
  const mainImg = frontmatter?.['main-img'] ?? '';
  const cardsHeader = frontmatter?.['cards-header'] ?? 'Lodges';

  // Conditionally add the 'mb45' class if noGallery is displayed
  const articleContainerClassName = `${styles.backgroundgrey} ${noGallery ? styles.mb45 : ''}`;

  return (
    <div className={styles.topContainer}>
      <MenuNav />

      {/* TOP Image and Titles */}
      <div className={styles.coverImageContainer}>
        <AUHeader 
          coverImage={mainImg || images[0]}
          title={h1Title || frontmatter.title} // Use h1Title with fallback to frontmatter.title
          subtitle={h2Title}
          whatWeLoveItems={whatWeLoveItems}
        />
      </div>

      <div className={articleContainerClassName}>
        <div id="article">
          <AUArticle 
            h3Title={h3Title}
            content={content}
            level={params.slug.length}
            params={params}
            frontmatter={frontmatter}
          />
        </div>
      </div>

      {/* <AllDestinations /> */}

      {AllDestinations && (<GridContainer />)}
      
      {!noGallery && (<div className={`${styles.container}`}>
        <AUGallery 
          images={images}
          title={frontmatter.title}
        />
      </div>)}

      {!noCards && (<Cards 
        subfolders={subfolders} 
        level={params.slug.length}
        params={params}
        defaultHeading={cardsHeader}
      />)}

      {level > 1 && (
        <Back parentCards={parentCards} />
      )}
      <Steps />
      <Instagram />
      <FooterNav />
    </div>
  );
}

export async function getStaticPaths() {
  const contentDir = path.join(process.cwd(), 'public/content');
  let paths = [];

  async function getPaths(dir, slugPrefix = []) {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = await fs.stat(itemPath);
      if (stat.isDirectory()) {
        const newSlugPrefix = [...slugPrefix, item];
        await getPaths(itemPath, newSlugPrefix);
        paths.push({
          params: {
            slug: newSlugPrefix,
          },
        });
      }
    }
  }

  await getPaths(contentDir);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug.join('/');
  const contentDirPath = path.join(process.cwd(), 'public/content', slug);
  let frontmatter = {
    title: '',
    subtitle: '',
    article_title: ''
  };

  // Calculate the level based on slug depth
  const level = params.slug.length;

  const cleanPath = (path) => {
    return path.split('/').map(segment => 
      segment
        .replace(/\s+/g, '-')
        .replace(/['']/g, '')
        .replace(/[&]/g, 'and')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .replace(/--+/g, '-')
        .toLowerCase()
    ).join('/');
  };

  let content = '';
  let h1Title = '';
  let h2Title = '';
  let h3Title = '';
  let whatWeLoveItems = [];
  let firstParagraph = '';

  try {
    const files = await fs.readdir(contentDirPath);
    const mdFile = files.find((file) => file.endsWith('.md'));

    if (!mdFile) {
      return { notFound: true };
    }

    const filePath = path.join(contentDirPath, mdFile);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parsedMatter = matter(fileContent);
    frontmatter = {
      ...frontmatter,
      ...parsedMatter.data
    };

        // In getStaticProps, modify the content processing section:

    // Get raw content before marking it as HTML
    const rawContent = parsedMatter.content;

    // Extract H1 from raw content
    const h1Match = rawContent.match(/^# (.*$)/m);
    h1Title = h1Match ? h1Match[1] : '';

    // Extract H2 from raw content (keep this as is)
    const h2Match = rawContent.match(/^## (.*$)/m);
    h2Title = h2Match ? h2Match[1] : '';

    // Extract H3 from raw content (keep this as is)
    const h3Match = rawContent.match(/^### (.*$)/m);
    h3Title = h3Match ? h3Match[1] : '';

    // Extract What we love items (keep this as is)
    whatWeLoveItems = [];
    const lines = rawContent.split('\n');
    let isWhatWeLoveSection = false;

    for (let line of lines) {
      line = line.trim();
      
      if (line === '#### What we love') {
        isWhatWeLoveSection = true;
        continue;
      } else if (line.startsWith('####') && isWhatWeLoveSection) {
        isWhatWeLoveSection = false;
      } else if (isWhatWeLoveSection && line) {
        line = line.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&');
        if (line) {
          whatWeLoveItems.push(line);
        }
      }
    }

    // Process content for display by removing unwanted sections
    let processedContent = rawContent
      .replace(/^# .*$/m, '') // Remove H1 (# Title)
      .replace(/^## .*$/m, '') // Remove H2 (## SAFARIS)
      .replace(/^### .*$/m, '') // Remove H3 (### SAFARIS Area / Lodge)
      .replace(/#### What we love[\s\S]*?(?=####|$)/, '') // Remove the entire What we love section including its content
      // Remove any extra blank lines that might have been created
      //.replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();

      // Split content into sections by h4 headings while preserving the headings
      const sections = processedContent.split(/(#### .*\n)/);
      let remainingContent = '';

      if (sections.length > 0) {
        // Process the first section to find the first real paragraph
        const firstSectionLines = sections[0].split('\n').filter(line => line.trim());
        
        // Get the first non-heading paragraph
        firstParagraph = firstSectionLines.find(line => 
          line.trim() && !line.startsWith('#')
        ) || '';

        // Remove the first paragraph from its original location
        if (firstParagraph) {
          sections[0] = sections[0]
            .replace(firstParagraph, '')
            .trim();
        }

        // Properly reconstruct the remaining content
        remainingContent = sections
          .map(section => section.trim()) // Trim each section
          .filter(section => section) // Remove empty sections
          .join('\n\n'); // Join with double newlines for proper spacing
      }

      // Combine the content in the desired order with proper spacing
      const reorderedContent = `${firstParagraph}\n\n${remainingContent}`.trim();

      // Convert to HTML with proper paragraph breaks
      content = marked(reorderedContent, {
        breaks: true,
        gfm: true
      });

  } catch (error) {
    console.error('Error reading or parsing markdown file:', error);
    return { notFound: true };
  }



  /* Images */

  const imagesDir = path.join('public/content', ...params.slug);
  let images = [];
  try {
    const imageFiles = await fs.readdir(imagesDir);
    images = imageFiles
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file) => {
        const baseName = path.basename(file, path.extname(file));
        return path.join('public/content', ...params.slug, `${baseName}.webp`);
      });
  } catch (error) {
    console.error('Error reading images directory:', error);
  }



  
  


  
  /* Cards */
let subfolders = [];

try {
  const subfoldersDir = path.join(process.cwd(), 'public/content', ...params.slug);
  let hasSubfolders = false;

  try {
    const subfolderNames = await fs.readdir(subfoldersDir);
    
    // First try to get direct subfolders
    for (const folderName of subfolderNames) {
      const folderPath = path.join(subfoldersDir, folderName);
      const stat = await fs.stat(folderPath);

      if (stat.isDirectory()) {
        hasSubfolders = true;
        try {
          // Get the subfolder's card.md content
          const cardPath = path.join(folderPath, 'card.md');
          const fileContent = await fs.readFile(cardPath, 'utf-8');
          const { data, content } = matter(fileContent);
          
          // Extract H1 from content
          const h1Match = content.match(/^# (.*$)/m);
          const title = h1Match ? h1Match[1] : data?.title || '';

          // Get first two paragraphs
          const paragraphs = content.split('\n')
            .filter(line => line.trim() && !line.startsWith('#'))
            .slice(0, 2);
          const description = paragraphs.join(' ');

          // Get the image
          let cardImage = '';
          try {
            const imageFiles = await fs.readdir(folderPath);
            const imageFile = imageFiles.find(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
            if (imageFile) {
              const baseName = path.basename(imageFile, path.extname(imageFile));
              cardImage = ['content', ...params.slug, folderName, `${baseName}.webp`]
                .join('/');
            }
          } catch (error) {
            console.error('Error reading folder image directory:', error);
          }

          // Build the full path for navigation
          const fullPath = [...params.slug, folderName]
            .map(segment => cleanPath(segment))
            .join('/');

          subfolders.push({
            title: title, // Use H1 title instead of frontmatter title
            description: description,
            image: cardImage,
            folderName: fullPath
          });
        } catch (error) {
          console.error(`Error processing subfolder ${folderName}:`, error);
        }
      }
    }

    // If no subfolders found, get peer folders
    if (!hasSubfolders && params.slug.length > 0) {
      const parentDir = path.join(process.cwd(), 'public/content', ...params.slug.slice(0, -1));
      const peerContents = await fs.readdir(parentDir);

      for (const folderName of peerContents) {
        const folderPath = path.join(parentDir, folderName);
        const stat = await fs.stat(folderPath);

        if (stat.isDirectory()) {
          try {
            // Get the peer folder's card.md content
            const cardPath = path.join(folderPath, 'card.md');
            const fileContent = await fs.readFile(cardPath, 'utf-8');
            const { data, content } = matter(fileContent);

            // Extract H1 from content
            const h1Match = content.match(/^# (.*$)/m);
            const title = h1Match ? h1Match[1] : data?.title || '';
            
            // Get first two paragraphs
            const paragraphs = content.split('\n')
              .filter(line => line.trim() && !line.startsWith('#'))
              .slice(0, 2);
            const description = paragraphs.join(' ');

            // Get the image
            let cardImage = '';
            try {
              const imageFiles = await fs.readdir(folderPath);
              const imageFile = imageFiles.find(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
              if (imageFile) {
                const baseName = path.basename(imageFile, path.extname(imageFile));
                cardImage = ['content', ...params.slug.slice(0, -1), folderName, `${baseName}.webp`]
                  .join('/');
              }
            } catch (error) {
              console.error('Error reading folder image directory:', error);
            }

            // Build the full path for navigation
            const fullPath = [...params.slug.slice(0, -1), folderName]
              .map(segment => cleanPath(segment))
              .join('/');

            subfolders.push({
              title: title, // Now using H1 with fallback to frontmatter title
              description: description,
              image: cardImage,
              folderName: fullPath
            });
          } catch (error) {
            console.error(`Error reading or parsing card.md for ${folderName}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading subfolders directory:', error);
  }
} catch (error) {
  console.error('Error in cards section:', error);
}







/* Parent Cards */
let parentCards = [];

if (params.slug.length > 1) {
  //const grandParentSlug = params.slug.slice(0, -2);
  const parentSlug = params.slug.slice(0, -1);
  //const grandParentDir = path.join(process.cwd(), 'content', ...grandParentSlug);

  try {
    const isLevel2 = params.slug.length === 2;
    const parentFolder = params.slug[0];
    const isSpecialCategory = ['safaris', 'cities', 'islands'].includes(parentFolder);

    if (isLevel2 && isSpecialCategory) {
      // Handle special categories at level 2
      const mainCategories = ['safaris', 'cities', 'islands'];
      const contentDir = path.join(process.cwd(), 'public/content');

      for (const category of mainCategories) {
        const categoryPath = path.join(contentDir, category);
        try {
          const stat = await fs.stat(categoryPath);
          if (stat.isDirectory()) {
            const cardPath = path.join(categoryPath, 'card.md');
            const cardContent = await fs.readFile(cardPath, 'utf-8');
            const { data, content: cardMarkdown } = matter(cardContent); // Get both data and content

            // Extract H1 from cardMarkdown
            const h1Match = cardMarkdown.match(/^# (.*$)/m);
            const title = h1Match ? h1Match[1] : data?.title || '';

            // Get the image for the category
            const categoryImageDir = path.join('public/content', category);
            let cardImage = '';
            try {
              const imageFiles = await fs.readdir(categoryImageDir);
              const imageFile = imageFiles.find((file) =>
                /\.(jpg|jpeg|png|gif)$/i.test(file)
              );
              if (imageFile) {
                const baseName = path.basename(imageFile, path.extname(imageFile));
                // Fix: Don't clean the whole path, only clean the segments
                const cleanedCategory = cleanPath(category);
                const cleanedBaseName = cleanPath(baseName);
                cardImage = `content/${cleanedCategory}/${cleanedBaseName}.webp`;
              }
            } catch (error) {
              console.error(`Error reading category image directory for ${category}:`, error);
            }

            parentCards.push({
              title: title, // Now using H1 with fallback to frontmatter title
              image: cardImage,
              folderName: cleanPath(category),
              isCurrentFolder: category === parentFolder
            });
          }
        } catch (error) {
          console.error(`Error processing category ${category}:`, error);
        }
      }
    } else {
      // For level 3+ or non-special categories, show parent and its siblings
      const parentDir = path.join(process.cwd(), 'public/content', ...parentSlug.slice(0, -1));
      const parentContents = await fs.readdir(parentDir);

      for (const folderName of parentContents) {
        const folderPath = path.join(parentDir, folderName);
        const stat = await fs.stat(folderPath);

        if (stat.isDirectory()) {
          const cardPath = path.join(folderPath, 'card.md');
          try {
            const cardContent = await fs.readFile(cardPath, 'utf-8');
            const { data, content: cardMarkdown } = matter(cardContent);

            // Extract H1 from cardMarkdown
            const h1Match = cardMarkdown.match(/^# (.*$)/m);
            const title = h1Match ? h1Match[1] : data?.title || '';

            // Get the image for the folder
            const folderImageDir = path.join('public/content', ...parentSlug.slice(0, -1), folderName);
            let cardImage = '';
            try {
              const imageFiles = await fs.readdir(folderImageDir);
              const imageFile = imageFiles.find((file) =>
                /\.(jpg|jpeg|png|gif)$/i.test(file)
              );
              if (imageFile) {
                const baseName = path.basename(imageFile, path.extname(imageFile));
                // Fix: Don't clean the whole path, only clean the segments
                const cleanedPath = [...parentSlug.slice(0, -1), folderName]
                  .map(segment => cleanPath(segment))
                  .join('/');
                const cleanedBaseName = cleanPath(baseName);
                cardImage = `content/${cleanedPath}/${cleanedBaseName}.webp`;
              }
            } catch (error) {
              console.error('Error reading folder image directory:', error);
            }

            // Build the full path for navigation
            const fullPath = cleanPath([...parentSlug.slice(0, -1), folderName].join('/'));

            parentCards.push({
              title: title, // Now using H1 with fallback to frontmatter title
              image: cardImage,
              folderName: fullPath,
              isCurrentFolder: folderName === params.slug[params.slug.length - 2]
            });
          } catch (error) {
            console.error(`Error reading or parsing card.md for ${folderName}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

  return {
    props: {
      frontmatter,
      content,
      images: images || [],
      subfolders: subfolders || [],
      parentCards,
      h1Title: h1Title || '',
      h2Title: h2Title || '',
      h3Title: h3Title || '',
      whatWeLoveItems: whatWeLoveItems || [],
      params, // Pass params to the component
      level,
    },
  };
}
