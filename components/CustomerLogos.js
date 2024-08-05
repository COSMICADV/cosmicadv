'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Aos from 'aos';
import 'aos/dist/aos.css';

const CustomerLogos = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  }, []);

  const logos = [
    '/customerLogos/logo1.svg',
    '/customerLogos/logo2.svg',
    '/customerLogos/logo3.svg',
    '/customerLogos/logo4.svg',
    '/customerLogos/logo5.svg',
    '/customerLogos/logo6.svg',
    '/customerLogos/logo7.svg',
    '/customerLogos/logo8.svg',
    '/customerLogos/logo9.svg',
    '/customerLogos/logo10.svg',
    '/customerLogos/logo11.svg',
    '/customerLogos/logo12.svg',
  ];

  return (
    <section className="py-16 bg-gray-100 min-w-[80%]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8" data-aos="fade-up">
          Our areas of expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {logos.map((logo, index) => {
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
                  width={100}
                  height={100}
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
