// components/Footer.js
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Explore */}
          <div>
            <h3 className="text-white text-2xl font-cursive mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/safaris" className="hover:text-white">
                  Safaris
                </Link>
              </li>
              <li>
                <Link href="/islands" className="hover:text-white">
                  Islands
                </Link>
              </li>
              <li>
                <Link href="/cities" className="hover:text-white">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/top-destinations" className="hover:text-white">
                  Top Destinations
                </Link>
              </li>
              <li>
                <Link href="/all-destinations" className="hover:text-white">
                  All Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Experience */}
          <div>
            <h3 className="text-white text-2xl font-cursive mb-6">Experience</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/bucket-list" className="hover:text-white">
                  The Bucket List
                </Link>
              </li>
              <li>
                <Link href="/honeymoons" className="hover:text-white">
                  Honeymoons
                </Link>
              </li>
              <li>
                <Link href="/family-travel" className="hover:text-white">
                  Family Travel
                </Link>
              </li>
              <li>
                <Link href="/favorite-trips" className="hover:text-white">
                  Our Favourite Trips
                </Link>
              </li>
              <li>
                <Link href="/what-to-expect" className="hover:text-white">
                  What To Expect
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white text-2xl font-cursive mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>Africa Unwind</li>
              <li>
                <a href="tel:+27213001579" className="hover:text-white">
                  +27 21 300 1579
                </a>
              </li>
              <li>
                <a href="mailto:info@africaunwind.com" className="hover:text-white">
                  info@africaunwind.com
                </a>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/lets-plan" className="hover:text-white">
                  Let’s Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SATSA Logo and Social Media Icons */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          {/* SATSA Logo (Placeholder - Replace with actual image) */}
          <div>
            <Image
              src="/satsa.png" // Replace with your SATSA logo path
              alt="SATSA Logo"
              width={80}
              height={40}
              className="opacity-50"
            />
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.975.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0 3.204.012 3.584.07 4.85.062 1.366.326 2.633 1.301 3.608.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0-3.204zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.297 0-4.162-1.865-4.162-4.162s1.865-4.162 4.162-4.162 4.162 1.865 4.162 4.162-1.865 4.162-4.162 4.162zm6.406-10.657c0 .796-.645 1.441-1.441 1.441s-1.441-.645-1.441-1.441.645-1.441 1.441-1.441 1.441.645 1.441 1.441z" />
              </svg>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.272-2.224.106.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 6.016 4.432 11.007 10.207 11.879v-8.382h-3.07v-3.497h3.07v-2.668c0-3.026 1.799-4.69 4.533-4.69 1.314 0 2.688.235 2.688.235v2.954h-1.514c-1.49 0-1.955.925-1.955 1.875v2.294h3.328l-.532 3.497h-2.796v8.382C19.568 23.007 24 18.016 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>Africa Unwind © 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;