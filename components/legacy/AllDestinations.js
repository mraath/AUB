import Link from 'next/link';
import Image from "next/legacy/image";
//import styles from './AllDestinations.module.css';
import styles from './GridContainer.module.css';

export default function AllDestinations() {
  const destinations = [
    // Southern Africa
    { href: '/safaris/botswana', title: 'Botswana', region: 'southern' },
    { href: '/safaris/south-africa', title: 'South Africa', region: 'southern' },
    { href: '/safaris/zimbabwe', title: 'Zimbabwe', region: 'southern' },
    { href: '/safaris/zambia', title: 'Zambia', region: 'southern' },
    { href: '/safaris/namibia', title: 'Namibia', region: 'southern' },
    { href: '/safaris/malawi', title: 'Malawi', region: 'southern' },
    // East Africa
    { href: '/safaris/tanzania', title: 'Tanzania', region: 'east' },
    { href: '/safaris/kenya', title: 'Kenya', region: 'east' },
    { href: '/safaris/rwanda', title: 'Rwanda', region: 'east' },
    { href: '/safaris/uganda', title: 'Uganda', region: 'east' },
    // Islands
    { href: '/islands/mauritius', title: 'Mauritius', region: 'islands' },
    { href: '/islands/mozambique', title: 'Mozambique', region: 'islands' },
    { href: '/islands/seychelles', title: 'Seychelles', region: 'islands' },
    { href: '/islands/maldives', title: 'Maldives', region: 'islands' },
    { href: '/islands/zanzibar', title: 'Zanzibar', region: 'islands' },
    { href: '/islands/madagascar', title: 'Madagascar', region: 'islands' }
  ];

  //const image = image; //TODO: MR: REMOVE ?.replace('-small.webp', '-xlarge.webp');
  const getImage = (dest) => {
    return '/content' + dest.href + '/1' + dest.title.replace(/\s+/g, '') + '.jpg';
  }
  
  return (
    <div className={styles.gridcontainer}>
      <div className={`${styles.grid} ${styles.griditem2}`}>
        {destinations.map((dest, index) => (
          <div key={index} className={`${styles.gridItem} ${styles.gridItemContent}`}>
            <Link href={dest.href}>
              <div className={styles.content}>
                <div className={styles.coverimg}>
                  <Image
                    src={`/${getImage(dest)}`}
                    alt={dest.title}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                    sizes="(max-width: 450px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.h4class}>{dest.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}