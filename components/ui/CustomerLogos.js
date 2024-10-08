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
      '/customerLogos/PizzaHut.svg',
      '/customerLogos/HilipMorris.svg',
      '/customerLogos/NUXE.svg',
      '/customerLogos/Columbus.svg',
      '/customerLogos/KFC.svg',
      '/customerLogos/Dominos.svg',
      '/customerLogos/Beyti.svg',
      '/customerLogos/Pickl.svg',
    ],
    'Food & Beverage': [
      '/customerLogos/MasterFood.svg',
      '/customerLogos/TGI.svg',
      '/customerLogos/KFC.svg',
      '/customerLogos/PizzaHut.svg',
      '/customerLogos/KC.svg',
      '/customerLogos/CocaCola.svg',
      '/customerLogos/Columbus.svg',
      '/customerLogos/Dominos.svg',
      '/customerLogos/Pickl.svg',
      '/customerLogos/Beyti.svg',
      '/customerLogos/Costa.svg',
    ],
    'Banking & Finance': ['/customerLogos/BlomBank.svg'],
    'Retail & Consumer Goods': [
      '/customerLogos/Virgin.svg',
      '/customerLogos/RAYA.svg',
    ],
    'Healthcare & Pharmaceuticals': [
      '/customerLogos/glaxo.svg',
      '/customerLogos/BIODREMA.svg',
      '/customerLogos/NUXE.svg',
      '/customerLogos/Loreal.svg',
    ],
    Hospitality: ['/customerLogos/InterContinental.svg'],
    'Technology & Communications': ['/customerLogos/RAYA.svg'],
  };

  const [selectedIndustry, setSelectedIndustry] = useState('All');

  return (
    <section className="py-44 bg-white w-full flex flex-col items-center mt-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center text-gray-800">
          Our Areas of Expertise
        </h1>

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
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
