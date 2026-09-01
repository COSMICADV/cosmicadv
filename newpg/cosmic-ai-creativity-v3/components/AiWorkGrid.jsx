'use client';

/**
 * COSMiC — Selected AI work
 * Two rows of three. Muted loop while in view, click (or the corner
 * control) for sound.
 *
 * v3 — compact grid
 *   · six pieces in two rows instead of six full-height panels; the dead
 *     space between films is gone and the reel reads in about two screens
 *   · row A is the two 16:9 films flanking the short 9:16 teaser;
 *     row B is the three remaining 9:16 pieces at identical size
 *   · one shared frame height (--cxwk-h) contains every film whatever its
 *     ratio, so the captions sit on the same line across a row
 *   · numbering follows display order — edit WORK to renumber
 *   · staggered scroll reveals, scale-in on media, cursor pill for
 *     click-for-sound, playback line, section progress bar
 *   · meta and index text at the AA contrast floor
 *   · every colour, size and easing comes from cosmicTokens
 *
 * Assets in /public/ai-work/: 01-seasonal-film.mp4 / .webp … 06-motion-banner.*
 * (file names are unchanged — only the display order and numbers moved)
 */

import { useEffect, useRef } from 'react';
import { injectTokens } from './cosmicTokens';

/* In display order. The number under each film is its position here. */
export const WORK = [
  {
    id: '01-seasonal-film',
    title: 'Seasonal Campaign Film',
    meta: 'Brand film · 16:9 · 0:24',
    caption: 'A holiday spot built end to end with generative video — cast, wardrobe, location and light, none of them booked.',
    ratio: '16 / 9',
  },
  {
    id: '02-apparel-teaser',
    title: 'Apparel Campaign Teaser',
    meta: 'Paid social · 9:16 · 0:03',
    caption: 'A three-second stopper for the feed. Product on-model, on-location, shot without either.',
    ratio: '9 / 16',
  },
  {
    id: '06-motion-banner',
    title: 'Motion Banner',
    meta: 'Display · 16:9 · 0:10',
    caption: 'A looping brand banner — abstract, weightless and light enough to sit on any page.',
    ratio: '16 / 9',
  },
  {
    id: '03-beverage-film',
    title: 'Beverage Brand Film',
    meta: 'Brand film · 9:16 · 0:41',
    caption: 'Long-form vertical storytelling — a street, a summer and a payoff, at a runtime social usually cannot afford.',
    ratio: '9 / 16',
  },
  {
    id: '04-apparel-ecommerce',
    title: 'E-Commerce Reel',
    meta: 'Performance · 9:16 · 0:25',
    caption: 'From ad click to unboxing in one continuous piece, built to be re-cut for every product drop.',
    ratio: '9 / 16',
  },
  {
    id: '05-apparel-social',
    title: 'Social Reel',
    meta: 'Always-on · 9:16 · 0:27',
    caption: 'Everyday, unstaged, in-feed. The kind of footage that used to need a casting call.',
    ratio: '9 / 16',
  }
];

/* How WORK is split into rows. "mixed" expects the 9:16 piece in the
   middle slot, flanked by the two 16:9 pieces. */
export const ROWS = [
  { shape: 'mixed', from: 0, to: 3 },
  { shape: 'portraits', from: 3, to: 6 }
];

