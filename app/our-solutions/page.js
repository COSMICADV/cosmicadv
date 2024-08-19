'use client';
import { useState } from 'react';

const solutions = [
  {
    title: 'Digital Marketing',
    description:
      'Elevate your brand with impactful digital marketing for meaningful engagement',
    logo: '/logos/digital-marketing-logo.png', // Replace with actual logo paths
    details: [
      'Digital marketing strategy',
      'Content marketing for social channels and websites',
      'Online campaigns and landing pages',
      'SEO',
      'Social media strategy',
    ],
  },
  {
    title: 'Digital Experience Design',
    description:
      'Designing digital experiences that align with your audience’s exact needs',
    logo: '/logos/digital-experience-design-logo.png',
    details: [
      'Digital transformation and consultancy',
      'UX design',
      'UI design',
    ],
  },
  {
    title: 'Brand Identity',
    description:
      'Crafting your unique brand identity, so you can focus elsewhere.',
    logo: '/logos/brand-identity-logo.png',
    details: ['Logo design', 'Brand strategy', 'Visual identity development'],
  },
];

function Solutions() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen px-36">
      <h1 className="text-[75px] font-bold text-center my-12">Our Solutions</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 bg-gray-50 rounded-lg "
          >
            <div className="flex flex-col sm:flex-row items-center">
              {/* Logo Column */}
              <div className="w-full sm:w-1/3 flex justify-center">
                <img
                  src={solution.logo}
                  alt={`${solution.title} Logo`}
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* Text and Button Column */}
              <div className="w-full sm:w-2/3 text-center sm:text-left p-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {solution.title}
                </h2>
                <p className="text-gray-700 text-lg">{solution.description}</p>
                <button
                  onClick={() => handleToggle(index)}
                  className="mt-4  text-black font-bold px-4 py-2 rounded-md  transition-all"
                >
                  {expandedIndex === index ? 'Services' : 'Services'}
                </button>
                {expandedIndex === index && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {solution.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="list-disc pl-5">
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Solutions;
