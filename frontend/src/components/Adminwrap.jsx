export default function Adminwrap() {
  return (
    <>
<div className="adw" id="adminWrap" aria-hidden="true" role="region" aria-label="Admin portal">
 <div className="ad" id="ad">

  {/* login */}
  <div className="ad__login">
    <div className="ad__lbox">
      <div className="ad__lbrand">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <defs>
            <radialGradient id="ig-b4" cx="36%" cy="29%" r="74%">
              <stop offset="0" stopColor="#FFFFFF" /><stop offset=".26" stopColor="#B4D8F8" />
              <stop offset=".62" stopColor="#4E90E9" stopOpacity=".98" /><stop offset="1" stopColor="#2233B4" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="9.35" stroke="#5A63E8" strokeWidth=".82" opacity=".82" />
          <path d="M12 2.62L12 .92M15.59 3.34L16.24 1.77M18.63 5.37L19.83 4.17M20.66 8.41L22.23 7.76M21.38 12L23.08 12M20.66 15.59L22.23 16.24M18.63 18.63L19.83 19.83M15.59 20.66L16.24 22.23M12 21.38L12 23.08M8.41 20.66L7.76 22.23M5.37 18.63L4.17 19.83M3.34 15.59L1.77 16.24M2.62 12L.92 12M3.34 8.41L1.77 7.76M5.37 5.37L4.17 4.17M8.41 3.34L7.76 1.77" stroke="#5A63E8" strokeWidth=".82" strokeLinecap="round" opacity=".82" />
          <circle cx="12" cy="12" r="6.35" stroke="#0FB5A6" strokeWidth=".95" />
          <circle cx="12" cy="12" r="4.3" fill="url(#ig-b4)" />
        </svg> Incomera
      </div>
      <h2>Admin portal</h2>
      <p>Sign in to manage recruitment.</p>
      <div className="cr__f"><label>Email</label><input type="email" id="adEmail" defaultValue="admin@incomera.com" autoComplete="username" /></div>
      <div className="cr__f"><label>Password</label><input type="password" id="adPass" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autoComplete="current-password" /></div>
      <div className="cr__err" id="adErr">Incorrect password. Try <b style={{fontFamily: "var(--mono)"}}>admin123</b>.</div>
      <button className="btn btn--primary" type="button" id="adGo">Sign in</button>
      <p className="ad__lhint">Demo access — password <b>admin123</b></p>
      <button className="ad__lback" type="button" id="adBack">← Close</button>
    </div>
  </div>

  {/* console */}
  <div className="ad__shell">
    <nav className="ad__side" aria-label="Admin navigation">
      <div className="ad__sbrand">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <defs>
            <radialGradient id="ig-b5" cx="36%" cy="29%" r="74%">
              <stop offset="0" stopColor="#FFFFFF" /><stop offset=".26" stopColor="#B4D8F8" />
              <stop offset=".62" stopColor="#4E90E9" stopOpacity=".98" /><stop offset="1" stopColor="#2233B4" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="9.35" stroke="#5A63E8" strokeWidth=".82" opacity=".82" />
          <path d="M12 2.62L12 .92M15.59 3.34L16.24 1.77M18.63 5.37L19.83 4.17M20.66 8.41L22.23 7.76M21.38 12L23.08 12M20.66 15.59L22.23 16.24M18.63 18.63L19.83 19.83M15.59 20.66L16.24 22.23M12 21.38L12 23.08M8.41 20.66L7.76 22.23M5.37 18.63L4.17 19.83M3.34 15.59L1.77 16.24M2.62 12L.92 12M3.34 8.41L1.77 7.76M5.37 5.37L4.17 4.17M8.41 3.34L7.76 1.77" stroke="#5A63E8" strokeWidth=".82" strokeLinecap="round" opacity=".82" />
          <circle cx="12" cy="12" r="6.35" stroke="#0FB5A6" strokeWidth=".95" />
          <circle cx="12" cy="12" r="4.3" fill="url(#ig-b5)" />
        </svg>
        <span className="ad__sbrandt">Incomera <i>Admin</i></span>
      </div>

      <div className="ad__sgrp">Workspace</div>
      <div className="ad__grp" id="adGrpRec">
        <button className="ad__nav on" type="button" id="adGrpBtn" data-ad-tab="overview">
          <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>
          Recruitment
          <svg className="ad__caret" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <div className="ad__sub">
          <button className="ad__nav" type="button" data-ad-tab="jobs">
            <svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
            Job posts<em id="adNavJobs">0</em></button>
          <button className="ad__nav" type="button" data-ad-tab="apps">
            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg>
            Applicants<em id="adNavApps">0</em></button>
          <button className="ad__nav" type="button" data-ad-tab="short">
            <svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z" /></svg>
            Shortlisted<em id="adNavShort">0</em></button>
          <button className="ad__nav" type="button" data-ad-tab="intv">
            <svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4V5z" /><path d="M9 10h.01M12 10h.01M15 10h.01" /></svg>
            Interview<em id="adNavIntv">0</em></button>
          <button className="ad__nav" type="button" data-ad-tab="offered">
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
            Offered<em id="adNavOffer">0</em></button>
          <button className="ad__nav" type="button" data-ad-tab="hired">
            <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" /><path d="M16.5 11.5l2 2 4-4" /></svg>
            Hired<em id="adNavHired">0</em></button>
        </div>
      </div>

      <button className="ad__nav" type="button" data-ad-tab="audits">
        <svg viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9L20 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" /><path d="M14 4v6h6" /><path d="M8.5 13.5l2 2 4.5-4.5" /></svg>
        Proposal requests<em id="adNavAud">0</em></button>

      <button className="ad__nav" type="button" data-ad-tab="meets">
        <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M8.5 15l2 2 4-4" /></svg>
        Meetings scheduled<em id="adNavMeet">0</em></button>

      <button className="ad__nav" type="button" data-ad-tab="chat">
        <svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-2.6-.4L4 21l1.6-4.2A8.2 8.2 0 0 1 3 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 9 8.4z" /></svg>
        Live chat<em id="adNavChat">0</em></button>

      <div className="ad__suser">
        <button className="ad__sme" type="button" id="adSuserBtn" title="Open workspace settings">
          <span>SA</span>
          <div><b>Samules A.</b><small>Super admin</small></div>
          <svg className="ad__smei" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></svg>
        </button>
        <button className="ad__out" type="button" id="adOut" title="Sign out">
          <svg viewBox="0 0 24 24"><path d="M15 17l5-5-5-5M20 12H9M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" /></svg>
        </button>
      </div>
    </nav>

    <div className="ad__main">
      <div className="ad__top">
        <div><div className="ad__crumb" id="adCrumb">General</div><h2 id="adTitle">Dashboard</h2></div>
        <button className="btn btn--primary" type="button" id="adNew">
          <svg className="bico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg> New job post</button>
      </div>

      <div className="ad__body">
        {/* recruitment dashboard */}
        <div className="adv on" data-adv="overview">
          <div className="rq__tiles" id="rqTiles"></div>

          <div className="ad__panel rq__pipepanel">
            <h3>Candidate pipeline<em>Click a stage to filter</em></h3>
            <div className="rq__pipe" id="rqPipe"></div>
          </div>

          <div className="ad__panel" style={{marginTop: "12px"}}>
            <h3>Upcoming interviews<em id="rqIvTotal"></em></h3>
            <div className="rq__ivs" id="rqIvs"></div>
          </div>

          <div className="ad__panel" style={{marginTop: "12px"}}>
            <h3>Offer letters<em id="rqOfferTotal"></em></h3>
            <div className="rq__offers" id="rqOffers"></div>
          </div>

          <div className="ad__panel" style={{marginTop: "12px"}}>
            <h3>Recent activity<em>Live</em></h3>
            <div className="ad__feed" id="adFeed"></div>
          </div>
        </div>

        {/* jobs */}
        <div className="adv" data-adv="jobs">
          <div className="ad__tools">
            <div className="ad__seg" id="adJobSeg"></div>
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="adJobSearch" placeholder="Search job posts\u2026" />
            </div>
            <span className="ad__count" id="adJobCount"></span>
          </div>
          <div className="jc__grid" id="adJobRows"></div>
        </div>

        {/* applicants */}
        <div className="adv" data-adv="apps">
          <div className="ad__tools">
            <select className="ad__sel" id="adAppJob"><option value="all">All roles</option></select>
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="adAppSearch" placeholder="Search name, email or ID\u2026" />
            </div>
            <button className="ad__ghost" type="button" id="adAppSortBtn">
              <svg viewBox="0 0 24 24"><path d="M7 4v16M7 20l-3-3M7 4l3 3M17 20V4M17 4l3 3M17 20l-3-3" /></svg>
              <span id="adAppSort">Newest first</span></button>
            <span className="ad__count" id="adAppCount"></span>
          </div>
          <div className="rw__wrap" id="adAppRows"></div>
        </div>

        {/* shortlisted */}
        <div className="adv" data-adv="short">
          <div className="ad__tools">
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="adShortSearch" placeholder="Search shortlisted people\u2026" />
            </div>
            <span className="ad__count" id="adShortCount"></span>
          </div>
          <div className="rw__wrap" id="adShortRows"></div>
        </div>

        {/* interview */}
        <div className="adv" data-adv="intv">
          <div className="ad__seg" id="adIvSeg" style={{marginBottom: "12px"}}></div>
          <div className="ad__tools">
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="adIntvSearch" placeholder="Search people at interview\u2026" />
            </div>
            <span className="ad__count" id="adIntvCount"></span>
          </div>
          <div className="rw__wrap" id="adIntvRows"></div>
        </div>

        {/* notifications */}
        <div className="adv" data-adv="notify">
          <div className="nt__head">
            <div><h3>Applicant emails</h3>
              <p>Choose which stage changes send an automatic email to the candidate.
                 Email is the only channel — nothing is sent by SMS or WhatsApp.</p></div>
            <span className="nt__ch"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>Email</span>
          </div>
          <div className="nt__list" id="adNotify"></div>
          <div className="nt__foot">
            <div><b>Every email carries their tracking ID and a direct link</b>
              <span>Opening the link takes the candidate straight to their status page — no ID to type in.</span></div>
            <code id="ntLink">…/#careers/status/INC-XXXX-XXXX</code>
            <button className="rw__btn" type="button" id="ntCopy">Copy example</button>
          </div>
        </div>

        {/* proposal requests from the website */}
        <div className="adv" data-adv="audits">
          <div className="aud__mail">
            <span className="aud__mi"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 8l9 6 9-6" /></svg></span>
            <span className="aud__mt">
              <b>Email me new proposal requests</b>
              <span>Sends a notification the moment someone submits the proposal form on the website.</span>
            </span>
            <input className="aud__me" type="email" id="audMailTo" placeholder="you@yourcompany.com" autoComplete="off" />
            <button className="aud__pv" type="button" id="audMailPv">
              <svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
              Preview &amp; edit
            </button>
            <button className="aud__sw" type="button" id="audMailSw" role="switch" aria-checked="false" aria-label="Email notifications"></button>
          </div>
          <div className="aud__tiles">
            <div className="aud__tile"><i style={{'--c': "#2456E6"}}></i><b id="audT1">0</b><span>New this week</span></div>
            <div className="aud__tile"><i style={{'--c': "#C9821A"}}></i><b id="audT2">0</b><span>Unread</span></div>
            <div className="aud__tile"><i style={{'--c': "#6D5EF5"}}></i><b id="audT3">0</b><span>In review</span></div>
            <div className="aud__tile"><i style={{'--c': "#1FA971"}}></i><b id="audT4">0</b><span>Reports sent</span></div>
          </div>
          <div className="ad__tools">
            <select className="ad__sel" id="audFilter">
              <option value="all">All requests</option>
              <option value="new">New</option>
              <option value="review">In review</option>
              <option value="sent">Report sent</option>
            </select>
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="audSearch" placeholder="Search name, company or email\u2026" />
            </div>
            <span className="ad__count" id="audCount"></span>
          </div>
          <div className="aud__wrap" id="audRows"></div>
        </div>

        {/* meetings booked from the website */}
        <div className="adv" data-adv="meets">
          <div className="aud__tiles">
            <div className="aud__tile"><i style={{'--c': "#2456E6"}}></i><b id="mtT1">0</b><span>Upcoming</span></div>
            <div className="aud__tile"><i style={{'--c': "#C9821A"}}></i><b id="mtT2">0</b><span>Today</span></div>
            <div className="aud__tile"><i style={{'--c': "#1FA971"}}></i><b id="mtT3">0</b><span>Completed</span></div>
            <div className="aud__tile"><i style={{'--c': "#D4344B"}}></i><b id="mtT4">0</b><span>No-shows</span></div>
          </div>
          <div className="ad__tools">
            <select className="ad__sel" id="mtFilter">
              <option value="all">All meetings</option>
              <option value="upcoming">Upcoming</option>
              <option value="done">Completed</option>
              <option value="noshow">No-show</option>
            </select>
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="mtSearch" placeholder="Search name, company or email\u2026" />
            </div>
            <span className="ad__count" id="mtCount"></span>
          </div>
          <div className="aud__wrap" id="mtRows"></div>
        </div>

        {/* live chat from the website */}
        <div className="adv" data-adv="chat">
          <div className="lc">
            <div className="lc__list">
              <div className="lc__lh">
                <div className="lc__seg">
                  <button className="lc__sb on" type="button" data-lc-f="open">Open</button>
                  <button className="lc__sb" type="button" data-lc-f="unread">Unread</button>
                  <button className="lc__sb" type="button" data-lc-f="closed">Resolved</button>
                  <button className="lc__sb" type="button" data-lc-f="all">All</button>
                </div>
              </div>
              <div className="lc__scroll" id="lcList"></div>
            </div>

            <div className="lc__thread">
              <div className="lc__th" id="lcHead">
                <div className="lc__who"><b id="lcName">&mdash;</b><span id="lcMeta">&mdash;</span></div>
                <div className="lc__act">
                  <button className="lc__ab" type="button" id="lcToProp">
                    <svg viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h9L20 9.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" /><path d="M14 4v6h6" /></svg>
                    Create proposal</button>
                  <button className="lc__ab" type="button" id="lcToMeet">
                    <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
                    Book meeting</button>
                  <button className="lc__ab lc__ab--done" type="button" id="lcClose">Mark resolved</button>
                </div>
              </div>

              <div className="lc__msgs" id="lcMsgs"></div>

              <div className="lc__foot" id="lcFoot">
                <div className="lc__quick">
                  <button className="lc__q" type="button" data-lc-q="It is a single one-time setup fee \u2014 proposal, build, training and launch, billed once. Nothing monthly behind it.">Pricing</button>
                  <button className="lc__q" type="button" data-lc-q="30 days, proposal to launch. Most clients see their first bookings inside week one after go-live.">Timeline</button>
                  <button className="lc__q" type="button" data-lc-q="No migration. It runs inside the CRM, inbox, calendar and billing you already pay for.">Your stack</button>
                  <button className="lc__q" type="button" data-lc-q="Happy to walk you through it \u2014 want me to send over a couple of slots for a 30 minute call?">Offer a call</button>
                </div>
                <div className="lc__in">
                  <textarea id="lcInput" rows="1" placeholder="Reply as Rana\u2026 (Enter to send)"></textarea>
                  <button className="lc__send" id="lcSend" type="button" aria-label="Send">
                    <svg viewBox="0 0 24 24"><path d="M4 12l16-8-6 8 6 8-16-8z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* workspace: overview · team · permissions · channels · settings */}
        <div className="adv" data-adv="team">
          <div className="wk">

            <aside className="wk__rail">
              <div className="wk__id">
                <span className="wk__av">SA</span>
                <div className="wk__who"><b>Samules A.</b><small>samules@incomera.com</small></div>
              </div>
              <div className="wk__badges">
                <span className="wk__badge">Super admin</span>
                <span className="wk__badge wk__badge--n" id="wkHeroSub">Full access</span>
              </div>
              <nav className="wk__nav">
                <button className="wk__t on" type="button" data-wk="home">
                  <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.6" /><rect x="14" y="3" width="7" height="7" rx="1.6" /><rect x="3" y="14" width="7" height="7" rx="1.6" /><rect x="14" y="14" width="7" height="7" rx="1.6" /></svg>
                  Overview<i className="wk__nc" id="wkNcHome">0</i></button>
                <button className="wk__t" type="button" data-wk="team">
                  <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4" /><path d="M16 5.5a3.2 3.2 0 0 1 0 6.2M18 20c0-2.6-.9-4.2-2.4-5.1" /></svg>
                  Team members<i className="wk__nc" id="wkNcTeam">0</i></button>
                <button className="wk__t" type="button" data-wk="perms">
                  <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6z" /><path d="M9 12l2 2 4-4" /></svg>
                  Permissions<i className="wk__nc" id="wkNcPerm">0</i></button>
                <button className="wk__t" type="button" data-wk="email">
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                  Email<i className="wk__nc" id="wkNcMail">0</i></button>
                <button className="wk__t" type="button" data-wk="cal">
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
                  Calendar<i className="wk__nc" id="wkNcCal">0</i></button>
                <button className="wk__t" type="button" data-wk="notif">
                  <svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
                  Notifications<i className="wk__nc" id="wkNcNotif">0</i></button>
                                <button className="wk__t" type="button" data-wk="set">
                  <svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2.2" /><circle cx="10" cy="17" r="2.2" /></svg>
                  Admin settings<i className="wk__nc warn" id="wkNcSet">0</i></button>
              </nav>
              <div className="wk__rf">Workspace<b id="wkRailWs">Incomera</b></div>
            </aside>

            <div className="wk__pane">

              {/* overview */}
              <div className="wkv on" data-wkv="home">
                <div className="wk__ph">
                  <div><h3>Workspace overview</h3>
                    <p>Who has access, what is connected, and anything that needs a decision from you before it slows hiring down.</p></div>
                </div>
                <div className="wk__tiles" id="wkTiles"></div>
                <div className="wk__panelc">
                  <b>Needs your attention</b>
                  <span>Open items only. Everything else is running as configured.</span>
                  <div className="wk__atts" id="wkAtt"></div>
                </div>
                <div className="wk__panelc">
                  <b>Quick actions</b>
                  <span>The things a super admin reaches for most.</span>
                  <div className="wk__qa">
                    <button className="wk__qb" type="button" data-wk="team">
                      <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>Invite a team member</button>
                    <button className="wk__qb" type="button" data-wk="perms">
                      <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6z" /></svg>Review permissions</button>
                    <button className="wk__qb" type="button" data-wk="email">
                      <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>Connect a sending address</button>
                    <button className="wk__qb" type="button" data-wk="set">
                      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>Change the admin password</button>
                  </div>
                </div>
              </div>

              {/* team */}
              <div className="wkv" data-wkv="team">
                <div className="wk__ph">
                  <div><h3>Team members</h3>
                    <p>Everyone with access to this workspace. Invited people get an email with a link to set their password.</p></div>
                  <button className="btn btn--primary" type="button" id="wkAddBtn">
                    <svg className="bico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>Add team member</button>
                </div>
                <div className="wk__form" id="wkAddForm">
                  <div className="wk__fg">
                    <div><label htmlFor="wkName">Full name</label><input id="wkName" type="text" placeholder="Ayesha Malik" /></div>
                    <div><label htmlFor="wkEmail">Work email</label><input id="wkEmail" type="email" placeholder="ayesha@incomera.com" /></div>
                    <div><label htmlFor="wkRole">Role</label><select id="wkRole"></select></div>
                  </div>
                  <div className="wk__facts">
                    <button className="ad__ghost" type="button" id="wkAddCancel">Cancel</button>
                    <button className="btn btn--primary" type="button" id="wkAddSave">Send invite</button>
                  </div>
                </div>
                <div id="wkTeamRows"></div>
              </div>

              {/* permissions */}
              <div className="wkv" data-wkv="perms">
                <div className="wk__ph">
                  <div><h3>Permissions</h3>
                    <p>A role sets a starting point. Switch any single permission on or off and that person moves to a custom set.</p></div>
                </div>
                <div id="wkPermRows"></div>
              </div>

              {/* email */}
              <div className="wkv" data-wkv="email">
                <div className="wk__ph">
                  <div><h3>Email</h3>
                    <p>Addresses this workspace sends from. Candidate emails go out from the address marked as primary.</p></div>
                  <button className="btn btn--primary" type="button" id="wkMailBtn">
                    <svg className="bico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>Add email</button>
                </div>
                <div className="wk__form" id="wkMailForm">
                  <div className="wk__fg">
                    <div><label htmlFor="wkMailAddr">Email address</label><input id="wkMailAddr" type="email" placeholder="careers@yourcompany.com" /></div>
                    <div><label htmlFor="wkMailUse">Used for</label><select id="wkMailUse">
                      <option>Candidate email</option><option>Interview invites</option>
                      <option>Offer letters</option><option>Internal notifications</option></select></div>
                    <div><label htmlFor="wkMailProv">Provider</label><select id="wkMailProv">
                      <option>Gmail / Google Workspace</option><option>Outlook / Microsoft 365</option><option>Custom SMTP</option></select></div>
                  </div>
                  <div className="wk__facts">
                    <button className="ad__ghost" type="button" id="wkMailCancel">Cancel</button>
                    <button className="btn btn--primary" type="button" id="wkMailSave">Connect address</button>
                  </div>
                </div>
                <div id="wkMailRows"></div>
              </div>

              {/* calendar */}
              <div className="wkv" data-wkv="cal">
                <div className="wk__ph">
                  <div><h3>Calendar</h3>
                    <p>Connect a calendar and interview slots are checked against real availability before anything is offered to a candidate.</p></div>
                </div>
                <div className="wk__grid" id="wkCalCards"></div>
                <div className="wk__set" style={{marginTop: "12px"}} id="wkCalPrefs"></div>

                <div className="ev">
                  <div className="ev__h">
                    <div><b>Event types</b><span>Each one gets its own booking page people can pick a slot on.</span></div>
                    <button className="ev__new" type="button" id="evNew">
                      <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>New event type</button>
                  </div>
                  <div className="ev__list" id="evList"></div>
                </div>
              </div>

              {/* settings */}
              <div className="wkv" data-wkv="notif">
                <div className="nt__head">
                  <div><h3>Notifications</h3>
                    <p>Everything the workspace emails out, in one place — applicant stage emails
                       and the alerts that fire when something arrives from the website.</p></div>
                  <span className="nt__ch"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>Email</span>
                </div>

                <div className="ntg">
                  <div className="ntg__h"><b>From the website</b><span>Fires the moment someone submits on incomera.com</span></div>
                  <div className="nt__list" id="ntWebList"></div>
                  <div className="ntg__to">
                    <span>Send workspace alerts to</span>
                    <input type="email" id="ntWebTo" placeholder="you@yourcompany.com" autoComplete="off" />
                  </div>
                </div>

                <div className="ntg">
                  <div className="ntg__h"><b>Applicant emails</b><span>Which stage changes email the candidate automatically</span></div>
                  <div className="nt__list" id="adNotify2"></div>
                </div>
              </div>

              <div className="wkv" data-wkv="set">
                <div className="wk__ph">
                  <div><h3>Admin settings</h3>
                    <p>Workspace-wide rules. These apply to everyone on the team, not just you.</p></div>
                </div>
                <div id="wkSetBody"></div>
              </div>

            </div>
          </div>
        </div>

        {/* offered */}
        <div className="adv" data-adv="offered">
          <div className="ad__seg" id="adOfferSeg" style={{marginBottom: "12px"}}></div>
          <div className="rw__wrap" id="adOfferRows"></div>
        </div>

        {/* hired */}
        <div className="adv" data-adv="hired">
          <div className="ad__tools">
            <div className="ad__search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input type="search" id="adHiredSearch" placeholder="Search hired people\u2026" />
            </div>
            <span className="ad__count" id="adHiredCount"></span>
          </div>
          <div className="rw__wrap" id="adHiredRows"></div>
        </div>
      </div>
    </div>
  </div>

  <input type="file" id="adLetterFile" accept=".pdf,.doc,.docx,.txt,.rtf" style={{display: "none"}} />

  {/* joining date must be confirmed before anyone moves into Offer */}
  <div className="jd__wrap" id="adJoinDw" role="dialog" aria-modal="true" aria-labelledby="adJoinTitle">
    <div className="jd__bd" data-jd-cancel=""></div>
    <div className="jd__box">
      <h3 id="adJoinTitle">Confirm the joining date</h3>
      <p className="jd__who" id="adJoinWho"></p>
      <label className="jd__lbl" htmlFor="adJoinDate">Agreed start date</label>
      <input type="date" id="adJoinDate" />
      <div className="jd__quick">
        <button type="button" data-jd-add="7">In 1 week</button>
        <button type="button" data-jd-add="14">In 2 weeks</button>
        <button type="button" data-jd-add="30">In 1 month</button>
        <button type="button" data-jd-add="60">In 2 months</button>
      </div>
      <div className="jd__note" id="adJoinNote"></div>
      <div className="jd__act">
        <button className="ad__ghost" type="button" data-jd-cancel="">Cancel</button>
        <button className="btn btn--primary" type="button" id="adJoinGo">Confirm &amp; continue</button>
      </div>
    </div>
  </div>

  {/* job drawer */}
  <div className="ad__dw" id="adJobDw">
    <div className="ad__dwbd" data-ad-close=""></div>
    <div className="ad__dwin">
      <div className="ad__dwh">
        <div><h3 id="adJobDwT">New job post</h3><small id="adJobDwS">Open posts appear on the careers page immediately</small></div>
        <button className="ad__x" type="button" data-ad-close="">&#10005;</button>
      </div>

      <div className="ad__dwb jf__body">
        <div className="jf__prevwrap">
          <span className="jf__prevlbl">Live preview · how candidates will see it</span>
          <div className="jf__prev" id="jfPreview"></div>
        </div>

        <section className="jf__sec">
          <header><span className="jf__eyebrow">Step 01</span>
            <b>The role</b><span>Title, contract and where it is based</span></header>
          <div className="cr__f"><label>Job title <span>*</span></label>
            <input type="text" id="jfTitle" placeholder="e.g. Telemarketer" /></div>
          <div className="cr__f2">
            <div className="cr__f"><label>Employment type</label>
              <select id="jfType"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
            <div className="cr__f"><label>Job setup</label>
              <select id="jfSetup"><option>Remote</option><option>Hybrid</option><option>On-site</option></select></div>
          </div>
          <div className="cr__f"><label>Location <small>(optional)</small></label>
            <input type="text" id="jfLoc" placeholder="Leave blank to hire from anywhere" />
            <small>Skipped locations show as “Anywhere” on the careers page.</small></div>
        </section>

        <section className="jf__sec">
          <header><span className="jf__eyebrow">Step 02</span>
            <b>Description</b><span>What candidates read before they apply</span></header>
          <div className="cr__f"><label>Short summary <span>*</span></label>
            <textarea id="jfSummary" style={{minHeight: "88px"}} placeholder="Two or three sentences describing the job itself."></textarea>
            <small id="jfSumCount">0 characters</small></div>
          <div className="cr__f"><label>What the job involves</label>
            <textarea id="jfDoes" style={{minHeight: "118px"}} placeholder="Make outbound calls to prospect lists\nQualify interest and log outcomes in the CRM"></textarea>
            <small>One point per line.</small></div>
          <div className="cr__f"><label>What we need from you</label>
            <textarea id="jfWants" style={{minHeight: "118px"}} placeholder="1+ year of phone-based sales experience\nClear spoken English"></textarea>
            <small>One point per line.</small></div>
        </section>

        <section className="jf__sec">
          <header><span className="jf__eyebrow">Step 03</span>
            <b>Compensation</b><span>How this role gets paid</span></header>
          <div className="ad__checks">
            <label className="ad__check"><input type="checkbox" id="jfRetainer" />
              <span className="ad__box"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></span>
              <span><b>Base retainer</b><span>A fixed amount paid every month</span></span></label>
            <label className="ad__check"><input type="checkbox" id="jfCommission" />
              <span className="ad__box"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg></span>
              <span><b>Commission</b><span>Paid per result — meeting, contract or sale</span></span></label>
          </div>
          <div className="cr__f"><label>Pay detail shown to candidates</label>
            <input type="text" id="jfPay" placeholder="e.g. Commission only \u00b7 paid per booked meeting" /></div>
        </section>

        <section className="jf__sec">
          <header><span className="jf__eyebrow">Step 04</span>
            <b>Screening</b><span>Extra steps in the application</span></header>
          <label className="ad__toggle"><input type="checkbox" id="jfVoice" />
            <span><b>Require a voice introduction</b>
            <span>Applicants record a spoken intro in the browser with no time limit. Recommended for phone-facing roles — you can play it back from their record.</span></span></label>
        </section>

        <div className="cr__err" id="jfErr">Add at least a title and a summary.</div>
      </div>

      <div className="ad__dwf jf__foot">
        <div className="jf__stat">
          <span>Publish as</span>
          <div className="ad__seg" id="jfStatusSeg">
            <button className="ad__sg on" type="button" data-jf-stat="open">Open</button>
            <button className="ad__sg" type="button" data-jf-stat="draft">Draft</button>
            <button className="ad__sg" type="button" data-jf-stat="closed">Closed</button>
          </div>
        </div>
        <div className="jf__btns">
          <button className="ad__ghost" type="button" data-ad-close="">Cancel</button>
          <button className="btn btn--primary" type="button" id="jfSave">Save job post</button>
        </div>
      </div>
    </div>
  </div>

  {/* applicant drawer */}
  <div className="ad__dw" id="adAppDw">
    <div className="ad__dwbd" data-ad-close=""></div>
    <div className="ad__dwin">
      <div className="ad__dwh"><div><h3 id="adAppDwT">Candidate</h3><small id="adAppDwS"></small></div>
        <button className="ad__x" type="button" data-ad-close="">&#10005;</button></div>
      <div className="ad__dwb" id="adAppDwB"></div>
      <div className="ad__dwf">
        <button className="ad__ghost" type="button" data-ad-close="">Close</button>
        <button className="ad__ghost" type="button" id="adReject" style={{color: "var(--rev)", borderColor: "rgba(255,61,90,.4)"}}>Reject</button>
        <button className="btn btn--primary" type="button" id="adAdvance">Advance stage</button>
      </div>
    </div>
  </div>
 </div>
</div>
    </>
  );
}
