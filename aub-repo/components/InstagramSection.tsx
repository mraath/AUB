import React from 'react';
import styles from '../Pages/Post.module.css';
import styles2 from './InstagramSection.module.css';
import Image from 'next/image';

const InstagramSection = () => {
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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h4 className={`${styles.instagramTitle} font-cursive text-center mb-12`}>Instagram</h4>
      
      <div className={styles2.gridContainer}>
        {images.map((image, index) => (
          <a
            key={index}
            href={image.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block overflow-hidden group"
          >
            <Image fill
              src={image.src}
              alt={image.alt}
              className={`${styles2.imgInsta} object-cover transition-transform duration-500 ease-in-out group-hover:scale-110`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstagramSection;