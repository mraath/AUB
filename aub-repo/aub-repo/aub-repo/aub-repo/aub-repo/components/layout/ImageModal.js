import React from 'react';
import styles from './ImageModal.module.css';
import Image from "next/legacy/image";

const ImageModal = ({ imageIn, title, onClose, onPrev, onNext, index, total }) => {
  // Close on escape key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const image2 = imageIn; //TODO: MR: REMOVE ?.replace('-small.webp', '-xlarge.webp');
  
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
          onClick={onPrev}
        >‹</button>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={onNext}
        >›</button>
        <div className={styles.imageContainer}>
          <Image
            src={`/${image2}`}
            alt={`${title} - Gallery ${index + 1}`}
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className={styles.counter}>{index + 1} / {total}</div>
      </div>
    </div>
  );
};

export default ImageModal;