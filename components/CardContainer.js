import Card from './ui/Card';

function CardContainer() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Our Services</h1>
        <div className="flex flex-wrap justify-center gap-8">
          <Card
            image={'/cardImages/Card_img_Identity.webp'}
            title="Digital Marketing"
            description="Elevate your brand with impactful, accessible messages that drive audience engagement and encourage meaningful action."
          />
          <Card
            image={'/cardImages/Card_img_Strategy.webp'}
            title="Brand Identity"
            description="Brand identity design, tone-of-voice, and design systems that capture the essence of your company and culture."
          />
          <Card
            image={'/cardImages/Card_img_UX.webp'}
            title="Digital Experience Design"
            description="Tailored digital experiences to meet your audience’s needs. From websites to apps, we enhance and distinguish your offering with empathy and thorough research."
          />
        </div>
      </div>
    </section>
  );
}

export default CardContainer;
