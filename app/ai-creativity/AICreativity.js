'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import './ai-creativity.css';

// Frame->slot map for the scroll-scrubbed hero canvas: mostly 1 frame per
// slot, but the tail (settle/zoom-out) holds on the same frames longer so
// the lerp doesn't have to fight sparse data while it eases to a stop.
const MAP = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
  70, 71, 72, 73, 74, 74, 74, 75, 75, 75, 76, 76, 76, 76, 77, 77, 77, 77, 77,
  77, 77, 77, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78,
  79,
];
const FW = 1200;
const FH = 675;
const FRAME_COUNT = 80;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/ai-creativity/frames/frame-${String(i).padStart(3, '0')}.webp`
);

const PANELS = [
  {
    orient: 'landscape',
    video: '/ai-creativity/videos/video-01.mp4',
    label: 'Seasonal Campaign Film',
    index: '01 / 06',
    title: 'Seasonal Campaign Film',
    meta: 'Brand film · 16:9 · 0:24',
    caption:
      'A holiday spot built end to end with generative video — cast, wardrobe, location and light, none of them booked.',
  },
  {
    orient: 'portrait',
    video: '/ai-creativity/videos/video-02.mp4',
    label: 'Apparel Campaign Teaser',
    index: '02 / 06',
    title: 'Apparel Campaign Teaser',
    meta: 'Paid social · 9:16 · 0:03',
    caption:
      'A three-second stopper for the feed. Product on-model, on-location, shot without either.',
  },
  {
    orient: 'portrait',
    video: '/ai-creativity/videos/video-03.mp4',
    label: 'Beverage Brand Film',
    index: '03 / 06',
    title: 'Beverage Brand Film',
    meta: 'Brand film · 9:16 · 0:41',
    caption:
      'Long-form vertical storytelling — a street, a summer and a payoff, at a runtime social usually cannot afford.',
  },
  {
    orient: 'portrait',
    video: '/ai-creativity/videos/video-04.mp4',
    label: 'E-Commerce Reel',
    index: '04 / 06',
    title: 'E-Commerce Reel',
    meta: 'Performance · 9:16 · 0:25',
    caption:
      'From ad click to unboxing in one continuous piece, built to be re-cut for every product drop.',
  },
  {
    orient: 'portrait',
    video: '/ai-creativity/videos/video-05.mp4',
    label: 'Social Reel',
    index: '05 / 06',
    title: 'Social Reel',
    meta: 'Always-on · 9:16 · 0:27',
    caption:
      'Everyday, unstaged, in-feed. The kind of footage that used to need a casting call.',
  },
  {
    orient: 'landscape',
    video: '/ai-creativity/videos/video-06.mp4',
    label: 'Motion Banner',
    index: '06 / 06',
    title: 'Motion Banner',
    meta: 'Display · 16:9 · 0:10',
    caption:
      'A looping brand banner — abstract, weightless and light enough to sit on any page.',
  },
];

export default function AICreativity() {
  const heroRef = useRef(null);
  const workRef = useRef(null);

  useEffect(() => {
    const cleanups = [];

    // ============ 1. scroll-scrubbed hero canvas ============
    (function initHero() {
      const root = heroRef.current;
      if (!root) return;

      const canvas = root.querySelector('.cxai__canvas');
      const track = root.querySelector('.cxai__track');
      const intro = root.querySelector('.cxai__intro');
      const outro = root.querySelector('.cxai__outro');
      const bar = root.querySelector('.cxai__bar');
      const barFill = root.querySelector('.cxai__bar i');
      const counter = root.querySelector('.cxai__count');
      const loadEl = root.querySelector('.cxai__load');
      const vig = root.querySelector('.cxai__vig');
      const chapters = Array.prototype.slice.call(
        root.querySelectorAll('.cxai__chapter')
      );
      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

      const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
      const range = (v, a, b) => clamp((v - a) / (b - a));
      const smooth = (t) => t * t * (3 - 2 * t);

      const CHAPTERS = [
        { in: 0.14, out: 0.32 },
        { in: 0.36, out: 0.56 },
        { in: 0.6, out: 0.76 },
      ];

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      const SLOTS = MAP.length;
      const COUNT = FRAME_COUNT;
      const frames = new Array(COUNT);

      let ready = false;
      let drawnAsset = -1;
      let lastFit = null;
      let target = 0;
      let current = 0;
      let running = false;
      let active = false;
      let vw = 1;
      let vh = 1;
      let dpr = 1;
      let rafId = null;

      function measure() {
        const r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        vw = Math.max(1, Math.round(r.width));
        vh = Math.max(1, Math.round(r.height));
        canvas.width = Math.round(vw * dpr);
        canvas.height = Math.round(vh * dpr);
        drawnAsset = -1;
        lastFit = null;
      }

      const bgCache = {};
      function bgOf(assetIdx, img) {
        if (bgCache[assetIdx]) return bgCache[assetIdx];
        let rgb = [0, 0, 0];
        try {
          const c = document.createElement('canvas');
          c.width = 1;
          c.height = 1;
          const x = c.getContext('2d', { willReadFrequently: true });
          x.drawImage(img, 0, 0, Math.round(FW * 0.09), Math.round(FH * 0.09), 0, 0, 1, 1);
          const d = x.getImageData(0, 0, 1, 1).data;
          rgb = [d[0], d[1], d[2]];
        } catch (e) {}
        bgCache[assetIdx] = rgb;
        return rgb;
      }

      function paint(p, assetIdx, force) {
        const img = frames[assetIdx];
        if (!img) return;
        const settle = smooth(range(p, 0.7, 0.92));
        const key = `${assetIdx}|${settle.toFixed(3)}|${vw}x${vh}`;
        if (!force && key === lastFit) return;
        lastFit = key;

        const contain = Math.min(vw / FW, vh / FH);
        const cover = Math.max(vw / FW, vh / FH);
        const open = Math.min(cover, contain * 1.22);
        const fin = contain * (isMobile ? 1 : 0.8);
        const scale = open + (fin - open) * settle;
        const lift = (isMobile ? 0.13 : 0.055) * vh * settle;

        const dw = FW * scale;
        const dh = FH * scale;
        const dx = (vw - dw) / 2;
        const dy = (vh - dh) / 2 - lift;

        const bgc = bgOf(assetIdx, img);
        const br = bgc[0];
        const bgg = bgc[1];
        const bb = bgc[2];
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = `rgb(${Math.round(br * settle)},${Math.round(bgg * settle)},${Math.round(bb * settle)})`;
        ctx.fillRect(0, 0, vw, vh);
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, dx, dy, dw, dh);

        if (settle > 0.001) {
          const fx = Math.min(dw * 0.05, 70) * settle;
          const fy = Math.min(dh * 0.06, 52) * settle;
          const c0 = `rgba(${br},${bgg},${bb},1)`;
          const c1 = `rgba(${br},${bgg},${bb},0)`;
          const edge = (x, y, w, h, x0, y0, x1, y1) => {
            const g = ctx.createLinearGradient(x0, y0, x1, y1);
            g.addColorStop(0, c0);
            g.addColorStop(1, c1);
            ctx.fillStyle = g;
            ctx.fillRect(x, y, w, h);
          };
          edge(dx, dy, dw, fy, 0, dy, 0, dy + fy);
          edge(dx, dy + dh - fy, dw, fy, 0, dy + dh, 0, dy + dh - fy);
          edge(dx, dy, fx, dh, dx, 0, dx + fx, 0);
          edge(dx + dw - fx, dy, fx, dh, dx + dw, 0, dx + dw - fx, 0);
        }
      }

      function nearestLoaded(i) {
        if (frames[i]) return i;
        for (let d = 1; d < COUNT; d++) {
          if (frames[i - d]) return i - d;
          if (frames[i + d]) return i + d;
        }
        return -1;
      }

      function setOverlays(p) {
        const io = smooth(range(p, 0, 0.11));
        intro.style.opacity = String(1 - io);
        intro.style.transform = `translateY(${io * -22}px)`;
        intro.style.filter = `blur(${io * 5}px)`;

        for (let i = 0; i < chapters.length; i++) {
          const c = CHAPTERS[i];
          const a = smooth(range(p, c.in, c.in + 0.05)) * (1 - smooth(range(p, c.out - 0.05, c.out)));
          chapters[i].style.opacity = String(a);
          chapters[i].style.transform = `translateY(${(1 - a) * 8}px)`;
        }

        const o = smooth(range(p, 0.86, 0.97));
        outro.style.opacity = String(o);
        outro.style.transform = `translateY(${(1 - o) * 22}px)`;
        outro.style.pointerEvents = o > 0.6 ? 'auto' : 'none';

        const recede = smooth(range(p, 0.88, 1));
        bar.style.opacity = String(1 - recede * 0.85);
        counter.style.opacity = String(1 - recede);
        if (vig) vig.style.opacity = String(1 - smooth(range(p, 0.7, 0.92)));
        barFill.style.transform = `scaleX(${p})`;
        counter.textContent = `${`00${Math.round(p * 100)}`.slice(-3)} / 100`;
      }

      function readProgress() {
        const r = track.getBoundingClientRect();
        const dist = r.height - window.innerHeight;
        if (dist <= 0) return 0;
        return clamp(-r.top / dist);
      }

      function tick() {
        const d = target - current;
        current = Math.abs(d) < 0.0006 ? target : current + d * 0.16;

        const slot = Math.round(current * (SLOTS - 1));
        const want = MAP[slot];
        const have = nearestLoaded(want);
        if (have >= 0) {
          if (have !== drawnAsset) {
            paint(current, have, true);
            drawnAsset = have;
          } else paint(current, have, false);
        }
        setOverlays(current);
        setImmersive(isPinned());

        if (current !== target || !ready) rafId = requestAnimationFrame(tick);
        else running = false;
      }
      function kick() {
        if (!running) {
          running = true;
          rafId = requestAnimationFrame(tick);
        }
      }

      let immersive = false;
      function setImmersive(pinned) {
        const want = pinned && (immersive ? current > 0.04 : current > 0.08);
        if (want === immersive) return;
        immersive = want;
        document.documentElement.classList.toggle('cxai-immersive', want);
      }
      function isPinned() {
        const r = track.getBoundingClientRect();
        return r.top <= 8 && r.bottom >= window.innerHeight - 8;
      }
      function onScroll() {
        if (active) {
          target = readProgress();
          kick();
        }
        setImmersive(isPinned());
      }

      let loaded = 0;
      function load(i) {
        return new Promise((res) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = FRAMES[i];
          const done = () => {
            frames[i] = img;
            loaded++;
            if (loadEl) loadEl.textContent = `Loading ${Math.round((loaded / COUNT) * 100)}%`;
            res();
          };
          if (img.decode) img.decode().then(done, done);
          else {
            img.onload = done;
            img.onerror = done;
          }
        });
      }

      let started = false;
      function preload() {
        if (started) return;
        started = true;
        Promise.all([load(0), load(COUNT - 1)]).then(() => {
          root.classList.add('is-ready');
          ready = true;
          measure();
          target = readProgress();
          current = target;
          kick();
          let cursor = 1;
          function worker() {
            if (cursor >= COUNT - 1) return Promise.resolve();
            return load(cursor++).then(worker);
          }
          const ws = [];
          for (let k = 0; k < 6; k++) ws.push(worker());
          Promise.all(ws).then(() => {
            drawnAsset = -1;
            lastFit = null;
            kick();
          });
        });
      }

      if (reduced) {
        root.classList.add('is-ready');
        load(COUNT - 1).then(() => {
          measure();
          paint(1, COUNT - 1, true);
          setOverlays(1);
        });
        const ro = new ResizeObserver(() => {
          measure();
          paint(1, COUNT - 1, true);
        });
        ro.observe(canvas);
        cleanups.push(() => ro.disconnect());
      } else {
        const preloadObs = new IntersectionObserver(
          (es) => {
            for (let i = 0; i < es.length; i++) if (es[i].isIntersecting) preload();
          },
          { rootMargin: '100% 0px' }
        );
        preloadObs.observe(root);
        cleanups.push(() => preloadObs.disconnect());

        const activeObs = new IntersectionObserver(
          (es) => {
            active = es[0].isIntersecting;
            if (active) {
              target = readProgress();
              kick();
            }
          },
          { threshold: [0, 0.01, 0.5, 0.99] }
        );
        activeObs.observe(track);
        cleanups.push(() => activeObs.disconnect());

        window.addEventListener('scroll', onScroll, { passive: true });
        cleanups.push(() => window.removeEventListener('scroll', onScroll));

        const ro = new ResizeObserver(() => {
          measure();
          drawnAsset = -1;
          lastFit = null;
          kick();
        });
        ro.observe(canvas);
        cleanups.push(() => ro.disconnect());

        measure();
        setOverlays(0);
        onScroll();
      }

      cleanups.push(() => {
        if (rafId) cancelAnimationFrame(rafId);
        document.documentElement.classList.remove('cxai-immersive');
      });
    })();

    // ============ 2. the work (portfolio panels) ============
    (function initWork() {
      const root = workRef.current;
      if (!root) return;

      document.documentElement.classList.add('cxwk-page');
      cleanups.push(() => document.documentElement.classList.remove('cxwk-page'));

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const panels = Array.prototype.slice.call(root.querySelectorAll('.cxwk__panel'));
      const rail = root.querySelector('.cxwk__rail');
      const dots = rail ? Array.prototype.slice.call(rail.querySelectorAll('button')) : [];
      const allVideos = Array.prototype.slice.call(root.querySelectorAll('video'));

      function syncSound(v) {
        const media = v.closest('.cxwk__media');
        const btn = media && media.querySelector('.cxwk__sound');
        if (!btn) return;
        btn.textContent = v.muted ? 'Sound on' : 'Sound off';
        btn.setAttribute('aria-pressed', String(!v.muted));
      }

      const lazy = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const v = e.target.querySelector('video');
            if (v && !v.src && v.dataset.src) v.src = v.dataset.src;
            lazy.unobserve(e.target);
          });
        },
        { rootMargin: '150% 0px' }
      );
      panels.forEach((p) => lazy.observe(p));
      cleanups.push(() => lazy.disconnect());

      if (!reduced) {
        const playObs = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              const v = e.target.querySelector('video');
              if (!v) return;
              if (e.isIntersecting) {
                if (!v.src && v.dataset.src) v.src = v.dataset.src;
                const p = v.play();
                if (p && p.catch) p.catch(() => {});
              } else {
                v.pause();
                if (!v.muted) {
                  v.muted = true;
                  syncSound(v);
                }
              }
            });
          },
          { threshold: 0.5 }
        );
        panels.forEach((p) => playObs.observe(p));
        cleanups.push(() => playObs.disconnect());
      }

      function onScreen(v) {
        const r = v.getBoundingClientRect();
        return r.bottom > window.innerHeight * 0.25 && r.top < window.innerHeight * 0.75;
      }
      function toggleSound(v) {
        const turningOn = v.muted;
        allVideos.forEach((o) => {
          if (o !== v && !o.muted) {
            o.muted = true;
            syncSound(o);
          }
        });
        v.muted = !turningOn;
        if (turningOn && onScreen(v)) {
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        }
        syncSound(v);
      }

      function onRootClick(ev) {
        const media = ev.target.closest('.cxwk__media');
        if (!media) return;
        const v = media.querySelector('video');
        if (!v) return;
        if (ev.target.closest('.cxwk__sound') || ev.target.tagName === 'VIDEO') {
          ev.preventDefault();
          toggleSound(v);
        }
      }
      root.addEventListener('click', onRootClick);
      cleanups.push(() => root.removeEventListener('click', onRootClick));

      if (dots.length) {
        const railObs = new IntersectionObserver(
          (es) => {
            es.forEach((e) => {
              const i = panels.indexOf(e.target);
              if (i < 0) return;
              if (e.isIntersecting && e.intersectionRatio > 0.5) {
                dots.forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
              }
            });
            const any = panels.some((p) => {
              const r = p.getBoundingClientRect();
              return r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
            });
            rail.classList.toggle('is-on', any);
          },
          { threshold: [0, 0.5, 0.9] }
        );
        panels.forEach((p) => railObs.observe(p));
        cleanups.push(() => railObs.disconnect());

        const dotHandlers = dots.map((d, i) => {
          const handler = () => panels[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
          d.addEventListener('click', handler);
          return [d, handler];
        });
        cleanups.push(() => dotHandlers.forEach(([d, handler]) => d.removeEventListener('click', handler)));
      }

      allVideos.forEach(syncSound);
    })();

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <section id="ai-creativity" className="cxai" aria-label="AI Creativity" ref={heroRef}>
        <div className="cxai__track">
          <div className="cxai__stage">
            <canvas className="cxai__canvas" aria-hidden="true" />
            <div className="cxai__vig" aria-hidden="true" />
            <div className="cxai__scrim" aria-hidden="true" />
            <div className="cxai__grain" aria-hidden="true" />
            <div className="cxai__ui">
              <div className="cxai__intro">
                <h1 className="cxai__title">AI Creativity</h1>
                <div className="cxai__hint">
                  <p className="cxai__eyebrow">Scroll to explore</p>
                  <span className="cxai__rule" aria-hidden="true" />
                </div>
              </div>
              <div className="cxai__chapters" aria-hidden="true">
                <span className="cxai__chapter">01 — PROMPT</span>
                <span className="cxai__chapter">02 — SYNTHESIS</span>
                <span className="cxai__chapter">03 — FORM</span>
              </div>
              <div className="cxai__outro">
                <h3>Where ideas become visuals.</h3>
                <a className="cxai__cta" data-arrow="down" href="#work">
                  See the work <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="cxai__load">Loading</p>
              <div className="cxai__count">000 / 100</div>
              <div className="cxai__bar" aria-hidden="true">
                <i />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cxwk" id="work" ref={workRef}>
        <div className="cxwk__intro">
          <p className="cxwk__kicker">Selected AI work</p>
          <h2 className="cxwk__lede">Ideas first. The camera was optional.</h2>
          <div className="cxwk__body">
            <p>
              We use generative AI the way we use a lens or a pen — as a tool in the hands of
              people who already know what a good idea looks like. Every piece below started as a
              brief, a script and a board.
            </p>
            <p>
              What changed is the distance between the idea and the visual. No location scout, no
              crew call, no six-week turnaround — so the budget goes into the thinking instead of
              the logistics.
            </p>
          </div>
        </div>

        {PANELS.map((panel) => (
          <article className="cxwk__panel" data-orient={panel.orient} key={panel.video}>
            <div className="cxwk__inner">
              <div className="cxwk__media">
                <video
                  data-src={panel.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={panel.label}
                />
                <button className="cxwk__sound" type="button" aria-pressed="false">
                  Sound on
                </button>
              </div>
              <div className="cxwk__text">
                <div>
                  <p className="cxwk__index">{panel.index}</p>
                  <h3 className="cxwk__title">{panel.title}</h3>
                  <p className="cxwk__meta">{panel.meta}</p>
                </div>
                <p className="cxwk__caption">{panel.caption}</p>
              </div>
            </div>
          </article>
        ))}

        <nav className="cxwk__rail" aria-label="Work navigation">
          {PANELS.map((panel, i) => (
            <button
              type="button"
              aria-current={i === 0 ? 'true' : 'false'}
              aria-label={panel.label}
              key={panel.video}
            >
              <i />
            </button>
          ))}
        </nav>

        <div className="cxwk__end">
          <h2>Have something in mind?</h2>
          <p>
            Bring us the idea. We will show you what it looks like before you commit a production
            budget to it.
          </p>
          <Link className="cxwk__cta" href="/#contact-me">
            Start a project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
