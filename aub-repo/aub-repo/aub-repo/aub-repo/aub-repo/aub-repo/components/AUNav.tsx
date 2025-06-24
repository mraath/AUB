import React, { useEffect } from 'react';
import '../styles/aunav.css'; 

const AUNav = () => {
  useEffect(() => {
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    const handleToggle = () => {
      if (siteNav) {
        siteNav.classList.toggle('open');
      }
    };

    menuToggle?.addEventListener('click', handleToggle);

    // Cleanup event listener on component unmount
    return () => {
      menuToggle?.removeEventListener('click', handleToggle);
    };
  }, []);
  
  return (<div>TEST</div>);
};

export default AUNav;