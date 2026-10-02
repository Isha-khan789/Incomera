/*
 * Migrated to Tailwind.
 *
 * The step board is driven by public/legacy/05-stagger-the-two-motions.js,
 * which walks the four items adding `.on` then `.done` and setting a `--p`
 * custom property for the progress bar. Both survive the migration:
 *   - each item is a `group`, so children react with `group-[.on]:` /
 *     `group-[.done]:` instead of the old `.stp__i.on .stp__s` selectors
 *   - the bar reads its width straight off the JS-set variable,
 *     `before:w-[var(--p,0%)]`
 *
 * `reveal` and `js-audit-open` are hooks, not styling — they stay.
 */
const STEPS = [
  { n: "01", days: "Days 1–5", title: "Baseline" },
  { n: "02", days: "Days 6–18", title: "Build" },
  { n: "03", days: "Days 19–25", title: "Train" },
  { n: "04", days: "Days 26–30", title: "Launch" },
];

export default function Offer() {
  return (
    <section
      id="offer"
      className="mx-auto w-full max-w-page px-gutter py-[clamp(58px,8vw,100px)]"
    >
      <div className="reveal mx-auto mb-0 max-w-[62ch] text-center">
        <span className="inline-flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.24em] text-muted uppercase before:size-[13px] before:rounded-full before:border before:border-line-2 before:content-['']">
          How we work · the 30-day build
        </span>
      </div>

      <div
        id="stpBoard"
        className="reveal mt-[30px] grid grid-cols-1 gap-0 border-t border-line min-[621px]:grid-cols-2 min-[901px]:grid-cols-4"
      >
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            data-p={i}
            className={[
              "group relative py-[22px] before:absolute before:top-px before:left-0 before:h-0.5",
              "before:w-[var(--p,0%)] before:bg-[linear-gradient(90deg,var(--color-blue),var(--color-blue-bright))]",
              "before:transition-[width] before:duration-300 before:ease-linear before:content-['']",
              "group-[.on]:before:bg-[linear-gradient(90deg,var(--color-blue),var(--color-in))]",
              // dividers: a top rule on every item except the first at narrow
              // widths, switching to left rules as the grid gains columns
              "[&:not(:first-child)]:border-t [&:not(:first-child)]:border-line",
              "min-[901px]:py-[26px] min-[901px]:pr-[30px]",
              i > 0 && "min-[901px]:border-t-0 min-[901px]:border-l min-[901px]:border-line min-[901px]:pl-[30px]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="font-mono text-xs font-semibold tracking-[0.08em] text-line-2 transition-colors duration-300 group-[.done]:text-blue group-[.on]:text-in-deep">
              {s.n}
            </span>
            <span className="mt-4 block font-mono text-[8.5px] tracking-[0.18em] text-muted uppercase">
              {s.days}
            </span>
            <h3 className="mt-2 text-[21px] tracking-[-0.025em] text-muted transition-colors duration-300 group-[.done]:text-ink group-[.on]:text-ink min-[901px]:text-2xl">
              {s.title}
            </h3>
            <span className="mt-3.5 inline-flex items-center gap-2 font-mono text-[8.5px] tracking-[0.16em] text-muted uppercase transition-colors duration-300 before:size-1.5 before:rounded-full before:bg-line-2 before:transition before:duration-300 before:content-[''] group-[.done]:text-good group-[.done]:before:bg-good group-[.on]:text-in-deep group-[.on]:before:animate-stpbeat group-[.on]:before:bg-in group-[.on]:before:shadow-[0_0_0_4px_rgba(21,197,222,.16)] motion-reduce:group-[.on]:before:animate-none">
              Queued
            </span>
          </div>
        ))}
      </div>

      <p className="reveal mt-[26px] text-center text-sm text-ink-2">
        I want the proposal first —{" "}
        <button type="button" className="fit__link js-audit-open">
          show me the baseline you set
        </button>
        .
      </p>
    </section>
  );
}
