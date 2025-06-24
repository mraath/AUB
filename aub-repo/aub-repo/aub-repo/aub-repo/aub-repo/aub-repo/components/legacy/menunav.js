import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import "../../app/globals.css";
import "./styles.main.css";
import "./styles.xtra.css";
import "./styles.nav.css";


function MenuNav() {
	const [isOpen, setIsOpen] = useState(false);

  return (
    <header >
				<div  className="container1">
					<div  className="grid">
						<div  className="gridspacer"></div>
						<div  className="containerlogo">
							<div  className="h1class logo">
								<Link  href="/">Africa Unwind</Link>
							</div>
						</div>
						<div  className="gridspacer"></div>
					</div>
					<Link  href="/search-site/">
						<div  className="wrapper">
							<div  className="container">
								<div  className="icon-items icon-1">
									<i  className="fas fa fa-search"></i>
								</div>
							</div>
						</div>
					</Link>
					<div  className="navigation">
						<nav  className="site-nav">
							<ul >
								<li  className="nav-button">
									<span  className="button topplan">
										<Link  href="/contact-us/">Let&apos;s Plan</Link>
									</span>
								</li>
								<li  className="li">
									<Link  href="/safaris/">
										<i  className="site-nav--icon"></i>Safaris
									</Link>
								</li>
								<li  className="li">
									<Link  href="/islands/">
										<i  className="site-nav--icon"></i>Islands
									</Link>
								</li>
								<li  className="li">
									<Link  href="/cities/">
										<i  className="site-nav--icon"></i>Cities
									</Link>
								</li>
								<li  className="li mega-drop-down menu-item">
									<Link  href="/destinations/">
										<i  className="site-nav--icon"></i>Destinations 
									</Link>
									<ul  className="submenu">
										<li  className="submenu-item">
											<div  className="flexrow">
												<div  className="h2class submenu-title h2nav">Top Destinations</div>
											</div>
											<ul  className="submenu-top">
												<li  className="submenu-top-item">
													<Link  href="/safaris/botswana/">Botswana</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/south-africa/kruger-national-park/">Kruger National Park</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve/">Sabi Sand Reserve</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/botswana/okavango-delta/">Okavango Delta</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/zimbabwe/victoria-falls/">Victoria Falls</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/cities/cape-town/">Cape Town</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/south-africa/">South Africa</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/tanzania/serengeti-national-park/">Serengeti</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/namibia/">Namibia</Link>
												</li>
											</ul>
											<div  className="flexrow">
												<div  className="h2class submenu-title-half h2nav">Southern Africa</div>
												<div  className="h2class submenu-title-half h2nav">Indian Ocean Islands</div>
											</div>
											<ul  className="submenu-top">
												<li  className="submenu-top-item">
													<Link  href="/safaris/botswana/">Botswana</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/islands/mauritius/">Mauritius</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/south-africa/">South Africa</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/islands/mozambique/">Mozambique</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/zimbabwe/">Zimbabwe</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/islands/seychelles/">Seychelles</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/zambia/">Zambia</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/islands/maldives/">Maldives</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/namibia/">Namibia</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/islands/zanzibar/">Zanzibar</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/malawi/">Malawi</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/islands/madagascar/">Madagascar</Link>
												</li>
											</ul>
											<div  className="flexrow">
												<div  className="h2class submenu-title h2nav">East Africa</div>
											</div>
											<ul  className="submenu-top">
												<li  className="submenu-top-item">
													<Link  href="/safaris/tanzania/">Tanzania</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/kenya/">Kenya</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/rwanda/">Rwanda</Link>
												</li>
												<li  className="submenu-top-item">
													<Link  href="/safaris/uganda/">Uganda</Link>
												</li>
											</ul>
										</li>
									</ul>
								</li>
								<li  className="li listar">
									<div  className="star">
										<i  aria-hidden="true" className="fa fa-star"></i>
									</div>
								</li>
								<li  className="li">
									<Link  href="/our-story/">
										<i  className="site-nav--icon"></i>Our Story
									</Link>
								</li>
								<li  className="li">
									<Link  href="/blog/">
										<i  className="site-nav--icon"></i>Blog
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<Link  href="/contact-us/" className="round-text">
						<div  className="plan round">
							<span  className="button">Let&apos;s Plan</span>
						</div>
					</Link>

					<div  
						className="menu-toggle"
						onClick={() => setIsOpen(!isOpen)}
						>
						{/* {isOpen ? <div>X</div> : <div class="hamburger"></div>} */}
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</div>

					{isOpen && (
						<div
						onClick={() => setIsOpen(!isOpen)}
						>
							<nav
								class="site-nav site-nav--open"
							>
								<ul >
									<li  class="nav-button">
										<span  class="button topplan"
											><Link  href="/contact-us">Let&apos;s Plan</Link></span
										>
									</li>
									<li  class="li">
										<Link  href="/safaris"
											><i  class="site-nav--icon"></i>Safaris</Link
										>
									</li>
									<li  class="li">
										<Link  href="/islands"
											><i  class="site-nav--icon"></i>Islands</Link
										>
									</li>
									<li  class="li">
										<Link  href="/cities"
											><i  class="site-nav--icon"></i>Cities</Link
										>
									</li>
									<li  class="li mega-drop-down menu-item">
										<Link  href="/destinations"
											><i  class="site-nav--icon"></i>Destinations
										</Link>
									</li>
									<li  class="li">
										<Link  href="/our-story"
											><i  class="site-nav--icon"></i>Our Story</Link
										>
									</li>
									<li  class="li">
										<Link  href="/blog"
											><i  class="site-nav--icon"></i>Blog</Link
										>
									</li>
								</ul>
							</nav>						
						</div>
					)}

				</div>
			</header>
  );
}

export default MenuNav;