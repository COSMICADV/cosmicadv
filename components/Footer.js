import Link from 'next/link';

// Footer.js
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <img src="/favicon.ico" alt="Your Company Logo" className="w-18" />
          </div>
          {/* Navigation Column */}
          <div className="flex flex-col mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Navigation</h2>
            <ul className="space-y-6">
              <li className="text-xl">
                <Link
                  href="/"
                  className="text-white hover:underline transition-all"
                >
                  Home
                </Link>
              </li>
              <li className="text-xl">
                <Link href="/about-us" className="text-white hover:underline">
                  About
                </Link>
              </li>
              <li className="text-xl ">
                <Link href="/people" className="text-white hover:underline">
                  People
                </Link>
              </li>
              <li className="text-xl ">
                <Link href="/contact-us" className="text-white hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Column */}
          <div className="flex flex-col">
            <h2 className="font-bold mb-2 text-3xl">Contact</h2>
            <ul>
              <li>123 Main St</li>
              <li>City, Country</li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-blue-400 hover:underline"
                >
                  +1 (234) 567-890
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
          </div>
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
