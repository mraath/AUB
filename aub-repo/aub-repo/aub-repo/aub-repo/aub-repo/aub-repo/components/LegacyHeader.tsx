import React from 'react';
import Link from 'next/link';
/*import "./LegacyHeader.module.css";*/

const LegacyHeader = () => {
  return (
    <div  className="container1">
      <div
        
        className="grid"
        style={{ visibility: "visible" }}
      >
        <div  className="gridspacer" />
        <div  className="containerlogo">
          <div  className="h1class logo">
            <Link  href="/">
              Africa Unwind
            </Link>
          </div>
        </div>
        <div  className="gridspacer" />
      </div>
      <Link  href="/search-site">
        <div  className="wrapper">
          <div  className="container">
            <div  className="icon-items icon-1">
              <i  className="fas fa fa-search" />
            </div>
          </div>
        </div>
      </Link>
      <div  className="navigation">
        <nav  className="site-nav">
          <ul >
            <li  className="nav-button">
              <span  className="button topplan">
                <Link  href="/contact-us">
                  Let&apos;s Plan
                </Link>
              </span>
            </li>
            <li  className="li">
              <Link  href="/safaris">
                <i  className="site-nav--icon" />
                Safaris
              </Link>
            </li>
            <li  className="li">
              <Link  href="/islands">
                <i  className="site-nav--icon" />
                Islands
              </Link>
            </li>
            <li  className="li">
              <Link  href="/cities">
                <i  className="site-nav--icon" />
                Cities
              </Link>
            </li>
            <li  className="li mega-drop-down menu-item">
              <Link  href="/destinations">
                <i  className="site-nav--icon" />
                Destinations{" "}
              </Link>
              <ul  className="submenu">
                <li  className="submenu-item">
                  <div  className="flexrow">
                    <div
                      
                      className="h2class submenu-title"
                    >
                      Top Destinations
                    </div>
                  </div>
                  <ul  className="submenu-top">
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/botswana">
                        Botswana
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link
                        
                        href="/safaris/south-africa/kruger-national-park"
                      >
                        Kruger National Park
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link
                        
                        href="/safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve"
                      >
                        Sabi Sand Reserve
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link
                        
                        href="/safaris/botswana/okavango-delta"
                      >
                        Okavango Delta
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link
                        
                        href="/safaris/zimbabwe/victoria-falls"
                      >
                        Victoria Falls
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/cities/cape-town">
                        Cape Town
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/south-africa">
                        South Africa
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link
                        
                        href="/safaris/tanzania/serengeti-national-park"
                      >
                        Serengeti
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/namibia">
                        Namibia
                      </Link>
                    </li>
                  </ul>
                  <div  className="flexrow">
                    <div
                      
                      className="h2class submenu-title-half"
                    >
                      Southern Africa
                    </div>
                    <div
                      
                      className="h2class submenu-title-half"
                    >
                      Indian Ocean Islands
                    </div>
                  </div>
                  <ul  className="submenu-top">
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/botswana">
                        Botswana
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/islands/mauritius">
                        Mauritius
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/south-africa">
                        South Africa
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/islands/mozambique">
                        Mozambique
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/zimbabwe">
                        Zimbabwe
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/islands/seychelles">
                        Seychelles
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/zambia">
                        Zambia
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/islands/maldives">
                        Maldives
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/namibia">
                        Namibia
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/islands/zanzibar">
                        Zanzibar
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/malawi">
                        Malawi
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/islands/madagascar">
                        Madagascar
                      </Link>
                    </li>
                  </ul>
                  <div  className="flexrow">
                    <div
                      
                      className="h2class submenu-title"
                    >
                      East Africa
                    </div>
                  </div>
                  <ul  className="submenu-top">
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/tanzania">
                        Tanzania
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/kenya">
                        Kenya
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/rwanda">
                        Rwanda
                      </Link>
                    </li>
                    <li  className="submenu-top-item">
                      <Link  href="/safaris/uganda">
                        Uganda
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li  className="li listar">
              <div  className="star">
                <i
                  
                  aria-hidden="true"
                  className="fa fa-star"
                />
              </div>
            </li>
            <li  className="li">
              <Link  href="/our-story">
                <i  className="site-nav--icon" />
                Our Story
              </Link>
            </li>
            <li  className="li">
              <Link  href="/blog">
                <i  className="site-nav--icon" />
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link  href="/contact-us" className="round-text">
        <div  className="plan round">
          <span  className="button">
            Let&apos;s Plan
          </span>
        </div>
      </Link>
      <div  className="menu-toggle">
        <div  className="hamburger" />
      </div>
    </div>
  );
};

export default LegacyHeader;


