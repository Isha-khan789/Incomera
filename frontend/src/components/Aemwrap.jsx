export default function Aemwrap() {
  return (
    <>
<div className="aem" id="aemWrap" aria-hidden="true">
  <div className="aem__bd" data-aem-close=""></div>
  <div className="aem__box" role="dialog" aria-label="Proposal notification email">
    <div className="aem__hd">
      <b>Proposal notification email<small id="aemFor">Preview of what goes out when a request arrives</small></b>
      <button className="aem__x" type="button" data-aem-close="" aria-label="Close">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>

    <div className="aem__body">
      <div className="aem__side">
        <div className="aem__grp">
          <p className="aem__lb">Subject line</p>
          <input className="aem__i" type="text" id="aemSub" autoComplete="off" />
        </div>
        <div className="aem__grp">
          <p className="aem__lb">Message</p>
          <textarea className="aem__i aem__ta" id="aemBody" spellCheck="false"></textarea>
          <div className="aem__toks" id="aemToks"></div>
          <p className="aem__hint">Click a tag to drop it in where the cursor is. Every tag is swapped for the real value when the email goes out.</p>
        </div>
      </div>

      <div className="aem__side aem__side--pv">
        <p className="aem__lb">Live preview</p>
        <div className="aem__mail">
          <div className="aem__from">
            <span className="aem__fav">IN</span>
            <div><b>Incomera notifications</b><small>no-reply@incomera.com</small></div>
          </div>
          <div className="aem__mh">
            <div className="aem__mr"><span>To</span><b id="aemTo">—</b></div>
            <div className="aem__mr"><span>Subject</span><b className="sub" id="aemSubPv">—</b></div>
          </div>
          <div className="aem__mb" id="aemBodyPv"></div>
        </div>
      </div>
    </div>

    <div className="aem__ft">
      <span className="aem__msg" id="aemMsg">Edits are saved to this workspace.</span>
      <button className="aem__b" type="button" id="aemReset">Reset to default</button>
      <button className="aem__b" type="button" id="aemOpen">Open in mail app</button>
      <button className="aem__b aem__b--go" type="button" id="aemSave">Save template</button>
    </div>
  </div>
</div>
    </>
  );
}
