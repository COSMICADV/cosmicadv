// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState, useRef } from 'react';
// import { Transition } from '@headlessui/react';

// const inActive =
//   'text-black hover:text-gray-800 p-1 transition-all rounded-md px-2 hover:px-4 relative after:content-[""] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full';
// const active =
//   'font-bold text-black p-1 px-2 relative after:content-[""] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:transition-all after:duration-300 after:ease-in-out';

// function NavigationBar() {
//   const pathName = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [language, setLanguage] = useState('EN');

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   const getLink = (anchor) => {
//     return pathName === '/' ? `#${anchor}` : `/#${anchor}`;
//   };

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === 'EN' ? 'AR' : 'EN'));
//     // Here you can also add logic to change the actual language of the site
//   };

//   return (
//     <header
//       className={`z-50 bg-white text-black p-4 sticky top-0 transition-opacity duration-300 ${
//         isScrolled ? 'opacity-75' : 'opacity-100'
//       }`}
//     >
//       <nav className="container mx-auto flex justify-between items-center">
//         <div className="text-xl font-bold">
//           <Link href="/">
//             <Image
//               src="/COSMIC.svg"
//               width={150}
//               height={100}
//               alt="Picture of the author"
//             />
//           </Link>
//         </div>

//         <div className="md:hidden flex items-center">
//           <button
//             className={`transition-transform transform ${
//               isMobileMenuOpen ? 'rotate-90' : ''
//             } text-black hover:text-gray-700 focus:outline-none`}
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className={`w-8 h-8 transition-transform duration-300 ease-in-out ${
//                 isMobileMenuOpen ? 'rotate-45' : ''
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//                 className={`transition-opacity duration-300 ease-in-out ${
//                   isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
//                 }`}
//               ></path>
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 12h16M4 18h16"
//                 className={`transition-opacity duration-300 ease-in-out ${
//                   isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
//                 }`}
//               ></path>
//             </svg>
//           </button>
//         </div>

//         <ul className="hidden md:flex space-x-7 py-2 justify-center items-center">
//           <li>
//             <Link href="/" className={pathName === '/' ? active : inActive}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href={getLink('services')}
//               className={pathName === '#services' ? active : inActive}
//             >
//               Solutions
//             </Link>
//           </li>
//           <li>
//             <Link href={getLink('contact-me')} className={inActive}>
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/about-us"
//               className={pathName === '/about-us' ? active : inActive}
//             >
//               About Us
//             </Link>
//           </li>
//         </ul>

//         <div className="hidden md:block">
//           <button
//             onClick={toggleLanguage}
//             className="relative p-2 text-black font-semibold hover:text-gray-700 transition-all duration-300"
//           >
//             {language}
//             <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
//           </button>
//         </div>

//         <Transition
//           show={isMobileMenuOpen}
//           enter="transition ease-out duration-300 transform"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="transition ease-in duration-200 transform"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           {(ref) => (
//             <ul
//               ref={ref}
//               className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 shadow-lg"
//             >
//               <li className="py-2">
//                 <Link
//                   href="/"
//                   className={`block text-center ${
//                     pathName === '/' ? active : inActive
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="py-2">
//                 <Link
//                   href={getLink('services')}
//                   className={`block text-center ${
//                     pathName === '#services' ? active : inActive
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Solutions
//                 </Link>
//               </li>
//               <li className="py-2">
//                 <Link
//                   href="/about-us"
//                   className={`block text-center ${
//                     pathName === '/about-us' ? active : inActive
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li className="py-2">
//                 <Link
//                   href={getLink('contact-me')}
//                   className={`block text-center ${
//                     pathName === '#services' ? active : inActive
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//               <li className="py-2 text-center">
//                 <button
//                   onClick={() => {
//                     toggleLanguage();
//                     toggleMobileMenu();
//                   }}
//                   className="relative p-2 text-black font-semibold hover:text-gray-700 transition-all duration-300"
//                 >
//                   {language}
//                   <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
//                 </button>
//               </li>
//             </ul>
//           )}
//         </Transition>
//       </nav>
//     </header>
//   );
// }

// export default NavigationBar;
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Transition } from '@headlessui/react';

const inActive =
  'text-black hover:text-gray-800 p-1 transition-all rounded-md px-2 hover:px-4 relative after:content-[""] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:after:w-full';
const active =
  'font-bold text-black p-1 px-2 relative after:content-[""] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-full after:bg-black after:transition-all after:duration-300 after:ease-in-out';

function NavigationBar() {
  const pathName = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const getLink = (anchor) => {
    return pathName === '/' ? `#${anchor}` : `/#${anchor}`;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'AR' : 'EN'));
    // Here you can also add logic to change the actual language of the site
  };

  return (
    <header
      className={`z-50 bg-white text-black p-4 fixed top-0 left-0 right-0 transition-opacity duration-300 ${
        isScrolled ? 'opacity-75' : 'opacity-100'
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image
              src="/COSMIClogo.svg"
              width={150}
              height={100}
              alt="COSMIC ADV"
            />
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className={`transition-transform transform ${
              isMobileMenuOpen ? 'rotate-90' : ''
            } text-black hover:text-gray-700 focus:outline-none`}
            onClick={toggleMobileMenu}
          >
            <svg
              className={`w-8 h-8 transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'rotate-45' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                className={`transition-opacity duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12h16M4 18h16"
                className={`transition-opacity duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
              ></path>
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex space-x-7 py-2 justify-center items-center">
          <li>
            <Link href="/" className={pathName === '/' ? active : inActive}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href={getLink('services')}
              className={pathName === '#services' ? active : inActive}
            >
              Solutions
            </Link>
          </li>

          <li>
            <Link
              href="#aboutus"
              className={pathName === '#aboutus' ? active : inActive}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link href={getLink('contact-me')} className={inActive}>
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="hidden md:block">
          <button
            onClick={toggleLanguage}
            className="relative p-2 text-black font-semibold hover:text-gray-700 transition-all duration-300"
          >
            {language}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
          </button>
        </div>

        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <ul
              ref={ref}
              className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 shadow-lg"
            >
              <li className="py-2">
                <Link
                  href="/"
                  className={`block text-center ${
                    pathName === '/' ? active : inActive
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="py-2">
                <Link
                  href={getLink('services')}
                  className={`block text-center ${
                    pathName === '#services' ? active : inActive
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Solutions
                </Link>
              </li>

              <li className="py-2">
                <Link
                  href="#aboutus"
                  className={`block text-center ${
                    pathName === '#aboutus' ? active : inActive
                  }`}
                  onClick={toggleMobileMenu}
                >
                  About Us
                </Link>
              </li>
              <li className="py-2">
                <Link
                  href={getLink('contact-me')}
                  className={`block text-center ${
                    pathName === '#services' ? active : inActive
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li className="py-2 text-center">
                <button
                  onClick={() => {
                    toggleLanguage();
                    toggleMobileMenu();
                  }}
                  className="relative p-2 text-black font-semibold hover:text-gray-700 transition-all duration-300"
                >
                  {language}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                </button>
              </li>
            </ul>
          )}
        </Transition>
      </nav>
    </header>
  );
}

export default NavigationBar;
