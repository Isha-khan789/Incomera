export default function Careerswrap() {
  return (
    <>
<div className="crw" id="careersWrap" aria-hidden="true" role="region" aria-label="Careers">
 <div className="cr" id="cr">

  <header className="kx__bar">
    <div className="kx kx__barin">
      <div className="kx__brand" data-cr-tab="roles">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <defs>
            <radialGradient id="ig-k3" cx="36%" cy="29%" r="74%">
              <stop offset="0" stopColor="#FFFFFF" /><stop offset=".26" stopColor="#B4D8F8" />
              <stop offset=".62" stopColor="#4E90E9" stopOpacity=".98" /><stop offset="1" stopColor="#2233B4" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="9.35" stroke="#8E97FF" strokeWidth=".82" opacity=".82" />
          <path d="M12 2.62L12 .92M15.59 3.34L16.24 1.77M18.63 5.37L19.83 4.17M20.66 8.41L22.23 7.76M21.38 12L23.08 12M20.66 15.59L22.23 16.24M18.63 18.63L19.83 19.83M15.59 20.66L16.24 22.23M12 21.38L12 23.08M8.41 20.66L7.76 22.23M5.37 18.63L4.17 19.83M3.34 15.59L1.77 16.24M2.62 12L.92 12M3.34 8.41L1.77 7.76M5.37 5.37L4.17 4.17M8.41 3.34L7.76 1.77" stroke="#8E97FF" strokeWidth=".82" strokeLinecap="round" opacity=".82" />
          <circle cx="12" cy="12" r="6.35" stroke="#2BE0CE" strokeWidth=".95" />
          <circle cx="12" cy="12" r="4.3" fill="url(#ig-k3)" />
        </svg>
        Incomera <i>Careers</i>
      </div>
      <div className="kx__seg">
        <button type="button" className="on" data-cr-tab="roles">Open roles</button>
        <button type="button" data-cr-tab="status">Track application</button>
      </div>
      <button className="kx__out" type="button" id="crExit">Back to site</button>
    </div>
  </header>

  {/* VIEW: ROLES */}
  <div className="crv on" data-crv="roles">
    <section className="kx kx__hero">
      <span className="kx__tag"><b></b>Now hiring</span>
      <h1 id="crHeadTitle">Open roles</h1>
      <p id="crHeadSub">Every position listed is live right now.</p>
    </section>

    <section className="kx">
      <div className="kx__lhead"><h2>Open positions</h2><span id="crShowing">0 roles</span></div>
      <div className="kx__index" id="crList"></div>
      <div className="kx__foot">
        <span>Applications are read by a person. Everyone gets an answer.</span>
        <button type="button" data-cr-tab="status">Already applied? Track your status →</button>
        <span>Equal opportunity employer</span>
      </div>
    </section>
  </div>

  {/* VIEW: JOB */}
  <div className="crv" data-crv="job" id="crJob"></div>

  {/* VIEW: APPLY */}
  <div className="crv" data-crv="apply">
    <section className="kx kx--slim" style={{paddingTop: "34px"}}>
      <button className="cr__crumb" type="button" id="crApBack">
        <svg viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6" /></svg> Back to role
      </button>

      <div id="crApForm">
        <h1 style={{fontSize: "clamp(26px,3.4vw,36px)", letterSpacing: "-.036em", color: "#fff", marginTop: "18px"}} id="crApTitle">Apply</h1>
        <div id="crApSide"></div>

        <div style={{marginTop: "22px"}}>
          <div className="kx__card">
            <h3><u>01</u>Your details</h3><p>Fields marked with a star are required.</p>
            <div className="cr__f2">
              <div className="cr__f"><label>Full name <span>*</span></label><input type="text" id="apName" placeholder="Alex Morgan" autoComplete="name" /></div>
              <div className="cr__f"><label>Email <span>*</span></label><input type="email" id="apEmail" placeholder="you@email.com" autoComplete="email" /></div>
            </div>
            <div className="cr__f2">
              <div className="cr__f"><label>Phone <span>*</span></label><input type="tel" id="apPhone" placeholder="+92 300 0000000" autoComplete="tel" /></div>
              <div className="cr__f"><label>City &amp; country <span>*</span></label><input type="text" id="apLoc" placeholder="Rawalpindi, Pakistan" /></div>
            </div>
            <div className="cr__f">
              <label>Profile photo <span>*</span></label>
              <div className="kx__photo" id="apPhotoBox">
                <input type="file" id="apPhoto" accept="image/*" />
                <span className="kx__pv" id="apPhotoPv">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.6" /><path d="M4.5 20c0-3.7 3.3-6.3 7.5-6.3s7.5 2.6 7.5 6.3" /></svg>
                </span>
                <span className="kx__pt"><b id="apPhotoT">Upload a profile photo</b>
                  <span id="apPhotoS">JPG or PNG · a clear head-and-shoulders shot</span></span>
                <button className="kx__recbtn" type="button" id="apPhotoClear" style={{display: "none"}}>Remove</button>
              </div>
            </div>
          </div>

          <div className="kx__card">
            <h3><u>02</u>Experience</h3><p>A CV plus a link or two is plenty.</p>
            <div className="cr__f">
              <label>Résumé / CV <span>*</span></label>
              <div className="kx__drop" id="apDrop">
                <input type="file" id="apFile" accept=".pdf,.doc,.docx,.rtf,.txt" />
                <svg viewBox="0 0 24 24"><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
                <b id="apDropT">Drop your CV here or click to browse</b>
                <span id="apDropS">PDF, DOC or DOCX · up to 10 MB</span>
              </div>
            </div>
            <div className="cr__f2">
              <div className="cr__f"><label>LinkedIn</label><input type="url" id="apLinkedin" placeholder="linkedin.com/in/\u2026" /></div>
              <div className="cr__f"><label>Portfolio / profile</label><input type="url" id="apSite" placeholder="upwork.com/\u2026 or yoursite.com" /></div>
            </div>
            <div className="cr__f">
              <label>Years of relevant experience <span>*</span></label>
              <div className="cr__opts" id="apYears">
                <button className="cr__opt" type="button" data-val="Fresher \u2014 no experience yet">Fresher</button>
                <button className="cr__opt" type="button" data-val="Under 1 year">Under 1</button>
                <button className="cr__opt" type="button" data-val="1\u20133 years">1–3</button>
                <button className="cr__opt" type="button" data-val="3\u20135 years">3–5</button>
                <button className="cr__opt" type="button" data-val="5+ years">5+</button>
              </div>
            </div>
          </div>

          <div className="kx__card" id="apVoiceCard" style={{display: "none"}}>
            <h3><u>03</u>Voice introduction <span className="kx__req">Required</span></h3><p>This role is phone-first, so a short spoken intro is required &mdash; it takes the place of a second written answer. Applications without one cannot be submitted.</p>
            <div className="kx__prompt"><b>What to say</b>Your name, where you're based, the closest experience you have to this
              role, and one sentence on why you'd be good on a call. There's no time limit — take as long as you need, and one take is fine.</div>
            <div className="kx__rec" id="apRec">
              <button className="kx__mic" type="button" id="apMic" aria-label="Record introduction">
                <svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
              </button>
              <div className="kx__recinfo"><b id="apRecT">Tap to start recording</b><span id="apRecS">Take as long as you need</span></div>
              <div className="kx__wave" id="apWave"></div>
              <span className="kx__rectime" id="apRecTime">0:00</span>
            </div>
            <div className="kx__recplay" id="apRecPlay">
              <audio id="apAudio" controls=""></audio>
              <button className="kx__recbtn" type="button" id="apReRec">Record again</button>
              <button className="kx__recbtn danger" type="button" id="apDelRec">Delete</button>
            </div>
            <div className="cr__err" id="apVoiceErr">A voice introduction is required for this role.</div>
            <p className="kx__reqnote" id="apVoiceNote">Required for this role only. Roles without a voice step never ask for one.</p>
          </div>

          <div className="kx__card">
            <h3><u id="apNum3">03</u>A few questions</h3><p>Short answers are fine.</p>
            <div className="cr__f">
              <label>Why are you a fit for this role? <span>*</span></label>
              <textarea id="apPitch" placeholder="What you've done that's closest to this role, and the results you got\u2026"></textarea>
              <small id="apCount">0 characters · 100 minimum</small>
            </div>
            <div className="cr__f2" id="apPayRow">
              <div className="cr__f"><label>Earliest start</label>
                <select id="apStart"><option>Immediately</option><option selected="">2 weeks</option><option>1 month</option><option>2 months+</option></select></div>
              <div className="cr__f" id="apCompField"><label>Expected salary</label>
                <input type="text" id="apComp" placeholder="e.g. PKR 150,000" /></div>
            </div>
            <div className="cr__f"><label>Anything else <small>(optional)</small></label>
              <textarea id="apNotes" style={{minHeight: "78px"}} placeholder="Notice period, questions, links\u2026"></textarea></div>
            <label className="kx__check"><input type="checkbox" id="apConsent" />
              <span>I agree to my details being stored for 12 months and used to assess this and similar applications.</span></label>
            <div className="cr__err" id="apErr">Please complete every required field before submitting.</div>
          </div>
        </div>
      </div>

      <div id="crApDone" style={{display: "none"}}>
        <div className="kx__done">
          <div className="kx__dic"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></div>
          <h3>Application received</h3>
          <p id="crDoneSub">Your application is with the hiring team.</p>
          <div className="kx__idcard">
            <u>Your tracking ID — keep this</u>
            <div className="kx__idrow"><b id="crDoneId">INC-0000-0000</b><button className="kx__copy" type="button" id="crCopyId">Copy</button></div>
            <p style={{fontSize: "12px", color: "var(--k-dim)", marginTop: "12px", lineHeight: "1.6"}}>We have emailed this ID with a direct
              link to your status page — open it any time to see your stage and what happens next.</p>
          </div>
          <div style={{display: "flex", gap: "10px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap"}}>
            <button className="btn btn--primary" type="button" id="crGoTrack">Track my application</button>
            <button className="kx__out" type="button" data-cr-tab="roles">Back to roles</button>
          </div>
        </div>
      </div>
    </section>

    <div className="kx__sticky" id="crApBar">
      <div className="kx kx--slim kx__stickyin">
        <div><b>Ready to send?</b><span>You'll get a tracking ID immediately.</span></div>
        <button className="btn btn--primary btn--lg" type="button" id="apSubmit">Submit application</button>
      </div>
    </div>
  </div>

  {/* VIEW: STATUS */}
  <div className="crv" data-crv="status">
    <section className="kx kx--slim kx__st">
      <span className="kx__tag"><b></b>Application status</span>
      <h1>Where do I stand?</h1>
      <p>Enter the tracking ID from your confirmation, or the email address you applied with.</p>

      <div className="kx__look">
        <div className="kx__lookrow">
          <input type="text" id="crLookId" placeholder="Tracking ID or email address" autoComplete="off" />
          <button className="btn btn--primary" type="button" id="crLookGo">Check status</button>
        </div>
        <div className="cr__err" id="crLookErr">No application found for that ID or email address.</div>
        <p className="kx__hint" id="crDemoHint"></p>
      </div>

      <div className="cr__mine" id="crMine"></div>
      <div className="cr__res" id="crRes"></div>
    </section>
  </div>

 </div>
</div>
    </>
  );
}