const CSS = `/* ================================================================
   COSMiC — Selected AI work
   Two rows of three. Every film is contained inside one shared frame
   height, so mixed 16:9 / 9:16 pieces sit on the same baseline and the
   captions line up across the row.
   ================================================================ */
.cxwk{background:var(--cx-paper);color:var(--cx-ink);position:relative;
  --cxwk-h:min(64svh,580px)}
.cxwk *{box-sizing:border-box}

/* ---------- reveal primitive ---------- */
.cx-rv{opacity:0;transform:translateY(22px);
  transition:opacity var(--cx-slow) var(--cx-out),transform var(--cx-slow) var(--cx-out);
  transition-delay:calc(var(--d,0) * 70ms)}
.cx-rv.is-in{opacity:1;transform:none}

/* ---------- opening: the film's black carries through the intro ---------- */
.cxwk__open{position:relative;background:var(--cx-void);color:var(--cx-lux)}
.cxwk__open::after{content:"";position:absolute;left:0;right:0;bottom:0;
  height:clamp(96px,14vh,180px);pointer-events:none;
  background:linear-gradient(180deg,transparent,var(--cx-paper))}
.cxwk__intro{position:relative;z-index:1;max-width:var(--cx-max);margin:0 auto;
  padding:clamp(96px,14vh,170px) var(--cx-gutter) clamp(128px,20vh,250px)}
.cxwk__kicker{font-family:var(--cx-font);font-weight:var(--cx-w-med);font-size:var(--cx-t-meta);
  letter-spacing:var(--cx-tr-widest);text-transform:uppercase;color:var(--cx-lux-50);
  margin:0 0 var(--cx-5)}
.cxwk__lede{font-family:var(--cx-font);font-weight:var(--cx-w-bold);font-size:var(--cx-t-lede);
  line-height:var(--cx-lh-head);letter-spacing:var(--cx-tr-tight);margin:0;max-width:18ch;
  color:var(--cx-lux)}
.cxwk__body{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:var(--cx-5) clamp(24px,3vw,56px);margin-top:clamp(36px,5vh,60px);max-width:880px}
.cxwk__body p{font-family:var(--cx-font);font-size:var(--cx-t-body);line-height:var(--cx-lh-body);
  color:var(--cx-lux-72);margin:0}
@media (max-width:767px){.cxwk__body{grid-template-columns:1fr;gap:var(--cx-4)}}

/* ---------- the rows ----------
   The films run wider than the intro text so the reel reads at scale.  */
.cxwk__row{max-width:1560px;margin:0 auto;
  padding:0 var(--cx-gutter) clamp(56px,8vh,96px);
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));
  gap:clamp(20px,2.8vw,44px);align-items:start}
/* row A: the middle column is exactly the width of the 9:16 teaser, so the
   two 16:9 films take everything that is left instead of sitting in thirds */
.cxwk__row[data-shape="mixed"]{
  grid-template-columns:minmax(0,1fr) calc(var(--cxwk-h) * 0.5625) minmax(0,1fr)}
.cxwk__row:last-of-type{padding-bottom:clamp(80px,12vh,140px)}

.cxwk__card{display:flex;flex-direction:column;gap:var(--cx-5);min-width:0}

/* one frame height for the whole section, films sitting on a shared
   baseline — a 16:9 and a 9:16 can never be the same height, so they are
   bottom-aligned instead and every caption starts on the same line */
.cxwk__frame{height:var(--cxwk-h);display:grid;place-items:end center;min-width:0}

/* ---------- media ---------- */
.cxwk__media{position:relative;background:var(--cx-paper-sunk);overflow:hidden;
  cursor:pointer;transform:scale(.985);opacity:0;max-width:100%;max-height:100%;
  box-shadow:0 22px 54px -28px rgba(0,0,0,.34);
  transition:transform var(--cx-cine) var(--cx-out),opacity var(--cx-slow) var(--cx-out),
             box-shadow var(--cx-mid) var(--cx-out)}
.cxwk__media.is-in{transform:scale(1);opacity:1}
.cxwk__media.is-in:hover{box-shadow:0 30px 68px -26px rgba(0,0,0,.42)}
.cxwk__card[data-orient="landscape"] .cxwk__media{aspect-ratio:16/9;width:100%}
.cxwk__card[data-orient="portrait"]  .cxwk__media{aspect-ratio:9/16;height:100%;width:auto}
.cxwk__media video{width:100%;height:100%;object-fit:cover;display:block;
  background:var(--cx-paper-sunk);
  transform:scale(1.02);transition:transform var(--cx-cine) var(--cx-out)}
.cxwk__media.is-in video{transform:scale(1)}
.cxwk__media.is-in:hover video{transform:scale(1.03)}

/* playback line */
.cxwk__line{position:absolute;left:0;right:0;bottom:0;height:2px;
  background:rgba(255,255,255,.28);z-index:2}
.cxwk__line i{display:block;height:100%;background:var(--cx-lux);
  transform:scaleX(0);transform-origin:0 50%;will-change:transform}

/* cursor pill — makes click-for-sound discoverable */
.cxwk__pill{position:absolute;left:0;top:0;z-index:3;pointer-events:none;
  display:inline-flex;align-items:center;gap:var(--cx-2);padding:var(--cx-3) var(--cx-4);
  font-family:var(--cx-font);font-weight:var(--cx-w-bold);font-size:var(--cx-t-micro);
  letter-spacing:var(--cx-tr-wider);text-transform:uppercase;
  color:var(--cx-ink);background:var(--cx-lux);white-space:nowrap;
  opacity:0;transform:translate(-50%,-50%) scale(.86);
  transition:opacity var(--cx-fast) var(--cx-out),transform var(--cx-fast) var(--cx-out)}
.cxwk__media.is-hot .cxwk__pill{opacity:1;transform:translate(-50%,-50%) scale(1)}
@media (hover:none){.cxwk__pill{display:none}}

/* corner control — the accessible, always-visible fallback */
.cxwk__sound{position:absolute;right:var(--cx-2);bottom:var(--cx-3);z-index:4;
  display:inline-flex;align-items:center;gap:var(--cx-2);
  min-height:var(--cx-tap);padding:0 var(--cx-4);
  font-family:var(--cx-font);font-weight:var(--cx-w-bold);font-size:var(--cx-t-micro);
  letter-spacing:var(--cx-tr-wider);text-transform:uppercase;color:var(--cx-lux);
  background:rgba(0,0,0,.62);backdrop-filter:blur(8px);
  border:1px solid var(--cx-lux-line);cursor:pointer;
  transition:background var(--cx-mid) var(--cx-out),color var(--cx-mid) var(--cx-out),
             border-color var(--cx-mid) var(--cx-out)}
.cxwk__sound:hover{background:var(--cx-lux);color:var(--cx-ink);border-color:var(--cx-lux)}
.cxwk__sound:focus-visible{outline:2px solid var(--cx-lux);outline-offset:3px}
.cxwk__sound svg,.cxwk__pill svg{width:13px;height:13px;flex:none;fill:currentColor}
.cxwk__media .ico-b{display:none}
.cxwk__media.is-loud .ico-a{display:none}
.cxwk__media.is-loud .ico-b{display:block}
@media (hover:hover){.cxwk__media.is-hot .cxwk__sound{opacity:0;pointer-events:none;
  transition:opacity var(--cx-fast) var(--cx-out)}}

/* ---------- card text ---------- */
.cxwk__text{min-width:0}
.cxwk__index{display:flex;align-items:baseline;gap:var(--cx-3);margin:0 0 var(--cx-3);
  font-family:var(--cx-font);font-variant-numeric:tabular-nums}
.cxwk__index b{font-weight:var(--cx-w-heavy);font-size:clamp(28px,2.6vw,40px);line-height:.86;
  letter-spacing:var(--cx-tr-mega);color:var(--cx-ink)}
.cxwk__index span{font-weight:var(--cx-w-med);font-size:var(--cx-t-meta);
  letter-spacing:var(--cx-tr-wider);color:var(--cx-ink-45)}
.cxwk__index i{flex:1 1 auto;height:1px;background:var(--cx-line);align-self:center}
.cxwk__title{font-family:var(--cx-font);font-weight:var(--cx-w-bold);
  font-size:clamp(19px,1.35vw + 12px,26px);line-height:var(--cx-lh-head);
  letter-spacing:var(--cx-tr-tight);margin:0 0 var(--cx-2);color:var(--cx-ink)}
.cxwk__meta{margin:0 0 var(--cx-4);font-family:var(--cx-font);font-size:var(--cx-t-meta);
  letter-spacing:var(--cx-tr-wide);text-transform:uppercase;color:var(--cx-ink-45)}
.cxwk__caption{font-family:var(--cx-font);font-size:var(--cx-t-body);line-height:var(--cx-lh-body);
  color:var(--cx-ink-65);margin:0}

/* ---------- section progress ---------- */
.cxwk__prog{position:fixed;left:0;right:0;top:0;height:2px;z-index:31;
  background:transparent;opacity:0;transition:opacity var(--cx-mid) var(--cx-out)}
.cxwk__prog.is-on{opacity:1}
.cxwk__prog i{display:block;height:100%;background:var(--cx-ink);
  transform:scaleX(0);transform-origin:0 50%;will-change:transform}

/* ---------- closing ---------- */
.cxwk__end{border-top:1px solid var(--cx-line);
  padding:clamp(88px,14vh,160px) var(--cx-gutter);
  display:flex;flex-direction:column;align-items:center;gap:var(--cx-5);text-align:center}
.cxwk__end h2{font-family:var(--cx-font);font-weight:var(--cx-w-bold);
  font-size:clamp(26px,3.4vw,48px);line-height:var(--cx-lh-head);
  letter-spacing:var(--cx-tr-tight);margin:0;color:var(--cx-ink)}
.cxwk__end p{font-family:var(--cx-font);font-size:var(--cx-t-lead);line-height:1.68;
  color:var(--cx-ink-65);margin:0;max-width:46ch}
.cxwk__actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;
  gap:var(--cx-5);margin-top:var(--cx-2)}
.cxwk__cta{display:inline-flex;align-items:center;gap:var(--cx-3);position:relative;
  min-height:var(--cx-tap);padding:0 var(--cx-6);overflow:hidden;
  font-family:var(--cx-font);font-weight:var(--cx-w-bold);font-size:12px;
  letter-spacing:var(--cx-tr-wider);text-transform:uppercase;
  color:var(--cx-lux);background:var(--cx-ink);text-decoration:none;
  border:1px solid var(--cx-ink);transition:color var(--cx-mid) var(--cx-out)}
.cxwk__cta::before{content:"";position:absolute;inset:0;background:var(--cx-paper);
  transform:scaleY(0);transform-origin:50% 100%;transition:transform var(--cx-mid) var(--cx-out)}
.cxwk__cta span,.cxwk__cta em{position:relative;z-index:1}
.cxwk__cta em{font-style:normal;transition:transform var(--cx-mid) var(--cx-out)}
.cxwk__cta:hover{color:var(--cx-ink)}
.cxwk__cta:hover::before{transform:scaleY(1)}
.cxwk__cta:hover em{transform:translateX(6px)}
.cxwk__cta:focus-visible{outline:2px solid var(--cx-ink);outline-offset:4px}
.cxwk__alt{display:inline-flex;align-items:center;min-height:var(--cx-tap);
  font-family:var(--cx-font);font-weight:var(--cx-w-med);font-size:12px;
  letter-spacing:var(--cx-tr-wide);text-transform:uppercase;color:var(--cx-ink-65);
  text-decoration:none;border-bottom:1px solid var(--cx-line-mid);
  transition:color var(--cx-mid) var(--cx-out),border-color var(--cx-mid) var(--cx-out)}
.cxwk__alt:hover{color:var(--cx-ink);border-color:var(--cx-ink)}
.cxwk__alt:focus-visible{outline:2px solid var(--cx-ink);outline-offset:4px}

/* ---------- below the three-up: stack, at each film's natural ratio ----------
   A row of three only works while the columns stay wide enough to read;
   two-up would orphan the third card, so it goes straight to one-up. */
@media (max-width:1080px){
  .cxwk__row,
  .cxwk__row[data-shape="mixed"]{grid-template-columns:minmax(0,1fr);
    gap:clamp(48px,7vh,80px);padding-bottom:clamp(48px,7vh,80px)}
  .cxwk__row:last-of-type{padding-bottom:clamp(64px,10vh,110px)}
  .cxwk__frame{height:auto}
  .cxwk__card{gap:var(--cx-4);max-width:820px;width:100%;margin-inline:auto}
  .cxwk__card[data-orient="landscape"] .cxwk__media{width:100%;height:auto}
  .cxwk__card[data-orient="portrait"] .cxwk__media{height:auto;width:min(100%,420px);
    margin-inline:auto}
  .cxwk__index b{font-size:34px}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .cxwk__prog,.cxwk__pill{display:none}
  .cx-rv{opacity:1;transform:none;transition:none}
  .cxwk__media{opacity:1;transform:none;transition:none}
  .cxwk__media video,.cxwk__media.is-in:hover video{transform:none;transition:none}
}
`;

