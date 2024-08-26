import React from 'react';

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black text-white overflow-hidden"
      style={{ overflowX: 'hidden' }} // Ensure no overflow on X-axis
    >
      {/* Hero Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center mx-auto z-10 ">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
            style={{
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.2', // Adjust line height for vertical space
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
