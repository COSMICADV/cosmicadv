'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavigationBar() {
  const pathName = usePathname();

  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">
          <Link href="/">COSMICADV</Link>
        </div>
        <ul className="flex space-x-7">
          <li>
            <Link
              href="/"
              className={
                pathName === '/'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-gray-200 transition-all'
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className={
                pathName === '/about-us'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-gray-200 transition-all'
              }
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={
                pathName === '/projects'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-gray-200 transition-all'
              }
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/people"
              className={
                pathName === '/people'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-gray-200 transition-all'
              }
            >
              People
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className={
                pathName === '/contact-us'
                  ? 'text-white'
                  : 'text-gray-300 hover:text-gray-200 transition-all'
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
