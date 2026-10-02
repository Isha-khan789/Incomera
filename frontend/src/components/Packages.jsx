export default function Packages() {
  return (
    <>
<section className="sec wrap" id="packages">
  <div className="sec__head center reveal">
    <span className="eyebrow" style={{justifyContent: "center"}}>What we build</span>
    <h2>Pick the outcome. We build the engine for it.</h2>
    <p>Two engines, one job each. Choose the one your business is actually missing and you will see exactly what gets built, how it runs and what it costs — a single setup fee, with nothing monthly behind it.</p>
  </div>

  <div className="pkgone reveal">
    <article className="pkg--one" id="pkgCard" data-eng="meet">

      <aside className="pkgside">
        <span className="pkgside__lbl">Choose your outcome</span>
        <div className="pkgsw" id="pkgSwitch" role="tablist" aria-label="Choose your engine">
          <button className="pkgsw__b on" type="button" data-eng="meet" role="tab" aria-selected="true">
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /><path d="M8.5 14.5l2.2 2.2 4.3-4.3" /></svg>
            <span className="pkgsw__t"><b>Acquisition</b><small>Qualified meetings, booked daily</small></span>
          </button>
          <button className="pkgsw__b" type="button" data-eng="sub" role="tab" aria-selected="false">
            <svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5" /><path d="M20 4.5v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5" /><path d="M4 19.5v-4h4" /></svg>
            <span className="pkgsw__t"><b>Monetisation</b><small>Signups turned into recurring revenue</small></span>
          </button>
        </div>

        <div className="pkgside__price">
          <span>One-time setup fee</span>
          <div><b id="pkgPrice"></b><i>one-time</i></div>
          <small>Proposal, build, training and launch — billed once</small>
        </div>

        <div className="pkgside__acts">
          <button className="btn btn--primary js-pkg-start" type="button" id="pkgStart" data-plan="Meeting Engine" aria-haspopup="dialog"><svg className="bico" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>Start the service</button>
          <button className="pkg__mini js-audit-open" type="button">Not sure which one? <u>Start with a free proposal</u></button>
        </div>
      </aside>

      <div className="pkgmain">
        <header className="pkgmain__hd">
          <div className="pkgh__ic" id="pkgIc"></div>
          <div>
            <div className="pkg__name" id="pkgName"></div>
            <div className="pkg__out" id="pkgOut"></div>
          </div>
        </header>

        <p className="pkg__desc" id="pkgDesc"></p>

        <div className="pkgspecs" id="pkgMeta"></div>

        <div className="pkgcols">
          <div className="pkgcol">
            <span className="pkg__lbl">How it runs</span>
            <ol className="pkg__steps" id="pkgSteps"></ol>
          </div>
          <div className="pkgcol">
            <span className="pkg__lbl">What we build and operate</span>
            <ul className="pkg__list" id="pkgList"></ul>
          </div>
        </div>

        <div className="pkgmain__ft">
          <b id="pkgBuy"></b>
          <span id="pkgNote"></span>
        </div>
      </div>
    </article>

    <div className="pkgincl reveal">
      <div className="pkgincl__hd">
        <span className="pkgincl__lbl">Standard on both engines</span>
        <p>Whichever outcome you pick, the one-time setup fee covers all of this. Nothing below is quoted separately.</p>
      </div>
      <div className="pkgincl__grid">
        <div className="pkgincl__i"><i>01</i><b>One fee, whole build</b><span>Proposal, engine build, training and launch in a single setup fee. No phased invoices and no change orders halfway through.</span></div>
        <div className="pkgincl__i"><i>02</i><b>It runs in the tools you own</b><span>Your CRM, inbox, calendar and billing stay exactly where they are. No migration, no new seats, nothing new for your team to learn.</span></div>
        <div className="pkgincl__i"><i>03</i><b>A named operator on the build</b><span>One person owns your engine end to end — the proposal, the copy, the rules, the launch and the tuning that follows it.</span></div>
        <div className="pkgincl__i"><i>04</i><b>Numbers you can check yourself</b><span>Every send, reply, booking, upgrade and recovered payment attributed to its source and visible to you in real time.</span></div>
        <div className="pkgincl__i"><i>05</i><b>Everything stays yours</b><span>Domains, sequences, lists and records live in your accounts. If you ever stop, the engine and its data stay behind with you.</span></div>
        <div className="pkgincl__i"><i>06</i><b>No lock-in, no retainer</b><span>One fee and it is built. There is no monthly contract to sign and nothing to cancel later.</span></div>
      </div>
    </div>
  </div>

  <p className="pkgs__note reveal">Running both motions at once? <button className="fit__link js-audit-open" type="button">Tell us what you want to grow</button> — we price a combined engine that books the meeting, then keeps the subscription alive after it closes.</p>
</section>
    </>
  );
}
