export default function Crmroot() {
  return (
    <>
<div id="crmRoot">

{/* SPLASH */}
<div className="splash" id="splash" hidden="">
  <div className="splash__in">
    <div className="splash__logo">
      <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="#fff" strokeWidth="2" /><path d="M16 6v10l7 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
    </div>
    <h1>Welcome back — here is what your engine earned</h1>
    <p id="splashMsg">Authenticating…</p>
    <div className="splash__bar"><i></i></div>
  </div>
</div>

<div className="scrim" id="scrim"></div>

{/* APP */}
<div className="app" id="app">
  <header className="hdr">
    <div className="wrap hdr__bar">
      <div className="brand"><span className="brand__mark">I</span><span className="brand__name">Incomera<i>Engine</i></span></div>
      <div className="cmd">
        <svg className="cmd__ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" /></svg>
        <input id="askInput" placeholder="Ask your Incomera team or search\u2026" />
        <span className="cmd__k">⌘K</span>
      </div>
      <div className="hdr__right">
        <span className="pill"><i></i>Live</span>
        <button className="ib" title="Notifications"><svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 004 0" /></svg></button>
        <div className="account">
          <div className="avat">AV</div>
          <div className="account__who"><b>Ava Whitfield</b><span>Head of Growth</span></div>
          <button className="ib" id="logoutBtn" title="Sign out"><svg viewBox="0 0 24 24"><path d="M15 4h4v16h-4M11 8l-4 4 4 4M7 12h9" /></svg></button>
        </div>
        <button className="menu-btn" id="menuBtn"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
      </div>
    </div>
    <nav className="wrap tabs" id="nav">
      <div className="navi on" data-view="overview">Overview</div>
      <div className="navi" data-view="pipeline">Pipeline<span className="tabb">$4.2M</span></div>
      <div className="navi" data-view="crm">CRM<span className="tabb">248</span></div>
      <div className="navi" data-view="inbox">Inbox<span className="tabb rev">7</span></div>
      <div className="navi" data-view="campaigns">Campaigns</div>
      <div className="navi" data-view="analytics">Analytics</div>
      <div className="navi" data-view="copilot">AI Copilot</div>
      <div className="navi" data-view="settings">Settings</div>
    </nav>
  </header>
  <main className="wrap content">
    <div className="pagehead">
      <div><p className="lbl" id="topSub">Live · updated just now</p><h1 id="topTitle">Revenue Overview</h1></div>
      <div className="pagehead__act"><button className="btn btn--ghost">Export</button><button className="btn btn--primary"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>New deal</button></div>
    </div>

      {/* ============ OVERVIEW ============ */}
      <section className="view on" id="view-overview">
        <div className="kpis" id="kpiRow"></div>

        <div className="grid2">
          <div className="card">
            <div className="card__hd">
              <h3>Revenue &amp; forecast</h3><span className="sub">Actual vs AI projection</span>
              <div className="r">
                <div className="seg" id="revSeg"><button className="on" data-m="6">6M</button><button data-m="12">12M</button><button data-m="24">24M</button></div>
              </div>
            </div>
            <div className="card__bd">
              <div className="chartwrap"><canvas id="revChart" height="260"></canvas><div className="chart-tt" id="revTT"></div></div>
              <div className="legend" style={{marginTop: "14px"}}>
                <span><i style={{background: "var(--blue)"}}></i>Closed revenue</span>
                <span><i style={{background: "var(--in)"}}></i>Committed pipeline</span>
                <span><i style={{background: "var(--violet)", opacity: ".5"}}></i>AI forecast (±band)</span>
              </div>
            </div>
          </div>

          <div className="card ai-panel">
            <div className="card__hd">
              <i className="spark"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z" /></svg></i>
              <h3>AI insights</h3><span className="sub">Generated 2m ago</span>
            </div>
            <div className="card__bd" id="insightList"></div>
          </div>
        </div>

        <div className="grid3">
          <div className="card" style={{gridColumn: "span 1"}}>
            <div className="card__hd"><h3>Pipeline funnel</h3><span className="sub">This quarter</span></div>
            <div className="card__bd"><div className="funnel" id="funnel"></div></div>
          </div>

          <div className="card">
            <div className="card__hd"><h3>Next best actions</h3><span className="sub">Prioritized by your Incomera team</span></div>
            <div className="card__bd" id="nbaList"></div>
          </div>

          <div className="card">
            <div className="card__hd"><h3>Live activity</h3><div className="r"><span className="pill" style={{padding: "4px 9px"}}><i></i><span id="feedRate">32/hr</span></span></div></div>
            <div className="card__bd"><div className="feed" id="feed"></div></div>
          </div>
        </div>
      </section>

      {/* ============ PIPELINE ============ */}
      <section className="view" id="view-pipeline">
        <div className="pipe-bar">
          <div className="stat">Open pipeline <b id="pipeTotal">$0</b></div>
          <div className="stat">Weighted <b id="pipeWeighted">$0</b></div>
          <div className="stat">Deals <b id="pipeCount">0</b></div>
          <div className="stat">Avg deal <b id="pipeAvg">$0</b></div>
          <div style={{marginLeft: "auto"}}><button className="btn btn--primary"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>New deal</button></div>
        </div>
        <div className="kanban" id="kanban"></div>
      </section>

            {/* ============ CRM ============ */}
      <section className="view" id="view-crm">
        <div className="subtabs" id="crmSub">
          <button className="subtab on" data-sub="companies">Companies <span id="cntCompanies">0</span></button>
          <button className="subtab" data-sub="contacts">Contacts <span id="cntContacts">0</span></button>
          <button className="subtab" data-sub="leads">Leads <span id="cntLeads">0</span></button>
          <button className="subtab" data-sub="customers">Customers <span id="cntCustomers">0</span></button>
        </div>
        <div className="crm-sum" id="crmSum"></div>
        <div className="card">
          <div className="card__bd">
            <div className="toolbar">
              <div className="search-in">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3-3" /></svg>
                <input id="crmSearch" placeholder="Search\u2026" />
              </div>
              <span id="crmFilters"></span>
              <span className="rowcount" id="crmCount"></span>
              <button className="btn btn--primary" style={{marginLeft: "8px"}}><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg><span id="crmAddLabel">Add</span></button>
            </div>
            <div className="tablewrap">
              <table className="grid" id="crmTable"><thead id="crmHead"></thead><tbody id="crmBody"></tbody></table>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INBOX ============ */}
      <section className="view" id="view-inbox">
        <div className="inbox">
          <div className="card thread-list" id="threadList" style={{padding: "0"}}></div>
          <div className="card convo" id="convo"></div>
        </div>
      </section>

      {/* ============ CAMPAIGNS ============ */}
      <section className="view" id="view-campaigns">
        <div className="grid3" id="campGrid" style={{marginTop: "0"}}></div>
      </section>

      {/* ============ ANALYTICS ============ */}
      <section className="view" id="view-analytics">
        <div className="kpis" id="biKpis"></div>
        <div className="grid2">
          <div className="card">
            <div className="card__hd"><h3>Channel attribution</h3><span className="sub">Revenue influence</span></div>
            <div className="card__bd"><div className="attr" id="attrList"></div></div>
          </div>
          <div className="card">
            <div className="card__hd"><h3>Conversion by stage</h3><span className="sub">Cohort · last 90d</span></div>
            <div className="card__bd"><div className="chartwrap"><canvas id="convChart" height="250"></canvas></div></div>
          </div>
        </div>
        <div className="grid2">
          <div className="card">
            <div className="card__hd"><h3>Engagement heatmap</h3><span className="sub">Reply rate by day &amp; hour</span></div>
            <div className="card__bd"><div className="heat" id="heat"></div>
              <div className="legend" style={{marginTop: "14px", justifyContent: "flex-end"}}>
                <span className="lbl">Low</span>
                <span style={{display: "flex", gap: "3px"}}>
                  <i style={{width: "16px", height: "11px", borderRadius: "3px", background: "rgba(36,86,230,.15)"}}></i>
                  <i style={{width: "16px", height: "11px", borderRadius: "3px", background: "rgba(36,86,230,.4)"}}></i>
                  <i style={{width: "16px", height: "11px", borderRadius: "3px", background: "rgba(36,86,230,.7)"}}></i>
                  <i style={{width: "16px", height: "11px", borderRadius: "3px", background: "rgba(36,86,230,1)"}}></i>
                </span>
                <span className="lbl">High</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__hd"><h3>Rep leaderboard</h3><span className="sub">Quota attainment</span></div>
            <div className="card__bd"><div className="attr" id="repList"></div></div>
          </div>
        </div>
      </section>

      {/* ============ COPILOT ============ */}
      <section className="view" id="view-copilot">
        <div className="copilot">
          <div className="card chatwin">
            <div className="card__hd">
              <i className="spark" style={{width: "24px", height: "24px", borderRadius: "7px", display: "grid", placeItems: "center", color: "#fff", background: "linear-gradient(135deg,var(--violet),var(--blue))"}}><svg viewBox="0 0 24 24" style={{width: "14px", height: "14px", fill: "currentColor"}}><path d="M12 2l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z" /></svg></i>
              <h3>Incomera Copilot</h3><span className="sub">Connected to your pipeline</span>
              <div className="r"><span className="pill" style={{padding: "4px 10px"}}><i style={{background: "var(--violet)", boxShadow: "0 0 0 3px var(--violet-soft)"}}></i>GPT-grade reasoning</span></div>
            </div>
            <div className="chat-body" id="chatBody"></div>
            <div className="chat-foot">
              <div className="chat-in">
                <input id="chatInput" placeholder="Ask about deals, forecasts, or accounts\u2026" />
                <button className="chat-send" id="chatSend"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
              </div>
              <div className="suggests" id="suggests"></div>
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <div className="card"><div className="card__hd"><h3>Pipeline health</h3></div><div className="card__bd" id="healthBox"></div></div>
            <div className="card"><div className="card__hd"><h3>At-risk deals</h3><span className="sub" id="riskCount"></span></div><div className="card__bd" id="riskBox"></div></div>
          </div>
        </div>
      </section>

      {/* ============ SETTINGS ============ */}
      <section className="view" id="view-settings">
        <div className="grid2" style={{marginTop: "0"}}>
          <div className="card"><div className="card__hd"><h3>Automation</h3><span className="sub">What your income engine runs</span></div>
            <div className="card__bd" id="autoSettings"></div>
          </div>
          <div className="card"><div className="card__hd"><h3>Workspace</h3></div>
            <div className="card__bd">
              <div className="set-row"><div className="b"><b>Team seats</b><span>12 of 20 used</span></div><span className="tag qual">Team plan</span></div>
              <div className="set-row"><div className="b"><b>Connected inboxes</b><span>Gmail, Outlook, LinkedIn</span></div><span className="tag won">Synced</span></div>
              <div className="set-row"><div className="b"><b>CRM data residency</b><span>US-East · SOC 2 Type II</span></div><span className="tag eng">Encrypted</span></div>
              <div className="set-row"><div className="b"><b>Model</b><span>Custom model · tuned on your wins</span></div><span className="tag new">Active</span></div>
            </div>
          </div>
        </div>
      </section>
  </main>
</div>

</div>
    </>
  );
}
