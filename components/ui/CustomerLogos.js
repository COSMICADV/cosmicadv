'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Aos from 'aos';
import 'aos/dist/aos.css';

const CustomerLogos = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  }, []);

  const logosByIndustry = {
    All: [
      '/customerLogos/logo1.svg',
      '/customerLogos/Costa.svg',
      '/customerLogos/glaxo.svg',
      '/customerLogos/KC.svg',
      '/customerLogos/InterContinental.svg',
      '/customerLogos/Loreal.svg',
      '/customerLogos/Virgin.svg',
      '/customerLogos/BlomBank.svg',
      '/customerLogos/MasterFood.svg',
      '/customerLogos/RAYA.svg',
      '/customerLogos/BIODREMA.svg',
      '/customerLogos/CocaCola.svg',
      '/customerLogos/HilipMorris.svg',
      '/customerLogos/NUXE.svg',
      '/customerLogos/Columbus.svg',
    ],
    'Food & Beverage': [
      '/customerLogos/MasterFood.svg',
      '/customerLogos/TGI.svg',
      '/customerLogos/KC.svg',
      '/customerLogos/CocaCola.svg',
      '/customerLogos/Columbus.svg',
    ],
    'Banking & Finance': ['/customerLogos/BlomBank.svg'],
    'Retail & Consumer Goods': [
      '/customerLogos/Costa.svg',
      '/customerLogos/Loreal.svg',
      '/customerLogos/Virgin.svg',
      '/customerLogos/BIODREMA.svg',
    ],
    'Healthcare & Pharmaceuticals': [
      '/customerLogos/glaxo.svg',
      '/customerLogos/BIODREMA.svg',
    ],
    Hospitality: ['/customerLogos/InterContinental.svg'],
    'Technology & Communications': ['/customerLogos/RAYA.svg'],
  };

  const [selectedIndustry, setSelectedIndustry] = useState('All');

  return (
    <section className="py-14س bg-white w-full flex flex-col items-center">
      <div className="container mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12"
          data-aos="fade-up"
        >
          Our Areas of Expertise
        </h2>

        {/* Industry Dropdown */}
        <div className="mb-8">
          <select
            className="p-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {Object.keys(logosByIndustry).map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Grid for Logos */}
        <div className="grid grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
          {logosByIndustry[selectedIndustry].map((logo, index) => {
            const row = Math.floor(index / 4);
            const animation = row % 2 === 0 ? 'fade-right' : 'fade-left';
            return (
              <div
                key={index}
                className="flex justify-center items-center transition-transform transform hover:scale-105"
                data-aos={animation}
              >
                <Image
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-contain h-24 w-auto"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;
