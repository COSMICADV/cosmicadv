'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const activePage =
  'text-gray-300 hover:text-gray-200 hover:bg-gray-800 p-1 transition-all rounded-md px-2 hover:px-4';
const inActivePage = 'text-black px-6 bg-gray-800 text-gray-200 p-1 rounded-md';

function NavigationBar() {
  const pathName = usePathname();

  return (
    <header className="bg-white text-black p-4">
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
            <Link
              href="/"
              className={pathName === '/' ? inActivePage : activePage}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className={pathName === '/about-us' ? inActivePage : activePage}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={pathName === '/projects' ? inActivePage : activePage}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/people"
              className={pathName === '/people' ? inActivePage : activePage}
            >
              People
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