/* ---------------------------------------------------------------- runtime */
/* ================================================================
   COSMiC — Selected AI work runtime
   initAiWorkGrid(rootEl) -> cleanup()
   Markup carries everything; this only wires behaviour.
   ================================================================ */
function initAiWorkGrid(root) {
  if (!root) return function () {};

  var reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var cards  = [].slice.call(root.querySelectorAll('.cxwk__card'));
  var rows   = [].slice.call(root.querySelectorAll('.cxwk__row'));
  var progEl = root.querySelector('.cxwk__prog');
  var prog   = progEl && progEl.querySelector('i');
  var offs   = [];

  /* ---------------- scroll reveals ---------------- */
  var revealed = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      revealed.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  [].slice.call(root.querySelectorAll('.cx-rv, .cxwk__media')).forEach(function (el) {
    revealed.observe(el);
  });

  /* ---------------- sound labelling ---------------- */
  function label(v) {
    var media = v.closest('.cxwk__media');
    if (!media) return;
    var title = media.getAttribute('data-title') || 'this film';
    var act   = v.muted ? 'Sound on' : 'Sound off';
    var aria  = (v.muted ? 'Turn sound on for ' : 'Turn sound off for ') + title;
    var btn   = media.querySelector('.cxwk__sound span');
    var pill  = media.querySelector('.cxwk__pill span');
    if (btn)  btn.textContent  = act;
    if (pill) pill.textContent = act;
    var b = media.querySelector('.cxwk__sound');
    if (b) b.setAttribute('aria-label', aria);
    media.classList.toggle('is-loud', !v.muted);
  }

  /* ---------------- lazy sources ---------------- */
  var lazy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var v = e.target.querySelector('video');
      if (v && !v.src && v.dataset.src) v.src = v.dataset.src;
      lazy.unobserve(e.target);
    });
  }, { rootMargin: '120% 0px' });
  cards.forEach(function (c) { lazy.observe(c); });

  /* ---------------- play only what is on screen ---------------- */
  var playObserver = null;
  if (!reduced) {
    playObserver = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target.querySelector('video');
        if (!v) return;
        if (e.isIntersecting) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else {
          v.pause();
          if (!v.muted) { v.muted = true; label(v); }
        }
      });
    }, { threshold: 0.35 });
    cards.forEach(function (c) { playObserver.observe(c); });
  }

  var videos = [].slice.call(root.querySelectorAll('video'));

  /* ---------------- playback line ---------------- */
  videos.forEach(function (v) {
    var media = v.closest('.cxwk__media');
    var fill  = media && media.querySelector('.cxwk__line i');
    if (!fill) return;
    var onTime = function () {
      if (!v.duration || !isFinite(v.duration)) return;
      fill.style.transform = 'scaleX(' + (v.currentTime / v.duration) + ')';
    };
    v.addEventListener('timeupdate', onTime);
    offs.push(function () { v.removeEventListener('timeupdate', onTime); });
  });

  /* ---------------- sound toggle ---------------- */
  function onScreen(v) {
    var r = v.getBoundingClientRect();
    return r.bottom > window.innerHeight * 0.2 && r.top < window.innerHeight * 0.8;
  }
  function toggle(v) {
    var turningOn = v.muted;
    videos.forEach(function (o) { if (o !== v && !o.muted) { o.muted = true; label(o); } });
    v.muted = !turningOn;
    if (turningOn && onScreen(v)) {
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {});
    }
    label(v);
  }

  var onClick = function (ev) {
    var media = ev.target.closest('.cxwk__media');
    if (!media) return;
    var v = media.querySelector('video');
    if (!v) return;
    ev.preventDefault();
    toggle(v);
  };
  root.addEventListener('click', onClick);

  /* ---------------- cursor pill ---------------- */
  if (canHover) {
    root.querySelectorAll('.cxwk__media').forEach(function (media) {
      var pill = media.querySelector('.cxwk__pill');
      if (!pill) return;
      var enter = function () { media.classList.add('is-hot'); };
      var leave = function () { media.classList.remove('is-hot'); };
      var move  = function (e) {
        var r = media.getBoundingClientRect();
        pill.style.left = (e.clientX - r.left) + 'px';
        pill.style.top  = (e.clientY - r.top)  + 'px';
      };
      media.addEventListener('pointerenter', enter);
      media.addEventListener('pointerleave', leave);
      media.addEventListener('pointermove', move, { passive: true });
      offs.push(function () {
        media.removeEventListener('pointerenter', enter);
        media.removeEventListener('pointerleave', leave);
        media.removeEventListener('pointermove', move);
      });
    });
  }

  /* ---------------- section progress ---------------- */
  var onScroll = function () {
    if (!prog || !rows.length) return;
    var first = rows[0].getBoundingClientRect();
    var last  = rows[rows.length - 1].getBoundingClientRect();
    var span  = last.bottom - first.top - window.innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -first.top / span)) : (first.top <= 0 ? 1 : 0);
    prog.style.transform = 'scaleX(' + p + ')';
    var inView = first.top < window.innerHeight * 0.8 && last.bottom > 0;
    progEl.classList.toggle('is-on', inView);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  videos.forEach(label);

  return function () {
    root.removeEventListener('click', onClick);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    offs.forEach(function (f) { f(); });
    lazy.disconnect();
    revealed.disconnect();
    if (playObserver) playObserver.disconnect();
  };
}


