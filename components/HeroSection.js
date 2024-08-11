import React from 'react';

function HeroSection() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500 transform -rotate-45 origin-top-left -translate-x-[100px] -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500 transform rotate-45 origin-bottom-right translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gray-200"></div>
      </div>
      <section className="relative z-10 w-3/5 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl mb-6 font-bold gap-3 space-y-2">
          Today, business success is driven by beliefs.
        </h1>
        <p className="font-semibold">
          Beliefs dictate how brands connect with people and why people connect
          with brands. When the experiences for your customers and employees
          connect with your organization’s true meaning and purpose, the result
          is a brand people believe in and measurable business growth.
        </p>
      </section>
    </div>
  );
}

export default HeroSection;
