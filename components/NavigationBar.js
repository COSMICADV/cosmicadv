'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const inActive =
  'text-black  hover:text-gray-200 hover:bg-black p-1 transition-all rounded-md px-2 hover:px-4';
const active = 'font-bold text-gray-200 px-6 bg-black p-1 rounded-md';

function NavigationBar() {
  const pathName = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

          <li>
            <Link
              href="/our-solutions"
              className={pathName === '/our-solutions' ? active : inActive}
            >
              Solutions
            </Link>
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
