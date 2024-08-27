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
        <h1 className="text-4xl font-bold text-center mb-12">Solutions</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Card
            image={'/cardImages/Digital_Marketing.svg'}
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
          <a href="http://digitalprintegypt.com/" target="_blank">
            <Card
              image={'/cardImages/DigitalPrining.svg'}
              title="digitalprintegypt.com"
              description="WE PRINT EVERYTHING
            We say that not because we're good at printing pretty much everything, but we've gathered years
            of knowledge and can help you decide the best way to bring your work to life!
            "
              points={[
                'In&Ourdoor Printing',
                'Digital Printing',
                'MUGS, T-SHIRTS,BAGS & MORE',
              ]}
            />
          </a>
          <Card
            image={'/cardImages/CODE.svg'}
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
