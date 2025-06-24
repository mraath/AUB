import React from 'react';
import Link from 'next/link';

import styles from './Back.module.css';

const Back = ({ parentCards }) => {
  if (!parentCards?.length) return null;

  const cleanPath = (path, isImage = false) => {
    if (isImage) {
      // For image paths, preserve '/' and file extensions
      return path.split('/').map(segment => {
        // Don't clean the file extension part
        if (segment.includes('.')) {
          const [name, ext] = segment.split('.');
          return `${name
            .replace(/\s+/g, '-')
            .replace(/['']/g, '')
            .replace(/[&]/g, 'and')
            .replace(/[^a-zA-Z0-9-]/g, '')
            .toLowerCase()}.${ext}`;
        }
        // Clean other path segments
        return segment
          .replace(/\s+/g, '-')
          .replace(/['']/g, '')
          .replace(/[&]/g, 'and')
          .replace(/[^a-zA-Z0-9-]/g, '')
          .toLowerCase();
      }).join('/');
    }
    
    // For href paths, use original cleaning
    return path.split('/').map(segment => 
      segment
        .replace(/\s+/g, '-')
        .replace(/['']/g, '')
        .replace(/[&]/g, 'and')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase()
    ).join('/');
  };

  return (
    <div id="cardBread" className={`${styles.p100} ${styles.flexcenter}`}>
      <div id="hiddenBreadcrumb" className="hiddenH3div">Back</div>
      <div className={styles.container}>
        <div id="divBreadcrumb" className={styles.area}>
          <div className={styles.coverheading}>
            <div className={`h3class center ${styles.h3classBack}`}>Back</div>
          </div>
          <div className={`${styles.container} ${styles.cards}`}>
            {parentCards.map((card, index) => (
              
              <div key={index} className={`${styles.card} ${styles.coverimgmain}`}>
                <Link href={`/${cleanPath(card.folderName)}`} className={styles.link}>

                {/* className={`${styles.cardLink} ${card.isCurrentFolder ? styles.current : ''}`}
                >
                  {card.isCurrentFolder && (
                    <h4 className={`${styles.backTitle} font-cursive text-center`}>Back</h4>
                  )} */}

                  <div className={`${styles.cardImage} ${styles.coverimg}`}>
                    <div 
                      className={styles.coverimg}
                      style={{
                        backgroundImage: `url(/${cleanPath(card.image, true)})`
                      }}
                    />
                  </div>
                  <div className={styles.h2class}>{card.title}</div>
                </Link>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Back;