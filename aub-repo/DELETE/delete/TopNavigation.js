import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../components/TopNavigation.module.css';
import Image from 'next/image';

const TopNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image fill 
              src="/images/logo.png" 
              alt="Africa Unwind" 
              className={styles.logo} 
            />
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
          <Link href="/safaris" className={styles.navLink}><li className={styles.navItem}>
              Safaris
            </li></Link>
            <Link href="/cities" className={styles.navLink}><li className={styles.navItem}>
              Cities
            </li></Link>
            <Link href="/contact" className={styles.navLink}><li className={styles.navItem}>
              Experiences
            </li></Link>
            <Link href="/contact" className={styles.navLink}><li className={styles.navItem}>
              About
            </li></Link>
            <Link href="/contact" className={styles.navLink}><li className={styles.navItem}>
              Contact
            </li></Link>
          </ul>
        </nav>

        <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
          <span className={styles.hamburgerIcon}></span>
          <span className={styles.hamburgerIcon}></span>
          <span className={styles.hamburgerIcon}></span>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <Link href="/safaris" className={styles.mobileNavLink}>Safaris</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/destinations" className={styles.mobileNavLink}>Destinations</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/experiences" className={styles.mobileNavLink}>Experiences</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/about" className={styles.mobileNavLink}>About</Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="/contact" className={styles.mobileNavLink}>Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;