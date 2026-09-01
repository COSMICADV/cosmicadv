# COSMiC — AI Creativity page, v3

v2 was the polish + motion pass. v3 is the layout change on top of it.

---

## 0. v3 — the work section is now two rows of three

**The problem:** six films, each given a full screen, meant most of the page
was empty white between videos. Desktop page height was 9,131px.

**The change:** two rows of three. Desktop page height is now **5,313px** —
the reel reads in about two screens instead of six.

| Row | Films | Why |
|---|---|---|
| **A** | `01` Seasonal Campaign Film · `02` Apparel Campaign Teaser · `03` Motion Banner | Your grouping. The short 9:16 teaser sits in the middle, flanked by the two 16:9 films |
| **B** | `04` Beverage Brand Film · `05` E-Commerce Reel · `06` Social Reel | The three remaining 9:16 pieces, identical size |

**Renumbered** to match the new order — the number under each film is its
position on the page, nothing else. Asset filenames are **unchanged**, so
nothing in `/public` moves:

| Shown as | File |
|---|---|
| `01` | `01-seasonal-film` |
| `02` | `02-apparel-teaser` |
| `03` | `06-motion-banner` |
| `04` | `03-beverage-film` |
| `05` | `04-apparel-ecommerce` |
| `06` | `05-apparel-social` |

**How mixed ratios sit in one row:** a 16:9 and a 9:16 can never be the same
height, so instead of fighting it, every film is contained inside one shared
frame height (`--cxwk-h`, `min(64svh, 580px)`) and **bottom-aligned**. The
films land on a common baseline and all three captions start on the same
line — verified at 654px across row A.

**Scale.** The films now run wider than the intro text (rows cap at 1560px,
the text block stays at 1240px), and row A's middle column is set to exactly
the teaser's width so the two 16:9 films take everything left over instead of
sitting in equal thirds. At 1440px that puts `01` and `03` at **454 × 255**,
up from 344 × 193 — a third bigger. `02` is 324 × 576.

**Scrub speed: 3× slower.** The hero film now plays through over 450vh of
scroll instead of 150vh (375vh on phones), so the same footage advances at a
third of the pace. It is a single dial — `--cxai-run` on `.cxai` — so it can
be retuned in one line without touching anything else. The chapter beats,
intro fade and outro all sit on fractions of progress, so they stretch with
it. "Skip the film" and the chapter spine buttons are the way past it for
anyone who does not want the full run.

**Removed: the stats rail** (`06 pieces · 02:10 runtime · 00 shoot days`)
under the intro copy, along with the `FACTS` export.

**Responsive:** three-up above 1080px; below that it stacks to one-up at each
film's natural ratio. Two-up is deliberately skipped — it would orphan the
third card of each row.

**Removed:** the fixed side rail and the scroll-snap. Both existed to
navigate six full-screen panels; with the whole reel visible in two screens
there is nothing left to navigate. The section progress bar now runs on every
screen size instead of just mobile.

---

## The v2 pass (still in place)

Monochrome kept. Structure kept. Everything below is craft, motion and
accessibility on top of the v1 you already had.

---

## 1. Design critique of v1 — what this pass fixes

| # | Finding | Severity | Fixed by |
|---|---------|----------|----------|
| 1 | Only one interactive element on the whole page (the sound toggle), and clicking a video to unmute was undiscoverable | 🔴 | Cursor pill inside the media that names the action, jumpable chapter spine, playback line, skip link |
| 2 | Chapter labels (`01 — PROMPT`…) appeared and dissolved one at a time in a corner at 11px — the story beat was there, the presence wasn't | 🔴 | Chapter **spine** on the left: all three beats stay visible, the live one lights up, each is a real button that jumps to that beat |
| 3 | Meta and index text at `#9a9a9a` on white = **2.85:1** — fails WCAG AA | 🔴 | Ink scale rebuilt; the lightest text token is now `#767676` = **4.54:1**, exactly the AA floor |
| 4 | Rail dots were 22px targets with no labels — below the 24px minimum, invisible below 900px | 🟡 | Rail retired in v3; the section progress bar now runs at every width |
| 5 | Hard cut from the black film into the white grid, with the white header snapping back | 🟡 | The film's black now carries through the whole intro and dissolves into white above the first row |
| 6 | Panels appeared with no choreography — text just existed | 🟡 | Staggered scroll reveals on every text block; media scales in from 0.985 |
| 7 | Flat type hierarchy — one big lede, then everything else 11–34px | 🟡 | Piece number promoted to a large tabular numeral; type scale formalised |
| 8 | Six near-identical greys, hard-coded, no system | 🟡 | One token layer (`cosmicTokens.js`) — no colour, size or easing is hard-coded in either component |
| 9 | Reduced motion dumped the entire hero to a static poster and hid the chapters — the story was lost, not adapted | 🟡 | Reduced motion now keeps the story: poster + all three chapters stacked and legible, no scrub |
| 10 | `000 / 100` counter read as debug UI | 🟢 | HUD now reads `043% · THE MODEL` |
| 11 | Landscape panels overflowed 100vh on laptop screens | 🟢 | Superseded by the v3 grid |

**What already worked and was left alone:** the canvas frame-scrubbing engine
(nearest-loaded fallback, edge-colour letterbox, lerp-and-snap) — it is good
engineering — and the voice of the copy.

---

## 2. Design system

`cosmicTokens.js` — injected once, ahead of both component stylesheets.

**Ink scale (on white)**

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--cx-ink` | `#0a0a0a` | 19.8:1 | headings, numerals |
| `--cx-ink-80` | `#383838` | 10.1:1 | strong body |
| `--cx-ink-65` | `#5a5a5a` | 7.0:1 | body, captions |
| `--cx-ink-45` | `#767676` | 4.54:1 | meta, index — **AA floor, do not go lighter for text** |
| `--cx-ink-25` | `#b4b4b4` | — | decorative only, never text |

**Paper on ink** — `--cx-lux` `#fff`, `--cx-lux-72` (10.9:1), `--cx-lux-50`
(5.3:1), `--cx-lux-30` (decorative), `--cx-lux-line` (hairlines).

**Type** — one family (Eurostile), four weights, seven sizes:
`--cx-t-micro` 10 · `--cx-t-meta` 11 · `--cx-t-body` 14–16 · `--cx-t-lead` 16–19 ·
`--cx-t-title` 22–38 · `--cx-t-lede` 30–62 · `--cx-t-mega` 76–168.

**Space** — 8pt scale `--cx-1` … `--cx-10` (4 → 128), plus `--cx-gutter`
(20–64 fluid), `--cx-max` 1240, `--cx-tap` 44 (every interactive target).

**Motion** — `--cx-out` `cubic-bezier(.16,1,.3,1)` for entrances,
`--cx-inout` for loops; durations 180 / 340 / 620 / 900ms.

**Button pattern** — one shape, two skins (`.cxai__cta` white-on-black,
`.cxwk__cta` black-on-white). Hover wipes the fill in from the bottom and
nudges the arrow. Focus is a 2px offset outline in the opposite ink.

---

## 3. UX copy

| Element | v1 | v2 | Why |
|---|---|---|---|
| Chapter 1 | `01 — PROMPT` | `01 — THE BRIEF` / *It still starts with an idea.* | Abstract nouns had no payoff; these are the three beats a client actually recognises, and the subline reassures the sceptical reader on beat one |
| Chapter 2 | `02 — SYNTHESIS` | `02 — THE MODEL` / *The machine draws every version of it.* | Plain language over jargon |
| Chapter 3 | `03 — FORM` | `03 — THE CUT` / *We choose the one that works.* | Puts the human back at the end of the process |
| Progress | `000 / 100` | `043% · THE MODEL` | Tells you where you are in the story, not in a counter |
| Loading | `Loading 43%` | `Loading the film` + a filling hairline | Sets the expectation ("a film is coming"), no number to stare at |
| Escape | — | `Skip the film ↓` | 250vh of scroll needs an exit; keyboard reachable |
| Sound control | `Sound on` (ambiguous state) | `Sound on` / `Sound off` as the *action*, with `aria-label` "Turn sound on for *Beverage Brand Film*" | Visible label stays short; screen readers get the unambiguous version |
| End card | `Have something in mind?` | `Tell us the idea.` | Imperative beats a rhetorical question; matches "Start a project" |
| Secondary | — | `See all solutions` | Gives the not-yet-ready reader somewhere to go |

---

## 4. Interaction inventory

- **Chapter spine** — three buttons; click or Enter smooth-scrolls to that beat. `aria-current` tracks the live chapter.
- **Pointer parallax** — the frame drifts ±9px with the cursor. Fine pointers only.
- **Kinetic title** — per-letter rise, 34ms apart, on first paint.
- **Skip the film** — appears at 6% progress, hides at 86%.
- **Scroll reveals** — every text block rises 22px with a 70ms-per-item stagger; media scales in over 900ms.
- **Cursor pill** — follows the pointer inside a film and names what a click does. The corner button remains for touch and keyboard.
- **Playback line** — 2px white line under each film, tracking `currentTime`.
- **Section progress** — 2px top bar tracking scroll through the two rows, at every width.

---

## 5. Accessibility

- Every text colour meets WCAG AA (worst case 4.54:1, verified in-browser).
- Every interactive target is ≥44px.
- No nested interactive elements: the media block is not a button; the corner control is.
- `prefers-reduced-motion` gets a real layout, not a stub — poster, all three chapters with their sublines, and the outro, with no scrub, no snap, no reveals, no parallax.
- Focus is visible on every control (2px offset outline).
- Decorative canvas, grain, vignette, rules and numerals are all `aria-hidden`.

---

## 6. Integration

Drop-in replacements — same component names, same asset paths, same props
(plus a few new ones). `/public/ai-creativity/**` and `/public/ai-work/**` are
**unchanged**; do not re-export the assets.

```
components/
  cosmicTokens.js     ← new, imported by both
  AiCreativity.jsx    ← replaces v1
  AiWorkGrid.jsx      ← replaces v1
```

`AiWorkGrid` now exports `WORK` **in display order** plus a `ROWS` array
(`[{shape:'mixed', from:0, to:3}, {shape:'portraits', from:3, to:6}]`).
To reorder or renumber the reel, reorder `WORK` — the numbers follow.
`shape: 'mixed'` expects the 9:16 piece in the middle slot.

```jsx
import AiCreativity from '@/components/AiCreativity';
import AiWorkGrid   from '@/components/AiWorkGrid';

<AiCreativity workHref="/ai-work" />          // was `href`
<AiWorkGrid contactHref="/#contact-me" solutionsHref="/#solutions" />
```

Prop changes: `AiCreativity` renames `href` → `workHref` and defaults
`ctaLabel` to `"See the work"`; `AiWorkGrid` gains `solutionsHref`.
`CHAPTERS` is now exported from `AiCreativity` if you want to edit the beats
without touching the component.

`cosmic-ai-creativity-page-preview-v2.html` is the same page as a single
self-contained file — open it in a browser to review. Fonts load from
cosmicadv.com; the videos in it are the compressed preview copies.
