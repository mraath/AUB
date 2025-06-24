import Image from "next/legacy/image";
import Link from 'next/link';
import styles from './AUBackButton.module.css';

export default function AUBackButton({ parentCard }) {
  if (!parentCard) return null;

  return (
    <div>
      <Link 
        href={parentCard.parentImageDir} 
        className={styles.cardLink}
      >
        <h4 className={`${styles.backTitle} font-cursive text-center`}>Back</h4>
        <div className={styles.card}>
          {parentCard.image && (
            <Image
              src={`/${parentCard.image.replace(/\s+/g, '-').replace(/['']/g, "")}`}
              alt={parentCard.title || ''}
              width={300}
              height={200}
              layout="responsive"
              objectFit="cover"
            />
          )}
          <h3 className={styles.cardTitle}>{parentCard.title || ''}</h3>
        </div>
      </Link>
    </div>
  );
}