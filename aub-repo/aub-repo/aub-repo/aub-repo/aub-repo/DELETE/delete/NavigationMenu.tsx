import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      subMenu: [
        { label: 'Consulting', href: '/services/consulting' },
        { label: 'Development', href: '/services/development' },
        { label: 'Design', href: '/services/design' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="w-full bg-[#F4F1EA] shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Link href="/" className="text-xl font-bold text-[#2C4C3B]">
              Africa Unwind
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-[#2C4C3B] hover:text-[#8B6D47] px-3 py-2 text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#8B6D47] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
                
                {item.subMenu && (
                  <div className="absolute hidden group-hover:block w-48 bg-[#F4F1EA] shadow-lg rounded-md mt-2 transform opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-[#2C4C3B] hover:bg-[#E5DED3] transition-colors duration-200"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/book"
              className="bg-[#2C4C3B] hover:bg-[#8B6D47] text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2C4C3B] hover:text-[#8B6D47] hover:bg-[#E5DED3] transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#F4F1EA]">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-[#2C4C3B] hover:text-[#8B6D47] hover:bg-[#E5DED3] transition-colors duration-200"
              >
                {item.label}
              </Link>
              {item.subMenu && (
                <div className="pl-4 space-y-1">
                  {item.subMenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-3 py-2 text-sm font-medium text-[#2C4C3B] hover:text-[#8B6D47] hover:bg-[#E5DED3] transition-colors duration-200"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <Link
              href="/book"
              className="block w-full text-center bg-[#2C4C3B] hover:bg-[#8B6D47] text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;