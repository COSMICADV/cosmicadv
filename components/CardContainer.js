import Card from './ui/Card';

function CardContainer() {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-6 lg:gap-8 flex-wrap justify-center">
        <Card
          image={'/cardImages/Card_img_Identity.webp'}
          title="Digital Marketing"
          description="Elevate your brand with impactful, accessible messages that drive audience engagement and encourage meaningful action."
        />
        <Card
          image={'/cardImages/Card_img_Marketing.webp'}
          title="Brand Identity"
          description="We build your unique brand identity, making it instantly recognizable so you can focus on other priorities. Our experts ensure your brand stands out with a distinctive flavor, energy, and imprint."
        />
        <Card
          image={'/cardImages/Card_img_Strategy.webp'}
          title="Brand Identity"
          description="Brand identity design, tone-of-voice and design systems that capture the essence of your company and culture."
        />
        <Card
          image={'/cardImages/Card_img_UX.webp'}
          title="Digital Experience Design"
          description="We tailor digital experiences to meet your audience’s specific needs. From websites to apps, our UX design experts conduct thorough research and competitor analysis to enhance and distinguish your offering. We use empathy and collaboration to understand preferences and drive your business goals."
        />
      </div>
    </div>
  );
}

export default CardContainer;
