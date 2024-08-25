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

      {/* Hero Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center max-w-4xl mx-auto z-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            style={{
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.2', // Adjust line height for vertical space
            }}
          >
            <span>Today, business success is driven by branding.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
