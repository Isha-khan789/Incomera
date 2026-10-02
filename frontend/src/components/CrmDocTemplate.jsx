import crmDoc from "../legacy/crmDoc.html?raw";

/*
 * The CRM is a second, complete HTML document that the page injects into an
 * iframe with `srcdoc`. legacy/21-ensure.js reads it back out with
 * getElementById("crmDoc").textContent, so it has to live in the DOM as a
 * non-executing <script type="text/html"> block, exactly as it did before.
 * The @@ENDSCRIPT@@ tokens inside are placeholders for </script> and are
 * swapped back by that same legacy script — leave them alone.
 */
export default function CrmDocTemplate() {
  return (
    <script
      type="text/html"
      id="crmDoc"
      dangerouslySetInnerHTML={{ __html: crmDoc }}
    />
  );
}
