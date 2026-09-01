/**
 * COSMiC — /ai-creativity
 *
 * App Router:   app/ai-creativity/page.jsx      (this file, as-is)
 * Pages Router: pages/ai-creativity.jsx         (delete the `metadata` export
 *                                                and use next/head instead)
 *
 * Structure:
 *   1. AiCreativity  — the scroll-scrubbed COSMiC film, the page hero
 *   2. AiWorkGrid    — the six films, two rows of three
 */

import AiCreativity from '@/components/AiCreativity';
import AiWorkGrid from '@/components/AiWorkGrid';

export const metadata = {
  title: 'AI Creativity — COSMiC',
  description:
    'Generative AI campaign films, social reels and brand work by COSMiC. Ideas first — the camera was optional.',
};

export default function AiCreativityPage() {
  return (
    <main>
      {/* NOTE: v1 called this prop `href`. It is `workHref` now. */}
      <AiCreativity workHref="#work" ctaLabel="See the work" ctaArrow="↓" />
      <AiWorkGrid contactHref="/#contact-me" solutionsHref="/#solutions" />
    </main>
  );
}
