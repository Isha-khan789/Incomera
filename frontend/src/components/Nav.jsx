export default function Nav() {
  return (
    <>
<header className="nav">
  <div className="wrap nav__in">
    <a className="brand" href="#top" aria-label="Incomera home">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <defs>
          <radialGradient id="ig-b1" cx="36%" cy="29%" r="74%">
            <stop offset="0" stopColor="#FFFFFF" /><stop offset=".26" stopColor="#B4D8F8" />
            <stop offset=".62" stopColor="#4E90E9" stopOpacity=".98" /><stop offset="1" stopColor="#2233B4" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="9.35" stroke="#5A63E8" strokeWidth=".82" opacity=".82" />
        <path d="M12 2.62L12 .92M15.59 3.34L16.24 1.77M18.63 5.37L19.83 4.17M20.66 8.41L22.23 7.76M21.38 12L23.08 12M20.66 15.59L22.23 16.24M18.63 18.63L19.83 19.83M15.59 20.66L16.24 22.23M12 21.38L12 23.08M8.41 20.66L7.76 22.23M5.37 18.63L4.17 19.83M3.34 15.59L1.77 16.24M2.62 12L.92 12M3.34 8.41L1.77 7.76M5.37 5.37L4.17 4.17M8.41 3.34L7.76 1.77" stroke="#5A63E8" strokeWidth=".82" strokeLinecap="round" opacity=".82" />
        <circle cx="12" cy="12" r="6.35" stroke="#0FB5A6" strokeWidth=".95" />
        <circle cx="12" cy="12" r="4.3" fill="url(#ig-b1)" />
      </svg>
      Incomera
    </a>
    <nav className="nav__links" aria-label="Primary">
      <a href="#packages">Services</a>
      <a href="#offer">How it works</a>
      <a href="#careers" data-careers-open="roles">Careers</a>
    </nav>
      
    <div className="nav__right">
      <button className="iconbtn" type="button" id="payBtn" aria-label="Choose a package and pay" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 9.5h19" strokeLinecap="round" /><path d="M6 15h3" strokeLinecap="round" /></svg>
      </button>
      <button className="iconbtn dot" type="button" id="loginBtn" aria-label="Log in or create account" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" strokeLinecap="round" /></svg>
      </button>
      <button className="btn btn--primary js-book-open" type="button" aria-haspopup="dialog">
        <svg className="bico" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 2.5v4M16 2.5v4" strokeLinecap="round" /></svg>
        Book a meeting
      </button>
    </div>
  </div>
</header>
    </>
  );
}
