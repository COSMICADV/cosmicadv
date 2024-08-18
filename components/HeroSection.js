import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function HeroSection() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-6xl font-extrabold tracking-tight text-nowrap">
            Empower Your Brand
          </h1>
          <p className="mb-5 text-xl font-light">
            Transform your business with cutting-edge advertising solutions.
            Take your brand to new heights.
          </p>
          <Link
            href={'/contact-us'}
            className="btn btn-primary btn-lg font-semibold"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
