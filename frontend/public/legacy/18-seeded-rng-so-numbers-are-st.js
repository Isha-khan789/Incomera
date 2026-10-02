/* =========================================================
   INCOMERA CLIENT DASHBOARD — front-end data + interactions (mock)
   ========================================================= */
(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var fmt=function(n){return n.toLocaleString('en-US')};
  var money=function(n){ if(n>=1e6) return '$'+(n/1e6).toFixed(2).replace(/\.00$/,'')+'M'; if(n>=1e3) return '$'+(n/1e3).toFixed(1).replace(/\.0$/,'')+'k'; return '$'+fmt(n); };

  /* seeded RNG so numbers are stable across reloads */
  var seed=42; function rnd(){ seed=(seed*1103515245+12345)&0x7fffffff; return seed/0x7fffffff; }
  function pick(a){ return a[Math.floor(rnd()*a.length)]; }
  function between(a,b){ return a+rnd()*(b-a); }

  /* ---------- DATA ---------- */
  var reps=[
    {i:'AV',n:'Ava Whitfield',c:'#2456E6'},{i:'MK',n:'Marco Kim',c:'#0A7E92'},
    {i:'SR',n:'Sara Ito',c:'#7A5AF8'},{i:'DL',n:'Dev Lang',c:'#1FA971'},{i:'NB',n:'Noor Bah',c:'#E8912A'}
  ];
  var companies=['Northwind','Acme Robotics','Lumen Health','Pallas Bank','Vertex Media','Cobalt Freight',
    'Meridian Labs','Kepler Foods','Auric Cloud','Solace HR','Tidewater Legal','Beacon Solar','Orbit Retail',
    'Halcyon AI','Ridge Manufacturing','Cinder Games','Pinnacle Realty','Quill Publishing','Vantage Insurance','Delta Foods'];
  var stages=[
    {id:'lead',name:'New lead',c:'#7C879B'},
    {id:'qual',name:'Qualified',c:'#2456E6'},
    {id:'demo',name:'Demo',c:'#15C5DE'},
    {id:'prop',name:'Proposal',c:'#7A5AF8'},
    {id:'won',name:'Won',c:'#1FA971'}
  ];
  var stageProb={lead:.1,qual:.3,demo:.5,prop:.75,won:1};

  var deals=[];
  for(var d=0; d<26; d++){
    var st=pick(stages.slice(0, d<4?5:4));
    if(d<3) st=stages[4];
    var owner=pick(reps);
    var val=Math.round(between(18,240))*1000;
    var health=Math.round(between(28,96));
    var chan=rnd()>.45?'out':'in';
    deals.push({
      id:'D'+(1000+d), co:pick(companies)+' '+pick(['Inc','Group','Co','LLC','Ltd']),
      val:val, stage:st.id, owner:owner, health:health, chan:chan,
      ai:pick([
        'Champion went quiet 6 days — nudge with ROI recap.',
        'Buying signals up 40% this week. Push for demo.',
        'Budget confirmed. Send proposal before Friday.',
        'Competitor mentioned — reinforce differentiation.',
        'Multi-threaded across 3 stakeholders. Healthy.',
        'No next step booked. Risk of slippage.'
      ]),
      days:Math.round(between(1,34))
    });
  }
  function healthColor(h){ return h>=70?'var(--good)':h>=45?'var(--warn)':'var(--rev)'; }

  var statuses=[{k:'hot',t:'Hot',cls:'hot'},{k:'qual',t:'Qualified',cls:'qual'},{k:'eng',t:'Engaged',cls:'eng'},{k:'new',t:'New',cls:'new'},{k:'cold',t:'Cold',cls:'cold'}];
  var first=['Jordan','Priya','Liam','Mei','Tom','Ravi','Elena','Kojo','Sana','Wren','Diego','Yuki','Omar','Freya','Ike','Lucia'];
  var last=['Ford','Nair','Cole','Wu','Reed','Shah','Vega','Mensah','Ali','Park','Cruz','Sato','Diaz','Berg','Ono','Marsh'];
  var leads=[];
  for(var l=0; l<44; l++){
    var s=pick(statuses);
    var score= s.k==='hot'?Math.round(between(80,98)): s.k==='cold'?Math.round(between(20,44)):Math.round(between(45,88));
    leads.push({
      name:pick(first)+' '+pick(last),
      title:pick(['VP Sales','Head of Ops','CTO','Growth Lead','Founder','RevOps','Director IT','CMO']),
      company:pick(companies),
      status:s, score:score, channel:rnd()>.5?'o':'i',
      value:Math.round(between(8,180))*1000,
      owner:pick(reps),
      last:pick(['2m','18m','1h','3h','5h','1d','2d','4d','1w'])
    });
  }

  /* ---------- SPLASH / AUTO SIGN-IN ---------- */
  var app=$('#app'), splash=$('#splash');
  function boot(){ app.classList.add('ready'); renderAll(); }
  var booted=false;
  window.incomeraOpen=function(){
    var root=document.getElementById('crmRoot'); if(root) root.classList.add('show');
    document.body.style.overflow='hidden';
    if(!booted){
      booted=true; splash.hidden=false;
      var msgs=['Authenticating…','Loading your pipeline…','Scoring 318 leads…','Syncing inboxes…','Ready'];
      var mi=0, mE=$('#splashMsg');
      var iv=setInterval(function(){ mi++; if(mi<msgs.length) mE.textContent=msgs[mi]; },300);
      setTimeout(function(){ clearInterval(iv); splash.classList.add('gone'); setTimeout(function(){splash.remove();},600);
        boot(); setTimeout(function(){ renderKpis($('#kpiRow'),kpis); renderKpis($('#biKpis'),biKpis); sizeAndDraw(); },720); },1600);
    } else { setTimeout(function(){ renderKpis($('#kpiRow'),kpis); renderKpis($('#biKpis'),biKpis); sizeAndDraw(); if($('#view-analytics').classList.contains('on')) drawConv(); },50); }
  };
  window.incomeraClose=function(){ var root=document.getElementById('crmRoot'); if(root) root.classList.remove('show'); document.body.style.overflow=''; };

  /* ---------- ROUTER ---------- */
  var titles={
    overview:['Revenue Overview','Live · updated just now'],
    pipeline:['Pipeline','Drag deals to move stages'],
    crm:['Customer Relationships','Companies · Contacts · Leads · Customers'],
    inbox:['Unified Inbox','Email · LinkedIn · sentiment-tagged'],
    campaigns:['Campaigns','Outbound sequences · live'],
    analytics:['Business Intelligence','Attribution · cohorts · forecast'],
    copilot:['Your team','Ask your Incomera team about your revenue'],
    settings:['Settings','Automation & workspace']
  };
  function go(view){
    $$('.navi').forEach(function(n){ n.classList.toggle('on', n.dataset.view===view); });
    $$('.view').forEach(function(v){ v.classList.toggle('on', v.id==='view-'+view); });
    $('#topTitle').textContent=titles[view][0]; $('#topSub').textContent=titles[view][1];
    if(view==='overview'){ sizeAndDraw(); }
    if(view==='analytics'){ drawConv(); }
    closeSide();
    window.scrollTo({top:0,behavior:'instant'});
  }
  $('#nav').addEventListener('click',function(e){ var n=e.target.closest('.navi'); if(n) go(n.dataset.view); });
  $$('.js-view').forEach(function(b){ b.addEventListener('click',function(){ go(b.dataset.view); }); });

  /* mobile sidebar */
  function openSide(){ var s=$('#side'); if(s)s.classList.add('open'); var c=$('#scrim'); if(c)c.classList.add('on'); }
  function closeSide(){ var s=$('#side'); if(s)s.classList.remove('open'); var c=$('#scrim'); if(c)c.classList.remove('on'); }
  var _mb=$('#menuBtn'); if(_mb)_mb.addEventListener('click',openSide); var _sc=$('#scrim'); if(_sc)_sc.addEventListener('click',closeSide);

  /* logout */
  $('#logoutBtn').addEventListener('click',function(){ window.incomeraClose&&window.incomeraClose(); });

  /* ---------- RENDER: KPIs ---------- */
  function spark(canvas,data,color){
    var dpr=window.devicePixelRatio||1, w=canvas.clientWidth, h=canvas.clientHeight;
    canvas.width=w*dpr; canvas.height=h*dpr; var x=canvas.getContext('2d'); x.scale(dpr,dpr);
    var mn=Math.min.apply(0,data), mx=Math.max.apply(0,data), pad=3;
    function px(i){return i/(data.length-1)*w;} function py(v){return h-pad-(v-mn)/(mx-mn||1)*(h-pad*2);}
    var g=x.createLinearGradient(0,0,0,h); g.addColorStop(0,color+'33'); g.addColorStop(1,color+'00');
    x.beginPath(); x.moveTo(0,h);
    data.forEach(function(v,i){ x.lineTo(px(i),py(v)); }); x.lineTo(w,h); x.closePath(); x.fillStyle=g; x.fill();
    x.beginPath(); data.forEach(function(v,i){ i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)); });
    x.strokeStyle=color; x.lineWidth=1.6; x.lineJoin='round'; x.stroke();
    x.beginPath(); x.arc(px(data.length-1),py(data[data.length-1]),2.4,0,7); x.fillStyle=color; x.fill();
  }
  var kpis=[
    {k:'Closed revenue',v:'$1.84M',d:'+18.2%',up:1,c:'var(--blue)',ic:'M3 12h4l3 7 4-14 3 7h4',s:[9,11,10,13,12,15,14,18,17,21,20,24]},
    {k:'Open pipeline',v:'$4.24M',d:'+9.4%',up:1,c:'var(--in-deep)',ic:'M4 18V8M10 18V4M16 18v-6M20 18v-9',s:[30,31,33,32,35,38,37,40,39,42,43,42]},
    {k:'Win rate',v:'34.6%',d:'+3.1pt',up:1,c:'var(--violet)',ic:'M12 3l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z',s:[28,29,30,31,30,32,33,34,33,35,34,35]},
    {k:'Meetings booked',v:'214',d:'+27',up:1,c:'var(--good)',ic:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',s:[12,15,14,18,20,19,24,26,25,28,30,29]},
    {k:'Reply rate',v:'19.8%',d:'-1.2pt',up:0,c:'var(--warn)',ic:'M4 5h16v11H8l-4 4z',s:[24,23,22,24,21,22,20,21,20,20,19,20]},
    {k:'Avg cycle',v:'31 days',d:'-4 days',up:1,c:'var(--rev)',ic:'M12 7v5l3 3M12 3a9 9 0 100 18 9 9 0 000-18z',s:[42,40,41,38,37,36,35,34,33,32,32,31]}
  ];
  function renderKpis(el,list){
    el.innerHTML=list.map(function(k,i){
      return '<div class="card kcard" style="--kc:'+k.c+'">'+
        '<div class="kt"><span class="ki"><svg viewBox="0 0 24 24"><path d="'+k.ic+'"/></svg></span>'+k.k+'</div>'+
        '<div class="kv">'+k.v+'</div>'+
        '<div class="kf"><span class="delta '+(k.up?'up':'dn')+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">'+(k.up?'<path d="M6 15l6-6 6 6"/>':'<path d="M6 9l6 6 6-6"/>')+'</svg>'+k.d+'</span><small>vs last mo</small></div>'+
        '<canvas class="kspark" id="'+el.id+'sp'+i+'"></canvas></div>';
    }).join('');
    list.forEach(function(k,i){ spark($('#'+el.id+'sp'+i), k.s, k.c.indexOf('var')===0? getComputedStyle(document.getElementById('crmRoot')||document.documentElement).getPropertyValue(k.c.slice(4,-1)).trim() : k.c); });
  }

  var biKpis=[
    {k:'Pipeline coverage',v:'3.4×',d:'+0.3×',up:1,c:'var(--blue)',ic:'M4 18V8M10 18V4M16 18v-6M20 18v-9',s:[28,29,30,31,32,33,34]},
    {k:'Forecast accuracy',v:'92%',d:'+4pt',up:1,c:'var(--good)',ic:'M12 3l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z',s:[85,86,88,87,90,91,92]},
    {k:'CAC payback',v:'7.2 mo',d:'-0.8mo',up:1,c:'var(--violet)',ic:'M12 7v5l3 3M12 3a9 9 0 100 18 9 9 0 000-18z',s:[9,8.6,8.2,8,7.8,7.5,7.2]},
    {k:'Net revenue retention',v:'118%',d:'+3pt',up:1,c:'var(--in-deep)',ic:'M4 12a8 8 0 018-8v4l4-4-4-4',s:[112,113,114,115,116,117,118]},
    {k:'Avg deal size',v:'$68k',d:'+$5k',up:1,c:'var(--warn)',ic:'M12 3v18M8 7h6a3 3 0 010 6H8m0 0h8',s:[58,60,61,63,64,66,68]},
    {k:'Lead → SQL',v:'22.4%',d:'+1.9pt',up:1,c:'var(--rev)',ic:'M4 20V4M4 20h16M8 16l3-5 3 3 4-7',s:[18,19,20,20,21,22,22]}
  ];

  /* ---------- INSIGHTS ---------- */
  var insights=[
    {ic:'var(--rev)',svg:'M12 2l10 18H2z M12 9v5 M12 17h.01',p:'<b>3 deals worth $412k</b> stalled in Proposal with no next step. Slippage risk this quarter.',meta:'Deal risk',conf:'94% confidence',act:'Review'},
    {ic:'var(--good)',svg:'M12 3l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z',p:'Outbound to <b>fintech</b> converts 2.1× the account average. Reallocate 20% of sequences here.',meta:'Opportunity',conf:'88% confidence',act:'Apply'},
    {ic:'var(--blue)',svg:'M4 20V4M4 20h16M8 16l3-5 3 3 4-7',p:'Tuesday 9–11am replies land <b>41% higher</b>. We shifted 60 sends into that window.',meta:'Optimization · auto-applied',conf:'Live',act:'Undo'},
    {ic:'var(--violet)',svg:'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4l3 2',p:'Forecast trending <b>$1.98M</b> for the quarter — 6% above target if Acme &amp; Vertex close.',meta:'Projection',conf:'92% confidence',act:'Details'}
  ];
  function renderInsights(){
    $('#insightList').innerHTML=insights.map(function(x){
      return '<div class="insight" style="--ic:'+x.ic+'">'+
        '<div class="insight__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="'+x.svg+'"/></svg></div>'+
        '<div class="insight__b"><p>'+x.p+'</p><div class="insight__meta">'+x.meta+' · <span class="conf">'+x.conf+'</span></div></div>'+
        '<div class="insight__act"><button class="miniact">'+x.act+'</button></div></div>';
    }).join('');
  }

  /* ---------- NEXT BEST ACTIONS ---------- */
  var nbas=[
    {pri:'h',t:'Call back Priya Nair — Vertex Media',s:'Opened proposal 4× today · $180k · high intent'},
    {pri:'h',t:'Rescue Cobalt Freight deal',s:'Champion silent 8 days · send ROI recap'},
    {pri:'m',t:'Send follow-up to 12 warm leads',s:'Your Incomera team drafted sequences · awaiting approval'},
    {pri:'l',t:'Book demo — Halcyon AI',s:'Fits ICP · engaged with 3 emails'}
  ];
  function renderNba(){
    $('#nbaList').innerHTML=nbas.map(function(n){
      return '<div class="nba"><div class="nba__pri '+n.pri+'">'+n.pri.toUpperCase()+'</div>'+
        '<div class="nba__b"><b>'+n.t+'</b><span>'+n.s+'</span></div>'+
        '<button class="nba__go">Do it</button></div>';
    }).join('');
  }

  /* ---------- FUNNEL ---------- */
  var funnelData=[
    {n:'Prospects reached',v:8420,cv:null},
    {n:'Engaged',v:2960,cv:35.2},
    {n:'Qualified (SQL)',v:1180,cv:39.9},
    {n:'Demo booked',v:620,cv:52.5},
    {n:'Proposal',v:284,cv:45.8},
    {n:'Closed won',v:98,cv:34.5}
  ];
  function renderFunnel(){
    var max=funnelData[0].v;
    $('#funnel').innerHTML=funnelData.map(function(f){
      var pct=(f.v/max*100);
      return '<div class="fstage"><div class="fstage__t"><b>'+f.n+'</b><span>'+fmt(f.v)+'</span></div>'+
        '<div class="fbar"><i style="width:'+Math.max(pct,8)+'%">'+(pct>18?fmt(f.v):'')+'</i></div>'+
        (f.cv?'<div class="fstage__cv">▲ '+f.cv+'% step conversion</div>':'')+'</div>';
    }).join('');
  }

  /* ---------- LIVE FEED ---------- */
  var feedEvents=[
    {c:'var(--blue)',t:'<b>Your team</b> sent follow-up to Meridian Labs'},
    {c:'var(--good)',t:'<b>Vertex Media</b> replied — sentiment positive'},
    {c:'var(--in)',t:'Inbound demo request from <b>Auric Cloud</b>'},
    {c:'var(--violet)',t:'<b>Your team</b> enriched 6 new leads'},
    {c:'var(--warn)',t:'<b>Cobalt Freight</b> opened proposal 3×'},
    {c:'var(--blue)',t:'Meeting booked with <b>Pallas Bank</b>'},
    {c:'var(--good)',t:'<b>Lumen Health</b> moved to Proposal'},
    {c:'var(--rev)',t:'<b>Kepler Foods</b> went cold — flagged'},
    {c:'var(--in)',t:'LinkedIn reply from <b>Beacon Solar</b>'}
  ];
  function feedRow(e,age){
    return '<div class="frow" style="animation:crmfeedin .4s both;color:'+e.c+'">'+
      '<span class="fdot" style="background:'+e.c+'"></span>'+
      '<p>'+e.t+'</p><time>'+age+'</time></div>';
  }
  function renderFeed(){
    var ages=['now','1m','2m','4m','6m','9m','12m','15m'];
    $('#feed').innerHTML=feedEvents.slice(0,8).map(function(e,i){return feedRow(e,ages[i]);}).join('');
  }
  setInterval(function(){
    var feed=$('#feed'); if(!feed || !$('#view-overview').classList.contains('on')) return;
    var e=feedEvents[Math.floor(Math.random()*feedEvents.length)];
    feed.insertAdjacentHTML('afterbegin',feedRow(e,'now'));
    while(feed.children.length>9) feed.removeChild(feed.lastChild);
    $$('.frow time',feed).forEach(function(t,i){ if(i>0) t.textContent=(i)+'m'; });
    var r=28+Math.floor(Math.random()*12); $('#feedRate').textContent=r+'/hr';
  },3800);

  /* ---------- PIPELINE / KANBAN ---------- */
  function renderKanban(){
    var kb=$('#kanban'); kb.innerHTML='';
    var openVal=0,weighted=0,count=0;
    stages.forEach(function(s){
      var col=document.createElement('div'); col.className='kcol'; col.dataset.stage=s.id;
      var list=deals.filter(function(d){return d.stage===s.id;});
      var sum=list.reduce(function(a,b){return a+b.val;},0);
      if(s.id!=='won'){ openVal+=sum; count+=list.length; list.forEach(function(d){weighted+=d.val*stageProb[d.stage];}); }
      col.innerHTML='<div class="kcol__hd"><i style="background:'+s.c+'"></i><b>'+s.name+'</b><span class="n">'+list.length+'</span></div>'+
        '<div class="kcol__sum">Total <b>'+money(sum)+'</b></div>'+
        '<div class="kcol__body"></div>';
      var body=col.querySelector('.kcol__body');
      list.forEach(function(d){ body.appendChild(dealCard(d)); });
      kb.appendChild(col);
    });
    $('#pipeTotal').textContent=money(openVal);
    $('#pipeWeighted').textContent=money(Math.round(weighted));
    $('#pipeCount').textContent=count;
    $('#pipeAvg').textContent=money(Math.round(openVal/count));
    wireDnD();
  }
  function dealCard(d){
    var el=document.createElement('div'); el.className='deal'; el.draggable=true; el.dataset.id=d.id;
    el.innerHTML='<div class="deal__top"><span class="deal__co">'+d.co+'</span>'+
      '<span class="deal__ch '+d.chan+'">'+(d.chan==='out'?'OUT':'IN')+'</span></div>'+
      '<div class="deal__val">'+money(d.val)+'</div>'+
      '<div class="deal__meta"><span class="deal__owner" style="background:'+d.owner.c+'">'+d.owner.i+'</span>'+d.owner.n.split(' ')[0]+' · '+d.days+'d in stage</div>'+
      '<div class="deal__health"><div class="health-bar"><i style="width:'+d.health+'%;background:'+healthColor(d.health)+'"></i></div>'+
      '<span style="color:'+healthColor(d.health)+'">'+d.health+'</span></div>'+
      '<div class="deal__ai"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z"/></svg>'+d.ai+'</div>';
    return el;
  }
  function wireDnD(){
    var dragging=null;
    $$('.deal').forEach(function(c){
      c.addEventListener('dragstart',function(){ dragging=c; c.classList.add('drag'); });
      c.addEventListener('dragend',function(){ c.classList.remove('drag'); dragging=null; recomputePipe(); });
    });
    $$('.kcol').forEach(function(col){
      col.addEventListener('dragover',function(e){ e.preventDefault(); col.classList.add('drop'); });
      col.addEventListener('dragleave',function(){ col.classList.remove('drop'); });
      col.addEventListener('drop',function(e){
        e.preventDefault(); col.classList.remove('drop');
        if(!dragging) return;
        var dd=deals.find(function(x){return x.id===dragging.dataset.id;});
        dd.stage=col.dataset.stage;
        col.querySelector('.kcol__body').appendChild(dragging);
        // update counts
        renderKanban();
      });
    });
  }
  function recomputePipe(){ /* counts refreshed by renderKanban on drop */ }

  /* ---------- CRM: Companies / Contacts / Leads / Customers ---------- */
  function ring(score){
    var col=score>=80?'#17A34A':score>=55?'#3B49F0':score>=40?'#C9821A':'#9CA1AB';
    var r=13, c=2*Math.PI*r, off=c*(1-score/100);
    return '<svg class="score-ring" viewBox="0 0 34 34"><circle cx="17" cy="17" r="'+r+'" fill="none" stroke="var(--line-soft)" stroke-width="3.4"/>'+
      '<circle cx="17" cy="17" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="'+c+'" stroke-dashoffset="'+off+'" transform="rotate(-90 17 17)"/></svg>';
  }
  function hcol(str){var pal=['#3B49F0','#0FB5A6','#6D5EF5','#C9821A','#17A34A','#2C38C8','#0B8E82','#E5484D'];var h=0;for(var i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))>>>0;return pal[h%pal.length];}
  function initials(str){var w=str.replace(/[^A-Za-z0-9 ]/g,'').split(' ').filter(Boolean);return ((w[0]?w[0][0]:'')+(w[1]?w[1][0]:'')).toUpperCase();}
  function avc(name){return '<span class="avat" style="width:28px;height:28px;background:'+hcol(name)+'">'+initials(name)+'</span>';}
  function logo(name){return '<span class="avat" style="width:28px;height:28px;border-radius:7px;background:'+hcol(name)+'">'+initials(name)+'</span>';}
  function ownerAv(o){return '<span class="deal__owner" style="width:22px;height:22px;background:'+o.c+';display:inline-grid">'+o.i+'</span>';}
  function healthCell(h){return '<div class="deal__health" style="margin-top:0;max-width:120px"><div class="health-bar"><i style="width:'+h+'%;background:'+healthColor(h)+'"></i></div><span style="color:'+healthColor(h)+'">'+h+'</span></div>';}

  var industries=['SaaS','Fintech','Healthcare','Logistics','Media','Manufacturing','Retail','Legal','Energy','Gaming','Real Estate','Insurance'];
  var cities=['San Francisco','New York','Austin','London','Berlin','Toronto','Chicago','Seattle','Boston','Denver','Miami','Remote'];
  var sizes=['11–50','51–200','201–500','501–1k','1k–5k','5k+'];
  var suffixes=['Inc','Group','Co','LLC','Labs','Systems','Global'];

  var stageDefs=[['customer','Customer','won'],['customer','Customer','won'],['opp','Opportunity','qual'],['opp','Opportunity','qual'],['prospect','Prospect','new']];
  var accounts=[];
  for(var a=0;a<46;a++){
    var sd=pick(stageDefs);
    var cust=sd[0]==='customer';
    var arr=cust?Math.round(between(40,620))*1000:sd[0]==='opp'?Math.round(between(20,300))*1000:Math.round(between(4,70))*1000;
    var si=Math.floor(between(0,sizes.length));
    accounts.push({name:pick(companies)+' '+pick(suffixes),industry:pick(industries),size:sizes[si],sizeIdx:si,
      stageKey:sd[0],stage:sd[1],stageTag:sd[2],stageRank:sd[0]==='customer'?2:sd[0]==='opp'?1:0,
      arr:arr,contacts:Math.round(between(2,19)),owner:pick(reps),health:Math.round(cust?between(52,97):between(34,86)),city:pick(cities)});
  }

  var roles=[['Decision maker','qual'],['Champion','won'],['Influencer','eng'],['User','new'],['Blocker','cold']];
  var domains=['acme.com','vertex.io','lumen.health','pallas.bank','cobalt.co','kepler.io','auric.cloud','beacon.energy','orbit.retail'];
  var contacts=[];
  for(var c2=0;c2<120;c2++){
    var fn=pick(first),ln=pick(last),ro=pick(roles),co=pick(companies);
    contacts.push({name:fn+' '+ln,title:pick(['VP Sales','Head of Ops','CTO','Growth Lead','Founder','RevOps','Director IT','CMO','Procurement','CFO']),
      company:co,email:(fn+'.'+ln).toLowerCase()+'@'+pick(domains),role:ro[0],roleTag:ro[1],owner:pick(reps),last:pick(['2m','18m','1h','3h','5h','1d','2d','4d','1w','2w'])});
  }

  var plans=[['Enterprise','qual',4],['Business','new',3],['Team','eng',2],['Starter','cold',1]];
  var custStatus=[['healthy','Healthy','won'],['healthy','Healthy','won'],['watch','Watch','eng'],['risk','At risk','hot']];
  var months2=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var customers=[];
  for(var cu=0;cu<38;cu++){
    var pl=pick(plans),stt=pick(custStatus);
    var mrr=pl[2]===4?Math.round(between(6,26))*1000:pl[2]===3?Math.round(between(2.5,9)*1000):pl[2]===2?Math.round(between(0.8,3)*1000):Math.round(between(0.2,0.9)*1000);
    customers.push({name:pick(companies)+' '+pick(suffixes),plan:pl[0],planTag:pl[1],planRank:pl[2],mrr:mrr,
      seats:Math.round(between(8,420)),statusKey:stt[0],status:stt[1],statusTag:stt[2],owner:pick(reps),
      renewIdx:Math.floor(between(0,12)),nps:Math.round(between(10,86))});
  }

  var money2=money; // alias
  function nn(v){return '<span class="mono">'+fmt(v)+'</span>';}

  var crmData={
    companies:{label:'account',add:'Add company',rows:accounts,
      cols:[{k:'name',t:'Company'},{k:'industry',t:'Industry'},{k:'size',t:'Size'},{k:'stage',t:'Stage'},
        {k:'arr',t:'ARR',num:1},{k:'contacts',t:'Contacts',num:1},{k:'owner',t:'Owner'},{k:'health',t:'Health',num:1},{k:'city',t:'Location'}],
      filters:[['all','All'],['customer','Customers'],['opp','Opportunities'],['prospect','Prospects']],
      filt:function(r,f){return f==='all'||r.stageKey===f;},
      search:function(r){return r.name+' '+r.industry+' '+r.city+' '+r.owner.n;},
      cell:function(r,k){
        if(k==='name')return '<div class="lead-name">'+logo(r.name)+'<div><b>'+r.name+'</b><br><span>'+r.name.toLowerCase().replace(/[^a-z]/g,'').slice(0,10)+'.com</span></div></div>';
        if(k==='industry')return r.industry;
        if(k==='size')return '<span class="mono" style="color:var(--ink-2)">'+r.size+'</span>';
        if(k==='stage')return '<span class="tag '+r.stageTag+'">'+r.stage+'</span>';
        if(k==='arr')return '<span class="mono">'+money(r.arr)+'</span>';
        if(k==='contacts')return nn(r.contacts);
        if(k==='owner')return ownerAv(r.owner);
        if(k==='health')return healthCell(r.health);
        if(k==='city')return '<span style="color:var(--muted)">'+r.city+'</span>';
      }},
    contacts:{label:'contact',add:'Add contact',rows:contacts,
      cols:[{k:'name',t:'Contact'},{k:'title',t:'Title'},{k:'company',t:'Company'},{k:'email',t:'Email'},{k:'role',t:'Role'},{k:'owner',t:'Owner'},{k:'last',t:'Last touch'}],
      filters:[['all','All'],['Decision maker','Decision makers'],['Champion','Champions'],['Influencer','Influencers']],
      filt:function(r,f){return f==='all'||r.role===f;},
      search:function(r){return r.name+' '+r.title+' '+r.company+' '+r.email;},
      cell:function(r,k){
        if(k==='name')return '<div class="lead-name">'+avc(r.name)+'<div><b>'+r.name+'</b></div></div>';
        if(k==='title')return r.title;
        if(k==='company')return r.company;
        if(k==='email')return '<span class="email-cell">'+r.email+'</span>';
        if(k==='role')return '<span class="tag '+r.roleTag+'">'+r.role+'</span>';
        if(k==='owner')return ownerAv(r.owner);
        if(k==='last')return '<span class="mono" style="color:var(--muted)">'+r.last+' ago</span>';
      }},
    leads:{label:'lead',add:'Add lead',rows:leads,
      cols:[{k:'name',t:'Lead'},{k:'company',t:'Company'},{k:'status',t:'Status'},{k:'score',t:'AI score',num:1},{k:'channel',t:'Source'},{k:'value',t:'Est. value',num:1},{k:'owner',t:'Owner'},{k:'last',t:'Last touch'}],
      filters:[['all','All'],['hot','Hot'],['new','New'],['qual','Qualified']],
      filt:function(r,f){return f==='all'||r.status.k===f;},
      search:function(r){return r.name+' '+r.company+' '+r.owner.n;},
      cell:function(r,k){
        if(k==='name')return '<div class="lead-name">'+avc(r.name)+'<div><b>'+r.name+'</b><br><span>'+r.title+'</span></div></div>';
        if(k==='company')return r.company;
        if(k==='status')return '<span class="tag '+r.status.cls+'">'+r.status.t+'</span>';
        if(k==='score')return '<div class="score">'+ring(r.score)+'<b>'+r.score+'</b></div>';
        if(k==='channel')return '<span class="chan '+(r.channel==='o'?'o':'i')+'">'+(r.channel==='o'?'Outbound':'Inbound')+'</span>';
        if(k==='value')return '<span class="mono">'+money(r.value)+'</span>';
        if(k==='owner')return ownerAv(r.owner);
        if(k==='last')return '<span class="mono" style="color:var(--muted)">'+r.last+' ago</span>';
      }},
    customers:{label:'customer',add:'Add customer',rows:customers,
      cols:[{k:'name',t:'Customer'},{k:'plan',t:'Plan'},{k:'mrr',t:'MRR',num:1},{k:'seats',t:'Seats',num:1},{k:'status',t:'Health'},{k:'owner',t:'CSM'},{k:'renews',t:'Renews'},{k:'nps',t:'NPS',num:1}],
      filters:[['all','All'],['healthy','Healthy'],['watch','Watch'],['risk','At risk']],
      filt:function(r,f){return f==='all'||r.statusKey===f;},
      search:function(r){return r.name+' '+r.plan+' '+r.owner.n;},
      cell:function(r,k){
        if(k==='name')return '<div class="lead-name">'+logo(r.name)+'<div><b>'+r.name+'</b></div></div>';
        if(k==='plan')return '<span class="tag '+r.planTag+'">'+r.plan+'</span>';
        if(k==='mrr')return '<span class="mono">'+money(r.mrr)+'</span>';
        if(k==='seats')return nn(r.seats);
        if(k==='status')return '<span class="tag '+r.statusTag+'">'+r.status+'</span>';
        if(k==='owner')return ownerAv(r.owner);
        if(k==='renews')return '<span class="mono" style="color:var(--muted)">'+months2[r.renewIdx]+' 2026</span>';
        if(k==='nps')return '<b class="mono" style="color:'+(r.nps>=50?'var(--good)':r.nps>=20?'var(--warn)':'var(--rev)')+'">'+r.nps+'</b>';
      }}
  };

  var crmSub='companies', crmQuery='';
  var crmFilterBy={companies:'all',contacts:'all',leads:'all',customers:'all'};
  var crmSort={companies:'arr',contacts:'name',leads:'score',customers:'mrr'};
  var crmDir={companies:-1,contacts:1,leads:-1,customers:-1};
  function sortVal(r,k){
    if(k==='owner')return r.owner.n;
    if(k==='status'&&r.status&&r.status.t)return r.status.t;
    if(k==='status')return r.status;
    if(k==='size')return r.sizeIdx;
    if(k==='stage')return r.stageRank;
    if(k==='plan')return r.planRank;
    if(k==='renews')return r.renewIdx;
    var v=r[k]; return typeof v==='number'?v:String(v).toLowerCase();
  }
  function stat(v,k){return '<div class="s"><div class="v">'+v+'</div><div class="k">'+k+'</div></div>';}
  function crmSummary(){
    var rows=crmData[crmSub].rows,h='';
    if(crmSub==='companies'){var cust=rows.filter(function(r){return r.stageKey==='customer';}).length;
      var pipe=rows.filter(function(r){return r.stageKey!=='customer';}).reduce(function(a,b){return a+b.arr;},0);
      var ah=Math.round(rows.reduce(function(a,b){return a+b.health;},0)/rows.length);
      h=stat(rows.length,'Accounts')+stat(cust,'Customers')+stat(money(pipe),'Open ARR')+stat(ah,'Avg health');
    }else if(crmSub==='contacts'){var dm=rows.filter(function(r){return r.role==='Decision maker';}).length,ch=rows.filter(function(r){return r.role==='Champion';}).length;
      h=stat(rows.length,'Contacts')+stat(dm,'Decision makers')+stat(ch,'Champions')+stat('100%','With email');
    }else if(crmSub==='leads'){var hot=rows.filter(function(r){return r.status.k==='hot';}).length;
      var avg=Math.round(rows.reduce(function(a,b){return a+b.score;},0)/rows.length);
      var val=rows.reduce(function(a,b){return a+b.value;},0);
      h=stat(rows.length,'Leads')+stat(hot,'Hot')+stat(avg,'Avg AI score')+stat(money(val),'Est. value');
    }else{var mrr=rows.reduce(function(a,b){return a+b.mrr;},0);var nps=Math.round(rows.reduce(function(a,b){return a+b.nps;},0)/rows.length);
      var risk=rows.filter(function(r){return r.statusKey==='risk';}).length;
      h=stat(money(mrr),'MRR')+stat('+'+nps,'Avg NPS')+stat(risk,'At risk')+stat('118%','Net retention');}
    $('#crmSum').innerHTML=h;
  }
  function renderCRM(sub){
    if(sub) crmSub=sub;
    var cfg=crmData[crmSub], f=crmFilterBy[crmSub];
    $$('#crmSub .subtab').forEach(function(b){ b.classList.toggle('on',b.dataset.sub===crmSub); });
    $('#crmSearch').placeholder='Search '+cfg.label+'s…';
    $('#crmAddLabel').textContent=cfg.add;
    $('#crmFilters').innerHTML=cfg.filters.map(function(x){return '<button class="chipbtn'+(x[0]===f?' on':'')+'" data-cf="'+x[0]+'">'+x[1]+'</button>';}).join('');
    var rows=cfg.rows.filter(function(r){
      if(!cfg.filt(r,f))return false;
      if(crmQuery && cfg.search(r).toLowerCase().indexOf(crmQuery.toLowerCase())===-1)return false;
      return true;
    });
    var sk=crmSort[crmSub], dir=crmDir[crmSub];
    rows.sort(function(a,b){var av=sortVal(a,sk),bv=sortVal(b,sk);return av<bv?-1*dir:av>bv?1*dir:0;});
    $('#crmHead').innerHTML='<tr>'+cfg.cols.map(function(c){
      var on=c.k===sk; return '<th data-k="'+c.k+'"'+(on?' class="sorted"':'')+'>'+c.t+' <span class="ar">'+(on?(dir<0?'↓':'↑'):'↕')+'</span></th>';
    }).join('')+'</tr>';
    $('#crmBody').innerHTML=rows.map(function(r){
      return '<tr>'+cfg.cols.map(function(c){return '<td>'+cfg.cell(r,c.k)+'</td>';}).join('')+'</tr>';
    }).join('') || '<tr><td colspan="'+cfg.cols.length+'"><div class="empty">No '+cfg.label+'s match.</div></td></tr>';
    $('#crmCount').textContent=rows.length+' '+cfg.label+(rows.length===1?'':'s');
    crmSummary();
  }
  $('#crmSub').addEventListener('click',function(e){var b=e.target.closest('.subtab');if(!b)return;crmQuery='';$('#crmSearch').value='';renderCRM(b.dataset.sub);});
  $('#crmSearch').addEventListener('input',function(e){crmQuery=e.target.value;renderCRM();});
  $('#crmFilters').addEventListener('click',function(e){var b=e.target.closest('[data-cf]');if(!b)return;crmFilterBy[crmSub]=b.dataset.cf;renderCRM();});
  $('#crmHead').addEventListener('click',function(e){var th=e.target.closest('th');if(!th)return;var k=th.dataset.k;var col=crmData[crmSub].cols.find(function(c){return c.k===k;});if(!col)return;if(crmSort[crmSub]===k)crmDir[crmSub]*=-1;else{crmSort[crmSub]=k;crmDir[crmSub]=col.num?-1:1;}renderCRM();});
  (function(){var q=function(id){return document.getElementById(id);};
    if(q('cntCompanies'))q('cntCompanies').textContent=accounts.length;
    if(q('cntContacts'))q('cntContacts').textContent=contacts.length;
    if(q('cntLeads'))q('cntLeads').textContent=leads.length;
    if(q('cntCustomers'))q('cntCustomers').textContent=customers.length;
    var nb=document.querySelector('.navi[data-view="crm"] .tabb');if(nb)nb.textContent=(accounts.length+contacts.length+leads.length+customers.length);
  })();

  /* ---------- INBOX ---------- */
  var threads=[
    {n:'Priya Nair',co:'Vertex Media',senti:'pos',prev:'This looks great — can we get the team on a call Thursday?',un:true,
      msgs:[['them','Hi Ava — saw your note about the ROI model. Impressive numbers.','Tue 9:14'],
            ['us','Thanks Priya! Happy to walk your team through it. Does Thursday work?','Tue 9:31'],
            ['them','This looks great — can we get the team on a call Thursday?','Tue 9:44']],
      ai:'Priya is showing strong buying intent (4 proposal opens). Suggest confirming Thursday 2pm and looping in their CFO — deal size warrants an exec sponsor.'},
    {n:'Tom Reed',co:'Cobalt Freight',senti:'neu',prev:'Let me check with procurement and circle back.',un:true,
      msgs:[['us','Hi Tom — following up on the proposal from last week. Any questions?','Mon 11:02'],
            ['them','Let me check with procurement and circle back.','Mon 15:20']],
      ai:'Momentum cooling — 8 days since a real reply. Recommend a short value-recap with a specific deadline to create urgency without pressure.'},
    {n:'Mei Wu',co:'Auric Cloud',senti:'pos',prev:'We\'d love a demo. Inbound from your site.',un:true,
      msgs:[['them','We\'d love a demo. Found you through the pricing page.','Today 8:05']],
      ai:'Fresh inbound matching your ICP (cloud infra, 200+ seats). Book a demo within 4 hours — inbound speed-to-lead under 5 min triples conversion.'},
    {n:'Ravi Shah',co:'Meridian Labs',senti:'neg',prev:'Pricing is higher than we budgeted for.',un:false,
      msgs:[['them','Pricing is higher than we budgeted for.','Yesterday']],
      ai:'Price objection detected. Offer the annual plan (18% saving) or a phased rollout. Your Incomera strategist drafted two responses — one anchoring on ROI, one on flexibility.'},
    {n:'Elena Vega',co:'Pallas Bank',senti:'pos',prev:'Contract signed! Excited to get started.',un:false,
      msgs:[['them','Contract signed! Excited to get started.','2d ago']],
      ai:'Closed won 🎉 Trigger onboarding sequence and request a referral — best-fit accounts refer within the first 30 days.'}
  ];
  var activeThread=0;
  function renderThreads(){
    $('#threadList').innerHTML=threads.map(function(t,i){
      var init=t.n.split(' ').map(function(w){return w[0];}).join('');
      return '<div class="thread'+(i===activeThread?' on':'')+'" data-i="'+i+'">'+
        '<span class="avat" style="width:38px;height:38px;background:'+pick(reps).c+'">'+init+'</span>'+
        '<div class="thread__b"><div class="thread__name"><b>'+t.n+'</b><time>'+(t.msgs[t.msgs.length-1][2])+'</time></div>'+
        '<div class="thread__prev">'+t.prev+'</div>'+
        '<div class="thread__tags"><span class="senti '+t.senti+'">'+(t.senti==='pos'?'positive':t.senti==='neg'?'negative':'neutral')+'</span>'+
        '<span class="lbl" style="letter-spacing:.04em">'+t.co+'</span></div></div></div>';
    }).join('');
    $$('#threadList .thread').forEach(function(el){ el.addEventListener('click',function(){ activeThread=+el.dataset.i; renderThreads(); renderConvo(); }); });
  }
  function renderConvo(){
    var t=threads[activeThread];
    $('#convo').innerHTML=
      '<div class="convo__hd"><span class="avat" style="width:40px;height:40px;background:var(--blue)">'+t.n.split(' ').map(function(w){return w[0];}).join('')+'</span>'+
      '<div class="nm"><b>'+t.n+'</b><span>'+t.co+'</span></div>'+
      '<div style="margin-left:auto"><span class="senti '+t.senti+'" style="font-size:9px;padding:3px 9px">sentiment: '+(t.senti==='pos'?'positive':t.senti==='neg'?'negative':'neutral')+'</span></div></div>'+
      '<div class="convo__body">'+t.msgs.map(function(m){return '<div class="msg '+m[0]+'">'+m[1]+'<time>'+m[2]+'</time></div>';}).join('')+'</div>'+
      '<div class="convo__ai"><div class="h"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z"/></svg>Incomera suggests</div>'+
      '<p>'+t.ai+'</p>'+
      '<div class="row"><button class="btn btn--primary" style="font-size:12px;padding:7px 13px">Use AI reply</button>'+
      '<button class="btn btn--ghost" style="font-size:12px;padding:7px 13px">Draft another</button></div></div>'+
      '<div class="convo__foot"><input placeholder="Write a reply… (your team will refine)"/><button class="btn btn--primary"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>Send</button></div>';
  }

  /* ---------- CAMPAIGNS ---------- */
  var campaigns=[
    {n:'Q3 Fintech Outbound',ch:'Outbound · Email',status:'live',sent:4820,open:52,reply:19.4,meet:64,done:78},
    {n:'Enterprise ABM — Tier 1',ch:'Outbound · Multi',status:'live',sent:1240,open:61,reply:24.8,meet:38,done:54},
    {n:'Inbound Nurture',ch:'Inbound · Lifecycle',status:'live',sent:9120,open:44,reply:12.1,meet:112,done:63},
    {n:'LinkedIn Warm-up',ch:'Outbound · Social',status:'pause',sent:640,open:0,reply:31.2,meet:14,done:40},
    {n:'Reactivation — Lost deals',ch:'Outbound · Email',status:'live',sent:2160,open:38,reply:8.9,meet:22,done:66},
    {n:'Product-Led Trials',ch:'Inbound · PLG',status:'draft',sent:0,open:0,reply:0,meet:0,done:5}
  ];
  function renderCampaigns(){
    $('#campGrid').innerHTML=campaigns.map(function(c){
      return '<div class="card camp">'+
        '<div class="camp__top"><span class="status-dot '+c.status+'"></span>'+
        '<div class="camp__name"><b>'+c.n+'</b><span>'+c.ch+'</span></div>'+
        '<span class="tag '+(c.status==='live'?'won':c.status==='pause'?'cold':'new')+'" style="margin-left:auto">'+c.status+'</span></div>'+
        '<div class="camp__stat">'+
          '<div class="cstat"><div class="v">'+fmt(c.sent)+'</div><div class="k">Sent</div></div>'+
          '<div class="cstat"><div class="v">'+c.open+'%</div><div class="k">Open</div></div>'+
          '<div class="cstat"><div class="v">'+c.reply+'%</div><div class="k">Reply</div></div>'+
          '<div class="cstat"><div class="v">'+c.meet+'</div><div class="k">Meetings</div></div>'+
        '</div>'+
        '<div class="camp__prog"><div class="track"><i style="width:'+c.done+'%"></i></div>'+
        '<div class="lg"><span>'+c.done+'% of sequence sent</span><span>ends in '+Math.round(between(3,21))+'d</span></div></div></div>';
    }).join('');
  }

  /* ---------- ANALYTICS ---------- */
  function renderAttr(){
    var attr=[
      {n:'Outbound email',v:842,c:'var(--blue)'},
      {n:'Inbound / web',v:611,c:'var(--in)'},
      {n:'LinkedIn',v:388,c:'var(--violet)'},
      {n:'Referral',v:264,c:'var(--good)'},
      {n:'Events',v:142,c:'var(--warn)'}
    ];
    var max=Math.max.apply(0,attr.map(function(a){return a.v;}));
    $('#attrList').innerHTML=attr.map(function(a){
      return '<div class="attr__row"><div class="nm"><i style="background:'+a.c+'"></i>'+a.n+'</div>'+
        '<div class="attr__bar"><i style="width:'+(a.v/max*100)+'%;background:'+a.c+'"></i></div>'+
        '<div class="vv">'+money(a.v*1000)+'</div></div>';
    }).join('');

    var reps2=[
      {n:'Ava Whitfield',v:128,c:'var(--blue)'},{n:'Marco Kim',v:112,c:'var(--in-deep)'},
      {n:'Sara Ito',v:104,c:'var(--violet)'},{n:'Dev Lang',v:91,c:'var(--good)'},{n:'Noor Bah',v:76,c:'var(--warn)'}
    ];
    $('#repList').innerHTML=reps2.map(function(a){
      return '<div class="attr__row"><div class="nm"><i style="background:'+a.c+'"></i>'+a.n+'</div>'+
        '<div class="attr__bar"><i style="width:'+Math.min(a.v,100)+'%;background:'+a.c+'"></i></div>'+
        '<div class="vv">'+a.v+'%</div></div>';
    }).join('');
  }
  function renderHeat(){
    var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var hours=['8a','10a','12p','2p','4p','6p'];
    var html='<div class="hl"></div>'+days.map(function(d){return '<div class="hc">'+d+'</div>';}).join('');
    hours.forEach(function(h,ri){
      html+='<div class="hl">'+h+'</div>';
      days.forEach(function(d,ci){
        var base=(ci<5?1:.4); var peak=(ci===1||ci===3)&&(ri===1||ri===2)?1.4:1;
        var v=Math.min(1,between(.15,.55)*base*peak+(ri<3?.2:0));
        var op=(.15+v*.85).toFixed(2);
        html+='<div class="cell" style="background:rgba(36,86,230,'+op+')" title="'+d+' '+h+': '+Math.round(v*40)+'% reply">'+(v>.55?Math.round(v*40):'')+'</div>';
      });
    });
    $('#heat').innerHTML=html;
  }

  /* ---------- COPILOT ---------- */
  var chatSeed=[
    ['bot','Hi Ava 👋 I\'m your Incomera assistant. I\'ve got a live read on the pipeline we run for you. Ask me anything — or try one of the prompts below.']
  ];
  var qa=[
    {q:/risk|at.?risk|stall/i, a:'<b>4 deals worth $612k</b> are at elevated risk:<div class="stat-inline"><div><div class="n">$180k</div><div class="l">Vertex — no next step</div></div><div><div class="n">$154k</div><div class="l">Cobalt — champion silent 8d</div></div><div><div class="n">$142k</div><div class="l">Meridian — price objection</div></div></div>I\'ve drafted rescue plays for each. Want me to queue the outreach?'},
    {q:/forecast|quarter|target|close/i, a:'Your quarter is trending to <b>$1.98M</b> — 6% above the $1.86M target, at <b>92% forecast confidence</b>.<div class="stat-inline"><div><div class="n">$1.84M</div><div class="l">Closed</div></div><div><div class="n">$412k</div><div class="l">Best-case adds</div></div><div><div class="n">3.4×</div><div class="l">Coverage</div></div></div>The swing factors are Acme Robotics and Vertex Media — both in Proposal.'},
    {q:/best|top|hot|priorit/i, a:'Your <b>3 highest-leverage moves</b> right now:<br>1. Call Priya Nair (Vertex) — 4 proposal opens today.<br>2. Rescue Cobalt Freight with an ROI recap.<br>3. Book the Auric Cloud inbound demo within the hour.<br><br>Together they represent <b>$470k</b> in weighted pipeline.'},
    {q:/channel|source|attribut|where/i, a:'Outbound email drives the most influenced revenue (<b>$842k</b>), but <b>referrals convert 2.4×</b> better per touch. If you shifted 15% of outbound effort into a referral motion, my model projects <b>+$210k</b> next quarter.'},
    {q:/lead|score| Priya|who/i, a:'Your hottest lead is <b>Priya Nair at Vertex Media</b> — AI score <b>96</b>. Strong ICP fit, 4 proposal opens, positive sentiment, multi-threaded. Recommended next step: confirm the Thursday exec call and loop in their CFO.'}
  ];
  function addMsg(role,html){
    var b=$('#chatBody');
    var av= role==='bot'? '<div class="cmsg__av"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z"/></svg></div>' : '<div class="cmsg__av">AV</div>';
    b.insertAdjacentHTML('beforeend','<div class="cmsg '+role+'">'+av+'<div class="cmsg__bub">'+html+'</div></div>');
    b.scrollTop=b.scrollHeight;
  }
  function botReply(text){
    var found=qa.find(function(x){return x.q.test(text);});
    var ans=found?found.a:'Here\'s what I see: your pipeline is healthy with <b>3.4× coverage</b> and reply rates holding near 20%. Want me to break down risk, forecast, top actions, or channel performance? Try the chips below.';
    var b=$('#chatBody');
    b.insertAdjacentHTML('beforeend','<div class="cmsg bot" id="typing"><div class="cmsg__av"><svg viewBox="0 0 24 24"><path d="M12 2l2.4 6L20 10l-5.6 2L12 18l-2.4-6L4 10l5.6-2z"/></svg></div><div class="cmsg__bub"><span class="typing"><i></i><i></i><i></i></span></div></div>');
    b.scrollTop=b.scrollHeight;
    setTimeout(function(){ var t=$('#typing'); if(t)t.remove(); addMsg('bot',ans); },850);
  }
  function sendChat(text){ if(!text.trim())return; addMsg('user',text); $('#chatInput').value=''; botReply(text); }
  var suggests=['Which deals are at risk?','What\'s my forecast this quarter?','What should I do first?','Which channel performs best?'];
  function renderCopilot(){
    $('#chatBody').innerHTML=''; chatSeed.forEach(function(m){addMsg(m[0],m[1]);});
    $('#suggests').innerHTML=suggests.map(function(s){return '<button class="sug">'+s+'</button>';}).join('');
    $$('#suggests .sug').forEach(function(b){ b.addEventListener('click',function(){ sendChat(b.textContent); }); });
    // side boxes
    $('#healthBox').innerHTML=
      '<div class="attr"><div class="attr__row"><div class="nm">Coverage</div><div class="attr__bar"><i style="width:85%;background:var(--good)"></i></div><div class="vv">3.4×</div></div>'+
      '<div class="attr__row"><div class="nm">Velocity</div><div class="attr__bar"><i style="width:72%;background:var(--blue)"></i></div><div class="vv">31d</div></div>'+
      '<div class="attr__row"><div class="nm">Win rate</div><div class="attr__bar"><i style="width:64%;background:var(--violet)"></i></div><div class="vv">34.6%</div></div>'+
      '<div class="attr__row"><div class="nm">Hygiene</div><div class="attr__bar"><i style="width:58%;background:var(--warn)"></i></div><div class="vv">58%</div></div></div>';
    var risky=deals.filter(function(d){return d.health<45 && d.stage!=='won';}).slice(0,4);
    $('#riskCount').textContent=risky.length+' flagged';
    $('#riskBox').innerHTML=risky.map(function(d){
      return '<div class="nba" style="margin-top:10px"><div class="nba__pri h" style="width:32px;height:32px;font-size:11px">'+d.health+'</div>'+
        '<div class="nba__b"><b style="font-size:12.5px">'+d.co+'</b><span>'+money(d.val)+' · '+d.days+'d stalled</span></div></div>';
    }).join('')||'<div class="empty">No deals at risk 🎉</div>';
  }
  $('#chatSend').addEventListener('click',function(){ sendChat($('#chatInput').value); });
  $('#chatInput').addEventListener('keydown',function(e){ if(e.key==='Enter') sendChat(this.value); });

  /* top ask bar routes to copilot */
  $('#askInput').addEventListener('keydown',function(e){
    if(e.key==='Enter' && this.value.trim()){ var v=this.value; this.value=''; go('copilot'); setTimeout(function(){ sendChat(v); },350); }
  });
  document.addEventListener('keydown',function(e){ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); $('#askInput').focus(); } });

  /* ---------- SETTINGS ---------- */
  var autos=[
    {b:'Auto-enrich new leads',s:'Firmographics, tech stack, contact data',on:1},
    {b:'AI lead scoring',s:'Re-score on every engagement signal',on:1},
    {b:'Draft follow-ups',s:'We write; you approve before send',on:1},
    {b:'Send-time optimization',s:'Deliver at each contact\'s peak window',on:1},
    {b:'Auto-log activity to CRM',s:'Calls, emails, meetings sync automatically',on:1},
    {b:'Auto-send without approval',s:'Let us send low-risk replies unattended',on:0}
  ];
  function renderSettings(){
    $('#autoSettings').innerHTML=autos.map(function(a,i){
      return '<div class="set-row"><div class="b"><b>'+a.b+'</b><span>'+a.s+'</span></div>'+
        '<div class="tog'+(a.on?' on':'')+'" data-i="'+i+'"></div></div>';
    }).join('');
    $$('#autoSettings .tog').forEach(function(t){ t.addEventListener('click',function(){ t.classList.toggle('on'); }); });
  }

  /* ---------- CHARTS (canvas) ---------- */
  var months=['Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan'];
  var revActual=[210,245,232,268,290,315,342,368,0,0,0,0].map(function(v){return v*1000;});
  var revPipe  =[0,0,0,0,0,0,0,368,395,430,458,492].map(function(v){return v*1000;});
  var revFore  =[0,0,0,0,0,0,0,368,410,452,505,560].map(function(v){return v*1000;});
  var revRange=6;
  function drawRev(){
    var cv=$('#revChart'); if(!cv) return;
    var dpr=window.devicePixelRatio||1, w=cv.clientWidth, h=260;
    cv.width=w*dpr; cv.height=h*dpr; var x=cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); x.clearRect(0,0,w,h);
    var n=revRange, start=12-n;
    var mo=months.slice(start), a=revActual.slice(start), p=revPipe.slice(start), f=revFore.slice(start);
    var padL=8,padR=8,padT=14,padB=26; var cw=w-padL-padR, ch=h-padT-padB;
    var all=a.concat(p).concat(f).filter(function(v){return v>0;}); var mx=Math.max.apply(0,all)*1.12;
    function X(i){return padL+i/(n-1)*cw;} function Y(v){return padT+ch-(v/mx)*ch;}
    // grid
    x.strokeStyle='#ECEDF1'; x.lineWidth=1;
    for(var g=0;g<=4;g++){ var yy=padT+ch/4*g; x.beginPath(); x.moveTo(padL,yy); x.lineTo(w-padR,yy); x.stroke(); }
    // forecast band
    x.beginPath();
    f.forEach(function(v,i){ if(v>0){ var yy=Y(v*1.08); i&&f[i-1]?x.lineTo(X(i),yy):x.moveTo(X(i),yy);} });
    for(var i=f.length-1;i>=0;i--){ if(f[i]>0) x.lineTo(X(i),Y(f[i]*0.92)); }
    x.closePath(); x.fillStyle='rgba(109,94,245,.10)'; x.fill();
    // forecast line (dashed)
    x.setLineDash([5,4]); x.beginPath(); var started=false;
    f.forEach(function(v,i){ if(v>0){ started?x.lineTo(X(i),Y(v)):x.moveTo(X(i),Y(v)); started=true; } });
    x.strokeStyle='rgba(109,94,245,.7)'; x.lineWidth=2; x.stroke(); x.setLineDash([]);
    // area+line helper
    function series(data,col,rgb){
      var grad=x.createLinearGradient(0,padT,0,padT+ch); grad.addColorStop(0,'rgba('+rgb+',.22)'); grad.addColorStop(1,'rgba('+rgb+',0)');
      x.beginPath(); var s=false, firstI=0;
      data.forEach(function(v,i){ if(v>0){ if(!s){x.moveTo(X(i),Y(v));firstI=i;s=true;} else x.lineTo(X(i),Y(v)); } });
      // fill
      var last=data.length-1; while(last>=0&&data[last]<=0)last--;
      if(s){ x.lineTo(X(last),padT+ch); x.lineTo(X(firstI),padT+ch); x.closePath(); x.fillStyle=grad; x.fill(); }
      x.beginPath(); s=false;
      data.forEach(function(v,i){ if(v>0){ s?x.lineTo(X(i),Y(v)):x.moveTo(X(i),Y(v)); s=true; } });
      x.strokeStyle=col; x.lineWidth=2.4; x.lineJoin='round'; x.stroke();
      data.forEach(function(v,i){ if(v>0){ x.beginPath(); x.arc(X(i),Y(v),3,0,7); x.fillStyle='#fff'; x.fill(); x.lineWidth=2; x.strokeStyle=col; x.stroke(); } });
    }
    series(p,'#0FB5A6','15,181,166');
    series(a,'#3B49F0','59,73,240');
    // month labels
    x.fillStyle='#7C879B'; x.font='9px ui-monospace,monospace'; x.textAlign='center';
    mo.forEach(function(m,i){ x.fillText(m,X(i),h-9); });
    // tooltip data
    cv._pts=mo.map(function(m,i){ return {x:X(i),m:m,a:a[i],p:p[i],f:f[i]}; });
  }
  var revTT=$('#revTT');
  $('#revChart').addEventListener('mousemove',function(e){
    var cv=this, r=cv.getBoundingClientRect(), mx=e.clientX-r.left;
    if(!cv._pts)return; var best=cv._pts[0],bd=1e9;
    cv._pts.forEach(function(p){ var dd=Math.abs(p.x-mx); if(dd<bd){bd=dd;best=p;} });
    if(bd<40){ var html='<b>'+best.m+'</b><br>';
      if(best.a>0)html+='<span class="o">● Closed</span> '+money(best.a)+'<br>';
      if(best.p>0)html+='<span class="i">● Pipeline</span> '+money(best.p)+'<br>';
      if(best.f>0)html+='<span style="color:#b6a4ff">● Forecast</span> '+money(best.f);
      revTT.innerHTML=html; revTT.style.left=best.x+'px'; revTT.style.top='20px'; revTT.style.opacity='1';
    } else revTT.style.opacity='0';
  });
  $('#revChart').addEventListener('mouseleave',function(){ revTT.style.opacity='0'; });
  $('#revSeg').addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b)return;
    $$('#revSeg button').forEach(function(x){x.classList.remove('on');}); b.classList.add('on');
    revRange=+b.dataset.m>12?12:+b.dataset.m; drawRev(); });

  function drawConv(){
    var cv=$('#convChart'); if(!cv)return;
    var dpr=window.devicePixelRatio||1, w=cv.clientWidth, h=250;
    cv.width=w*dpr; cv.height=h*dpr; var x=cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); x.clearRect(0,0,w,h);
    var labels=['Reached','Engaged','SQL','Demo','Proposal','Won'];
    var vals=[100,35,22,11,6.5,3.4];
    var padL=8,padB=28,padT=14; var cw=w-16, ch=h-padB-padT; var bw=cw/labels.length*.56;
    var mx=100;
    x.strokeStyle='#ECEDF1';
    for(var g=0;g<=4;g++){ var yy=padT+ch/4*g; x.beginPath(); x.moveTo(padL,yy); x.lineTo(w-8,yy); x.stroke(); }
    vals.forEach(function(v,i){
      var bx=padL+cw/labels.length*i+cw/labels.length/2-bw/2;
      var bh=v/mx*ch, by=padT+ch-bh;
      var grad=x.createLinearGradient(0,by,0,by+bh); grad.addColorStop(0,'#3B49F0'); grad.addColorStop(1,'#0FB5A6');
      x.fillStyle=grad; roundRect(x,bx,by,bw,bh,5); x.fill();
      x.fillStyle='#15171C'; x.font='700 11px ui-monospace,monospace'; x.textAlign='center';
      x.fillText(v+'%',bx+bw/2,by-6);
      x.fillStyle='#7C879B'; x.font='9px ui-monospace,monospace';
      x.fillText(labels[i],bx+bw/2,h-9);
    });
  }
  function roundRect(x,rx,ry,rw,rh,r){ r=Math.min(r,rw/2,rh); x.beginPath();
    x.moveTo(rx+r,ry); x.arcTo(rx+rw,ry,rx+rw,ry+rh,r); x.arcTo(rx+rw,ry+rh,rx,ry+rh,r);
    x.arcTo(rx,ry+rh,rx,ry,r); x.arcTo(rx,ry,rx+rw,ry,r); x.closePath(); }

  function sizeAndDraw(){ drawRev(); }

  /* ---------- INIT ---------- */
  function renderAll(){
    renderKpis($('#kpiRow'),kpis);
    renderKpis($('#biKpis'),biKpis);
    renderInsights(); renderNba(); renderFunnel(); renderFeed();
    renderKanban(); renderCRM('companies'); renderThreads(); renderConvo();
    renderCampaigns(); renderAttr(); renderHeat(); renderCopilot(); renderSettings();
    requestAnimationFrame(function(){ sizeAndDraw(); drawConv(); });
  }
  var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(function(){
    renderKpis($('#kpiRow'),kpis); renderKpis($('#biKpis'),biKpis);
    if($('#view-overview').classList.contains('on')) sizeAndDraw();
    if($('#view-analytics').classList.contains('on')) drawConv();
  },160); });

  /* rotate the "your team is working" line */
  var workLines=[
    'Enriching 42 new leads · drafting 8 follow-ups · scoring pipeline.',
    'Watching 4 at-risk deals · 2 rescue plays queued.',
    'Optimized send times for 60 messages · +41% reply lift.',
    'Booked 3 demos overnight · summaries in your inbox.'
  ];
  var wi=0; setInterval(function(){ wi=(wi+1)%workLines.length; var e=$('#workerLine'); if(e)e.textContent=workLines[wi]; },5000);

})();
