'use client';

/**
 * COSMiC — AI CREATIVITY
 * Scroll-scrubbed cinematic hero. Zero dependencies: vanilla rAF frame
 * scrubbing on a <canvas> fed by a pre-decoded WebP sequence.
 *
 * v2 — polish + motion pass
 *   · chapter spine on the left: all three beats stay visible, the live one
 *     is lit, and each is a real button that jumps to that beat
 *   · kinetic title (per-letter rise), pointer parallax on the frame
 *   · HUD reads chapter + percent instead of a raw counter
 *   · "Skip the film" escape hatch, keyboard reachable
 *   · reduced-motion keeps the story: poster + all three chapters, no scrub
 *   · every colour, size and easing comes from cosmicTokens
 *
 * Assets in /public:
 *   /ai-creativity/desktop/f000.webp … f079.webp   (1200x675)
 *   /ai-creativity/mobile/f000.webp  … f076.webp   ( 720x405)
 */

import { useEffect, useRef } from 'react';
import { injectTokens } from './cosmicTokens';

const MAP_DESKTOP = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 74, 74, 75, 75, 75, 76, 76, 76, 76, 77, 77, 77, 77, 77, 77, 77, 77, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 79];
const MAP_MOBILE  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 73, 73, 73, 74, 74, 74, 74, 74, 74, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 76];

const SETS = {
  desktop: { dir: 'desktop', map: MAP_DESKTOP, w: 1200, h: 675 },
  mobile:  { dir: 'mobile',  map: MAP_MOBILE,  w: 720,  h: 405 },
};

export const CHAPTERS = [
  { num: '01', name: 'THE BRIEF', sub: 'It still starts with an idea.' },
  { num: '02', name: 'THE MODEL', sub: 'The machine draws every version of it.' },
  { num: '03', name: 'THE CUT', sub: 'We choose the one that works.' },
];

