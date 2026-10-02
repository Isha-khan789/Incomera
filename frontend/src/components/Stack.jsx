/*
 * Migrated to Tailwind. The two rows are marquees; their contents (.chip
 * elements) are generated at runtime by public/legacy/02-constants.js, so the
 * `.chip` rules stay in styles.css until that script is rewritten — a
 * component can only own the markup it actually renders.
 */
export default function Stack() {
  const row =
    "relative overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]";
  const track =
    "flex w-max gap-[9px] animate-stkmarq motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap";

  return (
    <div id="stack" className="overflow-hidden border-y border-line bg-paper py-[22px]">
      <div className={row}>
        <div id="stkA" className={track} />
      </div>
      <div className={`${row} mt-[9px]`}>
        <div id="stkB" className={`${track} [animation-direction:reverse] [animation-duration:72s]`} />
      </div>
    </div>
  );
}
