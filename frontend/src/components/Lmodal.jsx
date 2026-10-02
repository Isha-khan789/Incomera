export default function Lmodal() {
  return (
    <>
<div className="lmodal" id="lmodal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Log in">
  <div className="lmodal__backdrop" data-lclose=""></div>
  <div className="lmodal__sheet">
    <button className="lmodal__x" id="lmodalX" type="button" data-lclose="" aria-label="Close">&#10005;</button>
    <div className="lmodal__brand">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <defs>
          <radialGradient id="ig-b2" cx="36%" cy="29%" r="74%">
            <stop offset="0" stopColor="#FFFFFF" /><stop offset=".26" stopColor="#B4D8F8" />
            <stop offset=".62" stopColor="#4E90E9" stopOpacity=".98" /><stop offset="1" stopColor="#2233B4" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="9.35" stroke="#5A63E8" strokeWidth=".82" opacity=".82" />
        <path d="M12 2.62L12 .92M15.59 3.34L16.24 1.77M18.63 5.37L19.83 4.17M20.66 8.41L22.23 7.76M21.38 12L23.08 12M20.66 15.59L22.23 16.24M18.63 18.63L19.83 19.83M15.59 20.66L16.24 22.23M12 21.38L12 23.08M8.41 20.66L7.76 22.23M5.37 18.63L4.17 19.83M3.34 15.59L1.77 16.24M2.62 12L.92 12M3.34 8.41L1.77 7.76M5.37 5.37L4.17 4.17M8.41 3.34L7.76 1.77" stroke="#5A63E8" strokeWidth=".82" strokeLinecap="round" opacity=".82" />
        <circle cx="12" cy="12" r="6.35" stroke="#0FB5A6" strokeWidth=".95" />
        <circle cx="12" cy="12" r="4.3" fill="url(#ig-b2)" />
      </svg>
      Incomera
    </div>
    <div className="ltabs" id="lTabs" role="tablist" aria-label="Account type">
      <span className="ltabs__glide"></span>
      <button className="ltabs__b on" type="button" data-role="operator" role="tab" aria-selected="true">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c0-3.6 3.3-6 7.5-6s7.5 2.4 7.5 6" /></svg>
        Operator
      </button>
      <button className="ltabs__b" type="button" data-role="team" role="tab" aria-selected="false">
        <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6" /><path d="M17 5.6a3.2 3.2 0 0 1 0 6.1M21.5 20c0-2.6-.9-4.3-2.5-5.2" /></svg>
        Team
      </button>
    </div>

    <h3 id="lTitle">Operator sign-in</h3>
    <p className="sub" id="lSub">For the operator running client engines day to day.</p>

    <div className="lfield"><label>Email</label><input type="email" id="lEmail" placeholder="you@incomera.com" autoComplete="email" /></div>
    <div className="lfield"><label>Password</label><input type="password" id="lPass" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autoComplete="current-password" /></div>
    <div className="lerr" id="lErr">Invalid email or password. Try again.</div>
    <p className="lhint" id="lHint">Opens the console — pipeline, campaigns, reporting and the engines you own.</p>

    <button className="btn btn--primary" id="lSubmit" type="button">Log in</button>

    <p className="fine">By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.</p>
  </div>
</div>
    </>
  );
}
