import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// Footer.js
function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row justify-between items-start w-[70%]">
          {/* Logo and Navigation Column */}
          <div className="mb-4 md:mb-0">
            <Image
              src="/COSMICADV.png"
              alt="CosmicLogo"
              width={200}
              height={100}
            />
            <div className="flex flex-col">
              {/* <h2 className="font-bold text-3xl">Contact Us</h2> */}
              <ul className="py-2">
                <li className="my-2 text-lg">123 Main St</li>
                <li className="my-2 text-lg">City, Country</li>
                <li className="my-2 text-lg">
                  <a
                    href="tel:+201000581080"
                    className="text-blue-400 hover:underline"
                  >
                    +20 1000 581 080
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@yourcompany.com"
                    className="text-blue-400 hover:underline"
                  >
                    info@cosmicadv.com
                  </a>
                </li>
              </ul>
              <div className="flex mt-4 space-x-4">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-[24px] fill-blue-300"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-[24px] fill-blue-300"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <ul className="space-y-6">
              <li className="text-xl">
                <Link href="/" className="link">
                  Home
                </Link>
              </li>
              <li className="text-xl">
                <Link href="/about-us" className="link">
                  About
                </Link>
              </li>
              <li className="text-xl">
                <Link href="/people" className="link">
                  People
                </Link>
              </li>
              <li className="text-xl">
                <Link href="/contact-us" className="link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Column */}
        </div>
        <div className="text-center mt-12">
          <p>
            &copy; {new Date().getFullYear()} COSMIC ADV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
