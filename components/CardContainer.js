'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Card from './ui/Card';

function CardContainer() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <section className="py-36 px-4 bg-gray-100 min-h-screen" id="services">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Card
            image={'/cardImages/Digital_Marketing.webp'}
            title="Digital Marketing"
            description="Elevate your brand with impactful, accessible messages that drive audience engagement and encourage meaningful action."
            points={[
              'Increase brand visibility.',
              'Drive customer engagement.',
              'Improve conversion rates.',
            ]}
          />
          <Card
            image={'/cardImages/CreativeDesign.webp'}
            title="Brand Identity"
            description="Brand identity design, tone-of-voice, and design systems that capture the essence of your company and culture."
            points={[
              "Define your brand's unique voice.",
              'Establish consistent branding.',
              'Create a memorable identity.',
            ]}
          />
          <Card
            image={'/cardImages/Branding.webp'}
            title="Digital Experience Design"
            description="Tailored digital experiences to meet your audience’s needs. From websites to apps, we enhance and distinguish your offering with empathy and thorough research."
            points={[
              'User-centered design approach.',
              'Seamless user experience.',
              'Responsive and adaptive designs.',
            ]}
          />
          <Card
            image={'/cardImages/CODE.webp'}
            title="Software Development Services"
            description="Custom software solutions to drive your business forward. We deliver scalable, secure, and efficient applications and integrations tailored to your unique needs."
            points={[
              'Custom software development.',
              'Scalable and secure systems.',
              'Seamless integrations and automation.',
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default CardContainer;
