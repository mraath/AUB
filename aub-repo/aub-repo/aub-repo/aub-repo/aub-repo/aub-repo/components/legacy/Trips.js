import Link from 'next/link';
import Image from "next/legacy/image";
import styles from './Trips.module.css';

export default function Trips() {
  const trips = [
    { href: '/favourite/1charming', title: 'Charming', image: '1Charming' },
    { href: '/favourite/2stylish', title: 'Stylish', image: '1Stylish' },
    { href: '/favourite/3exclusive', title: 'Exclusive', image: '1Exclusive' }
  ];

  const getImage = (trip) => {
    return '/content' + trip.href + '/' + trip.image + '.webp';
  } 

  return (
    <div id="favourites">
      <div id="hiddenOurfavourites" className='hiddenH3div'>
        Our Favourite Trips
      </div>
      <div id="divOurfavourites" className={styles.areacontainer}>
        <div className='h3class center'>
          Our Favourite Trips
        </div>
        <div className={styles.area}>
          <div className={styles.gridContainer}>
            {trips.map((trip, index) => (
              <div key={index} className={`${styles.gridItem} ${styles[`item${index + 1}`]}`}>
                <Link href={trip.href}>
                  <div className={styles.coverimg}>
                    <Image
                      src={`/${getImage(trip)}`}
                      alt={trip.title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="bottom"
                      className={styles.img}
                      loading="lazy"
                    />
                    <div className={styles.h4class}>{trip.title}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.btncontainer}>
            <Link href="/trips">
              <button 
                id="ourToMore" 
                aria-label="All destinations" 
                className={`${styles.btn} ${styles.alldestinations}`}
              >
                More Trips
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}