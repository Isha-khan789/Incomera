export default function Sec() {
  return (
    <>
<section className="sec wrap">
  <div className="sec__head center reveal">
    <span className="eyebrow" style={{justifyContent: "center"}}>The new era</span>
    <h2>Before you hire anyone, look at this.</h2>
  </div>

  <div className="cmp reveal">
    <span className="cmp__spot" aria-hidden="true"><em>Recommended</em></span>

    <div className="cmp__row cmp__row--h">
      <span className="cmp__lbl"></span>
      <span className="cmp__h">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></svg>
        Hire an SDR
      </span>
      <span className="cmp__h">
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 14h3" /></svg>
        Buy the tools yourself
      </span>
      <span className="cmp__h cmp__h--us">
        <svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
        Run an Incomera engine
      </span>
    </div>

    <div className="cmp__row">
      <span className="cmp__lbl">Time to first booked meeting</span>
      <span data-col="Hire an SDR" className="cmp__v cmp__v--no"><i></i>3–5 months, after hiring and ramp</span>
      <span data-col="Buy the tools yourself" className="cmp__v cmp__v--mid"><i></i>6–10 weeks, if someone owns it</span>
      <span data-col="Incomera engine" className="cmp__v cmp__v--us"><i></i>Inside the first week of go-live</span>
    </div>
    <div className="cmp__row">
      <span className="cmp__lbl">What it costs to start</span>
      <span data-col="Hire an SDR" className="cmp__v cmp__v--no"><i></i>Salary, commission, tooling, management</span>
      <span data-col="Buy the tools yourself" className="cmp__v cmp__v--mid"><i></i>6–9 subscriptions plus your team's time</span>
      <span data-col="Incomera engine" className="cmp__v cmp__v--us"><i></i>One setup fee, nothing monthly after</span>
    </div>
    <div className="cmp__row">
      <span className="cmp__lbl">Who actually operates it</span>
      <span data-col="Hire an SDR" className="cmp__v cmp__v--mid"><i></i>A person, 40 hours a week</span>
      <span data-col="Buy the tools yourself" className="cmp__v cmp__v--no"><i></i>Whoever has a spare afternoon</span>
      <span data-col="Incomera engine" className="cmp__v cmp__v--us"><i></i>A named operator, every day</span>
    </div>
    <div className="cmp__row">
      <span className="cmp__lbl">Covers nights and weekends</span>
      <span data-col="Hire an SDR" className="cmp__v cmp__v--no"><i></i>No</span>
      <span data-col="Buy the tools yourself" className="cmp__v cmp__v--no"><i></i>Only what someone configured</span>
      <span data-col="Incomera engine" className="cmp__v cmp__v--us"><i></i>Every hour, every day</span>
    </div>
    <div className="cmp__row">
      <span className="cmp__lbl">If they leave</span>
      <span data-col="Hire an SDR" className="cmp__v cmp__v--no"><i></i>Pipeline stops, you hire again</span>
      <span data-col="Buy the tools yourself" className="cmp__v cmp__v--no"><i></i>Nobody remembers how it was set up</span>
      <span data-col="Incomera engine" className="cmp__v cmp__v--us"><i></i>The engine and its data stay yours</span>
    </div>
  </div>

  <p className="cmp__note reveal">Most teams try the first two before they call us. <button className="fit__link js-audit-open" type="button">Take the proposal</button> and we will tell you which one your numbers actually justify.</p>
</section>
    </>
  );
}
