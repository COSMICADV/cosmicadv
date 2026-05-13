'use client';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Khaled',
    role: 'Mentor',
    image:
      'https://i.postimg.cc/5yChnrvz/Khaled-Mentor-jpg.jpg',
  },
  {
    name: 'Shams',
    role: 'Accounting',
    image:
      'https://i.postimg.cc/D0F4594T/black.jpg',
  },
  {
    name: 'Shaaban',
    role: 'Code',
    image: 'https://i.postimg.cc/wMmC0rJt/Ahmad-Code-jpg.jpg',
  },
  {
    name: 'Fares',
    role: 'Design',
    image:
      'https://i.postimg.cc/d3yb4fdy/Fares-Design-jpg.jpg',
  },
  {
    name: 'Kadrey',
    role: 'Design',
    image:
    'https://i.postimg.cc/x8zwtZHL/Ahmad-Design-jpg.jpg',
  },
  {
    name: 'Magdey',
    role: 'Logistics',
    image:
      'https://i.postimg.cc/HnyqBN5X/Ahmad-logistics-jpg.jpg',
  },
  {
    name: 'Ziad',
    role: 'Design',
    image:
      'https://i.postimg.cc/7h2FmR77/Zyad-Digital-jpg.jpg',
  },
  {
    name: 'Salma',
    role: 'Marketing',
    image:
      'https://i.postimg.cc/D0F4594T/black.jpg',
  },
];

function TeamSection() {
  return (
    <section className="bg-slate-50 py-16 px-6" id="team">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-900 font-semibold mb-3">
            Our Team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Meet the people behind COSMiC
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Eight talented specialists working together to deliver exceptional creative, digital
            and production services for every client.
          </p>
        </div>

        <div className="grid gap-x-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-none  transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[2/3] bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-none grayscale"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZTI4ZjA0Ii8+PC9zdmc+"
                />
              </div>
              <div className="p-2 py-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mt-1 text-sm text-slate-500 font-normal">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
