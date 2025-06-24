import React from 'react';
import Image from "next/legacy/image";
import Link from 'next/link';
import styles from './GridContainer.module.css';

const GridContainer = () => {
  const destinations = [
    { href: '/safaris/botswana', title: 'Botswana' },
    { href: '/safaris/south-africa', title: 'South Africa' },
    { href: '/safaris/zimbabwe', title: 'Zimbabwe' },
    { href: '/safaris/zambia', title: 'Zambia' },
    { href: '/safaris/namibia', title: 'Namibia' },
    { href: '/safaris/tanzania', title: 'Tanzania' },
    { href: '/safaris/kenya', title: 'Kenya' },
    { href: '/safaris/rwanda', title: 'Rwanda' },
    { href: '/safaris/malawi', title: 'Malawi' },
    { href: '/safaris/uganda', title: 'Uganda' },
    { href: '/islands/mauritius', title: 'Mauritius' },
    { href: '/islands/mozambique', title: 'Mozambique' },
    { href: '/islands/seychelles', title: 'Seychelles' },
    { href: '/islands/maldives', title: 'Maldives' },
    { href: '/islands/zanzibar', title: 'Zanzibar' },
    { href: '/islands/madagascar', title: 'Madagascar' }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridcontainer}>
        <div className={styles.grid}>
          {destinations.map((dest, index) => (
            <div key={index} className={styles.grid__item}>
              <Link href={dest.href}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={`/content${dest.href}/1${dest.title.replace(/\s+/g, '')}.webp`}
                    alt={dest.title}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                    sizes="(max-width: 479px) 50vw, (max-width: 1280px) 33vw, 400px"
                  />
                  <div className={styles.h4class}>{dest.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridContainer;