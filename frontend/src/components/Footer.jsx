/*
 * Migrated to Tailwind. Its rules have been deleted from styles.css, so this
 * component owns its own appearance — nothing else in the stylesheet targets
 * it. The two decorative overlays were ::before / ::after pseudo-elements in
 * the original; as real divs they read better in JSX than before:/after:
 * variants carrying long arbitrary gradients.
 *
 * `js-audit-open` on the button is a behaviour hook that legacy scripts select
 * on — it carries no styling and must stay.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(168deg,#0A1734_0%,#101F46_46%,#152A63_100%)] pt-[46px] pb-6 text-[rgb(214_228_255_/_0.72)] page:pt-16 page:pb-[26px]">
      {/* faint 44px grid, faded out toward the bottom right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(90%_70%_at_18%_0%,#000,transparent_74%)]"
      />
      {/* teal and blue corner glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(52%_60%_at_96%_6%,rgba(15,181,166,.16),transparent_64%),radial-gradient(46%_56%_at_4%_96%,rgba(59,73,240,.20),transparent_66%)]"
      />

      <div className="relative z-[1] mx-auto w-full max-w-page px-gutter">
        <div className="grid items-start gap-[26px] page:grid-cols-[minmax(0,1fr)_auto] page:items-end page:gap-11">
          <div>
            <a
              href="#top"
              aria-label="Incomera home"
              className="flex items-center gap-2.5 text-[19px] font-[650] text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" className="size-6">
                <defs>
                  <radialGradient id="ig-b6" cx="36%" cy="29%" r="74%">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset=".26" stopColor="#B4D8F8" />
                    <stop offset=".62" stopColor="#4E90E9" stopOpacity=".98" />
                    <stop offset="1" stopColor="#2233B4" />
                  </radialGradient>
                </defs>
                <circle cx="12" cy="12" r="9.35" stroke="#8E97FF" strokeWidth=".82" opacity=".82" />
                <path
                  d="M12 2.62L12 .92M15.59 3.34L16.24 1.77M18.63 5.37L19.83 4.17M20.66 8.41L22.23 7.76M21.38 12L23.08 12M20.66 15.59L22.23 16.24M18.63 18.63L19.83 19.83M15.59 20.66L16.24 22.23M12 21.38L12 23.08M8.41 20.66L7.76 22.23M5.37 18.63L4.17 19.83M3.34 15.59L1.77 16.24M2.62 12L.92 12M3.34 8.41L1.77 7.76M5.37 5.37L4.17 4.17M8.41 3.34L7.76 1.77"
                  stroke="#8E97FF"
                  strokeWidth=".82"
                  strokeLinecap="round"
                  opacity=".82"
                />
                <circle cx="12" cy="12" r="6.35" stroke="#2BE0CE" strokeWidth=".95" />
                <circle cx="12" cy="12" r="4.3" fill="url(#ig-b6)" />
              </svg>
              Incomera
            </a>

            <p className="mt-[18px] max-w-none text-[19px] leading-[1.42] font-semibold tracking-[-0.022em] text-white [text-wrap:pretty] page:max-w-[52ch] page:text-[22px]">
              <b className="bg-[linear-gradient(92deg,#8AD9FB,#5CE0C0)] bg-clip-text font-semibold text-transparent">
                Income + era.
              </b>{" "}
              We build the engine that earns for you &mdash; outbound and inbound
              &mdash; then we run it. Your pipeline never clocks off.
            </p>
          </div>

          <button
            type="button"
            className="js-audit-open flex w-full shrink-0 cursor-pointer items-center justify-center gap-[9px] rounded-xl border-0 bg-white px-5 py-[13px] font-sans text-sm font-semibold whitespace-nowrap text-navy transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_rgba(0,0,0,.6)] page:inline-flex page:w-auto"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-[15px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            >
              <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
            </svg>
            Get a free proposal
          </button>
        </div>

        <div className="mt-[34px] flex flex-wrap justify-between gap-3 border-t border-[rgb(125_211_252_/_0.16)] pt-5 font-mono text-[10px] tracking-[0.14em] text-[rgb(190_210_245_/_0.5)] uppercase page:mt-[46px]">
          <span className="inline-flex items-start gap-2">
            <i className="mt-1 size-[5px] shrink-0 animate-fpulse rounded-full bg-[#34D399] shadow-[0_0_0_3px_rgba(52,211,153,.2)] motion-reduce:animate-none" />
            Incomera &middot; income, for an era that never clocks off
          </span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
