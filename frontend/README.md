# incomera — React port

The original single-file page, restructured as a Vite + React 18 app.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Layout

```
index.html                  head only — meta, favicon, Google font, #root
src/main.jsx                createRoot + global stylesheet import
src/App.jsx                 composes the 26 section components, in page order
src/components/*.jsx        the markup, one component per top-level section
src/styles/index.css        Tailwind entry — layers, theme tokens, @source
src/styles/styles.css       the original <style> blocks, minus what's migrated
src/legacy/crmDoc.html      the embedded CRM document (iframe srcdoc source)
src/hooks/useLegacyScripts  loads the 21 behaviour scripts after mount
public/legacy/*.js          those 21 scripts, untouched
public/assets/              demo-video.mp4, demo-poster.jpg
```

## What actually got converted

**The markup is real React.** All 2,587 lines of body HTML were parsed and
re-emitted as JSX — `class` → `className`, `for` → `htmlFor`, hyphenated SVG
attributes camelCased, `style="…"` strings turned into objects, inline `value`
turned into `defaultValue`, HTML comments into `{/* … */}`. Every component was
structurally validated. `data-*` and `aria-*` attributes are preserved verbatim,
which matters because the behaviour scripts select on them.

**The behaviour layer is still vanilla JS**, loaded as ordered `<script src>`
tags from a `useEffect` in `App`. This is deliberate rather than lazy:

- The 21 blocks talk to each other through globals (`window.openCRM`, shared
  helpers). Converting them to ES modules would silently break those links.
- Keeping one script element per block preserves parse isolation — a syntax
  error in one can't take down the other twenty, exactly as with inline
  `<script>`. That matters here, because `04-opens-an-overlay-instead.js` has a
  pre-existing extra `}` around line 140 and has never parsed, in this port or
  the original.
- `async = false` on a dynamically inserted script keeps execution in order.

So this is a **working React port, not an idiomatic React rewrite**. The code
still reaches for `document.getElementById` and mutates the DOM directly rather
than going through state and refs. Converting a section properly means replacing
its script block with `useState`/`useRef` and wiring handlers onto the JSX — that
is a per-section job, and roughly 6,400 lines of imperative code in total.

## Tailwind

Tailwind v4 is installed via `@tailwindcss/vite`. The setup in
`src/styles/index.css` is brownfield-specific in two ways:

- **Preflight is not imported.** Tailwind's base reset would flatten the
  existing design, and the legacy CSS assumes browser defaults. Once every
  section is migrated, replace the three sub-imports with `@import "tailwindcss";`.
- **The legacy stylesheet lives in a cascade layer.** Unlayered CSS beats
  layered CSS regardless of order, so without `@layer theme, legacy, components,
  utilities` the old rules would win over every utility.

The palette from `:root` is mapped into `@theme`, so `text-ink`, `bg-blue-deep`,
`border-line-2`, `font-mono` all resolve to the project's own tokens rather than
Tailwind defaults. `max-w-page` and `px-gutter` reproduce the legacy `.wrap`, and
`page:` is the original 820px layout breakpoint as a variant.

### State classes

The behaviour scripts run the UI by toggling classes — `classList.add("on")`,
`.add("open")`, `.add("bad")` and friends, roughly 250 times across the 21
files. `index.css` declares those as custom variants, which is what lets a
section move to utilities *without* rewriting its script:

```jsx
<div className="opacity-0 on:opacity-100" />   // legacy .on toggle still drives it
```

When the state sits on a parent and styles children, use the group pattern —
`group` on the parent, `group-[.on]:text-in` on the child. `Offer.jsx` shows
both, including a progress bar reading the `--p` variable the script sets:
`before:w-[var(--p,0%)]`.

### Migrated so far

| Component | Notes |
|---|---|
| `Footer.jsx` | pseudo-element overlays became real divs |
| `Offer.jsx` | group variants for the `.on` / `.done` step states |
| `Stack.jsx` | marquee shell only — see below |
| `Crtoast.jsx` | `on:` variant |
| `Crmframewrap.jsx` | `open:` variant |

Their rules are deleted from `styles.css`, which is down from 4,684 to 4,580
lines. The remaining 21 components still use it.

`Stack.jsx` is the honest edge case: the chips inside the marquee are built as
HTML strings by `02-constants.js`, so `.chip` has to stay in the stylesheet
until that script is rewritten. A component can only own the markup it renders
— anywhere the legacy JS generates markup, the CSS for it has to survive or the
script has to be converted first.

### Migrating another section

1. Rewrite its JSX with utilities; use `on:` / `open:` / `group-[.on]:` for
   anything the scripts toggle.
2. Delete its rules from `styles.css`.
3. Keep `js-*` and `reveal` classes — they are behaviour hooks, not styling.
4. Check the section doesn't generate markup from a legacy script (`.innerHTML =`
   in `public/legacy/`); if it does, that script has to move first.

## Known carry-overs from the original

- `CrmDocTemplate.jsx` renders a non-executing `<script type="text/html">`
  because `21-ensure.js` reads the CRM document back out of the DOM with
  `.textContent`. The `@@ENDSCRIPT@@` tokens inside are placeholders for
  `</script>` and are swapped back by that script — don't "fix" them.
- The original CRM template is cut short by an unescaped `</script>` partway
  through. Everything after that point (the reviews panel, the booking modal,
  the chat widget) leaks into the main page instead of the iframe. Browsers do
  the same thing, so this port reproduces it rather than silently changing the
  layout.
- The 2.9 MB video was a base64 data URI inside a script block; it now lives in
  `public/assets/` and is referenced by relative path.

## Suggested next steps

1. Rename the components — they're named after the original element ids
   (`Dmodal`, `Aemwrap`, `Crtoast`), which are terse.
2. Split `Dmodal.jsx` (89 KB) and `Adminwrap.jsx` (39 KB); both are several
   distinct screens in one element.
3. Convert one section at a time from the legacy script to hooks, deleting each
   file from `useLegacyScripts.js` as it goes.
