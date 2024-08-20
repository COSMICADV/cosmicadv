'use client';
import Image from 'next/image';

const solutions = [
  {
    title: 'Digital Marketing',
    description:
      'Elevate your brand with impactful digital marketing for meaningful engagement',
    logo: '/logos/digital-marketing-logo.png',
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
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-50 via-green-50 to-yellow-50">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-bold text-center my-12 text-gray-800 pt-4">
        Our Solutions
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center w-full">
              {/* Logo Column */}
              <div className="w-32 h-32 flex justify-center mb-4">
                <Image
                  src={solution.logo}
                  alt={`${solution.title} Logo`}
                  className="w-24 h-24 object-contain"
                  width={100}
                  height={100}
                />
              </div>

              {/* Text and Details Column */}
              <div className="w-full text-center p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {solution.title}
                </h2>
                <p className="text-base text-gray-700 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2 text-gray-600">
                  {solution.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center space-x-2 text-base"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Solutions;
