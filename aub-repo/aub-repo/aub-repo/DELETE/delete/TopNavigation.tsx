import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import "../app/globals.css";

const TopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect is running");
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
      ? 'bg-white shadow-lg text-gray-800 border-b border-gray-200' 
      : 'bg-black bg-opacity-30 text-white'}
    }`}>
    

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-light text-2xl tracking-wider font-cursive capitalize">
            Africa Unwind
          </Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider">
            <Link href="/safaris" className="nav-link hover:text-gray-300 transition-colors duration-200">
              Safaris
            </Link>

            {/* Apply same changes to other menu items */}

            <Link href="/safaris" className="nav-link hover:text-gray-300 transition-colors duration-200">
              Islands
            </Link>
            <Link href="/safaris" className="nav-link hover:text-gray-300 transition-colors duration-200">
              Cities
            </Link>
            
            {/* Destinations Dropdown */}
            <div className="relative group"
                 onMouseEnter={() => setDestinationsOpen(true)}
                 onMouseLeave={() => setDestinationsOpen(false)}>
              <button className="nav-link hover:text-gray-300 transition-colors duration-200 uppercase">
                Destinations
              </button>
              
              {/* Mega Menu Dropdown */}
              {destinationsOpen && (
                <div className="absolute left-0 mt-0 w-[600px] bg-white text-gray-800 shadow-lg rounded-none p-6 grid grid-cols-2 gap-8 -translate-x-1/3">

                  {/* Section 1: Top Destinations */}
                  <div className="col-span-2">
                    <h3 className="font-bold text-lg mb-2 border-b pb-2 font-cursive capitalize">Top Destinations</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Link href="/safaris/botswana" className="block hover:text-gray-600 py-1">Botswana</Link>
                        <Link href="/safaris/south-africa/kruger-national-park/sabi-sand-private-game-reserve" className="block hover:text-gray-600 py-1">Sabi Sand Reserve</Link>
                        <Link href="/safaris/zimbabwe/victoria-falls" className="block hover:text-gray-600 py-1">Victoria Falls</Link>
                        <Link href="/safaris/south-africa" className="block hover:text-gray-600 py-1">South Africa</Link>
                        <Link href="/safaris/namibia" className="block hover:text-gray-600 py-1">Namibia</Link>
                      </div>
                      <div>
                        <Link href="/safaris/south-africa/kruger-national-park" className="block hover:text-gray-600 py-1">Kruger National Park</Link>
                        <Link href="/safaris/botswana/okavango-delta" className="block hover:text-gray-600 py-1">Okavango Delta</Link>
                        <Link href="/cities/cape-town" className="block hover:text-gray-600 py-1">Cape Town</Link>
                        <Link href="/safaris/tanzania/serengeti-national-park" className="block hover:text-gray-600 py-1">Serengeti</Link>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Southern Africa & Indian Ocean Islands */}
                  <div>
                    <h3 className="font-bold text-lg mb-2 border-b pb-2 font-cursive capitalize">Southern Africa</h3>
                    <div className="space-y-2">
                      <Link href="/safaris/botswana" className="block hover:text-gray-600">Botswana</Link>
                      <Link href="/safaris/south-africa" className="block hover:text-gray-600">South Africa</Link>
                      <Link href="/safaris/zimbabwe" className="block hover:text-gray-600">Zimbabwe</Link>
                      <Link href="/safaris/zambia" className="block hover:text-gray-600">Zambia</Link>
                      <Link href="/safaris/namibia" className="block hover:text-gray-600">Namibia</Link>
                      <Link href="/safaris/malawi" className="block hover:text-gray-600">Malawi</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 border-b pb-2 font-cursive capitalize">Indian Ocean Islands</h3>
                    <div className="space-y-2">
                      <Link href="/islands/mauritius" className="block hover:text-gray-600">Mauritius</Link>
                      <Link href="/islands/mozambique" className="block hover:text-gray-600">Mozambique</Link>
                      <Link href="/islands/seychelles" className="block hover:text-gray-600">Seychelles</Link>
                      <Link href="/islands/maldives" className="block hover:text-gray-600">Maldives</Link>
                      <Link href="/islands/zanzibar" className="block hover:text-gray-600">Zanzibar</Link>
                      <Link href="/islands/madagascar" className="block hover:text-gray-600">Madagascar</Link>
                    </div>
                  </div>

                  {/* Section 3: East Africa */}
                  <div className="col-span-2">
                    <h3 className="font-bold text-lg mb-2 border-b pb-2 font-cursive capitalize">East Africa</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Link href="/safaris/tanzania" className="block hover:text-gray-600">Tanzania</Link>
                        <Link href="/safaris/rwanda" className="block hover:text-gray-600">Rwanda</Link>
                      </div>
                      <div>
                        <Link href="/safaris/kenya" className="block hover:text-gray-600">Kenya</Link>
                        <Link href="/safaris/uganda" className="block hover:text-gray-600">Uganda</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/safaris" className="nav-link hover:text-gray-300 transition-colors duration-200">
              Our Story
            </Link>
            <Link href="/safaris" className="nav-link hover:text-gray-300 transition-colors duration-200">
              Blog
            </Link>
          </div>

          {/* CTA Button */}
          <Link 
            href="/contact-us" 
            className="hidden md:flex items-center justify-center px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm tracking-wider"
          >
            Let&apos;s plan
          </Link>


          {/* Mobile menu button */}
          <button 
            className="md:hidden text-current"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/safaris" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Safaris
              </Link>
              <Link href="/islands" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Islands
              </Link>
              <Link href="/cities" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Cities
              </Link>
              <Link href="/destinations" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Destinations
              </Link>
              <Link href="/our-story" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Our Story
              </Link>
              <Link href="/blog" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Blog
              </Link>
              <Link href="/contact-us" className="block px-3 py-2 rounded-md bg-blue-600 text-white">
                Let&apos;s plan
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
