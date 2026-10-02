export default function Pmodal() {
  return (
    <>
<div className="pmodal" id="pmodal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Choose a package">
  <div className="pmodal__backdrop" data-pclose=""></div>
  <div className="pmodal__sheet">
    <button className="pmodal__x" type="button" data-pclose="" aria-label="Close">&#10005;</button>

    <div className="pk__pick">
      <span className="pk__eyebrow"><i></i>Select your engine</span>
      <h3>Choose the income you want</h3>
      <p className="sub">Booked meetings, recurring subscribers, or both side by side. One setup fee covers the proposal, the build, the training and the launch — and a named operator stays on it until it is earning.</p>

      <div className="plans" id="payPlans">
        <div className="plan sel" data-price="2200" data-cad="once" data-name="Meeting Engine" data-desc="Booked meetings, every single day">
          <span className="plan__tag">Popular</span>
          <div className="plan__top"><div className="plan__ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /><path d="M8.5 14.5l2.2 2.2 4.3-4.3" /></svg></div><span className="plan__radio"></span></div>
          <div className="plan__m"><b>Meeting Engine</b><span>Booked meetings land on your calendar, every single day</span></div>
          <div className="plan__price">$2,200<small>setup</small></div>
        </div>
        <div className="plan" data-price="4000" data-cad="once" data-name="Subscription Engine" data-desc="Recurring income, every month">
          <div className="plan__top"><div className="plan__ic"><svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5" /><path d="M20 4.5v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5" /><path d="M4 19.5v-4h4" /></svg></div><span className="plan__radio"></span></div>
          <div className="plan__m"><b>Subscription Engine</b><span>Trials and prospects turned into recurring income</span></div>
          <div className="plan__price">$4,000<small>setup</small></div>
        </div>
              </div>

    </div>

    <div className="pk__ticket">
      <span className="pk__eyebrow--alt"><i></i>Order summary</span>
      <div className="pk__route"><span>Old era</span><span>&#8594;</span><span>Always earning</span></div>
      <div className="pk__plan"><b id="payPlanName">Meeting Engine</b><span id="payPlanDesc">Booked meetings, every single day</span></div>
      <div className="pk__div"></div>
      <div className="pk__row"><span>Setup fee</span><b id="payPlanPrice">$2,200 one-time</b></div>
      <div className="ptotal">Total<b id="payTotal">$2,200<span>one-time</span></b></div>
      <button className="btn btn--primary" id="payGo" type="button">Continue to payment</button>
      <p className="fine"><svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>Secure checkout · cancel anytime</p>
    </div>
  </div>
</div>
    </>
  );
}
