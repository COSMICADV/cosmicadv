'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const activePage =
  'text-gray-300 hover:text-gray-200 hover:bg-gray-800 p-1 transition-all rounded-md px-2 hover:px-4';
const inActivePage = 'text-white';

function NavigationBar() {
  const pathName = usePathname();

  return (
    <header className="bg-black text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold items-center justify-center content-center">
          <Link href="/">COSMICADV</Link>
        </div>
        <ul className="flex space-x-7 py-2">
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
                'text-black bg-white font-bold  p-3 transition-all rounded-md px-2 hover:bg-opacity-85'
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
