// 'use client';
// import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Card from './ui/Card';

// function CardContainer() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, easing: 'ease-in-out' });
//   }, []);

//   return (
//     <section className="py-36 px-4 bg-gray-100 min-h-screen" id="services">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-12">Solutions</h1>
//         <div className="flex flex-wrap justify-center gap-8">
//           <Card
//             image={'/cardImages/DigitalMarketing.svg'}
//             title="Digital Marketing"
//             description="Elevate your brand with impactful, accessible messages that drive audience engagement and encourage meaningful action."
//             points={[
//               'Increase brand visibility.',
//               'Drive customer engagement.',
//               'Improve conversion rates.',
//             ]}
//           />
//           <Card
//             image={'/cardImages/CreativeDesign.webp'}
//             title="Brand Identity"
//             description="Brand identity design, tone-of-voice, and design systems that capture the essence of your company and culture."
//             points={[
//               "Define your brand's unique voice.",
//               'Establish consistent branding.',
//               'Create a memorable identity.',
//             ]}
//           />
//           <Card
//             image={'/cardImages/CODE.svg'}
//             title="Software Development Services"
//             description="Custom software solutions to drive your business forward. We deliver scalable, secure, and efficient applications and integrations tailored to your unique needs."
//             points={[
//               'Custom software development.',
//               'Scalable and secure systems.',
//               'Seamless integrations and automation.',
//             ]}
//           />
//           <a href="http://digitalprintegypt.com/" target="_blank">
//             <Card
//               image={'/cardImages/DigitalPrining.svg'}
//               title="Digital Print"
//               description="we print large or very small high quality low cost with a quick reliable ‭& ‬honest service‭."
//               points={[
//                 'In&Ourdoor Printing',
//                 'Digital Printing',
//                 'MUGS, T-SHIRTS,BAGS & MORE',
//               ]}
//             />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CardContainer;
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
    <section className="py-24 px-4 bg-gray-100 min-h-screen" id="services">
      <div className="container mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center text-gray-800">
          Solutions
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Card
            image={'/cardImages/DigitalMarketing2.svg'}
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
            image={'/cardImages/CODE.svg'}
            title="CODES"
            description="Custom software solutions to drive your business forward. We deliver scalable, secure, and efficient applications and integrations tailored to your unique needs."
            points={[
              'Custom software development.',
              'Scalable and secure systems.',
              'Seamless integrations and automation.',
            ]}
          />
          <Card
            image={'/cardImages/DigitalPrining2.svg'}
            title="Digital Print"
            description="We print large or very small high quality low cost with a quick reliable ‭& ‬honest service‭."
            points={[
              'In&Ourdoor Printing',
              'Digital Printing',
              'MUGS, T-SHIRTS, BAGS & MORE',
            ]}
            href="http://digitalprintegypt.com/"
          />
        </div>
      </div>
    </section>
  );
}

export default CardContainer;
