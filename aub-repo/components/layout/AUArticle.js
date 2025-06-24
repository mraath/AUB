//import matter from 'gray-matter';
import "../../app/globals.css";
import "../legacy/styles.main.css";
import "../legacy/styles.xtra.css";
import "../legacy/styles.footer.css";
import styles from './AUArticle.module.css';

export default function AUArticle({ h3Title , content, level, params, frontmatter }) {
  // Format the title from folder name
  const formatTitle = (title) => {
    if (!title) return '';

    //Rules around the title...
    // Maybe going forward change the original h3 value in md
    const level1 = params?.slug?.[0];

    if (level1 === 'safaris') {
      if (level === 1) 
        title = '6 Reasons To Go On Safari';
      else
        title = 'Why ' + title + '?';
    }

    if (level1 === 'islands') {
      if (level === 1) 
        title = '6 Reasons To Visit An Island';
      else
        title = 'Why ' + title + '?';
    }

    if (level1 === 'cities') {
      if (level === 1) 
        title = '6 Reasons To Visit A City';
      else
        title = 'Why ' + title + '?';
    }
    
    return title
      .split('-')
      .map(word => {
        // Split into individual words in case there are spaces
        return word.split(' ').map(subWord => {
          if (!subWord) return '';
          // Convert each word to title case
          return subWord.charAt(0).toUpperCase() + subWord.slice(1).toLowerCase();
        }).join(' ');
      })
      .join(' ');
  };

  const processContent = (htmlContent) => {
    try {
      let processed = htmlContent;

      // Check frontmatter for p1-margin-bottom
      const hasP1MarginBottom = frontmatter?.['p1-margin-bottom'] === 1;

      //console.log('Level:', level);
      //console.log('Has p1 margin:', hasP1MarginBottom);

      // Add margin if needed
      if (level === 0 || hasP1MarginBottom) {
        processed = processed.replace(
          /(<p[^>]*>)/i, // Match first p tag, preserving any existing attributes
          '$1<span style="display: block; margin-bottom: 40px;">'
        ).replace(
          /(<\/p>)/i, // Match its closing tag
          '</span>$1'
        );
      }

      // Clean up BR tags and empty paragraphs
      processed = processed
        .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '')
        .replace(/<p>\s*<\/p>/gi, '');

      return processed;
    } catch (err) {
      console.error('Error processing content:', err);
      console.log('Content received:', content);
      return htmlContent; // Return unprocessed content if there's an error
    }
  };

  const processedContent = processContent(content);
  const formattedTitle = formatTitle(h3Title);

  const youtube = frontmatter?.['youtube'] ?? '';
  const youtubeSrc = "https://www.youtube.com/embed/" + youtube;
  const showYoutube = youtube !== '';

  //Split for multiple Articles
  // Assuming 'processedContent' is your HTML string
  // The regex /(?=<h3>)/i splits the string *before* each occurrence of '<h3>' (case-insensitive)
  // It uses a positive lookahead (?=...) so the delimiter '<h3>' itself isn't consumed by the split.
  const processedContentParts = processedContent.split(/(?=<h3>)/i);
  //const markdownParts = content.split(/^(?=###\s)/m);
  
  // Optional: Filter out any empty strings that might result from the split
  // (e.g., if the content starts exactly with <h3>)
  const filteredParts = processedContentParts.filter(part => part.trim() !== '');

  return (
    <>
    <div id="hiddenGallery" className={`hiddenH3div`}>{formattedTitle}</div>
    <h3 className={`h3class center ${styles.h3class}`}>{formattedTitle}</h3>
    {filteredParts.map((part, index) => {
      // Determine the background style based on the index
      const isEven = index % 2 === 0;
      const containerStyle = isEven
        ? { backgroundColor: 'var(--default-background, transparent)' } // Use CSS variable or default
        : { backgroundColor: 'white' }; // Or use CSS classes
      
      // Conditionally add the 'firstArticleSection' class if it's the first part (index === 0)
      const articleContentClassName = `${styles.articleContent} ${index === 0 ? styles.firstArticleSection : ''}`;

      // You might want a specific class for the full-width container
      const containerClassName = isEven ? styles.articleContainerDefault : styles.articleContainerWhite;

      return (
      // articleContainer: Full-width, responsible for background
      <div key={index} className={containerClassName} style={containerStyle}>
        <article className={`${styles.articleWrapper} ${styles.container}`}>
        <div 
          className={articleContentClassName} 
          dangerouslySetInnerHTML={{ __html: part }} 
        />
        {showYoutube && (
          <div className={`${styles.htmlYouTube}`}><iframe width="100%" height="100%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" src={youtubeSrc}></iframe></div>
        )}
      </article>
      </div>
    );
  })}
  </>
  );
}
