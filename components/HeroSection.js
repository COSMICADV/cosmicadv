import React from 'react';

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-white text-black overflow-hidden"
      style={{ overflowX: 'hidden' }}
    >
      {/* Hero Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-16 shadow-sm">
        {' '}
        {/* Increased padding */}
        <div className="text-center mx-auto z-10">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] font-extrabold tracking-tight mb-6"
            style={{
              fontFamily: 'Eurostile Becker Heavy, sans-serif',
              lineHeight: '1.2',
            }}
          >
            <span>
              Today, business success <br /> is driven by branding.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
