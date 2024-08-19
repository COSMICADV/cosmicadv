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
    ],
    'Food & Beverage': [
      '/customerLogos/MasterFood.svg',
      '/customerLogos/TGI.svg',
      '/customerLogos/KC.svg',
      '/customerLogos/CocaCola.svg',
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
    // Add more categories as needed
  };

  const [selectedIndustry, setSelectedIndustry] = useState('All');

  return (
    <section className="py-16 bg-white min-w-[80%]">
      <div className="container mx-auto text-center">
        <h2 className="text-[75px] font-bold mb-12" data-aos="fade-up">
          Our areas of expertise
        </h2>

        {/* Industry Dropdown */}
        <div className="mb-8">
          <select
            className="p-2 border border-gray-300 rounded"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {logosByIndustry[selectedIndustry].map((logo, index) => {
            // Determine the animation direction based on the row number
            const row = Math.floor(index / 4);
            const animation = row % 2 === 0 ? 'fade-right' : 'fade-left';
            return (
              <div
                key={index}
                className="flex justify-center items-center transition-transform transform hover:scale-110"
                data-aos={animation}
                // data-aos-delay={`${index * 100}`}
              >
                <Image
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-contain h-24"
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
