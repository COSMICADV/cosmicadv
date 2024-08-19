'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

const inActive =
  'text-black hover:text-gray-200 hover:bg-black p-1 transition-all rounded-md px-2 hover:px-4';
const active = 'font-bold text-gray-200 px-6 bg-black p-1 rounded-md';

function NavigationBar() {
  const pathName = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header
      className={`z-50 bg-white text-black p-4 sticky top-0 transition-opacity duration-300 ${
        isScrolled ? 'opacity-75' : 'opacity-100'
      }`}
    >
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold items-center justify-center content-center">
          <Link href="/">
            <Image
              src="/COSMIC.svg"
              width={150}
              height={100}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <ul className="flex space-x-7 py-2 justify-center items-center content-center">
          <li>
            <Link href="/" className={pathName === '/' ? active : inActive}>
              Home
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={handleDropdownToggle}
              className={`${
                pathName === '/our-solutions' ? active : inActive
              } flex items-center`}
            >
              Solutions
            </button>
            {isDropdownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute p-4 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
              >
                <li>
                  <Link
                    href="/our-solutions/brand-identity"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Brand Identity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-solutions/digital-marketing"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-solutions/digital-experience-design"
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Digital Experience Design
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/about-us"
              className={pathName === '/about-us' ? active : inActive}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/messages"
              className={pathName === '/messages' ? active : inActive}
            >
              Messages
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className={
                'bg-black text-white font-white font-bold  p-3 transition-all rounded-md px-2 hover:bg-opacity-85'
              }
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
