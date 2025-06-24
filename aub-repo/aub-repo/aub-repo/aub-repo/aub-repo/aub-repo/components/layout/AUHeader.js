import Link from 'next/link';
import Image from "next/legacy/image";

import styles from './AUHeader.module.css';

export default function AUHeader({ 
  coverImage, 
  title, 
  subtitle, 
  whatWeLoveItems, 
  isIndex = false,
  imgOffset = '',
  hideActions = false
}) {
  // Format the title from folder name
  const formatTitle = (title) => {
    if (!title) return '';
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
  }
  const formattedTitle = formatTitle(title);
  const buttonHref = (isIndex) ? "/#destinations" : "/contact-us";
  const buttonText = (isIndex) ? "Top Destinations" : "Get In Touch";

  // Create dynamic image class
  const imageClasses = `${styles.coverImage} ${imgOffset ? styles[imgOffset] : ''}`;
  const h1ClassName = `${styles.title} ${!isIndex ? styles.mt45 : ''} font-cursive capitalize`;

  const image = coverImage; //TODO: MR: REMOVE ?.replace('-large.webp', '-xlarge.webp');

  return (
    <>
    <div className={styles.coverImageContainer}>
      <Image
        src={`/${image}`}
        alt={title}
        layout="fill"
        className={imageClasses}
        priority
      />
      <div className={styles.coverOverlay}>

        {isIndex && (
          <div>
            <Image
              src={`/content/logo.png`}
              alt={title}
              width={80}
              height={80}
              priority
            />
          </div>
        )}

        <h1 className={h1ClassName}>{formattedTitle}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        
        <div className={`${hideActions ? styles.hidden : ''}`}>
          <Link  href={buttonHref}>
            <button  aria-label={buttonText} className={`${styles.btn} btn`}>{buttonText}</button>
          </Link>
        </div>

        <div className={`${styles.downArrowContainer} ${hideActions ? styles.hidden : ''}`}>
          <button 
            aria-label="Down arrow" 
            onClick={() => document.getElementById('article').scrollIntoView({ behavior: 'smooth' })} 
            className={styles.downArrow}
          />
        </div>
      </div>
      
    </div>
    {whatWeLoveItems && whatWeLoveItems.length > 0 && (
    <div className={styles.whatWeLoveContainer}>
      <div className={styles.whatWeLove}>
        <div className={styles.whatWeLoveTitle}>What We Love</div>
        <ol className={styles.whatWeLoveList}>
          {whatWeLoveItems && whatWeLoveItems.map((item, index) => (
            <li key={index} className={styles.whatWeLoveItem}>
              <span className={styles.whatWeLoveText}>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
    )}
  </>
  );
}