const CSS = `/* ================================================================
   COSMiC — AI CREATIVITY (scroll-scrubbed hero)
   ================================================================ */
.cxai{position:relative;background:var(--cx-void);color:var(--cx-lux);isolation:isolate;
  /* How far you scroll to play the film through once. This is the only
     dial for scrub speed — bigger = slower. 150vh was the original pace;
     450vh runs it at a third of that. */
  --cxai-run:450vh}
.cxai *{box-sizing:border-box}
.cxai__track{position:relative;height:calc(100vh + var(--cxai-run))}
@supports (height:100svh){.cxai__track{height:calc(100svh + var(--cxai-run))}}
.cxai__stage{position:sticky;top:0;height:100vh;height:100svh;width:100%;overflow:hidden;
  background:var(--cx-void);display:grid;place-items:center}

.cxai__canvas{position:absolute;inset:0;width:100%;height:100%;display:block;
  will-change:transform;opacity:0;transition:opacity var(--cx-slow) var(--cx-out);
  transform:translate3d(var(--cx-px,0px),var(--cx-py,0px),0)}
.cxai.is-ready .cxai__canvas{opacity:1}

.cxai__grain{position:absolute;inset:-50%;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.cxai__vig{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(120% 90% at 50% 45%,transparent 45%,var(--cx-scrim) 100%)}
.cxai__scrim{position:absolute;left:0;right:0;bottom:0;height:38%;pointer-events:none;
  background:linear-gradient(180deg,transparent,rgba(0,0,0,.62))}
.cxai__ui{position:absolute;inset:0;pointer-events:none;z-index:2}
.cxai__ui a,.cxai__ui button{pointer-events:auto}

/* ---------- shared type ---------- */
.cxai__eyebrow{font-family:var(--cx-font);font-weight:var(--cx-w-med);font-size:var(--cx-t-meta);
  letter-spacing:var(--cx-tr-widest);text-transform:uppercase;color:var(--cx-lux-50);margin:0}
.cxai__title{font-family:var(--cx-font);font-weight:var(--cx-w-heavy);
  font-size:clamp(20px,2.7vw,36px);line-height:1;letter-spacing:var(--cx-tr-wide);
  text-transform:uppercase;margin:0;color:var(--cx-lux);
  display:flex;justify-content:center;flex-wrap:wrap}
.cxai__title i{font-style:normal;display:inline-block;white-space:pre;
  transform:translateY(1.05em);opacity:0}
.cxai.is-ready .cxai__title i{
  animation:cxai-rise var(--cx-cine) var(--cx-out) forwards;
  animation-delay:calc(var(--i) * 34ms + 120ms)}
@keyframes cxai-rise{to{transform:translateY(0);opacity:1}}

/* ---------- intro ---------- */
.cxai__intro{position:absolute;left:0;right:0;top:66%;display:flex;flex-direction:column;
  align-items:center;gap:var(--cx-5);text-align:center;padding:0 var(--cx-gutter)}
.cxai__hint{display:flex;flex-direction:column;align-items:center;gap:var(--cx-3)}
.cxai__rule{width:1px;height:46px;background:linear-gradient(180deg,var(--cx-lux-72),transparent)}
.cxai__rule::after{content:"";display:block;width:1px;height:14px;background:var(--cx-lux);
  animation:cxai-drop 2.2s var(--cx-inout) infinite}
@keyframes cxai-drop{0%{transform:translateY(0);opacity:0}30%{opacity:1}100%{transform:translateY(46px);opacity:0}}

/* ---------- chapter spine (left) ---------- */
.cxai__spine{position:absolute;left:var(--cx-gutter);top:50%;transform:translateY(-50%);
  margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:var(--cx-4);
  opacity:0;transition:opacity var(--cx-slow) var(--cx-out)}
.cxai__spine.is-on{opacity:1}
/* keeps the labels legible when a bright frame passes underneath */
.cxai__spine::before{content:"";position:absolute;z-index:-1;pointer-events:none;
  left:calc(-1 * var(--cx-gutter) - 40px);top:-14vh;bottom:-14vh;width:min(46vw,600px);
  background:radial-gradient(115% 90% at 0% 50%,rgba(0,0,0,.9),rgba(0,0,0,.45) 46%,transparent 78%)}
.cxai__ch{display:block}
.cxai__ch button{display:grid;grid-template-columns:34px 1fr;align-items:center;
  column-gap:var(--cx-3);row-gap:var(--cx-1);background:none;border:0;cursor:pointer;
  padding:var(--cx-2) var(--cx-3) var(--cx-2) 0;margin:0;text-align:left;min-height:var(--cx-tap);
  font-family:var(--cx-font);color:var(--cx-lux)}
.cxai__ch-line{display:block;height:1px;width:14px;background:var(--cx-lux-30);
  transition:width var(--cx-slow) var(--cx-out),background var(--cx-mid) var(--cx-out)}
.cxai__ch-name{display:block;font-weight:var(--cx-w-med);font-size:var(--cx-t-meta);
  letter-spacing:var(--cx-tr-wider);text-transform:uppercase;color:var(--cx-lux-50);
  white-space:nowrap;transition:color var(--cx-mid) var(--cx-out);
  text-shadow:0 1px 14px rgba(0,0,0,.9)}
.cxai__ch-sub{grid-column:2;display:block;font-size:var(--cx-t-meta);letter-spacing:.02em;
  color:var(--cx-lux-72);max-width:32ch;opacity:0;transform:translateY(-4px);
  transition:opacity var(--cx-mid) var(--cx-out),transform var(--cx-mid) var(--cx-out);
  text-shadow:0 1px 14px rgba(0,0,0,.9)}
.cxai__ch[aria-current="true"] .cxai__ch-line{width:34px;background:var(--cx-lux)}
.cxai__ch[aria-current="true"] .cxai__ch-name{color:var(--cx-lux)}
.cxai__ch[aria-current="true"] .cxai__ch-sub{opacity:1;transform:translateY(0)}
.cxai__ch button:hover .cxai__ch-name{color:var(--cx-lux)}
.cxai__ch button:hover .cxai__ch-line{width:34px;background:var(--cx-lux-72)}
.cxai__ch button:focus-visible{outline:2px solid var(--cx-lux);outline-offset:3px}

/* ---------- outro ---------- */
.cxai__outro{position:absolute;left:0;right:0;bottom:clamp(56px,9vh,100px);
  display:flex;flex-direction:column;align-items:center;gap:var(--cx-4);
  text-align:center;padding:0 var(--cx-gutter)}
.cxai__outro h2{font-family:var(--cx-font);font-weight:var(--cx-w-med);
  font-size:clamp(19px,2.4vw,30px);line-height:var(--cx-lh-head);
  letter-spacing:var(--cx-tr-tight);margin:0;color:var(--cx-lux)}

/* ---------- button ---------- */
.cxai__cta{display:inline-flex;align-items:center;gap:var(--cx-3);position:relative;
  font-family:var(--cx-font);font-weight:var(--cx-w-bold);font-size:12px;
  letter-spacing:var(--cx-tr-wider);text-transform:uppercase;color:var(--cx-void);
  background:var(--cx-lux);padding:0 var(--cx-6);min-height:var(--cx-tap);
  text-decoration:none;border:1px solid var(--cx-lux);overflow:hidden;
  transition:color var(--cx-mid) var(--cx-out)}
.cxai__cta::before{content:"";position:absolute;inset:0;background:var(--cx-void);
  transform:scaleY(0);transform-origin:50% 100%;transition:transform var(--cx-mid) var(--cx-out)}
.cxai__cta span,.cxai__cta em{position:relative;z-index:1}
.cxai__cta em{font-style:normal;transition:transform var(--cx-mid) var(--cx-out)}
.cxai__cta:hover{color:var(--cx-lux)}
.cxai__cta:hover::before{transform:scaleY(1)}
.cxai__cta:hover em{transform:translateY(4px)}
.cxai__cta[data-arrow="right"]:hover em{transform:translateX(6px)}
.cxai__cta:focus-visible{outline:2px solid var(--cx-lux);outline-offset:4px}

/* ---------- HUD: progress readout ---------- */
.cxai__hud{position:absolute;right:var(--cx-gutter);bottom:clamp(56px,9vh,100px);
  display:flex;align-items:center;gap:var(--cx-3);font-family:var(--cx-font);
  font-weight:var(--cx-w-med);font-size:var(--cx-t-meta);letter-spacing:var(--cx-tr-wide);
  text-transform:uppercase;color:var(--cx-lux-72);font-variant-numeric:tabular-nums;
  text-shadow:0 1px 14px rgba(0,0,0,.9)}
.cxai__hud b{font-weight:var(--cx-w-med);color:var(--cx-lux)}
.cxai__hud i{font-style:normal;width:1px;height:11px;background:var(--cx-lux-30)}

/* ---------- progress bar ---------- */
.cxai__bar{position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--cx-lux-line)}
.cxai__bar i{display:block;height:100%;width:100%;background:var(--cx-lux);
  transform:scaleX(0);transform-origin:0 50%;will-change:transform}

/* ---------- skip ---------- */
.cxai__skip{position:absolute;left:var(--cx-gutter);bottom:var(--cx-5);
  display:inline-flex;align-items:center;gap:var(--cx-2);min-height:var(--cx-tap);
  font-family:var(--cx-font);font-weight:var(--cx-w-med);font-size:var(--cx-t-micro);
  letter-spacing:var(--cx-tr-wider);text-transform:uppercase;color:var(--cx-lux-50);
  text-decoration:none;opacity:0;pointer-events:none;
  transition:opacity var(--cx-mid) var(--cx-out),color var(--cx-mid) var(--cx-out)}
.cxai__skip.is-on{opacity:1;pointer-events:auto}
.cxai__skip:hover{color:var(--cx-lux)}
.cxai__skip:focus-visible{outline:2px solid var(--cx-lux);outline-offset:4px;opacity:1;pointer-events:auto}

/* ---------- loading ---------- */
.cxai__load{position:absolute;left:50%;bottom:clamp(56px,9vh,100px);transform:translateX(-50%);
  display:flex;align-items:center;gap:var(--cx-3);margin:0;font-family:var(--cx-font);
  font-size:var(--cx-t-micro);letter-spacing:var(--cx-tr-wider);text-transform:uppercase;
  color:var(--cx-lux-50);transition:opacity var(--cx-slow) var(--cx-out)}
.cxai__load u{display:block;width:56px;height:1px;background:var(--cx-lux-line);
  text-decoration:none;position:relative;overflow:hidden}
.cxai__load u::after{content:"";position:absolute;inset:0;background:var(--cx-lux);
  transform:scaleX(var(--p,0));transform-origin:0 50%;transition:transform var(--cx-fast) linear}
.cxai.is-ready .cxai__load{opacity:0;pointer-events:none}

/* header dims once the visitor commits to the film */
html.cxai-immersive header{opacity:0!important;pointer-events:none!important}

/* ---------- mobile ---------- */
@media (max-width:767px){
  .cxai{--cxai-run:375vh}
  .cxai__spine{left:var(--cx-gutter);top:auto;bottom:clamp(150px,26vh,230px);transform:none;gap:var(--cx-2)}
  .cxai__ch button{grid-template-columns:22px 1fr;column-gap:var(--cx-2);min-height:36px;padding:var(--cx-1) 0}
  .cxai__ch-line{width:10px}
  .cxai__ch[aria-current="true"] .cxai__ch-line{width:22px}
  .cxai__ch-sub{display:none}
  .cxai__hud{right:var(--cx-gutter);bottom:var(--cx-5);font-size:var(--cx-t-micro);
    letter-spacing:.14em}
  .cxai__skip{display:none}
  .cxai__spine::before{left:calc(-1 * var(--cx-gutter) - 24px);top:-10vh;bottom:-10vh;
    width:min(88vw,520px)}
  .cxai__outro{bottom:clamp(64px,11vh,96px);gap:var(--cx-3)}
  .cxai__cta{padding:0 var(--cx-5);font-size:11px;letter-spacing:var(--cx-tr-wide)}
}

/* ---------- reduced motion: keep the story, drop the scrub ---------- */
@media (prefers-reduced-motion:reduce){
  .cxai__track{height:auto!important}
  .cxai__stage{position:relative;height:auto;min-height:auto;display:block;
    padding:clamp(96px,14vh,150px) var(--cx-gutter) clamp(72px,10vh,110px)}
  .cxai__canvas{position:relative;height:auto;width:100%;aspect-ratio:16/9;opacity:1;
    transition:none;transform:none}
  .cxai__vig,.cxai__scrim,.cxai__bar,.cxai__load,.cxai__hud,.cxai__skip{display:none}
  .cxai__ui{position:static;inset:auto}
  .cxai__intro{position:static;margin:0 0 var(--cx-7);top:auto}
  .cxai__title i{transform:none;opacity:1;animation:none}
  .cxai__rule::after{animation:none}
  .cxai__spine{position:static;transform:none;opacity:1;margin:var(--cx-7) auto 0;
    max-width:var(--cx-max);gap:var(--cx-5)}
  .cxai__ch-line{width:34px!important;background:var(--cx-lux)!important}
  .cxai__ch-name{color:var(--cx-lux)!important}
  .cxai__ch-sub{opacity:1!important;transform:none!important}
  .cxai__outro{position:static;margin-top:var(--cx-8);opacity:1!important;transform:none!important}
}
`;

