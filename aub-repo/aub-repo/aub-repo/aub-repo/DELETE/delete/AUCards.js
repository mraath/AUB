import Image from "next/legacy/image";
import Link from 'next/link';
import styles from './AUCards.module.css';

export default function AUCards({ subfolders, params}) {
  return (
    <>
      <h4 className={`${styles.cardsTitle} font-cursive text-center`}>Discover More</h4>
      <div className={styles.cardsContainer}>
        {subfolders.map((subfolder, index) => {
          // Construct the full path with proper formatting
          const fullPath = `/${params.slug.join('/')}/${subfolder.title.toLowerCase().replace(/\s+/g, '-').replace(/['']/g, "")}`;
          
          return (
            <Link 
              key={index}
              href={fullPath}
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  {subfolder.image && (
                    <Image
                      className={styles.cardImage}
                      src={`/${subfolder.image.replace(/\s+/g, '-').replace(/['']/g, "")}`}
                      alt={subfolder.title || ''}
                      width={300}
                      height={200}
                      layout="responsive"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{subfolder.title || ''}</h3>
                  <p className={styles.cardDescription}>{subfolder.description || ''}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}