import React from 'react';
import "./Menu.css"; // Import the CSS - we'll create this next

function Menu() {
  return (
    <header>
      <div className="container1">
        <div className="grid" style={{ visibility: 'visible' }}>
          <div className="gridspacer"></div>
          <div className="containerlogo">
            <div className="h1class logo">
              <a href="/">Africa Unwind</a>
            </div>
          </div>
          <div className="gridspacer"></div>
        </div>
        <a href="/search-site/">
          <div className="wrapper">
            <div className="container">
              <div className="icon-items icon-1">
                <i className="fas fa fa-search" />
              </div>
            </div>
          </div>
        </a>
        <div className="navigation">
          <nav className="site-nav">
            <ul>
              <li className="nav-button">
                <span className="button topplan">
                  <a href="/contact-us/">Let's Plan</a>
                </span>
              </li>
              <li className="li">
                <a href="/safaris/">
                  <i className="site-nav--icon" />
                  Safaris
                </a>
              </li>
              <li className="li">
                <a href="/islands/">
                  <i className="site-nav--icon" />
                  Islands
                </a>
              </li>
              <li className="li">
                <a href="/cities/">
                  <i className="site-nav--icon" />
                  Cities
                </a>
              </li>
              <li className="li mega-drop-down menu-item">
                <a href="/destinations/">
                  <i className="site-nav--icon" />
                  Destinations{' '}
                </a>
                <ul className="submenu">
                  <li className="submenu-item">
                    <div className="flexrow">
                      <div className="h2class submenu-title">
                        Top Destinations
                      </div>
                    </div>
                    <ul className="submenu-top">
                      <li className="submenu-top-item">
                        <a href="/safaris/botswana">Botswana</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/south-africa/kruger-national-park">
                          Kruger National Park
                        </a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve">
                          Sabi Sand Reserve
                        </a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/botswana/okavango-delta">
                          Okavango Delta
                        </a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/zimbabwe/victoria-falls">
                          Victoria Falls
                        </a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/cities/cape-town">Cape Town</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/south-africa">South Africa</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/tanzania/serengeti-national-park">
                          Serengeti
                        </a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/namibia">Namibia</a>
                      </li>
                    </ul>
                    <div className="flexrow">
                      <div className="h2class submenu-title-half">
                        Southern Africa
                      </div>
                      <div className="h2class submenu-title-half">
                        Indian Ocean Islands
                      </div>
                    </div>
                    <ul className="submenu-top">
                      <li className="submenu-top-item">
                        <a href="/safaris/botswana">Botswana</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/islands/mauritius">Mauritius</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/south-africa">South Africa</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/islands/mozambique">Mozambique</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/zimbabwe">Zimbabwe</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/islands/seychelles">Seychelles</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/zambia">Zambia</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/islands/maldives">Maldives</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/namibia">Namibia</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/islands/zanzibar">Zanzibar</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/malawi">Malawi</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/islands/madagascar">Madagascar</a>
                      </li>
                    </ul>
                    <div className="flexrow">
                      <div className="h2class submenu-title">East Africa</div>
                    </div>
                    <ul className="submenu-top">
                      <li className="submenu-top-item">
                        <a href="/safaris/tanzania">Tanzania</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/kenya">Kenya</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/rwanda">Rwanda</a>
                      </li>
                      <li className="submenu-top-item">
                        <a href="/safaris/uganda">Uganda</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="li listar">
                <div className="star">
                  <i aria-hidden="true" className="fa fa-star" />
                </div>
              </li>
              <li className="li">
                <a href="/our-story/">
                  <i className="site-nav--icon" />
                  Our Story
                </a>
              </li>
              <li className="li">
                <a href="/blog/">
                  <i className="site-nav--icon" />
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <a href="/contact-us/" className="round-text">
          <div className="plan round">
            <span className="button">Let's Plan</span>
          </div>
        </a>
        <div className="menu-toggle">
          <div className="hamburger"></div>
        </div>
      </div>
    </header>
  );
}

export default Menu;