/* ---------------------------------------------------------------- runtime */
/* ================================================================
   COSMiC — AI CREATIVITY runtime
   initAiCreativity(rootEl, options) -> cleanup()

   options:
     frameSrc(i)  -> string   URL or data: URI for unique asset i
     map          -> number[] timeline slot -> asset index
     frameW/frameH-> number   intrinsic frame size
     dimHeader    -> boolean  fade the site header once pinned
   ================================================================ */
function initAiCreativity(root, opts) {
  if (!root) return function () {};
  var o = opts || {};
  var MAP = o.map;
  var FW = o.frameW, FH = o.frameH;
  var frameSrc = o.frameSrc;
  var dimHeader = o.dimHeader !== false;

  /* three beats of the film — each one is also a jump target */
  var CHAPTERS = [
    { in: 0.13, out: 0.35 },
    { in: 0.37, out: 0.60 },
    { in: 0.62, out: 0.85 }
  ];

  var clamp  = function (v, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b;
                                    return v < a ? a : v > b ? b : v; };
  var range  = function (v, a, b) { return clamp((v - a) / (b - a)); };
  var smooth = function (t) { return t * t * (3 - 2 * t); };
  var q      = function (s) { return root.querySelector(s); };

  var canvas   = q('.cxai__canvas');
  var track    = q('.cxai__track');
  var stage    = q('.cxai__stage');
  var intro    = q('.cxai__intro');
  var outro    = q('.cxai__outro');
  var spine    = q('.cxai__spine');
  var barFill  = q('.cxai__bar i');
  var hudPct   = q('.cxai__hud b');
  var hudName  = q('.cxai__hud [data-name]');
  var loadEl   = q('.cxai__load');
  var loadBar  = q('.cxai__load u');
  var skip     = q('.cxai__skip');
  var vig      = q('.cxai__vig');
  var chapters = [].slice.call(root.querySelectorAll('.cxai__ch'));
  var chapterNames = chapters.map(function (el) {
    var n = el.querySelector('.cxai__ch-name');
    return n ? n.textContent.replace(/^\d+\s*[—-]\s*/, '').trim() : '';
  });
  var ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

  var reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced   = reducedMQ.matches;
  var isMobile  = window.matchMedia('(max-width: 767px)').matches ||
                  (navigator.maxTouchPoints > 0 && window.innerWidth < 900);
  var canHover  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var SLOTS  = MAP.length;
  var COUNT  = Math.max.apply(null, MAP) + 1;
  var frames = new Array(COUNT);

  var ready = false, drawnAsset = -1, lastFit = null, destroyed = false;
  var target = 0, current = 0, running = false, active = false;
  var vw = 1, vh = 1, dpr = 1;
  var activeChapter = -1;

  /* ---------------- sizing ---------------- */
  function measure() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    vw = Math.max(1, Math.round(r.width));
    vh = Math.max(1, Math.round(r.height));
    canvas.width  = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    drawnAsset = -1; lastFit = null;
  }

  /* ------- average edge colour, so the letterbox is the frame's own black ------- */
  var bgCache = {};
  function bgOf(i, img) {
    if (bgCache[i]) return bgCache[i];
    var rgb = [0, 0, 0];
    try {
      var c = document.createElement('canvas'); c.width = 1; c.height = 1;
      var x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0, Math.round(FW * 0.09), Math.round(FH * 0.09), 0, 0, 1, 1);
      var d = x.getImageData(0, 0, 1, 1).data;
      rgb = [d[0], d[1], d[2]];
    } catch (e) { /* tainted canvas — fall back to black */ }
    bgCache[i] = rgb;
    return rgb;
  }

  /* ---------------- painting ---------------- */
  function paint(p, i, force) {
    var img = frames[i];
    if (!img) return;
    var settle = smooth(range(p, 0.70, 0.92));
    var key = i + '|' + settle.toFixed(3) + '|' + vw + 'x' + vh;
    if (!force && key === lastFit) return;
    lastFit = key;

    var contain = Math.min(vw / FW, vh / FH);
    var cover   = Math.max(vw / FW, vh / FH);
    var open    = Math.min(cover, contain * 1.22);
    var fin     = contain * (isMobile ? 1 : 0.80);
    var scale   = open + (fin - open) * settle;
    var lift    = (isMobile ? 0.13 : 0.055) * vh * settle;

    var dw = FW * scale, dh = FH * scale;
    var dx = (vw - dw) / 2, dy = (vh - dh) / 2 - lift;

    var c = bgOf(i, img), br = c[0], bg = c[1], bb = c[2];
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = 'rgb(' + Math.round(br * settle) + ',' +
                             Math.round(bg * settle) + ',' +
                             Math.round(bb * settle) + ')';
    ctx.fillRect(0, 0, vw, vh);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);

    if (settle > 0.001) {
      var fx = Math.min(dw * 0.05, 70) * settle;
      var fy = Math.min(dh * 0.06, 52) * settle;
      var c0 = 'rgba(' + br + ',' + bg + ',' + bb + ',1)';
      var c1 = 'rgba(' + br + ',' + bg + ',' + bb + ',0)';
      var edge = function (x, y, w, h, x0, y0, x1, y1) {
        var g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, c0); g.addColorStop(1, c1);
        ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
      };
      edge(dx, dy, dw, fy, 0, dy, 0, dy + fy);
      edge(dx, dy + dh - fy, dw, fy, 0, dy + dh, 0, dy + dh - fy);
      edge(dx, dy, fx, dh, dx, 0, dx + fx, 0);
      edge(dx + dw - fx, dy, fx, dh, dx + dw, 0, dx + dw - fx, 0);
    }
  }

  function nearestLoaded(i) {
    if (frames[i]) return i;
    for (var d = 1; d < COUNT; d++) {
      if (frames[i - d]) return i - d;
      if (frames[i + d]) return i + d;
    }
    return -1;
  }

  /* ---------------- overlays ---------------- */
  function chapterAt(p) {
    var idx = -1;
    for (var i = 0; i < CHAPTERS.length; i++) {
      if (p >= CHAPTERS[i].in && p <= CHAPTERS[i].out) idx = i;
    }
    if (idx === -1) {
      for (var j = CHAPTERS.length - 1; j >= 0; j--) {
        if (p > CHAPTERS[j].out) { idx = j; break; }
      }
    }
    return idx;
  }

  function setOverlays(p) {
    var io = smooth(range(p, 0, 0.11));
    intro.style.opacity   = String(1 - io);
    intro.style.transform = 'translateY(' + (io * -24) + 'px)';
    intro.style.filter    = io > 0.001 ? 'blur(' + (io * 5) + 'px)' : '';

    /* spine: all three chapters stay legible; the live one is lit */
    if (spine) {
      var on = p > 0.09 && p < 0.93;
      spine.classList.toggle('is-on', on);
      var ci = chapterAt(p);
      if (ci !== activeChapter) {
        activeChapter = ci;
        for (var i = 0; i < chapters.length; i++) {
          chapters[i].setAttribute('aria-current', String(i === ci));
        }
        if (hudName) hudName.textContent = ci >= 0 ? chapterNames[ci] : 'AI Creativity';
      }
    }

    var oo = smooth(range(p, 0.86, 0.97));
    outro.style.opacity   = String(oo);
    outro.style.transform = 'translateY(' + ((1 - oo) * 24) + 'px)';
    outro.style.pointerEvents = oo > 0.6 ? 'auto' : 'none';

    var recede = smooth(range(p, 0.88, 1));
    if (barFill) {
      barFill.style.transform = 'scaleX(' + p + ')';
      barFill.parentElement.style.opacity = String(1 - recede * 0.85);
    }
    if (hudPct) {
      hudPct.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';
      hudPct.parentElement.style.opacity = String(1 - recede);
    }
    if (vig) vig.style.opacity = String(1 - smooth(range(p, 0.70, 0.92)));
    if (skip) skip.classList.toggle('is-on', p > 0.06 && p < 0.86);
  }

  /* ---------------- scroll -> progress ---------------- */
  function readProgress() {
    var r = track.getBoundingClientRect();
    var dist = r.height - window.innerHeight;
    if (dist <= 0) return 0;
    return clamp(-r.top / dist);
  }

  function scrollToProgress(p) {
    var r = track.getBoundingClientRect();
    var top = r.top + (window.pageYOffset || document.documentElement.scrollTop);
    var dist = r.height - window.innerHeight;
    if (dist <= 0) return;
    window.scrollTo({ top: top + dist * p, behavior: reduced ? 'auto' : 'smooth' });
  }

  var onScrollImmersiveRef = function () {};

  function tick() {
    if (destroyed) return;
    var d = target - current;
    current = Math.abs(d) < 0.0006 ? target : current + d * 0.16;

    var slot = Math.round(current * (SLOTS - 1));
    var want = MAP[slot];
    var have = nearestLoaded(want);
    if (have >= 0 && (have !== drawnAsset || !ready)) {
      paint(current, have, true);
      drawnAsset = have;
    } else if (have >= 0) {
      paint(current, have, false);
    }
    setOverlays(current);
    onScrollImmersiveRef();

    if (current !== target || !ready) requestAnimationFrame(tick);
    else running = false;
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(tick); } }
  function onScroll() { if (!active) return; target = readProgress(); kick(); }

  /* ---------------- immersive header dim ---------------- */
  var immersive = false;
  function setImmersive(pinned) {
    if (!dimHeader) return;
    var want = pinned && (immersive ? current > 0.04 : current > 0.08);
    if (want === immersive) return;
    immersive = want;
    document.documentElement.classList.toggle('cxai-immersive', want);
  }

  /* ---------------- loading ---------------- */
  var loaded = 0;
  function load(i) {
    return new Promise(function (res) {
      var img = new Image();
      img.decoding = 'async';
      img.src = frameSrc(i);
      var done = function () {
        frames[i] = img; loaded++;
        if (loadBar) loadBar.style.setProperty('--p', String(loaded / COUNT));
        res();
      };
      if (img.decode) img.decode().then(done).catch(done);
      else { img.onload = done; img.onerror = function () { loaded++; res(); }; }
    });
  }

  var started = false;
  function preload() {
    if (started) return Promise.resolve();
    started = true;
    return Promise.all([load(0), load(COUNT - 1)]).then(function () {
      if (destroyed) return;
      root.classList.add('is-ready');
      ready = true;
      measure();
      target = readProgress(); current = target;
      kick();
      var queue = [];
      for (var i = 1; i < COUNT - 1; i++) queue.push(i);
      var cursor = 0;
      var worker = function () {
        if (cursor >= queue.length || destroyed) return Promise.resolve();
        return load(queue[cursor++]).then(worker);
      };
      var jobs = [];
      for (var k = 0; k < 6; k++) jobs.push(worker());
      return Promise.all(jobs);
    }).then(function () { drawnAsset = -1; kick(); });
  }

  /* ---------------- chapter jumps ---------------- */
  var chapterCleanups = [];
  chapters.forEach(function (el, i) {
    var btn = el.querySelector('button');
    if (!btn) return;
    var go = function () { scrollToProgress(CHAPTERS[i].in + 0.03); };
    btn.addEventListener('click', go);
    chapterCleanups.push(function () { btn.removeEventListener('click', go); });
  });

  /* ---------------- reduced motion: static, story intact ---------------- */
  if (reduced) {
    root.classList.add('is-ready');
    load(COUNT - 1).then(function () {
      measure(); paint(1, COUNT - 1, true);
      chapters.forEach(function (el) { el.setAttribute('aria-current', 'true'); });
      if (spine) spine.classList.add('is-on');
    });
    var roR = new ResizeObserver(function () { measure(); paint(1, COUNT - 1, true); });
    roR.observe(canvas);
    return function () {
      destroyed = true; roR.disconnect();
      chapterCleanups.forEach(function (f) { f(); });
    };
  }

  /* ---------------- observers ---------------- */
  var near = new IntersectionObserver(function (es) {
    if (es.some(function (e) { return e.isIntersecting; })) preload();
  }, { rootMargin: '100% 0px' });
  near.observe(root);

  var inView = new IntersectionObserver(function (es) {
    active = es[0].isIntersecting;
    if (active) { target = readProgress(); kick(); }
    var r = track.getBoundingClientRect();
    setImmersive(active && r.top <= 8 && r.bottom >= window.innerHeight - 8);
  }, { threshold: [0, 0.01, 0.5, 0.99] });
  inView.observe(track);

  onScrollImmersiveRef = function () {
    var r = track.getBoundingClientRect();
    setImmersive(r.top <= 8 && r.bottom >= window.innerHeight - 8);
  };
  var scrollHandler = function () { onScroll(); onScrollImmersiveRef(); };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  /* ---------------- pointer parallax (desktop, fine pointer only) ------- */
  var pmove = null;
  if (canHover) {
    pmove = function (e) {
      var r = stage.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width  - 0.5;
      var ny = (e.clientY - r.top)  / r.height - 0.5;
      canvas.style.setProperty('--cx-px', (nx * -9).toFixed(2) + 'px');
      canvas.style.setProperty('--cx-py', (ny * -9).toFixed(2) + 'px');
    };
    stage.addEventListener('pointermove', pmove, { passive: true });
  }

  var ro = new ResizeObserver(function () { measure(); drawnAsset = -1; kick(); });
  ro.observe(canvas);

  measure();
  setOverlays(0);
  onScrollImmersiveRef();

  return function () {
    destroyed = true;
    window.removeEventListener('scroll', scrollHandler);
    if (pmove) stage.removeEventListener('pointermove', pmove);
    chapterCleanups.forEach(function (f) { f(); });
    near.disconnect(); inView.disconnect(); ro.disconnect();
    document.documentElement.classList.remove('cxai-immersive');
  };
}


