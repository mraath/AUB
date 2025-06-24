import { useState } from "react";
import Image from "next/legacy/image";
import styles from './AUGallery.module.css';
import ImageModal from './ImageModal';

export default function AUGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(null);
  images = images.slice(0, 8); /* Only take the first 9 images */

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div id="hiddenGallery" className="hiddenH3div">Gallery</div>
      <div className={`h3class center ${styles.h3classBack}`}>Gallery</div>
      <div className={styles.galleryGrid}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={styles.galleryImage}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={`/${image}`}
              alt={`${title} - Gallery ${index + 1}`}
              width={300}
              height={200}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <ImageModal
          image={images[selectedImage]}
          title={title}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          index={selectedImage}
          total={images.length}
        />
      )}

    </>
  );
}