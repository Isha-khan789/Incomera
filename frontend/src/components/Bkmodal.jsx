export default function Bkmodal() {
  return (
    <>
<div className="bk" id="bkModal" aria-hidden="true">
  <div className="bk__bd" data-bk-close=""></div>
  <div className="bk__sheet" role="dialog" aria-modal="true" aria-label="Book a meeting">
    <button className="bk__x" type="button" data-bk-close="" aria-label="Close">&#10005;</button>

    {/* header */}
    <div className="bk__hd">
      <div className="bk__idn">
        <span className="bk__av">RM</span>
        <div className="bk__idt">
          <p className="bk__host">Rana M. &middot; Incomera</p>
          <h3 id="bkTitle">Proposal call</h3>
        </div>
      </div>
      <div className="bk__meta">
        <span className="bk__m"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><span id="bkMins">30 min</span></span>
        <span className="bk__m" id="bkChipZone"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" /></svg><span>&mdash;</span></span>
        <span className="bk__m" id="bkChipWhen"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg><span>Pick a time</span></span>
        <span className="bk__m is-set" id="bkChipLoc"><svg viewBox="0 0 24 24"><path d="M15 10l4.5-2.5v9L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg><span>Google Meet</span></span>
      </div>
    </div>

    {/* everything on one page */}
    <div className="bk__body">

      {/* date + time zone */}
      <div className="bk__col">
        <p className="bk__lab">Select a date</p>
        <div className="bk__nav">
          <button className="bk__nb" type="button" id="bkPrev" aria-label="Previous month">
            <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg></button>
          <span className="bk__mon" id="bkMon">&mdash;</span>
          <button className="bk__nb" type="button" id="bkNext" aria-label="Next month">
            <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg></button>
        </div>
        <div className="bk__dow">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
          <span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
        <div className="bk__days" id="bkDays"></div>

        <div className="bk__tzwrap">
          <p className="bk__lab">Time zone</p>
          <div className="bk__tzrow">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" /></svg>
            <select className="bk__tz" id="bkTz" aria-label="Time zone"></select>
          </div>
        </div>
      </div>

      {/* times */}
      <div className="bk__col">
        <p className="bk__lab">Select a time</p>
        <p className="bk__scd" id="bkSlotDay">&mdash;</p>
        <p className="bk__scs" id="bkSlotSub">&mdash;</p>
        <div className="bk__slots" id="bkSlots"></div>
      </div>

      {/* location + details */}
      <div className="bk__col">
        <p className="bk__lab">Location</p>
        <div className="bk__loc" id="bkLoc">
          <button className="bk__lo on" type="button" data-loc="Google Meet">
            <svg viewBox="0 0 24 24"><path d="M15 10l5.5-3v10L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg>
            Google Meet</button>
          <button className="bk__lo" type="button" data-loc="Zoom">
            <svg viewBox="0 0 24 24"><rect x="2.5" y="6" width="13" height="12" rx="3.5" /><path d="M15.5 11l4.2-2.6a.7.7 0 0 1 1.1.6v6a.7.7 0 0 1-1.1.6L15.5 13" /></svg>
            Zoom</button>
          <button className="bk__lo" type="button" data-loc="Phone call">
            <svg viewBox="0 0 24 24"><path d="M5 3h3.5l1.8 4.4-2.2 1.6a12 12 0 0 0 6.9 6.9l1.6-2.2L21 15.5V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3z" /></svg>
            Phone call</button>
        </div>

        <p className="bk__lab">Your details</p>
        <div className="bk__grid" id="bkGrid">
          <div className="bk__f"><label htmlFor="bkName">Name *</label><input type="text" id="bkName" autoComplete="name" /></div>
          <div className="bk__f"><label htmlFor="bkCo">Company</label><input type="text" id="bkCo" autoComplete="organization" /></div>
          <div className="bk__f full" id="bkEmWrap"><label htmlFor="bkEmail">Email *</label><input type="email" id="bkEmail" autoComplete="email" /></div>
          <div className="bk__f full" id="bkPhWrap"><label htmlFor="bkPhone" id="bkPhLbl">Phone number</label>
            <input type="tel" id="bkPhone" autoComplete="tel" placeholder="+92 300 0000000" /></div>
          <div className="bk__f full"><label htmlFor="bkTopic">What should we look at?</label>
            <select id="bkTopic">
              <option value="Acquisition \u00b7 qualified meetings">Acquisition — more booked meetings</option>
              <option value="Monetisation \u00b7 paid subscribers">Monetisation — more paying subscribers</option>
              <option value="Both engines, running together">Both, running together</option>
              <option value="Not sure yet">Not sure yet</option>
            </select></div>
          <div className="bk__f full"><label htmlFor="bkNotes">Anything useful before the call</label>
            <textarea id="bkNotes" placeholder="e.g. 300 inbound leads a month, half our trials expire untouched\u2026"></textarea></div>
        </div>
      </div>

    </div>

    {/* footer */}
    <div className="bk__ft">
      <p className="bk__err" id="bkErr">Please add your name and a valid email.</p>
      <p className="bk__sum" id="bkSum">Pick a date and a time to continue.</p>
      <button className="bk__go" type="button" id="bkGo" disabled="">
        Confirm meeting
        <svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg>
      </button>
    </div>

    {/* confirmation */}
    <div className="bk__done">
      <div className="bk__tick"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></div>
      <h3>You are scheduled.</h3>
      <p>A calendar invite with the joining link is on its way. Reply to that email if you need to move it.</p>
      <div className="bk__card">
        <div className="bk__r">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
          <div><b id="bkDoneWhen">&mdash;</b><span id="bkDoneZone">&mdash;</span></div>
        </div>
        <div className="bk__r">
          <svg viewBox="0 0 24 24"><path d="M15 10l4.5-2.5v9L15 14" /><rect x="3" y="6" width="12" height="12" rx="2" /></svg>
          <div><b id="bkDoneLoc">&mdash;</b><span id="bkDoneLocSub">Link arrives with the invite</span></div>
        </div>
        <div className="bk__r">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
          <div><b id="bkDoneWho">&mdash;</b><span id="bkDoneTopic">&mdash;</span></div>
        </div>
      </div>
      <p className="bk__ref" id="bkDoneRef">&mdash;</p>
      <button className="bk__dn" type="button" id="bkDoneBtn">Done</button>
    </div>

  </div>
</div>
    </>
  );
}
