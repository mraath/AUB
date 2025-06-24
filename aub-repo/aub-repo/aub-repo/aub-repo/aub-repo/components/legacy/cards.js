import React from 'react';
import Link from 'next/link';

//import styles from './styles.cards.css';
import styles from './Cards.module.css';

const Cards = ({ subfolders, level, params, defaultHeading="Lodges" }) => {
  if (!subfolders?.length) return null;

  const getHeading = () => {
    const level1 = params?.slug?.[0];

    if (level1 === 'safaris') {
      if (level === 1) return 'Countries';
      if (level === 2) return 'Areas';
      return 'Lodges';
    }

    if (level1 === 'islands') {
      if (level === 1) return 'Islands';
      return 'Lodges';
    }

    if (level1 === 'cities') {
      if (level === 1) return 'Cities';
      return 'Lodges';
    }

    return defaultHeading;
  };

  const truncateTitle = (title, maxLength = 25) => {
    if (title.length <= maxLength) return title;
    return `${title.substring(0, maxLength)}...`;
  };

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
    <div id="cardBread" className={`${styles.flexcenter}`}>
      <div id="hiddenBreadcrumb" className="hiddenH3div">{getHeading()}</div>
      <div className={styles.container}>
        <div id="divBreadcrumb" className={styles.area}>
          <div className={styles.coverheading}>
            <div className={`h3class center ${styles.h3classBack}`}>{getHeading()}</div>
          </div>
          <div className={`${styles.container} ${styles.cards}`}>
            {subfolders.map((card, index) => (
              
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
                  <div className={styles.h2class}>{truncateTitle(card.title)}</div>

                  <div className={styles.descr}>
                    <p>
                      <span>
                        {card.description}
                      </span>
                    </p>
                    <div className={styles.fadeOut}></div>
                  </div>
                </Link>
                
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;