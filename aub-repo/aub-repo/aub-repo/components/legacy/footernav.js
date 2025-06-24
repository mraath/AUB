import React from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";

import styles from './FooterNav.module.css';

import "../../app/globals.css";
import "./styles.main.css";
import "./styles.xtra.css";
import "./styles.footer.css";

// Add Ionicons CSS for social media icons
const IoniconsCSS = () => (
  <link 
    rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"
  />
);


function FooterNav() {

  return (
		<>
			<IoniconsCSS />
      <div className="footer-dark">
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className="row">
              <div className={styles.menu}>
                <div className={`${styles.item} ${styles.explore} explore item`}>
									<div  className="h2class">Explore</div>
									<ul >
										<li >
											<Link  href="/safaris">Safaris</Link>
										</li>
										<li >
											<Link  href="/islands">Islands</Link>
										</li>
										<li >
											<Link  href="/cities">Cities</Link>
										</li>
										<li >
											<Link  href="/top-destinations">Top Destinations</Link>
										</li>
										<li >
											<Link  href="/destinations">All Destinations</Link>
										</li>
									</ul>
								</div>
								<div className={`${styles.item} experience item`}>
									<div  className="h2class">Experience</div>
									<ul >
										<li >
											<Link  href="/bucket-list">The Bucket List</Link>
										</li>
										<li >
											<Link  href="/honeymoons">Honeymoons</Link>
										</li>
										<li >
											<Link  href="/family-travel">Family Travel</Link>
										</li>
										<li >
											<Link  href="/trips">Our Favourite Trips</Link>
										</li>
										<li >
											<Link  href="/what-to-expect">What To Expect</Link>
										</li>
									</ul>
								</div>
								<div className={`${styles.item} contact item`}>
									<div  className="h2class">Contact</div>
									<ul >
										<Link  href="/">
											<li  className="normaltext">Africa Unwind</li>
										</Link>
										<Link  href="/">
											<li  className="normaltext">+27 21 300 1579</li>
										</Link>
										<Link  href="mailto:info@africaunwind.com">
											<li  className="normaltext">info@africaunwind.com</li>
										</Link>
										<li >
											<Link  href="/our-story">Our Story</Link>
										</li>
										<li >
											<Link  href="/contact-us">Let&apos;s Plan</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="row">
              <div className={`${styles.copyright} copyright`}>
								<Link  href="https://www.satsa.com/" target="_blank" rel="nofollow noreferrer noopener">
								<Image 
											alt="SATSA" 
											src="/content/satsa.webp"
											width={90}
											height={53}
										/>
									</Link>
								</div>
							</div>
							<div className="row">
              <div className={`col item social ${styles.social}`}>
									<Link  href="https://www.instagram.com/africaunwind/" target="_blank" rel="noopener noreferrer">
										<i  className="icon ion-social-instagram"></i>
									</Link>
									<Link  href="https://twitter.com/africaunwind" target="_blank" rel="noopener noreferrer">
										<i  className="icon ion-social-twitter"></i>
									</Link>
									<Link  href="https://www.facebook.com/africaunwind" target="_blank" rel="noopener noreferrer">
										<i  className="icon ion-social-facebook"></i>
									</Link>
								</div>
							</div>
							<div className="row">
              <p className="copyright">Africa Unwind © 2025</p>
							</div>
						</div>
					</footer>
			</div>
		</>
  );
}

export default FooterNav;