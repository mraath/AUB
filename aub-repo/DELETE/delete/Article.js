import React from 'react';
import styles from './Article.module.css';

const Article = ({ h3Title, content }) => {
  return (
    <div className={styles.article}>
      <div id="hiddenArticle" className="hiddenH3div">{h3Title}</div>
      <div className={styles.container}>
        <h3 className={`h3class center ${styles.h3class}`}>{h3Title}</h3>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Article;