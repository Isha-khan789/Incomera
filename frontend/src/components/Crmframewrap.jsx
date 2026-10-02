/* Migrated to Tailwind. `open` is a custom variant (see styles/index.css) so
   the legacy openCRM()/closeCRM() classList toggles still drive visibility. */
export default function Crmframewrap() {
  return (
    <div id="crmFrameWrap" className="fixed inset-0 z-[600] hidden bg-white open:block">
      <iframe id="crmFrame" title="Incomera CRM" className="block h-full w-full border-0" />
    </div>
  );
}
