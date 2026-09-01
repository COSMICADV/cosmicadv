# COSMiC — /ai-creativity (v3)

Everything needed to build the page. Drop-in for Next.js, **zero new
dependencies**. Every class is namespaced (`cx-` / `cxai-` / `cxwk-`) and each
component injects its own `<style>` once, so nothing outside this page is
touched.

If you built v1, read **[§7 Upgrading from v1](#7-upgrading-from-v1)** — the
files are drop-in replacements but two prop names changed.

---

## What is in this zip

```
cosmic-ai-creativity-v3/
├── README.md                  ← you are here
├── CHANGES.md                 ← what changed from v1 and why (design rationale)
├── preview.html               ← open this first: the finished page, running
│
├── components/
│   ├── cosmicTokens.js        ← NEW in v3. Both components import it.
│   ├── AiCreativity.jsx       ← the scroll-scrubbed hero film
│   └── AiWorkGrid.jsx         ← the six films
│
├── app/
│   └── ai-creativity/
│       └── page.jsx           ← App Router page
│
└── public/
    ├── ai-creativity/         ← hero frame sequence
    │   ├── desktop/f000.webp … f079.webp    1200×675, 80 files, 1.44 MB
    │   ├── mobile/f000.webp  … f076.webp     720×405, 77 files, 0.79 MB
    │   └── poster.webp
    └── ai-work/               ← the six films
        ├── 01-seasonal-film.mp4     / .webp
        ├── 02-apparel-teaser.mp4    / .webp
        ├── 03-beverage-film.mp4     / .webp
        ├── 04-apparel-ecommerce.mp4 / .webp
        ├── 05-apparel-social.mp4    / .webp
        └── 06-motion-banner.mp4     / .webp
```

**Open `preview.html` from inside the unzipped folder.** It is the real page
with the real assets, using relative paths — so it only works in place, not
moved elsewhere. Fonts load from cosmicadv.com, so keep a connection.

Two things behave slightly differently over `file://` than they will on the
server, neither of them a bug: browsers treat local images as cross-origin, so
the hero's letterbox falls back to plain black instead of sampling each frame's
own edge colour; and some browsers block local `<video>` playback, in which
case the six films show their posters. Serving the folder
(`npx serve`, `python3 -m http.server`) makes both behave exactly as they will
in production.

---

## 1. Install

Copy `components/`, `app/` and `public/` into the project, merging with what is
already there. Nothing is overwritten except the two v1 component files.

```
components/cosmicTokens.js      ← new file
components/AiCreativity.jsx     ← replaces v1
components/AiWorkGrid.jsx       ← replaces v1
app/ai-creativity/page.jsx      ← replaces v1

public/ai-creativity/**         ← unchanged since v1, skip if already present
public/ai-work/**               ← unchanged since v1, skip if already present
```

`cosmicTokens.js` must sit beside the two components — both import it as
`./cosmicTokens`.

## 2. Point the homepage Solutions card at the page

The only change outside this folder. The `Ai Creativity` card in
`<section id="services">` becomes a link:

```jsx
import Link from 'next/link';

<Link href="/ai-creativity" className="…your existing card classes…">
  <h2>Ai Creativity</h2>
  <p>Redefining the future of content.</p>
</Link>
```

Nothing else on the homepage changes.

## 3. Props

**`AiCreativity`**

| Prop | Default | Notes |
|---|---|---|
| `workHref` | `'#work'` | **Renamed from `href` in v3.** Target for the CTA and the "Skip the film" link |
| `ctaLabel` | `'See the work'` | |
| `ctaArrow` | `'↓'` | `'↓'` animates down on hover, anything else animates right |
| `dimHeader` | `true` | Fades the site header once the film is pinned |
| `basePath` | `'/ai-creativity'` | Where the frame sequence lives |

**`AiWorkGrid`**

| Prop | Default | Notes |
|---|---|---|
| `basePath` | `'/ai-work'` | Where the six films live |
| `contactHref` | `'/#contact-me'` | Primary CTA on the closing card |
| `solutionsHref` | `'/#solutions'` | **New in v3.** Secondary link on the closing card |

---

## 4. The two dials you are most likely to be asked to change

**Scrub speed** — how far you scroll to play the hero film through once.
One custom property on `.cxai`, inside `AiCreativity.jsx`:

```css
.cxai{ --cxai-run:450vh }              /* desktop */
@media (max-width:767px){ .cxai{ --cxai-run:375vh } }
```

150vh was the v1 pace. 450vh is a third of that (the current setting). Change
this number and nothing else — the chapter beats, the intro fade and the outro
all sit on fractions of progress, so they stretch with it.

**Film size in the grid** — one custom property on `.cxwk`, inside
`AiWorkGrid.jsx`:

```css
.cxwk{ --cxwk-h:min(64svh,580px) }
```

Every film is contained inside this height whatever its aspect ratio, and the
films are bottom-aligned inside it, so all three captions in a row start on the
same line. Row A's middle column is set to `calc(var(--cxwk-h) * 0.5625)` —
exactly the width of the 9:16 teaser — so the two 16:9 films take everything
that is left over. Raising `--cxwk-h` grows all six films together.

---

## 5. Layout and content

The reel is **two rows of three**, and the number under each film is simply its
position in the `WORK` array. To reorder or renumber, reorder `WORK` — nothing
else needs touching. `ROWS` says how `WORK` is split:

```js
export const ROWS = [
  { shape: 'mixed',     from: 0, to: 3 },   // 16:9 · 9:16 · 16:9
  { shape: 'portraits', from: 3, to: 6 },   // three 9:16
];
```

`shape: 'mixed'` expects the 9:16 piece in the **middle** slot.

Display order vs. file names — the files were **not** renamed:

| Shown as | Title | File |
|---|---|---|
| `01` | Seasonal Campaign Film | `01-seasonal-film` |
| `02` | Apparel Campaign Teaser | `02-apparel-teaser` |
| `03` | Motion Banner | `06-motion-banner` |
| `04` | Beverage Brand Film | `03-beverage-film` |
| `05` | E-Commerce Reel | `04-apparel-ecommerce` |
| `06` | Social Reel | `05-apparel-social` |

All six are labelled generically — **no client names anywhere**. Titles, meta
lines and captions all live in the `WORK` array at the top of `AiWorkGrid.jsx`.

The hero's three chapter beats are in `CHAPTERS`, exported from
`AiCreativity.jsx`:

```js
export const CHAPTERS = [
  { num: '01', name: 'THE BRIEF', sub: 'It still starts with an idea.' },
  { num: '02', name: 'THE MODEL', sub: 'The machine draws every version of it.' },
  { num: '03', name: 'THE CUT',   sub: 'We choose the one that works.' },
];
```

---

## 6. Design tokens

`cosmicTokens.js` exports one CSS string and an `injectTokens()` that prepends
it to `<head>` once. Both components call it. Nothing in either stylesheet
hard-codes a colour, a size or an easing — if you need to restyle, change a
token.

**Ink on white**

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--cx-ink` | `#0a0a0a` | 19.8:1 | headings, numerals |
| `--cx-ink-80` | `#383838` | 10.1:1 | strong body |
| `--cx-ink-65` | `#5a5a5a` | 7.0:1 | body, captions |
| `--cx-ink-45` | `#767676` | 4.54:1 | meta, index — **AA floor, do not go lighter for text** |
| `--cx-ink-25` | `#b4b4b4` | — | decorative only, never text |

**White on black** — `--cx-lux` `#fff`, `--cx-lux-72` (10.9:1), `--cx-lux-50`
(5.3:1), `--cx-lux-30` and `--cx-lux-line` (decorative).

**Type** — Eurostile, four weights, seven sizes: `--cx-t-micro` 10 ·
`--cx-t-meta` 11 · `--cx-t-body` 14–16 · `--cx-t-lead` 16–19 · `--cx-t-title`
22–38 · `--cx-t-lede` 30–62 · `--cx-t-mega` 76–168.

**Space** — 8pt scale `--cx-1` … `--cx-10` (4 → 128), plus `--cx-gutter`
(20–64 fluid), `--cx-max` 1240, `--cx-tap` 44 (minimum interactive target).

**Motion** — `--cx-out` `cubic-bezier(.16,1,.3,1)` for entrances, `--cx-inout`
for loops; durations 180 / 340 / 620 / 900ms.

---

## 7. Upgrading from v1

Delete the two old component files, copy the three new ones in, and update the
page. Two breaking changes, both in props:

| Was | Now |
|---|---|
| `<AiCreativity href="#work" />` | `<AiCreativity workHref="#work" />` |
| — | `<AiWorkGrid solutionsHref="/#solutions" />` (optional, new) |

Everything else is source-compatible. Assets are untouched, so `public/` needs
no changes at all if v1 is already deployed.

Gone from v1: the fixed dot rail on the right, the one-piece-per-screen
scroll-snap, and the stats rail under the intro copy. All three were removed on
purpose — see `CHANGES.md`.

---

## 8. How it behaves

**The hero** is a WebP frame sequence painted on a `<canvas>` — no `<video>`, so
it cannot autoplay and does not hit the `currentTime` seek stutter that breaks
video scrubbing on iOS. 1.44 MB desktop / 0.79 MB mobile. Frames 0 and 79 load
first so something correct is on screen immediately, then the rest fill in six
at a time; the loading hairline tracks it. A frame that has not arrived yet
falls back to the nearest one that has, so fast scrolling never shows a blank.

**The chapter spine** on the left keeps all three beats visible, lights the live
one, and each is a real `<button>` that smooth-scrolls to that beat.
`aria-current` follows. A radial scrim sits behind it so the labels stay legible
when a bright frame passes underneath.

**"Skip the film"** appears at 6 % progress and hides at 86 %. It is a real
link, keyboard-reachable — the film is 4.5 viewports of scroll, so there has to
be a way past it.

**The header** stays put on arrival, so the nav is available. Once the visitor
is ~8 % into the film it fades out via a single page-scoped rule
(`html.cxai-immersive header{opacity:0}`) that is removed on unmount.
`dimHeader={false}` disables it.

**The films** play only while at least 35 % on screen, muted and looping, and
pause the moment they leave. Nothing downloads until a card is within ~1.2
viewports: `preload="none"` and the source is attached lazily. Landing on the
page fetches **zero** video.

**Sound** — clicking a film, or its corner control, unmutes it and mutes
whatever else was audible, so two soundtracks can never overlap. Scrolling away
re-mutes. On a fine pointer a pill follows the cursor inside the film naming
what a click will do; the corner button is the touch- and keyboard-accessible
control and is a 44px target.

**Reduced motion** (`prefers-reduced-motion: reduce`) un-pins the hero and
renders its final frame statically, but **keeps the story** — all three chapters
with their sublines, plus the outro. Reveals, parallax, snap and autoplay are
all off; every film becomes a poster the visitor can start themselves.

---

## 9. Accessibility

- Every text colour meets WCAG AA. Worst case is 4.54:1 (`--cx-ink-45` at 11px),
  measured in-browser across every text style on the page.
- Every interactive target is ≥44px.
- No nested interactive elements — the film block is not a button; the corner
  control is.
- Focus is visible on every control (2px offset outline in the opposing ink).
- Canvas, grain, vignette, rules, icons and progress bars are all `aria-hidden`.

---

## 10. Verified before handoff

Headless Chromium at 1440×900, 900×1000 and 390×844.

| Check | Result |
|---|---|
| JS console errors, both breakpoints and reduced motion | none |
| `AiCreativity.jsx`, `AiWorkGrid.jsx`, `cosmicTokens.js` compile | pass (esbuild) |
| Hero progress maps linearly 0→100 % across the run | pass (25/50/75/100) |
| Scrub run is 3× the v1 distance | pass (1350→4050px desktop, 1055→3165px mobile) |
| Chapter spine tracks and jumps correctly | pass |
| Row A captions land on one baseline | pass (654px, all three) |
| Film sizes at 1440px | `01`/`03` 454×255, `02` 324×576 |
| Cursor pill appears on hover, names the action | pass |
| Sound toggle flips label + `aria-label`, mutes the others | pass |
| Contrast of every text style | pass, floor 4.54:1 |
| Reduced motion keeps all three chapters | pass |
| Three-up → one-up below 1080px, no orphaned card | pass |

Headless Chromium cannot decode H.264, so the six `<video>` elements show their
posters in that environment; the playback, lazy-load and sound logic is
unchanged from v1, which was verified against a WebM build of the same page.
**Worth a real-browser pass on the playback line and autoplay before ship.**

---

## 11. Deliberately left alone

Header, navigation, footer, typography scale, Tailwind config, colour tokens,
and every existing homepage section apart from turning the Solutions
`Ai Creativity` card into a link.
