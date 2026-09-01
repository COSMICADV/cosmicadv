/**
 * COSMiC — design tokens.
 * Injected once, ahead of every component stylesheet, so cxai and cxwk
 * share one monochrome scale. Import it from any COSMiC section.
 */
export const COSMIC_TOKENS = `/* ================================================================
   COSMiC — design tokens
   One monochrome scale. Every value below is referenced by name in
   cxai (hero) and cxwk (work). Nothing in those files hardcodes a
   colour, a size or an easing.
   ================================================================ */
:root{
  /* --- ink on paper ------------------------------------------- */
  --cx-ink:        #0a0a0a;   /* headings                 19.8:1 */
  --cx-ink-80:     #383838;   /* strong body              10.1:1 */
  --cx-ink-65:     #5a5a5a;   /* body                      7.0:1 */
  --cx-ink-45:     #767676;   /* meta / index — AA floor   4.6:1 */
  --cx-ink-25:     #b4b4b4;   /* decorative only, never text     */
  --cx-paper:      #ffffff;
  --cx-paper-sunk: #f4f4f4;
  --cx-line:       #e4e4e4;
  --cx-line-mid:   #c9c9c9;

  /* --- paper on ink (inverse surfaces) ------------------------ */
  --cx-void:       #000000;
  --cx-lux:        #ffffff;
  --cx-lux-72:     rgba(255,255,255,.72);
  --cx-lux-50:     rgba(255,255,255,.50);
  --cx-lux-30:     rgba(255,255,255,.30);
  --cx-lux-line:   rgba(255,255,255,.18);
  --cx-scrim:      rgba(0,0,0,.55);

  /* --- type --------------------------------------------------- */
  --cx-font: Eurostile,"Eurostile Becker Heavy",system-ui,-apple-system,"Segoe UI",sans-serif;
  --cx-w-reg:400; --cx-w-med:500; --cx-w-bold:700; --cx-w-heavy:900;

  --cx-t-micro: 10px;
  --cx-t-meta:  11px;
  --cx-t-body:  clamp(14px, .35vw + 13px, 16px);
  --cx-t-lead:  clamp(16px, .55vw + 14px, 19px);
  --cx-t-title: clamp(22px, 1.5vw + 14px, 38px);
  --cx-t-lede:  clamp(30px, 3.2vw + 9px,  62px);
  --cx-t-mega:  clamp(76px, 11vw, 168px);

  --cx-lh-tight:1.06; --cx-lh-head:1.14; --cx-lh-body:1.72;
  --cx-tr-mega:-.035em; --cx-tr-tight:-.015em;
  --cx-tr-wide:.2em; --cx-tr-wider:.28em; --cx-tr-widest:.42em;

  /* --- space (8pt) -------------------------------------------- */
  --cx-1:4px;  --cx-2:8px;  --cx-3:12px; --cx-4:16px; --cx-5:24px;
  --cx-6:32px; --cx-7:48px; --cx-8:64px; --cx-9:96px; --cx-10:128px;
  --cx-gutter: clamp(20px, 5vw, 64px);
  --cx-max: 1240px;
  --cx-tap: 44px;              /* minimum interactive target      */

  /* --- motion ------------------------------------------------- */
  --cx-out:   cubic-bezier(.16,1,.3,1);
  --cx-inout: cubic-bezier(.65,0,.35,1);
  --cx-fast:  180ms;
  --cx-mid:   340ms;
  --cx-slow:  620ms;
  --cx-cine:  900ms;
}
`;

export function injectTokens() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cosmic-tokens')) return;
  const s = document.createElement('style');
  s.id = 'cosmic-tokens';
  s.textContent = COSMIC_TOKENS;
  document.head.prepend(s);
}
