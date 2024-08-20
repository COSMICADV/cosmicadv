import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center max-w-4xl mx-auto z-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="text-red-600">Elevate</span> Your Brand
          </h1>
          <p
            className="text-base md:text-lg lg:text-xl font-light mb-8"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Unleash the full potential of your business with our innovative
            solutions. Let us help you create a brand that stands out.
          </p>
          <Link
            href="#services"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all inline-block"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Explore Our Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
