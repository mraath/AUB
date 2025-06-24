import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import styles from "./Header.module.css";

const Header = ({ coverImage, title, subtitle, whatWeLoveItems }) => {

  const handleScroll = () => {
    const articleElement = document.getElementById('article');
    if (articleElement) {
      articleElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const image = coverImage;

  return (
    <div id="cardapp" className={styles.experiencecontainer}>
      <div id="hiddenCard" className={styles.hiddenH3div}> Why South Africa? </div>
      <div className={styles.area}>
        <div>
          <div id="headerapp" className={`${styles.fullheightimg} ${styles.picturediv}`}>
            <Image
              src={`/${image}`}
              alt={title}
              layout="fill"
              className={styles.coverImage}
              priority
            />

            <div className={styles.hiddendiv}>{title}</div>

            <div className={styles.grid}>
              <div></div>
              <div>
                <div className={styles.main}>
                  <h1 className={styles.mainheader}>{title}</h1>
                </div>
              </div>
              <div>
                <div className={styles.mainspacer}></div>
              </div>
              <div>
                <div className={styles.preSub}></div>
              </div>
              <div>
                <div className={styles.sub}>
                  <h2 className={`${styles.subtitle} ${styles.h2class}`}>{subtitle}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.btncontainer} ${styles.tB20}`}>
          <Link href="/contact-us">
            <button aria-label="Get in touch" className={styles.btn}>Get in Touch</button>
          </Link>
        </div>

        <div className={`${styles.btncontainer} ${styles.tB10}`}>
          <button 
          aria-label="Down arrow" 
          onClick={handleScroll}
          className={styles.downArrow}
        />
        </div>

        <span className={styles.container}>
          <div className={styles.why}>
            <div className={`${styles.h5class} ${styles.white}`}>What We Love</div>
            <ol className={styles.ol}>
              {whatWeLoveItems && whatWeLoveItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Header;