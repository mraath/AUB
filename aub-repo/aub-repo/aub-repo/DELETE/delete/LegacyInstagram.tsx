import React from 'react';
import styles from './LegacyInstagram.module.css';

const LegacyInstagram = () => {
  const images = [
    {
      src: "/content/instagram/1insta.jpg",
      alt: "Luxury safari tent at night with lanterns",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/2insta.jpg",
      alt: "Person viewing elephants from deck",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/3insta.jpg",
      alt: "Aerial view of tropical beach",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/4insta.jpg",
      alt: "Two lions in savanna",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/5insta.jpg",
      alt: "Harbor with boats at sunset",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/6insta.jpg",
      alt: "Hot air balloon over mountains",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/7insta.jpg",
      alt: "Gorillas in forest",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/8insta.jpg",
      alt: "Safari lodge deck at sunset",
      link: "https://instagram.com"
    },
    {
      src: "/content/instagram/9insta.jpg",
      alt: "Modern safari lodge interior",
      link: "https://instagram.com"
    }
  ];

  return (
    <div className={styles.area}>
      <a href="https://www.instagram.com/africaunwind" target="_blank" rel="noopener noreferrer">
        <div className={styles.gridContainer}>
          {images.map((image, index) => (
            <div key={index} className={`${styles.gridItem} ${styles[`item${index + 1}`]}`}>
              <div className={styles.coverimg}>
                <picture>
                  <source 
                    media="(min-width: 1px), (min-height: 1px)" 
                    srcSet={`/content/instagram/${image.src}-sm.jpg`}
                  />
                  <img
                    loading="lazy"
                    src={`/content/instagram/${image.src}-${index === 0 ? 'md' : 'sm'}.jpg`}
                    alt={image.alt}
                  />
                </picture>
              </div>
            </div>
          ))}
        </div>
      </a>
    </div>
  );
};

export default LegacyInstagram;