import Link from 'next/link';
import Image from "next/legacy/image";
import styles from './Destinations.module.css';

export default function Destinations() {
  const destinations = [
    { href: '/safaris/botswana', title: 'Botswana', image: 'Botswana' },
    { href: '/safaris/south-africa/kruger-national-park', title: 'Kruger National Park', image: 'KrugerNationalPark' },
    { href: '/safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve', title: 'Sabi Sand Reserve', image: 'SabiSand' },
    { href: '/safaris/botswana/okavango-delta', title: 'Okavango Delta', image: 'OkavangoDelta' },
    { href: '/safaris/zimbabwe/victoria-falls', title: 'Victoria Falls', image: 'VictoriaFalls' },
    { href: '/cities/cape-town', title: 'Cape Town', image: 'CapeTown' },
    { href: '/safaris/south-africa', title: 'South Africa', image: 'SouthAfrica' },
    { href: '/safaris/tanzania/serengeti-national-park', title: 'Serengeti', image: 'Serengeti' },
    { href: '/safaris/namibia', title: 'Namibia', image: 'Namibia' }
  ];

  const getImage = (dest) => {
    return '/content' + dest.href + '/1' + dest.image + '.webp';
  } 

  return (
    <>
      <div id="hiddenDestinations" className='hiddenH3div'>Top Destinations</div>
      <div id="destinations" className={styles.areacontainer}>
        <div className="h3class center">
          Top Destinations
        </div>
        <div className={styles.area}>
          <div className={styles.gridContainer}>
            {destinations.map((dest, index) => (
              <div key={index} className={`${styles.gridItem} ${styles[`item${index + 1}`]}`}>
                <Link href={dest.href}>
                  <div className={styles.coverimg}>
                    <Image
                      src={`/${getImage(dest)}`}
                      alt={dest.title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="bottom"
                      className={styles.img}
                    />
                    <div className={styles.h4class}>{dest.title}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.btncontainer}>
            <Link href="/destinations">
              <button id="placesToAll" aria-label="All destinations" className={`${styles.btn} ${styles.alldestinations}`}>
                All Destinations
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}