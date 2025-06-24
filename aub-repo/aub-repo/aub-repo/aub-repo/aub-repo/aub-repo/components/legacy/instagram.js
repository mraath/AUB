//import React, { useState } from 'react';
import Link from 'next/link';

import "../../app/globals.css";
import "./styles.instagram.css";

const InstagramGrid = () => {
  const gridItems = [
    { id: 1, size: "", alt: "tree-house-safari" },
    { id: 2, size: "", alt: "outside-bath-safari" },
    { id: 3, size: "", alt: "island" },
    { id: 4, size: "", alt: "lion-safari" },
    { id: 5, size: "", alt: "cape-town-south-africa" },
    { id: 6, size: "", alt: "hot-air-balloon" },
    { id: 7, size: "", alt: "gorilla-trekking-safari" },
    { id: 8, size: "", alt: "tented-safari" },
    { id: 9, size: "", alt: "tented-outdoor-sala-safari" },
  ];

  return (
    <div className="grid-container">
      {gridItems.map(item => (
        <div key={item.id} className={`grid-item item${item.id}`}>
          <div className="coverimg">
            <picture className="lazy">
              <source 
                media="(min-width: 1px), (min-height: 1px)" 
                srcSet={`/content/${item.id}insta${item.size}.jpg`} 
              />
              <img 
                loading="lazy" 
                src={`/content/${item.id}insta${item.size}.jpg`}
                alt={item.alt}
              />
            </picture>
          </div>
        </div>
      ))}
    </div>
  );
};

function Instagram() {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <div id="hiddenInstagram" className="hiddenH3div">Instagram</div>
        <div id="divInstagram" className="areacontainer">
          <div className="h3class center">Instagram</div>
          <div className="area">
            <Link href="https://www.instagram.com/africaunwind/" target="_blank" rel="noopener noreferrer">
              <InstagramGrid />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Instagram;