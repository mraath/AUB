import Link from 'next/link';
import Image from "next/legacy/image";
import styles from './Areas.module.css';

export default function Areas() {
  const areas = [
    { href: '/safaris', title: 'Safaris', image: '1Safaris' },
    { href: '/islands', title: 'Islands', image: '1Islands' },
    { href: '/cities', title: 'Cities', image: '1Cities' },
    { href: '/bucket-list', title: 'The Bucket List', image: '1TheBucketList' },
    { href: '/honeymoons', title: 'Honeymoons', image: '1Honeymoons' },
    { href: '/family-travel', title: 'Family Travel', image: '1FamilyTravel' }
  ];

  const getImage = (area) => {
    return '/content' + area.href + '/' + area.image + '.webp';
  }

  return (
    <>
      <div id="hiddenAreas" className="hiddenH3div">Travel Experiences</div>
      <div id="divAreas" className={styles.areacontainer}>
        <div className="h3class center">Travel Experiences</div>
        <div className={styles.gridcontainer}>
          <div className={`${styles.grid} ${styles.griditem2}`}>
            {areas.map((area, index) => (
              <div 
                key={index} 
                className={`${styles.grid_item} ${styles.grid__item} ${index === 0 || index === 3 ? styles.bigImg : ''}`}
              >
                <Link href={area.href}>
                  <div className={styles.content}>
                    <Image
                      src={`/${getImage(area)}`}
                      alt={area.title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className={styles.coverimg}
                      priority={index < 2}
                    />
                    <div className={styles.blockimage}></div>
                    <div className={styles.title}>{area.title}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}