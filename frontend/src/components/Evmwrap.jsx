export default function Evmwrap() {
  return (
    <>
<div className="evm" id="evmWrap" aria-hidden="true">
  <div className="evm__bd" data-evm-close=""></div>
  <div className="evm__box" role="dialog" aria-label="Event type">
    <div className="evm__h">
      <b id="evmTitle">New event type<small id="evmSub">It gets its own booking page as soon as you create it.</small></b>
      <button className="evm__x" type="button" data-evm-close="" aria-label="Close">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
    </div>

    <div className="evm__body">
      <div className="evm__form es">
        <div className="es__sec" data-es="">
          <div className="es__hd"><b>Event type</b><svg className="es__cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></div>
          <div className="es__bd">
            <div className="es__name">
              <span className="es__dot" id="evfDot"></span>
              <input className="es__ti" type="text" id="evfTitle" placeholder="New Meeting" autoComplete="off" />
            </div>
            <div className="es__kind">
              <button className="es__kb on" type="button" data-ev-kind="one">One-on-One</button>
              <button className="es__kb" type="button" data-ev-kind="group">Group</button>
            </div>
          </div>
          <p className="es__sum" id="evSumType">New Meeting · One-on-One</p>
        </div>

        <div className="es__sec" data-es="">
          <div className="es__hd"><b>Duration</b><svg className="es__cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></div>
          <div className="es__bd">
            <div className="es__opts">
              <button className="es__o" type="button" data-ev-mins="15">15 min</button>
              <button className="es__o on" type="button" data-ev-mins="30">30 min</button>
              <button className="es__o" type="button" data-ev-mins="45">45 min</button>
              <button className="es__o" type="button" data-ev-mins="60">60 min</button>
            </div>
          </div>
          <p className="es__sum" id="evSumMins">30 min</p>
        </div>

        <div className="es__sec" data-es="">
          <div className="es__hd"><b>Location</b><svg className="es__cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></div>
          <div className="es__bd">
            <div className="es__locs">
              <button className="es__lc" type="button" data-ev-loc="meet">
                <svg viewBox="0 0 24 24"><path d="M15 10l4.5-2.5v9L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg>
                Google Meet</button>
              <button className="es__lc" type="button" data-ev-loc="zoom">
                <svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="3" /><path d="M16 10l6-3v10l-6-3z" /></svg>
                Zoom</button>
              <button className="es__lc" type="button" data-ev-loc="phone">
                <svg viewBox="0 0 24 24"><path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1.5 1.5 0 0 1-1.7 1.5A17.5 17.5 0 0 1 2.5 5.7 1.5 1.5 0 0 1 4 4z" /></svg>
                Phone call</button>
              <button className="es__lc" type="button" data-ev-loc="place">
                <svg viewBox="0 0 24 24"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
                In-person</button>
            </div>
            <div className="es__warn" id="evWarn">
              <svg viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9L1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
              <span id="evWarnT">Add a location to help invitees know how to attend</span>
            </div>
          </div>
          <p className="es__sum" id="evSumLoc">Not set</p>
        </div>

        <div className="es__sec shut" data-es="">
          <div className="es__hd"><b>Availability</b><svg className="es__cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></div>
          <div className="es__bd">
            <div className="es__opts">
              <button className="es__o on" type="button" data-ev-av="Weekdays, 9 am \u2013 6 pm">Weekdays, 9 am – 6 pm</button>
              <button className="es__o" type="button" data-ev-av="Weekdays, 6 am \u2013 6 pm">Weekdays, 6 am – 6 pm</button>
              <button className="es__o" type="button" data-ev-av="Every day, 8 am \u2013 8 pm">Every day, 8 am – 8 pm</button>
            </div>
          </div>
          <p className="es__sum" id="evSumAv">Weekdays, 9 am – 6 pm</p>
        </div>

        <div className="es__sec shut" data-es="">
          <div className="es__hd"><b>Host</b><svg className="es__cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></div>
          <div className="es__bd">
            <div className="es__host"><span className="es__hav">RM</span>Rana M. (you)</div>
          </div>
          <p className="es__sum">Rana M. (you)</p>
        </div>

        <div className="es__sec shut" data-es="">
          <div className="es__hd"><b>Link &amp; description</b><svg className="es__cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></div>
          <div className="es__bd">
            <label className="es__lbl" htmlFor="evfSlug">Booking page link</label>
            <div className="es__slug"><span id="evfBase">/#book/</span>
              <input type="text" id="evfSlug" placeholder="new-meeting" autoComplete="off" /></div>
            <label className="es__lbl" htmlFor="evfDesc" style={{marginTop: "14px"}}>What invitees see</label>
            <textarea className="es__ta" id="evfDesc" placeholder="Thirty minutes, no deck\u2026"></textarea>
          </div>
          <p className="es__sum" id="evSumLink">/#book/</p>
        </div>
      </div>

      <div className="evm__pv">
        <span className="evm__lb">Live preview &middot; booking page</span>
        <div className="bp">
          <div className="bp__chrome"><u></u><u></u><u></u><span className="bp__url" id="bpUrl">/#book/</span></div>
          <div className="bp__in">
            <div className="bp__side">
              <span className="bp__av">RM</span>
              <b id="bpTitle">Untitled meeting</b>
              <p id="bpDesc">Add a description and it shows here for whoever opens the link.</p>
              <div className="bp__meta">
                <span className="bp__m"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><span id="bpMins">30 minutes</span></span>
                <span className="bp__m" id="bpLoc"><svg viewBox="0 0 24 24"><path d="M15 10l4.5-2.5v9L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg><span>Google Meet</span></span>
                <span className="bp__m"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" /></svg><span id="bpKind">One-to-one</span></span>
              </div>
            </div>
            <div className="bp__main">
              <span className="bp__lb">Choose a day</span>
              <div className="bp__days" id="bpDays"></div>
              <span className="bp__lb" style={{marginTop: "14px"}}>Available times</span>
              <div className="bp__slots" id="bpSlots"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="evm__ft">
      <span className="evm__msg" id="evmMsg">The link works the moment you create it.</span>
      <button className="evm__b" type="button" data-evm-close="">Cancel</button>
      <button className="evm__b evm__b--go" type="button" id="evmSave">Create event type</button>
    </div>
  </div>
</div>
    </>
  );
}
