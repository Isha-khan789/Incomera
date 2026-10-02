/* Migrated to Tailwind. The `on` variant maps to the .on class the legacy
   toast() helper adds and removes. */
export default function Crtoast() {
  return (
    <div
      id="crToast"
      className="pointer-events-none fixed bottom-6 left-1/2 z-[700] flex -translate-x-1/2 translate-y-[18px] items-center gap-2.5 rounded-[11px] border border-white/12 bg-[#0B1020] px-[18px] py-3 font-sans text-[13px] text-white opacity-0 shadow-[0_22px_50px_-20px_rgba(0,0,0,.7)] transition duration-[280ms] on:translate-y-0 on:opacity-100"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[15px] fill-none stroke-[#5CE0C0] stroke-[2.6] [stroke-linecap:round] [stroke-linejoin:round]"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span id="crToastT">Done</span>
    </div>
  );
}
