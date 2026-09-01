import AiCreativity from '@/components/AiCreativity';
import AiWorkGrid from '@/components/AiWorkGrid';

export const metadata = {
  title: 'AI Creativity | COSMIC ADV Solutions',
  description:
    'Generative AI film, video and motion work from COSMIC ADV — ideas turned into visuals without a location scout, a crew call or a six-week turnaround.',
};

export default function AICreativityPage() {
  return (
    <main>
      <AiCreativity workHref="#work" ctaLabel="See the work" ctaArrow="↓" />
      <AiWorkGrid contactHref="/#contact-me" solutionsHref="/#solutions" />
    </main>
  );
}
