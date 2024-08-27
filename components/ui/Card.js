'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

function Card({ image, title, description, points }) {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <div
      className="w-full max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
      data-aos="fade-up"
      style={{ height: '650px' }}
    >
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
            {title}
          </h2>
          <p className="text-gray-600 mb-4 text-center">{description}</p>
        </div>
        <div className="overflow-hidden flex-grow">
          <div className="collapse collapse-arrow">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-lg font-medium text-center py-4">
              {' '}
              Learn More
            </div>
            <div
              className="collapse-content overflow-auto py-2"
              style={{ maxHeight: '200px' }}
            >
              <ul className="list-disc list-inside pb-2">
                {points.map((point, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
