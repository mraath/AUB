import { useState, useEffect } from 'react';
import MenuNav from '../components/legacy/menunav';
import AUHeader from "../components/layout/AUHeader";
import ContactForm from '../components/legacy/ContactForm'; // Import the new form
import FooterNav from '../components/legacy/footernav';

import styles from './contactus.module.css';

export default function Header({ }) {
  const [loaded, setLoaded] = useState(false);

  // Simulate loading state
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const homeImage = "/content/contact-us/1contactus.webp";
  const homeTitle = "";
  const homeSubTitle = "";
  const whatWeLoveItems = [];
  const hideActions = true;

  return (
    <>
      <MenuNav />
      {/* TOP Image and Titles */}
      <div className={styles.AUHeader}>
        <AUHeader 
          coverImage={homeImage}
          title={homeTitle}
          subtitle={homeSubTitle}
          whatWeLoveItems={whatWeLoveItems}
          hideActions={hideActions}
        />
      </div>
      <ContactForm />
      {/* <Steps /> */}
      {/* <Instagram /> */}
      <FooterNav />
    </>
    
  );
}