export default function AiCreativity({
  workHref = '#work',
  ctaLabel = 'See the work',
  ctaArrow = '\u2193',
  dimHeader = true,
  basePath = '/ai-creativity',
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    injectTokens();
    if (!document.getElementById('cxai-styles')) {
      const s = document.createElement('style');
      s.id = 'cxai-styles';
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    const isMobile =
      window.matchMedia('(max-width: 767px)').matches ||
      (navigator.maxTouchPoints > 0 && window.innerWidth < 900);
    const SET = isMobile ? SETS.mobile : SETS.desktop;

    return initAiCreativity(rootRef.current, {
      map: SET.map,
      frameW: SET.w,
      frameH: SET.h,
      dimHeader,
      frameSrc: (i) => `${basePath}/${SET.dir}/f${String(i).padStart(3, '0')}.webp`,
    });
  }, [dimHeader, basePath]);

  const title = 'AI CREATIVITY';

  return (
    <section id="ai-creativity" className="cxai" ref={rootRef} aria-label="AI Creativity">
      <div className="cxai__track">
        <div className="cxai__stage">
          <canvas className="cxai__canvas" aria-hidden="true" />
          <div className="cxai__vig" aria-hidden="true" />
          <div className="cxai__scrim" aria-hidden="true" />
          <div className="cxai__grain" aria-hidden="true" />

          <div className="cxai__ui">
            <div className="cxai__intro">
              <h1 className="cxai__title" aria-label={title}>
                {title.split('').map((ch, i) => (
                  <i key={i} style={{ '--i': i }} aria-hidden="true">
                    {ch === ' ' ? '\u00a0' : ch}
                  </i>
                ))}
              </h1>
              <div className="cxai__hint">
                <p className="cxai__eyebrow">Scroll to explore</p>
                <span className="cxai__rule" aria-hidden="true" />
              </div>
            </div>

            <ol className="cxai__spine" aria-label="Chapters">
              {CHAPTERS.map((c, i) => (
                <li className="cxai__ch" key={c.num} aria-current={i === 0 ? 'true' : 'false'}>
                  <button type="button">
                    <span className="cxai__ch-line" aria-hidden="true" />
                    <span className="cxai__ch-name">{c.num} — {c.name}</span>
                    <span className="cxai__ch-sub">{c.sub}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="cxai__outro">
              <h2>Where ideas become visuals.</h2>
              <a
                className="cxai__cta"
                href={workHref}
                data-arrow={ctaArrow === '\u2193' ? 'down' : 'right'}
              >
                <span>{ctaLabel}</span> <em aria-hidden="true">{ctaArrow}</em>
              </a>
            </div>

            <a className="cxai__skip" href={workHref}>
              Skip the film <span aria-hidden="true">↓</span>
            </a>
            <p className="cxai__load">
              Loading the film <u aria-hidden="true" />
            </p>
            <div className="cxai__hud" aria-hidden="true">
              <b>000%</b>
              <i />
              <span data-name="">AI Creativity</span>
            </div>
            <div className="cxai__bar" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