const IconOn = () => (
  <svg viewBox="0 0 24 24" className="ico-a" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4zm11.5 3a4 4 0 0 0-2-3.46v6.92A4 4 0 0 0 15.5 12z" />
  </svg>
);
const IconOff = () => (
  <svg viewBox="0 0 24 24" className="ico-b" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4zm12.6.4L15.4 8.2 17.2 10l-1.8 1.8 1.2 1.2L18.4 11l1.8 1.8 1.2-1.2L19.6 10l1.8-1.8-1.2-1.2L18.4 8.8z" />
  </svg>
);

export default function AiWorkGrid({
  basePath = '/ai-work',
  contactHref = '/#contact-me',
  solutionsHref = '/#solutions',
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    injectTokens();
    if (!document.getElementById('cxwk-styles')) {
      const s = document.createElement('style');
      s.id = 'cxwk-styles';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    return initAiWorkGrid(rootRef.current);
  }, []);

  const total = String(WORK.length).padStart(2, '0');

  return (
    <section className="cxwk" id="work" ref={rootRef}>
      <div className="cxwk__open">
        <div className="cxwk__intro">
          <p className="cxwk__kicker cx-rv" style={{ '--d': 0 }}>Selected AI work</p>
          <h2 className="cxwk__lede cx-rv" style={{ '--d': 1 }}>
            Ideas first. The camera was optional.
          </h2>
          <div className="cxwk__body">
            <p className="cx-rv" style={{ '--d': 2 }}>
              We use generative AI the way we use a lens or a pen — as a tool in the hands of
              people who already know what a good idea looks like. Every piece below started
              as a brief, a script and a board.
            </p>
            <p className="cx-rv" style={{ '--d': 3 }}>
              What changed is the distance between the idea and the visual. No location scout,
              no crew call, no six-week turnaround — so the budget goes into the thinking
              instead of the logistics.
            </p>
          </div>
        </div>
      </div>

      {ROWS.map((row) => (
        <div className="cxwk__row" data-shape={row.shape} key={row.shape + row.from}>
          {WORK.slice(row.from, row.to).map((w, d) => {
            const idx = String(row.from + d + 1).padStart(2, '0');
            return (
              <article
                className="cxwk__card"
                key={w.id}
                data-orient={w.ratio === '9 / 16' ? 'portrait' : 'landscape'}
              >
                <div className="cxwk__frame">
                  <div className="cxwk__media" data-title={w.title}>
                    <video
                      data-src={`${basePath}/${w.id}.mp4`}
                      poster={`${basePath}/${w.id}.webp`}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={w.title}
                    />
                    <div className="cxwk__line" aria-hidden="true"><i /></div>
                    <div className="cxwk__pill" aria-hidden="true">
                      <IconOn /><IconOff /><span>Sound on</span>
                    </div>
                    <button
                      className="cxwk__sound"
                      type="button"
                      aria-label={`Turn sound on for ${w.title}`}
                    >
                      <IconOn /><IconOff /><span>Sound on</span>
                    </button>
                  </div>
                </div>

                <div className="cxwk__text">
                  <p className="cxwk__index cx-rv" style={{ '--d': d }}>
                    <b>{idx}</b>
                    <span>/ {total}</span>
                    <i aria-hidden="true" />
                  </p>
                  <h3 className="cxwk__title cx-rv" style={{ '--d': d }}>{w.title}</h3>
                  <p className="cxwk__meta cx-rv" style={{ '--d': d }}>{w.meta}</p>
                  <p className="cxwk__caption cx-rv" style={{ '--d': d }}>{w.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      ))}

      <div className="cxwk__prog" aria-hidden="true"><i /></div>

      <div className="cxwk__end">
        <h2 className="cx-rv" style={{ '--d': 0 }}>Tell us the idea.</h2>
        <p className="cx-rv" style={{ '--d': 1 }}>
          We will show you what it looks like before you commit a production budget to it.
        </p>
        <div className="cxwk__actions cx-rv" style={{ '--d': 2 }}>
          <a className="cxwk__cta" href={contactHref}>
            <span>Start a project</span> <em aria-hidden="true">→</em>
          </a>
          <a className="cxwk__alt" href={solutionsHref}>See all solutions</a>
        </div>
      </div>
    </section>
  );
}
