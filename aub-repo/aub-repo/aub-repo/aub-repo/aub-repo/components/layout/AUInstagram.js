import Image from "next/legacy/image";
import styles from './AUInstagram.module.css';

export default function AUInstagram() {
  return (
    <>
      <h4 className={`${styles.instagramTitle} font-cursive text-center`}>Instagram</h4>
      <div className={styles.instagramGrid}>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/romantic-dinner.jpg"
            alt="Romantic dinner setup in Africa"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/elephant-deck.jpg"
            alt="Elephant viewing from deck"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/island-aerial.jpg"
            alt="Aerial view of tropical island"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/lions.jpg"
            alt="Lions in the wild"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/harbor.jpg"
            alt="Scenic harbor view"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/hot-air-balloon.jpg"
            alt="Hot air balloon safari"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/gorilla.jpg"
            alt="Mountain gorilla"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/evening-dining.jpg"
            alt="Evening dining setup"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.instagramImage}>
          <Image
            src="/images/instagram/luxury-tent.jpg"
            alt="Luxury tent interior"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
}