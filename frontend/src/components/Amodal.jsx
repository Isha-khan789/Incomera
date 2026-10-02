export default function Amodal() {
  return (
    <>
<div className="amodal" id="amodal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Get a proposal">
  <div className="amodal__backdrop" data-aclose=""></div>
  <div className="amodal__sheet">
    <button className="amodal__x" type="button" data-aclose="" aria-label="Close">&#10005;</button>

    <div className="amodal__split">
      <aside className="aside">
        <span className="aside__kick"><i></i>Free proposal &middot; 24 hours</span>
        <h4>A document, not a discovery call.</h4>
        <p>You fill this in once. A written proposal lands within a day &mdash; specific to your funnel, priced, and yours to keep whether or not you use us.</p>

        <ol className="apages">
          <li>
            <span className="apages__n">01</span>
            <div><b>Where you stand</b></div>
          </li>
          <li>
            <span className="apages__n">02</span>
            <div><b>What it costs you</b></div>
          </li>
          <li>
            <span className="apages__n">03</span>
            <div><b>What we build</b></div>
          </li>
          <li>
            <span className="apages__n">04</span>
            <div><b>What you pay</b></div>
          </li>
        </ol>

        <p className="aside__note">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
          <span><b>No call required</b> to receive it, and no follow-up sequence if you never reply.</span>
        </p>
      </aside>

      <div className="apane">
        <div className="aform">
          <h3>Tell us where it hurts.</h3>
          <p className="sub">Pick what applies, add anything useful, and we will go and look at your numbers.</p>

          <section className="astep">
            <span className="step-label"><i>01</i>What should we look at?</span>
            <div className="aopts" id="auditOpts">
              <button className="aopt" type="button" data-val="Meeting Engine">
                <span className="aopt__dot"></span>
                <span className="aopt__tx"><b>More booked meetings</b><em>Outbound that fills the calendar</em></span>
              </button>
              <button className="aopt" type="button" data-val="Subscription Engine">
                <span className="aopt__dot"></span>
                <span className="aopt__tx"><b>More recurring subscribers</b><em>Trials and prospects into monthly income</em></span>
              </button>
              <button className="aopt" type="button" data-val="Meeting + Subscription Engine">
                <span className="aopt__dot"></span>
                <span className="aopt__tx"><b>Both, running together</b><em>One engine feeding the other</em></span>
              </button>
              <button className="aopt" type="button" data-val="Not sure yet">
                <span className="aopt__dot"></span>
                <span className="aopt__tx"><b>Not sure yet</b><em>Show me where the leak is first</em></span>
              </button>
            </div>
          </section>

          <section className="astep">
            <span className="step-label"><i>02</i>In your own words <u>optional</u></span>
            <div className="afield">
              <textarea id="auditNotes" placeholder="e.g. We get 300 inbound leads a month, our reps take a day to reply, and roughly half our free trials expire without anyone speaking to them\u2026"></textarea>
            </div>
          </section>

          <section className="astep">
            <span className="step-label"><i>03</i>Where should we send it?</span>
            <div className="arow2">
              <div className="afield">
                <label htmlFor="auditName">Name</label>
                <input type="text" id="auditName" placeholder="Alex Morgan" autoComplete="name" />
              </div>
              <div className="afield">
                <label htmlFor="auditCompany">Company</label>
                <input type="text" id="auditCompany" placeholder="Acme Inc." autoComplete="organization" />
              </div>
            </div>
            <div className="arow2">
              <div className="afield">
                <label htmlFor="auditEmail">Work email <em className="req">Required</em></label>
                <input type="email" id="auditEmail" placeholder="you@company.com" autoComplete="email" />
              </div>
              <div className="afield">
                <label htmlFor="auditPhone">Phone <em>Optional</em></label>
                <div className="aphone">
                  <select id="auditDial" aria-label="Country code">
                    <option value="+1">US +1</option><option value="+44">UK +44</option>
                    <option value="+92">PK +92</option><option value="+91">IN +91</option>
                    <option value="+971">AE +971</option><option value="+61">AU +61</option>
                    <option value="+49">DE +49</option><option value="+33">FR +33</option>
                    <option value="+65">SG +65</option>
                  </select>
                  <input type="tel" id="auditPhone" placeholder="555 123 4567" autoComplete="tel" />
                </div>
              </div>
            </div>
          </section>

          <div className="apane__foot">
            <button className="btn btn--primary" id="auditGo" type="button">Send my proposal</button>
            <p className="fine"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Free &middot; no obligation &middot; delivered within 24 hours</p>
          </div>
        </div>
      </div>
    </div>

    <div className="adone">
      <div className="adone__ic"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M20 6L9 17l-5-5" /></svg></div>
      <h3>Your proposal is on its way</h3>
      <p>We are reviewing what you shared now. Your baseline and the outcome we would build for it will land in your inbox within 24 hours.</p>
      <button className="btn btn--primary" id="auditCloseDone" type="button">Done</button>
    </div>

  </div>
</div>
    </>
  );
}
