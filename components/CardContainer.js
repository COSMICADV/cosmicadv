import Card from './Card';

function CardContainer() {
  return (
    <div className="min-h-screen bg-red-300 flex flex-col items-center justify-center py-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          image={'/cardImages/Card_img_Identity.webp'}
          title="Brand Identity"
          description="Brand identity design, tone-of-voice and design systems that capture the essence of your company and culture."
        />
        <Card
          image={'/cardImages/Card_img_Marketing.webp'}
          title="Brand Identity"
          description="Brand identity design, tone-of-voice and design systems that capture the essence of your company and culture."
        />
        <Card
          image={'/cardImages/Card_img_Strategy.webp'}
          title="Brand Identity"
          description="Brand identity design, tone-of-voice and design systems that capture the essence of your company and culture."
        />
        <Card
          image={'/cardImages/Card_img_UX.webp'}
          title="Brand Identity"
          description="Brand identity design, tone-of-voice and design systems that capture the essence of your company and culture."
        />
      </div>
    </div>
  );
}

export default CardContainer;
