export default function Fit() {
  return (
    <>
<section className="sec wrap fit" id="fit">
  <div className="sec__head center reveal">
    <span className="eyebrow" style={{justifyContent: "center"}}>Who this is for</span>
    <h2>Which one do you need?</h2>
    <p>Almost everyone who comes to us needs one of two things. We build the one you need, not a bundle with the other half switched off.</p>
  </div>

  <div className="fitv">
    <article className="fitv__c reveal" data-fit="meet">
      <div className="fitv__viz">
        <span className="fitv__vt"><i></i>Calendar · filling</span>
        <div className="fitv__cal">
          <span className="d">M</span><span className="d">T</span><span className="d">W</span><span className="d">T</span><span className="d">F</span>
          <span className="s on" style={{'--dl': ".1s"}}></span><span className="s"></span><span className="s on" style={{'--dl': ".9s"}}></span><span className="s"></span><span className="s on" style={{'--dl': "1.7s"}}></span>
          <span className="s"></span><span className="s on" style={{'--dl': ".5s"}}></span><span className="s"></span><span className="s on" style={{'--dl': "1.3s"}}></span><span className="s"></span>
          <span className="s on" style={{'--dl': "2.1s"}}></span><span className="s"></span><span className="s on" style={{'--dl': ".7s"}}></span><span className="s on" style={{'--dl': "2.5s"}}></span><span className="s"></span>
          <span className="s"></span><span className="s on" style={{'--dl': "1.5s"}}></span><span className="s"></span><span className="s"></span><span className="s on" style={{'--dl': "2.9s"}}></span>
        </div>
      </div>
      <span className="fitv__lbl">You need</span>
      <h3>Qualified meetings.</h3>
      <p>Your team closes well once they are in the room. We book the room — every day, with buyers worth the hour.</p>
      <button className="fitv__go" type="button" data-eng-jump="meet">The Meeting Engine
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
    </article>

    <article className="fitv__c reveal" data-fit="sub">
      <div className="fitv__viz">
        <span className="fitv__vt"><i></i>Paid base · compounding</span>
        <div className="fitv__bars">
          <span style={{'--h': "26%", '--dl': ".1s"}}></span><span style={{'--h': "34%", '--dl': ".25s"}}></span><span style={{'--h': "31%", '--dl': ".4s"}}></span>
          <span style={{'--h': "48%", '--dl': ".55s"}}></span><span style={{'--h': "57%", '--dl': ".7s"}}></span><span style={{'--h': "52%", '--dl': ".85s"}}></span>
          <span style={{'--h': "71%", '--dl': "1s"}}></span><span style={{'--h': "84%", '--dl': "1.15s"}}></span><span style={{'--h': "96%", '--dl': "1.3s"}}></span>
          <i className="fitv__line"></i>
        </div>
      </div>
      <span className="fitv__lbl">You need</span>
      <h3>Paid subscribers.</h3>
      <p>If you have free users, trials and signups, we turn them into paying ones. If you do not, we go and make them first — then keep them paying.</p>
      <button className="fitv__go" type="button" data-eng-jump="sub">The Subscription Engine
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
    </article>
  </div>

  <p className="fitv__both reveal">Not sure which one is costing you more? <button className="fit__link js-audit-open" type="button">Take the proposal</button> — we read your numbers and tell you which engine to build first.</p>
</section>
    </>
  );
}
