/* ==================== CAREERS + ADMIN ==================== */
(function(){
  var cw=document.getElementById('careersWrap'), aw=document.getElementById('adminWrap');
  if(!cw||!aw) return;
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')};

  /* ---------- constants ---------- */

  var TICK='<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
  var DEPTS=[
    {k:'sales',   n:'Sales',           c:'#2456E6'},
    {k:'bizdev',  n:'Business Dev',    c:'#6D5EF5'},
    {k:'bidding', n:'Bidding',         c:'#15C5DE'},
    {k:'marketing',n:'Marketing',      c:'#FF8A3D'},
    {k:'engineering',n:'Engineering',  c:'#1FA971'},
    {k:'clients', n:'Client Services', c:'#C9821A'},
    {k:'ops',     n:'Operations',      c:'#E5484D'}
  ];
  function dept(k){for(var i=0;i<DEPTS.length;i++) if(DEPTS[i].k===k) return DEPTS[i]; return {k:k,n:k||'General',c:'#7C879B'};}
  var AVC=['#2456E6','#6D5EF5','#0E9F8C','#C9821A','#D64B6A','#3E7BD6','#7B5BD6','#1FA971'];
  function locOf(j){ var l=j&&j.loc?String(j.loc).trim():''; return l||'Anywhere'; }
  function avc(name){ var h=0,i; name=String(name||''); for(i=0;i<name.length;i++) h=(h*31+name.charCodeAt(i))>>>0;
    return AVC[h%AVC.length]; }

  var STAGES=[
    {n:'Application',  d:'Your application has been received and is queued for review.'},
    {n:'Shortlisted',  d:'You have been shortlisted — the team is going through your application in detail.'},
    {n:'Interview',    d:'You have been invited to interview. Details are in your inbox.'},
    {n:'Offer',        d:'Terms, start date and paperwork.'},
    {n:'Hired',        d:'Offer accepted — welcome aboard.'}
  ];


  /* ---------- storage ---------- */
  var LS=(function(){try{var k='__x';window.localStorage.setItem(k,'1');window.localStorage.removeItem(k);return window.localStorage;}catch(e){return null;}})();
  var KEY='incomera_hr_v13';
  var NOTIFY=[
    {k:0,n:'Applicants',   c:'#8B96AF',d:'Sent the moment an application is submitted.',
     s:'We have received your application',
     b:'Thanks for applying for {role}. Your application is with the hiring team and a person reads every one.'},
    {k:1,n:'Shortlisted',  c:'#5B85FF',d:'Sent when a candidate is shortlisted for the role.',
     s:'You have been shortlisted',
     b:'Good news — you have been shortlisted for {role}. We will be in touch shortly about next steps.'},
    {k:2,n:'Interview',    c:'#6D5EF5',d:'Sent when an interview is booked, rescheduled or cancelled.',
     s:'Your interview is confirmed',
     b:'Your interview for {role} is booked. The date, time and joining link are on your status page.'},
    {k:3,n:'Offered',      c:'#C9821A',d:'Sent with the offer letter attached.',
     s:'Your offer from Incomera',
     b:'We would like to offer you the {role} role. Your offer letter is attached — you can accept or decline it on your status page.'},
    {k:4,n:'Hired',        c:'#1FA971',d:'Sent once the offer is accepted, with joining details. No tracking link — the status page closes once an offer is answered.',
     s:'Welcome to the team',noTrack:true,
     b:'Welcome aboard. Our team will contact you within 24 hours with your start date and paperwork.'},
    {k:5,n:'Offer accepted', c:'#1FA971',d:'Confirmation sent the moment a candidate accepts their offer.',
     s:'Thanks for accepting your offer',noTrack:true,
     b:'Thanks for accepting the {role} offer — we are glad to have you. Someone from the team will be in touch within 24 hours.'},
    {k:6,n:'Offer declined', c:'#E5484D',d:'Acknowledgement sent when a candidate declines their offer.',
     s:'Thanks for letting us know',noTrack:true,
     b:'Thanks for letting us know you are declining the {role} offer. We appreciate the time you gave us and you are welcome to apply again for any future role.'},
    {k:7,n:'Rejected',       c:'#8B96AF',d:'Sent when an application is closed at any stage. Everyone gets an answer either way.',
     s:'An update on your application',noTrack:true,
     b:'Thank you for your interest in the {role} role and for the time you put into applying. On this occasion we will not be moving forward, but we would be glad to see you apply for future openings.'},
    {k:8,n:'Application viewed',c:'#7B5BD6',d:'Sent the first time someone from the hiring team opens the application. Limited to once an hour per candidate.',
     s:'Your application has been opened',
     b:'Someone from the hiring team has just opened your application for {role}. You can follow every update on your status page.'},
    {k:9,n:'Offer reminder', c:'#C9821A',d:'Sent automatically 24 hours after an offer goes out if the candidate has not answered. Sent once.',
     s:'A reminder about your offer',
     b:'Just a reminder that your offer for {role} is still open. Please review the letter and let us know your decision — you can accept or decline it on your status page.'},
    {k:10,n:'Interview reminder',c:'#6D5EF5',d:'Sent 30 minutes before a booked interview, with the joining link. Sent once per booking.',
     s:'Your interview starts in 30 minutes',
     b:'Your interview for {role} starts in 30 minutes. Join here: {link}\n\nThe time and link are also on your status page. See you shortly.'}
  ];
  var DB={jobs:[],apps:{},audits:[],meets:[],chats:[],events:[],notify:{0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},settings:{head:'Open roles',
    sub:'Every position below is live right now. Applications take a few minutes and you can check where yours stands at any point.',
    reply:'3 days'}};

  function save(){ if(!LS) return; try{ LS.setItem(KEY,JSON.stringify(DB)); }catch(e){} }
  function load(){ if(!LS) return false; try{ var v=LS.getItem(KEY); if(!v) return false; var p=JSON.parse(v);
    if(p&&p.jobs){ DB=p; DB.settings=DB.settings||{head:'Open roles',sub:'',reply:'3 days'};
      DB.audits=DB.audits||[];
      DB.meets=DB.meets||[];
      DB.chats=DB.chats||[];
      DB.events=DB.events||[];
      DB.notify=DB.notify||{0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true};
      [5,6,7,8,9,10].forEach(function(k){ if(DB.notify[k]===undefined) DB.notify[k]=true; }); return true; } }catch(e){} return false; }

  function ago(n){ var t=new Date(); t.setDate(t.getDate()-n); return t.getTime(); }
  function fmt(ts){ var m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],x=new Date(ts);
    return x.getDate()+' '+m[x.getMonth()]; }
  function fmtL(ts){ var x=new Date(ts); return fmt(ts)+' · '+String(x.getHours()).padStart(2,'0')+':'+String(x.getMinutes()).padStart(2,'0'); }
  function since(ts){ var d2=Math.floor((Date.now()-ts)/86400000); return d2<=0?'today':d2===1?'yesterday':d2+' days ago'; }

  /* ---------- seed ---------- */
  function seed(){
    DB.jobs=[
      {id:'telemarketer',title:'Telemarketer',dept:'sales',loc:'Remote · Pakistan',type:'Full-time',level:'Entry',setup:'Remote',
       pay:'Commission only · paid per qualified meeting booked',seats:4,badge:'',voice:true,status:'open',posted:ago(2),retainer:false,commission:true,
       summary:'Call through prepared prospect lists, introduce the offer, handle the first objections and book qualified calls for the sales team. This is a commission-only role — there is no base salary, and you are paid for every qualified meeting that shows up.',
       does:['Make 120–180 outbound calls per day from prepared lists',
             'Open conversations, qualify interest and handle common objections',
             'Book qualified prospects into the sales team calendar',
             'Log every call outcome and note in the CRM before end of shift',
             'Follow up on callbacks and warm leads on schedule'],
       wants:['Comfortable with a commission-only structure and no base salary',
              'Clear, confident spoken English or Urdu depending on the campaign',
              'Able to handle high call volume and hear no all day',
              'Basic computer literacy and typing speed',
              'Reliable internet, a headset and a quiet place to work',
              'Available for a fixed shift, including US hours where required'],
       nice:[]},

      {id:'upwork-bidder',title:'Upwork Bidder',dept:'bidding',loc:'Remote · Pakistan',type:'Full-time',level:'Mid',setup:'Remote',
       pay:'Commission only · percentage of every contract you win',seats:3,badge:'',voice:false,status:'open',posted:ago(1),retainer:false,commission:true,
       summary:'Find the right jobs on Upwork and other freelance marketplaces, write proposals that get replies, and run the conversation until a call is booked. Commission only — you earn a percentage of the value of every contract that closes off your bids, with no cap.',
       does:['Monitor Upwork, Fiverr and similar boards for matching briefs',
             'Write tailored proposals — no copy-paste templates',
             'Manage connects and bidding budget sensibly',
             'Reply fast to client questions and book discovery calls',
             'Track bids, responses and win rate in a shared sheet'],
       wants:['Comfortable with a commission-only structure and no base salary',
              '1+ year bidding on Upwork with results you can show',
              'Strong written English — proposals are the product here',
              'Good judgement about which briefs are worth a bid',
              'Understanding of profiles, connects, JSS and rankings',
              'Available across overlapping client hours'],
       nice:[]},

      {id:'sdr',title:'Sales Development Representative',dept:'sales',loc:'Remote · Pakistan / Middle East',type:'Full-time',level:'Mid',setup:'Remote',
       pay:'Monthly retainer + commission on every meeting booked',seats:3,badge:'',voice:true,status:'open',posted:ago(4),retainer:true,commission:true,
       summary:'Own the top of the funnel across email, LinkedIn and phone. Build target lists, run multi-touch sequences, qualify replies and hand clean, briefed meetings to closers. This role pays a fixed monthly retainer plus commission, so there is a floor under you while you build the pipeline.',
       does:['Build and enrich target lists against a defined ideal customer profile',
             'Run multi-channel sequences across email, LinkedIn and phone',
             'Qualify inbound and outbound replies and book meetings',
             'Write a short brief for every meeting you hand over',
             'Keep the CRM accurate and hit a weekly meetings target'],
       wants:['1–3 years in an SDR, BDR or similar outbound role',
              'You can write a cold email that gets replies',
              'Familiar with a CRM and a sequencing tool',
              'Comfortable being measured on a weekly number',
              'Strong written English'],
       nice:[]}
    ];

    DB.apps={
      'INC-7QK2-4831':{id:'INC-7QK2-4831',name:'Sarah Ahmed',email:'sarah.ahmed@email.com',phone:'+92 300 1122334',
        jobId:'sdr',jobTitle:'Sales Development Representative',loc:'Lahore, Pakistan',applied:ago(9),stage:2,rejected:false,
        years:'1–3 years',start:'2 weeks',comp:'Retainer + commission',mode:'Remote',file:'sarah-ahmed-cv.pdf',photo:'data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><defs><linearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27><stop offset=%270%27 stop-color=%27%233B6BF5%27/><stop offset=%271%27 stop-color=%27%231A3FB0%27/></linearGradient></defs><rect width=%27160%27 height=%27160%27 fill=%27url(%23g)%27/><circle cx=%2780%27 cy=%2762%27 r=%2726%27 fill=%27rgba(255,255,255,.9)%27/><path d=%27M26 160c0-31 24-52 54-52s54 21 54 52z%27 fill=%27rgba(255,255,255,.9)%27/><text x=%2780%27 y=%27150%27 font-family=%27monospace%27 font-size=%2716%27 fill=%27rgba(255,255,255,.85)%27 text-anchor=%27middle%27>SA</text></svg>',
        linkedin:'linkedin.com/in/sarahahmed',site:'',pitch:'Ran outbound for a 12-person agency for two years — built the lists, wrote the sequences and booked 18–24 meetings a month on average.',
        notes:'Available for US shift.',
        next:{title:'Interview scheduled · Thu, 11:00 PKT',note:'A 30-minute call with the sales lead about your outbound experience. Calendar invite sent to your email.'},
        iv:{status:'upcoming',at:Date.now()+2*86400000+36000000,link:'https://meet.example.com/sarah-ahmed',
            remarks:'Strong on sequencing; check deliverability depth.',summary:''},
        events:[{t:ago(9),b:'Application received',p:'Submitted via the careers page.'},
                {t:ago(8),b:'Moved to Screening',p:'Application reviewed and shortlisted.'},
                {t:ago(6),b:'Moved to Interview',p:'Invited to a first call with the sales lead.'}],
        msgs:[{t:ago(6),who:'Hiring team',txt:'Thanks for the detail on your meeting numbers — that is exactly what we wanted to see. Talk soon.'}]},

      'INC-3PD9-1174':{id:'INC-3PD9-1174',name:'Daniel Reyes',email:'daniel.reyes@email.com',phone:'+52 55 1234 5678',
        jobId:'sdr',jobTitle:'Sales Development Representative',loc:'Dubai, UAE',applied:ago(20),stage:3,rejected:false,offerStatus:'pending',offerSentAt:ago(2),
        joinAt:ago(-21),joinConfirmed:true,
        letter:{name:'daniel-reyes-offer-letter.pdf',size:184320,type:'application/pdf',at:ago(2)},
        years:'5+ years',start:'1 month',comp:'Retainer + commission',mode:'Hybrid',file:'daniel-reyes-resume.pdf',photo:'data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><defs><linearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27><stop offset=%270%27 stop-color=%27%23F0803C%27/><stop offset=%271%27 stop-color=%27%23C9541A%27/></linearGradient></defs><rect width=%27160%27 height=%27160%27 fill=%27url(%23g)%27/><circle cx=%2780%27 cy=%2762%27 r=%2726%27 fill=%27rgba(255,255,255,.9)%27/><path d=%27M26 160c0-31 24-52 54-52s54 21 54 52z%27 fill=%27rgba(255,255,255,.9)%27/><text x=%2780%27 y=%27150%27 font-family=%27monospace%27 font-size=%2716%27 fill=%27rgba(255,255,255,.85)%27 text-anchor=%27middle%27>DR</text></svg>',
        linkedin:'linkedin.com/in/danielreyes',site:'',pitch:'Six years of outbound and closing across the Gulf — last year at 118% of a $1.4M quota, most of it self-sourced.',
        notes:'Notice period one month.',
        next:{title:'Offer sent · respond by Friday',note:'The full offer letter is in your inbox. Reply with any questions — we are happy to walk through any part of it.'},
        events:[{t:ago(20),b:'Application received',p:'Submitted via the careers page.'},
                {t:ago(18),b:'Moved to Screening',p:'Strong closing track record.'},
                {t:ago(14),b:'Moved to Interview',p:'First call completed.'},
                {t:ago(2),b:'Joining date confirmed',p:'Agreed start date confirmed before the offer was sent.'},
                {t:ago(2),b:'Moved to Offer',p:'Offer letter sent by email.'}],
        msgs:[{t:ago(2),who:'Hiring team',txt:'The team is unanimous. Take your time with the letter and ask about anything.'}]},

      'INC-5RT8-2290':{id:'INC-5RT8-2290',name:'Amara Okafor',email:'amara.okafor@email.com',phone:'+234 802 555 0198',
        jobId:'upwork-bidder',jobTitle:'Upwork Bidder',loc:'Lagos, Nigeria',applied:ago(3),stage:1,rejected:false,
        years:'1–3 years',start:'Immediately',comp:'Commission only',mode:'Remote',file:'amara-okafor-cv.pdf',photo:'data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><defs><linearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27><stop offset=%270%27 stop-color=%27%231FA971%27/><stop offset=%271%27 stop-color=%27%230E7A4E%27/></linearGradient></defs><rect width=%27160%27 height=%27160%27 fill=%27url(%23g)%27/><circle cx=%2780%27 cy=%2762%27 r=%2726%27 fill=%27rgba(255,255,255,.9)%27/><path d=%27M26 160c0-31 24-52 54-52s54 21 54 52z%27 fill=%27rgba(255,255,255,.9)%27/><text x=%2780%27 y=%27150%27 font-family=%27monospace%27 font-size=%2716%27 fill=%27rgba(255,255,255,.85)%27 text-anchor=%27middle%27>AO</text></svg>',
        linkedin:'',site:'upwork.com/freelancers/amaraokafor',
        pitch:'Bid on Upwork full time for two years for a design studio — 21% response rate and 42 contracts won.',notes:'',
        next:{title:'Under review · decision this week',note:'Two people are reading your application. You will get a written answer either way.'},
        events:[{t:ago(3),b:'Application received',p:'Submitted via the careers page.'},
                {t:ago(2),b:'Moved to Screening',p:'Shortlisted for review.'}],
        msgs:[{t:ago(2),who:'Hiring team',txt:'Your response rate is well above what we normally see — we would like to look closer.'}]},

      'INC-9WQ4-6612':{id:'INC-9WQ4-6612',name:'Bilal Khan',email:'bilal.khan@email.com',phone:'+92 321 4455667',
        jobId:'telemarketer',jobTitle:'Telemarketer',loc:'Rawalpindi, Pakistan',applied:ago(1),stage:0,rejected:false,
        years:'Under 1 year',start:'Immediately',comp:'Commission only',mode:'On-site',file:'bilal-khan-cv.pdf',photo:'data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><defs><linearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27><stop offset=%270%27 stop-color=%27%236D5EF5%27/><stop offset=%271%27 stop-color=%27%234433C4%27/></linearGradient></defs><rect width=%27160%27 height=%27160%27 fill=%27url(%23g)%27/><circle cx=%2780%27 cy=%2762%27 r=%2726%27 fill=%27rgba(255,255,255,.9)%27/><path d=%27M26 160c0-31 24-52 54-52s54 21 54 52z%27 fill=%27rgba(255,255,255,.9)%27/><text x=%2780%27 y=%27150%27 font-family=%27monospace%27 font-size=%2716%27 fill=%27rgba(255,255,255,.85)%27 text-anchor=%27middle%27>BK</text></svg>',
        linkedin:'',site:'',pitch:'One year on a call floor selling internet packages, consistently above target on booked appointments.',
        notes:'Can start on any shift.',
        next:{title:'Under review · answer within 3 days',note:'Your application is in the queue. A person reads every one.'},
        events:[{t:ago(1),b:'Application received',p:'Submitted via the careers page.'}],msgs:[]}
    };
    save();
  }
  if(!load()) seed();

  /* ---------------- PROPOSAL REQUESTS (from the public website) ---------------- */
  var AUD_ST={
    'new'   :{k:'New',        fg:'#1A3FB0', bg:'rgba(36,86,230,.10)',  bd:'rgba(36,86,230,.3)'},
    'review':{k:'In review',  fg:'#5B3FD6', bg:'rgba(109,94,245,.11)', bd:'rgba(109,94,245,.32)'},
    'sent'  :{k:'Report sent',fg:'#127A52', bg:'rgba(31,169,113,.12)', bd:'rgba(31,169,113,.34)'}
  };
  var audFilter='all', audQuery='', audOpen=null;

  /* --- email notification on new audit requests --- */
  function audMail(){
    DB.audMail=DB.audMail||{on:false,to:''};
    return DB.audMail;
  }
  function audMailSync(){
    var sw=$('#audMailSw'), to=$('#audMailTo'), m=audMail();
    if(sw){ sw.classList.toggle('on',!!m.on); sw.setAttribute('aria-checked',m.on?'true':'false'); }
    if(to && document.activeElement!==to){ to.value=m.to||''; }
    if(to) to.disabled=!m.on;
  }
  function audId(){
    var n=(DB.audits?DB.audits.length:0)+1;
    return 'AUD-'+String(Date.now()).slice(-5)+'-'+String(n).padStart(3,'0');
  }
  function audInitials(n){
    var p=String(n||'?').trim().split(/\s+/);
    return ((p[0]||'?')[0]+((p[1]||'')[0]||'')).toUpperCase();
  }

  /* the website form and the live chat both post proposal requests in here */
  window.incomeraAudit=function(o){
    o=o||{};
    DB.audits=DB.audits||[];
    var rec={
      id:audId(),
      name:(o.name||'').trim()||'Not given',
      company:(o.company||'').trim()||'Not given',
      email:(o.email||'').trim(),
      phone:(o.phone||'').trim(),
      want:(o.want&&o.want.length)?o.want:['Not sure yet'],
      notes:(o.notes||'').trim(),
      status:'new', read:false, at:Date.now(),
      source:o.source||'Website'
    };
    DB.audits.unshift(rec);
    save();
    try{ renderAudits(); }catch(e){}
    try{ toast('New proposal request from '+rec.name); }catch(e){}
    return rec.id;
  };

  /* ---- editable notification template ---- */
  var AEM_SUB='New proposal request — {{name}} ({{company}})';
  var AEM_BODY=[
    'A new proposal request was submitted on the website.','',
    'Name:      {{name}}',
    'Company:   {{company}}',
    'Email:     {{email}}',
    'Phone:     {{phone}}',
    'Wants:     {{wants}}',
    'Reference: {{ref}}',
    'Received:  {{received}}','',
    'In their own words:',
    '{{notes}}','',
    'Open the admin panel to reply.'
  ].join('\n');

  function audTpl(){
    var m=audMail();
    if(typeof m.sub!=='string') m.sub=AEM_SUB;
    if(typeof m.body!=='string') m.body=AEM_BODY;
    return m;
  }
  var AEM_SAMPLE={name:'Priya Raman',company:'Vaultline',email:'priya@vaultline.com',
    want:['Meeting + Subscription Engine'],id:'AUD-40221-001',at:Date.now(),phone:'+44 7700 900123',
    notes:'Both ends honestly. Pipeline is thin and the customers we do win drift off after month four.'};

  function audFill(tpl,a){
    return String(tpl)
      .replace(/\{\{name\}\}/g,      a.name||'—')
      .replace(/\{\{company\}\}/g,   a.company||'—')
      .replace(/\{\{email\}\}/g,     a.email||'not given')
      .replace(/\{\{phone\}\}/g,     a.phone||'not given')
      .replace(/\{\{wants\}\}/g,     (a.want||[]).join(', ')||'—')
      .replace(/\{\{ref\}\}/g,       a.id||'—')
      .replace(/\{\{received\}\}/g,  fmtL(a.at||Date.now()))
      .replace(/\{\{notes\}\}/g,     a.notes||'(nothing written)');
  }
  function audMailto(a){
    var m=audTpl();
    return 'mailto:'+encodeURIComponent(m.to||'')+
      '?subject='+encodeURIComponent(audFill(m.sub,a))+
      '&body='+encodeURIComponent(audFill(m.body,a));
  }

  /* fires whenever a request arrives while the switch is on */
  function audNotify(a){
    var w=(DB.webNotify||{});
    if(w.prop===false) return false;          /* switched off in workspace › notifications */
    var m=audTpl();
    var to=m.to||w.to;
    if(!m.on && !w.to) return false;
    if(!to) return false;
    m.to=m.to||to;
    a.notified={to:m.to, from:(function(){ try{ return senderFor('web:prop'); }catch(x){ return ''; } })(), at:Date.now()};
    a.mailto=audMailto(a);
    try{ toast('Proposal request emailed to '+m.to); }catch(e){}
    return true;
  }

  function seedAudits(){
    if(DB.audits && DB.audits.length) return;
    DB.audits=[
      {id:'AUD-40218-003',name:'Sarah Lin',company:'Northwind',email:'sarah.lin@northwind.io',
       want:['Meeting Engine'],status:'sent',read:true,at:ago(6),source:'Website · proposal form',
       notes:'We get around 300 inbound leads a month and our reps take most of a day to reply. By the time anyone calls, half of them have already booked with someone else.'},
      {id:'AUD-40219-002',name:'Daniel Okafor',company:'Lumenpay',email:'d.okafor@lumenpay.co',
       want:['Subscription Engine'],status:'review',read:true,at:ago(2),source:'Website · proposal form',
       notes:'Roughly 1,200 free accounts, maybe 4% ever upgrade. Nobody speaks to a trial user unless they raise a ticket first. Failed cards just churn silently.'},
      {id:'AUD-40221-001',name:'Priya Raman',company:'Vaultline',email:'priya@vaultline.com',
       want:['Meeting + Subscription Engine'],status:'new',read:false,at:Date.now()-5*3600000,
       source:'Website · proposal form',
       notes:'Both ends honestly. Pipeline is thin and the customers we do win drift off after month four. Want to know which one to fix first.'}
    ];
    save();
  }

  function renderAudits(){
    if(!DB.audits) DB.audits=[];
    var all=DB.audits.slice();
    var badge=$('#adNavAud');
    var unread=all.filter(function(a){return !a.read}).length;
    if(badge) badge.textContent=unread?unread:all.length;

    var week=all.filter(function(a){return Date.now()-a.at<7*86400000}).length;
    var rev=all.filter(function(a){return a.status==='review'}).length;
    var snt=all.filter(function(a){return a.status==='sent'}).length;
    if($('#audT1')) $('#audT1').textContent=week;
    if($('#audT2')) $('#audT2').textContent=unread;
    if($('#audT3')) $('#audT3').textContent=rev;
    if($('#audT4')) $('#audT4').textContent=snt;

    audMailSync();

    var box=$('#audRows'); if(!box) return;

    var list=all.filter(function(a){
      if(audFilter!=='all' && a.status!==audFilter) return false;
      if(!audQuery) return true;
      var q=audQuery.toLowerCase();
      return (a.name+' '+a.company+' '+a.email+' '+(a.phone||'')+' '+a.id).toLowerCase().indexOf(q)>-1;
    });
    list.sort(function(x,y){return y.at-x.at});

    if($('#audCount')) $('#audCount').textContent=list.length+(list.length===1?' request':' requests');

    if(!list.length){
      box.innerHTML='<div class="aud__none"><b>No proposal requests here yet</b>'+
        'Every proposal request submitted from the website lands in this list the moment it is sent.</div>';
      return;
    }

    box.innerHTML=list.map(function(a){
      var st=AUD_ST[a.status]||AUD_ST['new'];
      var op=(audOpen===a.id);
      return '<div class="aud__r'+(op?' open':'')+'" data-aud="'+esc(a.id)+'">'+
        '<button class="aud__hd" type="button" data-aud-tog="'+esc(a.id)+'">'+
          (a.read?'':'<span class="aud__new"></span>')+
          '<span class="aud__av">'+esc(audInitials(a.name))+'</span>'+
          '<span class="aud__id"><b>'+esc(a.name)+' &middot; '+esc(a.company)+'</b>'+
            '<small>'+esc(a.email||'no email given')+' &middot; '+esc(a.id)+'</small></span>'+
          '<span class="aud__want">'+esc(a.want.join(' + '))+'</span>'+
          '<span class="aud__st" style="--s-fg:'+st.fg+';--s-bg:'+st.bg+';--s-bd:'+st.bd+'">'+st.k+'</span>'+
          (a.notified?'<span class="aud__sent">Emailed</span>':'')+
          '<span class="aud__when">'+since(a.at)+'</span>'+
          '<svg class="aud__cv" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>'+
        '</button>'+
        '<div class="aud__bd">'+
          '<div class="aud__g">'+
            '<div class="aud__f"><span>Name</span><b>'+esc(a.name)+'</b></div>'+
            '<div class="aud__f"><span>Company</span><b>'+esc(a.company)+'</b></div>'+
            '<div class="aud__f"><span>Work email</span><b>'+esc(a.email||'—')+'</b></div>'+
            '<div class="aud__f"><span>Phone</span><b>'+esc(a.phone||'—')+'</b></div>'+
            '<div class="aud__f"><span>Wants</span><b>'+esc(a.want.join(', '))+'</b></div>'+
            '<div class="aud__f"><span>Submitted</span><b>'+fmtL(a.at)+'</b></div>'+
            '<div class="aud__f"><span>Source</span><b>'+esc(a.source||'Website')+'</b></div>'+
          '</div>'+
          (a.notes?'<div class="aud__note"><span>In their own words</span><p>'+esc(a.notes)+'</p></div>':'')+
          '<div class="aud__acts">'+
            '<button class="aud__b'+(a.status==='new'?' on':'')+'" type="button" data-aud-st="new" data-id="'+esc(a.id)+'">New</button>'+
            '<button class="aud__b'+(a.status==='review'?' on':'')+'" type="button" data-aud-st="review" data-id="'+esc(a.id)+'">In review</button>'+
            '<button class="aud__b'+(a.status==='sent'?' on':'')+'" type="button" data-aud-st="sent" data-id="'+esc(a.id)+'">Report sent</button>'+
            (a.email?'<a class="aud__b" href="mailto:'+esc(a.email)+'?subject='+encodeURIComponent('Your Incomera proposal')+'">Reply by email</a>':'')+
            '<button class="aud__b" type="button" data-aud-pv="'+esc(a.id)+'">Preview email</button>'+
            '<button class="aud__b aud__b--del" type="button" data-aud-del="'+esc(a.id)+'">Delete</button>'+
          '</div>'+
        '</div>'+
      '</div>';
    }).join('');
  }

  function audFind(id){
    for(var i=0;i<DB.audits.length;i++){ if(DB.audits[i].id===id) return DB.audits[i]; }
    return null;
  }

  document.addEventListener('click',function(e){
    var t=e.target, el;
    if(!t||!t.closest) return;
    if((el=t.closest('[data-aud-tog]'))){
      var id=el.getAttribute('data-aud-tog');
      audOpen=(audOpen===id)?null:id;
      var a=audFind(id);
      if(a && audOpen===id && !a.read){ a.read=true; save(); }
      renderAudits(); return;
    }
    if((el=t.closest('[data-aud-st]'))){
      var a2=audFind(el.getAttribute('data-id'));
      if(a2){ a2.status=el.getAttribute('data-aud-st'); a2.read=true; save(); renderAudits(); }
      return;
    }
    if((el=t.closest('[data-aud-del]'))){
      var did=el.getAttribute('data-aud-del');
      DB.audits=DB.audits.filter(function(x){return x.id!==did});
      if(audOpen===did) audOpen=null;
      save(); renderAudits(); return;
    }
  });

  /* ---------------- EVENT TYPES + BOOKING PAGE BUILDER ---------------- */
  var LOC={
    meet :{n:'Google Meet', ic:'<path d="M15 10l4.5-2.5v9L15 14"/><rect x="3" y="6" width="12" height="12" rx="2"/>'},
    zoom :{n:'Zoom',        ic:'<rect x="2" y="6" width="14" height="12" rx="3"/><path d="M16 10l6-3v10l-6-3z"/>'},
    phone:{n:'Phone call',  ic:'<path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a1.5 1.5 0 0 1-1.7 1.5A17.5 17.5 0 0 1 2.5 5.7 1.5 1.5 0 0 1 4 4z"/>'},
    place:{n:'In person',   ic:'<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>'}
  };
  var EVC=['#2456E6','#6D5EF5','#1FA971','#C9821A','#15C5DE'];
  var evDraft=null, evEditing=null;

  function evSlug(t){
    return String(t||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)
      || 'meeting';
  }
  function evBase(){
    try{ return location.origin+location.pathname+'#book/'; }catch(e){ return 'incomera.com/book/'; }
  }
  function evLink(e){ return evBase()+e.slug; }

  function seedEvents(){
    if(DB.events && DB.events.length) return;
    DB.events=[
      {id:'EVT-001',title:'Proposal call',slug:'proposal-call',mins:30,kind:'one',loc:'meet',
       desc:'Thirty minutes, no deck. We look at where your revenue is leaking and tell you which engine you would need.',
       host:'Rana M.',at:Date.now()-9*86400000}
    ];
    save();
  }

  function renderEvents(){
    DB.events=DB.events||[];
    var box=$('#evList'); if(!box) return;
    if(!DB.events.length){
      box.innerHTML='<div class="ev__none"><b>No event types yet</b>'+
        'Create one and you get a shareable booking page people can pick a slot on.</div>';
      return;
    }
    box.innerHTML=DB.events.map(function(e,i){
      var l=LOC[e.loc]||LOC.meet, c=EVC[i%EVC.length];
      return '<div class="ev__r">'+
        '<span class="ev__dot" style="--c:'+c+'"><svg viewBox="0 0 24 24">'+l.ic+'</svg></span>'+
        '<span class="ev__t"><b>'+esc(e.title)+'</b><span>'+esc(e.desc||'').slice(0,80)+'</span></span>'+
        '<span class="ev__pill">'+e.mins+' min</span>'+
        '<span class="ev__pill">'+(e.kind==='group'?'Group':'One-to-one')+'</span>'+
        '<span class="ev__pill">'+l.n+'</span>'+
        
        '<span class="ev__link"><code>'+esc(evLink(e))+'</code>'+
          '<button class="ev__cp" type="button" data-ev-cp="'+esc(e.id)+'">Copy link</button></span>'+
        '<button class="ev__del" type="button" data-ev-del="'+esc(e.id)+'" aria-label="Delete">'+
          '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'+
      '</div>';
    }).join('');
  }

  /* ---- builder ---- */
  function evOpen(id){
    var e=id?evFind(id):null;
    evEditing=id||null;
    evDraft=e ? JSON.parse(JSON.stringify(e))
              : {id:'EVT-'+String(Date.now()).slice(-6),title:'',slug:'',mins:30,kind:'one',
                 loc:'',av:'Weekdays, 9 am – 6 pm',desc:'',host:'Rana M.',at:Date.now()};
    $('#evmTitle').textContent=e?'Edit event type':'New event type';
    $('#evmSub').textContent=e?'Changes apply to the live booking page.':'It gets its own booking page as soon as you create it.';
    $('#evmSave').textContent=e?'Save changes':'Create event type';
    evDraft.av=evDraft.av||'Weekdays, 9 am – 6 pm';
    $('#evfTitle').value=evDraft.title;
    $('#evfSlug').value=evDraft.slug;
    $('#evfDesc').value=evDraft.desc;
    evPaint();
    $('#evmWrap').classList.add('on');
    $('#evmWrap').setAttribute('aria-hidden','false');
    setTimeout(function(){ try{ $('#evfTitle').focus(); }catch(x){} },80);
  }
  function evClose(){
    $('#evmWrap').classList.remove('on');
    $('#evmWrap').setAttribute('aria-hidden','true');
    evDraft=null; evEditing=null;
  }
  function evFind(id){ var a=DB.events||[]; for(var i=0;i<a.length;i++){ if(a[i].id===id) return a[i]; } return null; }

  function evPaint(){
    if(!evDraft) return;
    $$('[data-ev-mins]',aw).forEach(function(b){ b.classList.toggle('on',+b.getAttribute('data-ev-mins')===evDraft.mins); });
    $$('[data-ev-kind]',aw).forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-ev-kind')===evDraft.kind); });
    $$('[data-ev-loc]',aw).forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-ev-loc')===evDraft.loc); });
    $$('[data-ev-av]',aw).forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-ev-av')===evDraft.av); });

    var slug=evDraft.slug||evSlug(evDraft.title);
    var title=evDraft.title||'New Meeting';
    var l=evDraft.loc?LOC[evDraft.loc]:null;

    if($('#evSumType')) $('#evSumType').textContent=title+' \u00b7 '+(evDraft.kind==='group'?'Group':'One-on-One');
    if($('#evSumMins')) $('#evSumMins').textContent=evDraft.mins+' min';
    if($('#evSumLoc'))  $('#evSumLoc').textContent=l?l.n:'Not set';
    if($('#evSumAv'))   $('#evSumAv').textContent=evDraft.av||'Weekdays, 9 am \u2013 6 pm';
    if($('#evSumLink')) $('#evSumLink').textContent=evBase()+slug;

    var w=$('#evWarn'), wt=$('#evWarnT');
    if(w&&wt){
      if(l){ w.classList.add('ok'); wt.textContent=l.n+' \u2014 the link is generated and sent with the invite.'; }
      else { w.classList.remove('ok'); wt.textContent='Add a location to help invitees know how to attend'; }
    }

    $('#bpUrl').textContent=evBase()+slug;
    $('#bpTitle').textContent=title;
    $('#bpDesc').textContent=evDraft.desc||'Add a description and it shows here for whoever opens the link.';
    $('#bpMins').textContent=evDraft.mins+' minutes';
    $('#bpKind').textContent=(evDraft.kind==='group'?'Group session':'One-on-One');
    $('#bpLoc').innerHTML=l
      ? '<svg viewBox="0 0 24 24">'+l.ic+'</svg><span>'+l.n+'</span>'
      : '<svg viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg><span>No location set</span>';

    var step=evDraft.mins/60, out=[];
    for(var h=9;h+step<=13 && out.length<9;h+=step){
      var hh=Math.floor(h), mm=Math.round((h-hh)*60);
      var ap=hh>=12?'PM':'AM', d=hh%12||12;
      out.push(d+':'+String(mm).padStart(2,'0')+' '+ap);
    }
    $('#bpSlots').innerHTML=out.map(function(t,i){
      return '<span class="bp__s'+(i===2?' on':'')+'">'+t+'</span>';
    }).join('');

    var DAYN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], html='';
    var d0=new Date();
    for(var i=1;i<=5;i++){
      var x=new Date(d0); x.setDate(x.getDate()+i);
      html+='<span class="bp__d'+(i===2?' on':'')+'"><u>'+DAYN[x.getDay()]+'</u><b>'+x.getDate()+'</b></span>';
    }
    $('#bpDays').innerHTML=html;
  }

  document.addEventListener('click',function(e){
    var t=e.target, el;
    if(!t||!t.closest) return;

    if(t.closest('#evNew')){ evOpen(null); return; }
    if(t.closest('[data-evm-close]')){ evClose(); return; }

    if((el=t.closest('[data-ev-mins]'))&&evDraft){ evDraft.mins=+el.getAttribute('data-ev-mins'); evPaint(); return; }
    if((el=t.closest('[data-ev-kind]'))&&evDraft){ evDraft.kind=el.getAttribute('data-ev-kind'); evPaint(); return; }
    if((el=t.closest('[data-ev-loc]'))&&evDraft){ evDraft.loc=el.getAttribute('data-ev-loc'); evPaint(); return; }
    if((el=t.closest('[data-ev-av]'))&&evDraft){ evDraft.av=el.getAttribute('data-ev-av'); evPaint(); return; }
    if((el=t.closest('.es__hd'))){ el.parentNode.classList.toggle('shut'); return; }

    if(t.closest('#evmSave')&&evDraft){
      var title=$('#evfTitle').value.trim();
      if(!title){ $('#evmMsg').textContent='Give the event a title first.'; return; }
      evDraft.title=title;
      evDraft.slug=evSlug($('#evfSlug').value.trim()||title);
      evDraft.desc=$('#evfDesc').value.trim();
      DB.events=DB.events||[];
      if(evEditing){
        for(var i=0;i<DB.events.length;i++) if(DB.events[i].id===evEditing) DB.events[i]=evDraft;
      } else DB.events.unshift(evDraft);
      save(); renderEvents(); evClose();
      try{ toast('Booking page is live — copy the link to share it'); }catch(x){}
      return;
    }
    if((el=t.closest('[data-ev-cp]'))){
      var ev=evFind(el.getAttribute('data-ev-cp'));
      if(!ev) return;
      var link=evLink(ev);
      var done=function(){
        el.textContent='Copied'; el.classList.add('done');
        setTimeout(function(){ el.textContent='Copy link'; el.classList.remove('done'); },1600);
      };
      try{
        if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(link).then(done,done); }
        else{
          var ta=document.createElement('textarea'); ta.value=link;
          document.body.appendChild(ta); ta.select();
          try{ document.execCommand('copy'); }catch(x){}
          document.body.removeChild(ta); done();
        }
      }catch(x){ done(); }
      return;
    }

    if((el=t.closest('[data-ev-del]'))){
      var id=el.getAttribute('data-ev-del');
      DB.events=(DB.events||[]).filter(function(x){ return x.id!==id; });
      save(); renderEvents(); return;
    }
  });

  document.addEventListener('input',function(e){
    if(!evDraft||!e.target||!e.target.id) return;
    if(e.target.id==='evfTitle'){
      evDraft.title=e.target.value;
      if(!evEditing) $('#evfSlug').value=evSlug(e.target.value);
      evDraft.slug=evSlug($('#evfSlug').value);
      evPaint();
    }
    if(e.target.id==='evfSlug'){ evDraft.slug=evSlug(e.target.value); evPaint(); }
    if(e.target.id==='evfDesc'){ evDraft.desc=e.target.value; evPaint(); }
  });

  /* ---------------- LIVE CHAT INBOX (from the website widget) ---------------- */
  var lcFilter='open', lcOpen=null;
  var LC_AV=['#2456E6','#6D5EF5','#15C5DE','#1FA971','#C9821A'];

  function lcId(){ return 'CHT-'+String(Date.now()).slice(-5)+'-'+String((DB.chats||[]).length+1).padStart(3,'0'); }
  function lcInitials(n){
    var p=String(n||'?').trim().split(/\s+/);
    return ((p[0]||'?')[0]+((p[1]||'')[0]||'')).toUpperCase();
  }

  /* called by the public chat widget */
  window.incomeraChat=function(rec){
    if(!rec) return null;
    DB.chats=DB.chats||[];
    var id=rec.id, c=null;
    if(id) c=lcFind(id);
    if(!c){
      c={id:id||lcId(), name:rec.name||'Website visitor', page:rec.page||'/',
         loc:rec.loc||'Unknown', status:'open', live:true, unread:0, msgs:[], at:Date.now()};
      DB.chats.unshift(c);
    }
    c.msgs.push({who:rec.who||'v', t:Date.now(), b:String(rec.body||'')});
    c.at=Date.now();
    if((rec.who||'v')!=='a') c.unread=(c.unread||0)+1;
    save();
    try{ renderChats(); }catch(e){}
    return c.id;
  };

  function lcFind(id){ var a=DB.chats||[]; for(var i=0;i<a.length;i++){ if(a[i].id===id) return a[i]; } return null; }

  function seedChats(){
    if(DB.chats && DB.chats.length) return;
    function m(who,mins,b){ return {who:who,t:Date.now()-mins*60000,b:b}; }
    DB.chats=[
      {id:'CHT-40241-004',name:'Visitor · Halcyon',page:'/#packages',loc:'London, UK',
       status:'open',live:true,unread:2,at:Date.now()-4*60000,
       msgs:[
         m('bot',13,'Hi, I am Rana — I run income engines here at Incomera. Ask me anything.'),
         m('v',11,'What does the acquisition engine cost for a team of 12?'),
         m('bot',11,'It is a single one-time setup fee — proposal, build, training and launch, billed once.'),
         m('v',5,'And how fast could it be live? We have a board meeting on the 14th.'),
         m('v',4,'Also — do we need to move off our current CRM?')
       ]},
      {id:'CHT-40242-003',name:'Marcus Webb · Cedarworks',page:'/#offer',loc:'Toronto, CA',
       status:'open',live:false,unread:1,at:Date.now()-52*60000,
       msgs:[
         m('v',58,'We tried an agency last year and it went nowhere. What is different here?'),
         m('a',56,'Fair question. Most agencies rent you their process and keep it. We build the engine inside your own stack and hand it over, so it keeps running whether or not we are involved.'),
         m('v',52,'Can I see what the handover actually includes?')
       ]},
      {id:'CHT-40243-002',name:'Aisha Rahman · Peakline',page:'/#fit',loc:'Dubai, AE',
       status:'open',live:false,unread:0,at:Date.now()-5*3600000,
       msgs:[
         m('v',312,'Do you work with marketplaces? We have supply and demand sides.'),
         m('a',309,'Yes — usually the acquisition engine on the supply side and monetisation on demand. We would split it in the proposal.'),
         m('v',306,'Great. I have submitted the form just now.'),
         m('a',305,'Got it, thank you. You will have the baseline and the outcome back within 24 hours.')
       ]},
      {id:'CHT-40244-001',name:'Visitor · Fernbank',page:'/#top',loc:'Berlin, DE',
       status:'closed',live:false,unread:0,at:Date.now()-2*86400000,
       msgs:[
         m('v',2890,'Just browsing — do you publish pricing?'),
         m('a',2888,'Not publicly, because it depends which engine you need. The proposal comes back with the exact figure and it is free.'),
         m('v',2886,'Understood, thanks.')
       ]}
    ];
    save();
  }

  function lcTime(t){
    var d=new Date(t);
    return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  }

  function renderChats(){
    DB.chats=DB.chats||[];
    var all=DB.chats.slice();
    var unread=all.filter(function(c){return c.status==='open'&&c.unread>0}).length;
    var badge=$('#adNavChat'); if(badge) badge.textContent=unread||all.filter(function(c){return c.status==='open'}).length;

    var box=$('#lcList'); if(!box) return;
    var list=all.filter(function(c){
      if(lcFilter==='open') return c.status==='open';
      if(lcFilter==='unread') return c.status==='open'&&c.unread>0;
      if(lcFilter==='closed') return c.status==='closed';
      return true;
    });
    list.sort(function(x,y){ return y.at-x.at; });

    $$('.lc__sb',aw).forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-lc-f')===lcFilter); });

    if(!list.length){
      box.innerHTML='<div class="aud__none" style="margin:14px"><b>Nothing here</b>Conversations from the website chat land in this list.</div>';
    } else {
      box.innerHTML=list.map(function(c,i){
        var last=c.msgs[c.msgs.length-1]||{b:''};
        return '<button class="lc__c'+(lcOpen===c.id?' on':'')+'" type="button" data-lc="'+esc(c.id)+'">'+
          '<span class="lc__av" style="--c:'+LC_AV[i%LC_AV.length]+'">'+esc(lcInitials(c.name.replace(/^Visitor · /,'')))+
            '<i class="'+(c.live?'live':'')+'"></i></span>'+
          '<span class="lc__ct"><b><span>'+esc(c.name)+'</span><em>'+lcTime(c.at)+'</em>'+
            (c.unread?'<span class="lc__unread"></span>':'')+'</b>'+
            '<p>'+esc(last.b).slice(0,70)+'</p></span>'+
        '</button>';
      }).join('');
    }
    renderThread();
  }

  function renderThread(){
    var c=lcOpen?lcFind(lcOpen):null;
    var head=$('#lcHead'), msgs=$('#lcMsgs'), foot=$('#lcFoot');
    if(!head||!msgs||!foot) return;

    if(!c){
      head.style.display='none'; foot.style.display='none';
      msgs.className='lc__empty';
      msgs.innerHTML='<div><b>Pick a conversation</b>Every chat started on the website shows up on the left.</div>';
      return;
    }
    head.style.display=''; foot.style.display='';
    msgs.className='lc__msgs';

    $('#lcName').textContent=c.name;
    $('#lcMeta').textContent=c.loc+' · '+c.page+' · '+(c.live?'online now':'last seen '+since(c.at))+' · '+c.id;
    $('#lcClose').textContent=(c.status==='open')?'Mark resolved':'Reopen';

    msgs.innerHTML='<div class="lc__day">'+fmtL(c.msgs[0]?c.msgs[0].t:c.at)+'</div>'+
      c.msgs.map(function(m){
        var cls=(m.who==='a')?'a':(m.who==='bot'?'bot':'v');
        return '<div class="lc__m lc__m--'+cls+'">'+
          (m.who==='bot'?'<span class="lc__botlbl">Auto-reply</span>':'')+esc(m.b)+'</div>'+
          '<span class="lc__mt lc__mt--'+(m.who==='a'?'a':'v')+'">'+
          (m.who==='a'?'You':(m.who==='bot'?'Engine':c.name.split('·')[0].trim()))+' · '+lcTime(m.t)+'</span>';
      }).join('');
    msgs.scrollTop=msgs.scrollHeight;

    if(c.unread){ c.unread=0; save(); }
  }

  function lcSend(text){
    var c=lcOpen?lcFind(lcOpen):null;
    if(!c||!text) return;
    c.msgs.push({who:'a',t:Date.now(),b:text});
    c.at=Date.now(); c.unread=0; save();
    renderChats();
  }

  document.addEventListener('click',function(e){
    var t=e.target, el;
    if(!t||!t.closest) return;

    if((el=t.closest('[data-lc-f]'))){ lcFilter=el.getAttribute('data-lc-f'); renderChats(); return; }
    if((el=t.closest('[data-lc]'))){ lcOpen=el.getAttribute('data-lc'); renderChats(); return; }
    if((el=t.closest('[data-lc-q]'))){
      var box=$('#lcInput');
      if(box){ box.value=el.getAttribute('data-lc-q'); box.focus(); lcSync(); }
      return;
    }
    if(t.closest('#lcSend')){
      var i=$('#lcInput'); if(i&&i.value.trim()){ lcSend(i.value.trim()); i.value=''; lcSync(); }
      return;
    }
    if(t.closest('#lcClose')){
      var c=lcOpen?lcFind(lcOpen):null;
      if(c){ c.status=(c.status==='open')?'closed':'open'; c.live=false; save(); renderChats(); }
      return;
    }
    if(t.closest('#lcToProp')){
      var c2=lcOpen?lcFind(lcOpen):null;
      if(c2&&typeof window.incomeraAudit==='function'){
        var nm=c2.name.replace(/^Visitor · /,'');
        window.incomeraAudit({name:nm,company:nm,email:'',want:['From live chat'],
          notes:c2.msgs.map(function(m){return (m.who==='a'?'Us: ':'Them: ')+m.b}).join('\n'),
          source:'Website · live chat'});
        try{ toast('Proposal request created from this chat'); }catch(e){}
      }
      return;
    }
    if(t.closest('#lcToMeet')){
      var c3=lcOpen?lcFind(lcOpen):null;
      if(c3&&typeof window.incomeraMeeting==='function'){
        var nm3=c3.name.replace(/^Visitor · /,'');
        window.incomeraMeeting({name:nm3,company:nm3,email:'',
          at:Date.now()+2*86400000,mins:30,topic:'Follow-up from live chat',
          source:'Website · live chat'});
        try{ toast('Meeting drafted — set the time in Meetings scheduled'); }catch(e){}
      }
      return;
    }
  });

  function lcSync(){
    var i=$('#lcInput'), b=$('#lcSend');
    if(!i||!b) return;
    b.classList.toggle('on',!!i.value.trim());
    i.style.height='auto'; i.style.height=Math.min(i.scrollHeight,96)+'px';
  }
  document.addEventListener('input',function(e){ if(e.target&&e.target.id==='lcInput') lcSync(); });
  document.addEventListener('keydown',function(e){
    if(e.target&&e.target.id==='lcInput'&&e.key==='Enter'&&!e.shiftKey){
      e.preventDefault();
      var i=e.target;
      if(i.value.trim()){ lcSend(i.value.trim()); i.value=''; lcSync(); }
    }
  });

  /* ---------------- MEETINGS SCHEDULED (from the website) ---------------- */
  var MT_ST={
    upcoming:{k:'Scheduled', fg:'#1A3FB0', bg:'rgba(36,86,230,.10)',  bd:'rgba(36,86,230,.3)'},
    done    :{k:'Completed', fg:'#127A52', bg:'rgba(31,169,113,.12)', bd:'rgba(31,169,113,.34)'},
    noshow  :{k:'No-show',   fg:'#C0273D', bg:'rgba(255,61,90,.10)',  bd:'rgba(255,61,90,.3)'}
  };
  var mtFilter='all', mtQuery='', mtOpen=null;
  var MONTH=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function mtId(){ return 'MTG-'+String(Date.now()).slice(-5)+'-'+String(DB.meets.length+1).padStart(3,'0'); }

  /* called when a meeting is booked from the website */
  window.incomeraMeeting=function(rec){
    if(!rec) return null;
    var m={
      id:mtId(),
      name:(rec.name||'').trim()||'Not given',
      company:(rec.company||'').trim()||'Not given',
      email:(rec.email||'').trim(),
      at:rec.at||Date.now()+86400000,
      mins:rec.mins||30,
      topic:rec.topic||'Proposal call',
      owner:rec.owner||'Rana M.',
      status:'upcoming',
      source:rec.source||'Website · booking'
    };
    DB.meets.unshift(m); save();
    try{ renderMeets(); }catch(e){}
    return m.id;
  };

  function seedMeets(){
    if(DB.meets && DB.meets.length) return;
    var d=new Date(); d.setHours(0,0,0,0);
    function slot(dayOffset,h,mn){ var x=new Date(d); x.setDate(x.getDate()+dayOffset); x.setHours(h,mn||0,0,0); return x.getTime(); }
    DB.meets=[
      {id:'MTG-40233-005',name:'Priya Raman',company:'Vaultline',email:'priya@vaultline.com',
       at:slot(0,15,30),mins:30,topic:'Proposal call · both engines',owner:'Rana M.',status:'upcoming',source:'Website · booking'},
      {id:'MTG-40234-004',name:'Tom Keane',company:'Ironvale',email:'t.keane@ironvale.io',
       at:slot(1,11,0),mins:45,topic:'Baseline walkthrough',owner:'Rana M.',status:'upcoming',source:'Website · booking'},
      {id:'MTG-40235-003',name:'Sarah Lin',company:'Northwind',email:'sarah.lin@northwind.io',
       at:slot(3,9,30),mins:30,topic:'Meeting Engine scoping',owner:'A. Qureshi',status:'upcoming',source:'Website · booking'},
      {id:'MTG-40236-002',name:'Daniel Okafor',company:'Lumenpay',email:'d.okafor@lumenpay.co',
       at:slot(-2,14,0),mins:30,topic:'Subscription Engine review',owner:'Rana M.',status:'done',source:'Website · booking'},
      {id:'MTG-40237-001',name:'Marcus Webb',company:'Cedarworks',email:'m.webb@cedarworks.com',
       at:slot(-4,16,30),mins:30,topic:'Proposal call',owner:'A. Qureshi',status:'noshow',source:'Website · booking'}
    ];
    save();
  }

  function mtFind(id){ for(var i=0;i<DB.meets.length;i++){ if(DB.meets[i].id===id) return DB.meets[i]; } return null; }
  function mtTime(t){
    var d=new Date(t);
    return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  }
  function sameDay(t){
    var a=new Date(t), b=new Date();
    return a.getDate()===b.getDate()&&a.getMonth()===b.getMonth()&&a.getFullYear()===b.getFullYear();
  }

  function renderMeets(){
    if(!DB.meets) DB.meets=[];
    var all=DB.meets.slice(), now=Date.now();
    var up=all.filter(function(m){return m.status==='upcoming'&&m.at>=now}).length;
    var td=all.filter(function(m){return sameDay(m.at)}).length;
    var dn=all.filter(function(m){return m.status==='done'}).length;
    var ns=all.filter(function(m){return m.status==='noshow'}).length;
    if($('#adNavMeet')) $('#adNavMeet').textContent=up;
    if($('#mtT1')) $('#mtT1').textContent=up;
    if($('#mtT2')) $('#mtT2').textContent=td;
    if($('#mtT3')) $('#mtT3').textContent=dn;
    if($('#mtT4')) $('#mtT4').textContent=ns;

    var box=$('#mtRows'); if(!box) return;
    var list=all.filter(function(m){
      if(mtFilter!=='all' && m.status!==mtFilter) return false;
      if(!mtQuery) return true;
      var q=mtQuery.toLowerCase();
      return (m.name+' '+m.company+' '+m.email+' '+m.id+' '+m.topic).toLowerCase().indexOf(q)>-1;
    });
    list.sort(function(x,y){ return x.at-y.at; });
    if($('#mtCount')) $('#mtCount').textContent=list.length+(list.length===1?' meeting':' meetings');

    if(!list.length){
      box.innerHTML='<div class="aud__none"><b>No meetings here yet</b>'+
        'Every meeting booked from the website appears in this list automatically.</div>';
      return;
    }

    box.innerHTML=list.map(function(m){
      var st=MT_ST[m.status]||MT_ST.upcoming, d=new Date(m.at), op=(mtOpen===m.id);
      return '<div class="aud__r'+(op?' open':'')+'">'+
        '<button class="aud__hd" type="button" data-mt-tog="'+esc(m.id)+'">'+
          '<span class="mt__when"><b>'+d.getDate()+'</b><span>'+MONTH[d.getMonth()]+'</span></span>'+
          '<span class="aud__id"><b>'+esc(m.name)+' &middot; '+esc(m.company)+'</b>'+
            '<small>'+esc(m.topic)+' &middot; '+esc(m.id)+'</small></span>'+
          '<span class="mt__slot">'+mtTime(m.at)+' &middot; '+m.mins+'m</span>'+
          '<span class="aud__st" style="--s-fg:'+st.fg+';--s-bg:'+st.bg+';--s-bd:'+st.bd+'">'+st.k+'</span>'+
          '<span class="aud__when">'+(sameDay(m.at)?'Today':since(m.at))+'</span>'+
          '<svg class="aud__cv" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>'+
        '</button>'+
        '<div class="aud__bd">'+
          '<div class="aud__g">'+
            '<div class="aud__f"><span>Attendee</span><b>'+esc(m.name)+'</b></div>'+
            '<div class="aud__f"><span>Company</span><b>'+esc(m.company)+'</b></div>'+
            '<div class="aud__f"><span>Work email</span><b>'+esc(m.email||"—")+'</b></div>'+
            '<div class="aud__f"><span>When</span><b>'+fmtL(m.at)+'</b></div>'+
            '<div class="aud__f"><span>Length</span><b>'+m.mins+' minutes</b></div>'+
            '<div class="aud__f"><span>Owner</span><b>'+esc(m.owner)+'</b></div>'+
          '</div>'+
          '<div class="aud__note"><span>Topic</span><p>'+esc(m.topic)+'</p></div>'+
          '<div class="aud__acts">'+
            '<button class="aud__b'+(m.status==='upcoming'?' on':'')+'" type="button" data-mt-st="upcoming" data-id="'+esc(m.id)+'">Scheduled</button>'+
            '<button class="aud__b'+(m.status==='done'?' on':'')+'" type="button" data-mt-st="done" data-id="'+esc(m.id)+'">Completed</button>'+
            '<button class="aud__b'+(m.status==='noshow'?' on':'')+'" type="button" data-mt-st="noshow" data-id="'+esc(m.id)+'">No-show</button>'+
            (m.email?'<a class="aud__b" href="mailto:'+esc(m.email)+'?subject='+encodeURIComponent('Our meeting — '+m.topic)+'">Email attendee</a>':'')+
            '<button class="aud__b aud__b--del" type="button" data-mt-del="'+esc(m.id)+'">Cancel</button>'+
          '</div>'+
        '</div>'+
      '</div>';
    }).join('');
  }

  document.addEventListener('click',function(e){
    var t=e.target, el;
    if(!t||!t.closest) return;
    if((el=t.closest('[data-mt-tog]'))){
      var id=el.getAttribute('data-mt-tog');
      mtOpen=(mtOpen===id)?null:id; renderMeets(); return;
    }
    if((el=t.closest('[data-mt-st]'))){
      var m=mtFind(el.getAttribute('data-id'));
      if(m){ m.status=el.getAttribute('data-mt-st'); save(); renderMeets(); }
      return;
    }
    if((el=t.closest('[data-mt-del]'))){
      var did=el.getAttribute('data-mt-del');
      DB.meets=DB.meets.filter(function(x){return x.id!==did});
      if(mtOpen===did) mtOpen=null;
      save(); renderMeets(); return;
    }
  });

  (function(){
    var f=$('#mtFilter'), q=$('#mtSearch');
    if(f) f.addEventListener('change',function(){ mtFilter=f.value; renderMeets(); });
    if(q) q.addEventListener('input',function(){ mtQuery=q.value.trim(); renderMeets(); });
  })();

  (function(){
    var sw=$('#audMailSw'), to=$('#audMailTo');
    if(sw) sw.addEventListener('click',function(){
      var m=audMail();
      m.on=!m.on;
      if(m.on && !m.to && to){ setTimeout(function(){ to.focus(); },60); }
      save(); audMailSync();
      try{ toast(m.on?(m.to?'Notifications on — sending to '+m.to:'Notifications on — add an address'):'Notifications off'); }catch(e){}
    });
    if(to) to.addEventListener('input',function(){ audMail().to=to.value.trim(); save(); });
  })();

  (function(){
    var f=$('#audFilter'), q=$('#audSearch');
    if(f) f.addEventListener('change',function(){ audFilter=f.value; renderAudits(); });
    if(q) q.addEventListener('input',function(){ audQuery=q.value.trim(); renderAudits(); });
  })();

  /* ---------------- proposal email: preview + editor ---------------- */
  (function(){
    var wrap=$('#aemWrap'); if(!wrap) return;
    var sub=$('#aemSub'), body=$('#aemBody'), toks=$('#aemToks'),
        pvTo=$('#aemTo'), pvSub=$('#aemSubPv'), pvBody=$('#aemBodyPv'),
        forEl=$('#aemFor'), msg=$('#aemMsg');
    var target=AEM_SAMPLE, dirty=false;

    var TOKENS=['name','company','email','wants','ref','received','notes'];
    TOKENS.forEach(function(t){
      var b=document.createElement('button');
      b.className='aem__tok'; b.type='button'; b.textContent='{{'+t+'}}';
      b.addEventListener('click',function(){ insert('{{'+t+'}}'); });
      toks.appendChild(b);
    });
    function insert(tag){
      var el=(document.activeElement===sub)?sub:body;
      var a=el.selectionStart||el.value.length, b2=el.selectionEnd||a;
      el.value=el.value.slice(0,a)+tag+el.value.slice(b2);
      el.focus(); el.selectionStart=el.selectionEnd=a+tag.length;
      mark(); preview();
    }
    function mark(){ dirty=true; if(msg) msg.textContent='Unsaved changes.'; }

    function preview(){
      var m=audTpl();
      if(pvTo)   pvTo.textContent=m.to||'(no address set yet)';
      if(pvSub)  pvSub.textContent=audFill(sub.value,target);
      if(pvBody) pvBody.textContent=audFill(body.value,target);
    }

    function open(a){
      var m=audTpl();
      target=a||AEM_SAMPLE;
      sub.value=m.sub; body.value=m.body;
      dirty=false;
      if(msg) msg.textContent='Edits are saved to this workspace.';
      if(forEl) forEl.textContent=a
        ? 'Showing the email for '+a.name+' · '+a.company
        : 'Preview of what goes out when a request arrives';
      preview();
      wrap.classList.add('on'); wrap.setAttribute('aria-hidden','false');
    }
    function close(){ wrap.classList.remove('on'); wrap.setAttribute('aria-hidden','true'); }
    window.audEmailOpen=open;

    [sub,body].forEach(function(el){
      el.addEventListener('input',function(){ mark(); preview(); });
    });

    $$('[data-aem-close]',wrap).forEach(function(b){ b.addEventListener('click',close); });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&wrap.classList.contains('on')) close();
    });

    var sv=$('#aemSave'), rs=$('#aemReset'), op=$('#aemOpen'), pv=$('#audMailPv');
    if(sv) sv.addEventListener('click',function(){
      var m=audTpl();
      m.sub=sub.value.trim()||AEM_SUB;
      m.body=body.value;
      save(); dirty=false;
      if(msg) msg.textContent='Template saved.';
      try{ toast('Notification template saved'); }catch(e){}
      renderAudits();
    });
    if(rs) rs.addEventListener('click',function(){
      sub.value=AEM_SUB; body.value=AEM_BODY; mark(); preview();
      if(msg) msg.textContent='Reset — save to keep it.';
    });
    if(op) op.addEventListener('click',function(){
      var m=audTpl();
      if(!m.to){ if(msg) msg.textContent='Add a notification address first.'; return; }
      window.location.href='mailto:'+encodeURIComponent(m.to)+
        '?subject='+encodeURIComponent(audFill(sub.value,target))+
        '&body='+encodeURIComponent(audFill(body.value,target));
    });
    if(pv) pv.addEventListener('click',function(){ open(null); });

    document.addEventListener('click',function(e){
      var b=e.target.closest&&e.target.closest('[data-aud-pv]');
      if(b) open(audFind(b.getAttribute('data-aud-pv')));
    });
  })();

  seedAudits();
  seedMeets();
  seedChats();
  seedEvents();

  /* ---------- toast ---------- */
  function toast(m){ var t=$('#crToast'); $('#crToastT').textContent=m; t.classList.add('on');
    clearTimeout(toast._t); toast._t=setTimeout(function(){t.classList.remove('on');},2500); }

  /* ---------- open / close ---------- */
  function openCareers(tab){ cw.classList.add('open'); cw.setAttribute('aria-hidden','false');
    aw.classList.remove('open'); document.body.style.overflow='hidden'; renderAll(); goC(tab||'roles'); cw.scrollTop=0; }
  function closeCareers(){ cw.classList.remove('open'); cw.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  function openAdmin(authed){
    if(authed) $('#ad').classList.add('in');
    aw.classList.add('open'); aw.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    renderAdmin(); if(authed) goA('overview'); aw.scrollTop=0; }
  function closeAdmin(){ aw.classList.remove('open'); aw.setAttribute('aria-hidden','true'); if(!cw.classList.contains('open')) document.body.style.overflow=''; }
  window.openCareers=openCareers; window.closeCareers=closeCareers;
  window.openAdminPortal=openAdmin; window.closeAdminPortal=closeAdmin;

  /* ---------- careers views ---------- */
  var cview='roles';
  function goC(v){ cview=v;
    $$('.crv',cw).forEach(function(x){ x.classList.toggle('on',x.getAttribute('data-crv')===v); });
    $$('.kx__seg button',cw).forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-cr-tab')===v); });
    var bar=$('#crApBar'); if(bar) bar.style.display=(v==='apply'&&$('#crApForm').style.display!=='none')?'':'none';
    cw.scrollTop=0;
  }

  var query='';
  function openJobs(){ return DB.jobs.filter(function(j){return j.status==='open'}); }
  function jobById(id){ for(var i=0;i<DB.jobs.length;i++) if(DB.jobs[i].id===id) return DB.jobs[i]; return null; }
  function appsFor(id){ var n=0,k; for(k in DB.apps) if(DB.apps[k].jobId===id) n++; return n; }

  function renderList(){
    var jobs=openJobs().filter(function(j){
      if(!query) return true;
      return (j.title+' '+j.loc+' '+j.type+' '+j.level+' '+j.summary+' '+(j.wants||[]).join(' ')).toLowerCase().indexOf(query)>-1;
    });
    $('#crShowing').textContent = jobs.length===1?'1 position':jobs.length+' positions';
    if(!jobs.length){
      $('#crList').innerHTML='<div class="kx__empty">Nothing matches that search. Clear it to see every open position.</div>';
      return;
    }
    $('#crList').innerHTML='<div class="kg__rows">'+jobs.map(function(j){
      return '<button class="kr" type="button" data-cr-job="'+j.id+'">'+
        '<span><span class="kr__t"><b>'+esc(j.title)+'</b></span><span class="kr__sum">'+esc(j.summary)+'</span>'+
        '<span class="kr__m"><span>'+esc(locOf(j))+'</span><span>'+esc(j.type)+'</span>'+
          '<span>'+esc(j.setup||'Remote')+'</span>'+
          (j.retainer&&j.commission?'<span class="kr__pay2">Retainer + commission</span>':
           j.commission?'<span class="kr__pay2">Commission only</span>':
           j.retainer?'<span class="kr__pay2">Base retainer</span>':'')+'</span></span>'+
        '<span class="kr__r"><span class="kr__pay">'+esc(j.pay||'Discussed at first call')+'</span>'+
        '<span class="kr__go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span></button>';
    }).join('')+'</div>';
  }

  var job=null;
  function openJob(id){
    job=jobById(id); if(!job) return;
    $('#crJob').innerHTML=
      '<section class="kx kx--slim kx__job">'+
        '<button class="cr__crumb" type="button" data-cr-tab="roles"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6"/></svg> All open roles</button>'+
        '<div class="kx__jh"><h1>'+esc(job.title)+'</h1>'+
          '<p class="kx__lead">'+esc(job.summary)+'</p>'+
          (job.retainer||job.commission
            ? '<div class="kx__comp">'+
                (job.retainer?'<span class="kx__ct on"><i>'+TICK+'</i>Base retainer</span>':'<span class="kx__ct">Base retainer</span>')+
                (job.commission?'<span class="kx__ct on"><i>'+TICK+'</i>Commission</span>':'<span class="kx__ct">Commission</span>')+
              '</div>' : '')+
          '<div class="kx__facts">'+
            '<div class="kx__fact"><u>Compensation</u><b>'+esc(job.pay||'At first call')+'</b></div>'+
            '<div class="kx__fact"><u>Employment type</u><b>'+esc(job.type)+'</b></div>'+
            '<div class="kx__fact"><u>Location</u><b>'+esc(locOf(job))+'</b></div>'+
            '<div class="kx__fact"><u>Job setup</u><b>'+esc(job.setup||'Remote')+'</b></div>'+
          '</div>'+
        '</div>'+
        (job.does&&job.does.length?'<div class="kx__blk"><h3><u>01</u>What the job involves</h3><ul class="kx__ul">'+
          job.does.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>':'')+
        (job.wants&&job.wants.length?'<div class="kx__blk"><h3><u>02</u>What we need from you</h3><ul class="kx__ul">'+
          job.wants.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></div>':'')+
        '<div class="kx__blk"><h3><u>03</u>How hiring works</h3><div class="kx__proc">'+
          '<div class="kx__ps"><u>1</u><b>Application</b><span>You apply here. Every application is read by a person.</span></div>'+
          '<div class="kx__ps"><u>2</u><b>Shortlisted</b><span>We go through your background in detail and come back to you.</span></div>'+
          '<div class="kx__ps"><u>3</u><b>Invited for interview</b><span>A conversation about your experience and the role.</span></div>'+
          '<div class="kx__ps"><u>4</u><b>Offer</b><span>Terms and a start date agreed with you.</span></div>'+
        '</div></div>'+
      '</section>'+
      '<div class="kx__sticky"><div class="kx kx--slim kx__stickyin">'+
        '<div><b>'+esc(job.title)+'</b><span>'+esc(job.loc)+' · '+esc(job.type)+'</span></div>'+
        '<button class="btn btn--primary btn--lg" type="button" id="crApplyBtn">Apply for this role</button>'+
      '</div></div>';
    goC('job');
  }

  /* ---------- apply ---------- */
  var form={};
  function openApply(){
    if(!job) return;
    form={};
    $('#crApForm').style.display=''; $('#crApDone').style.display='none';
    $('#crApTitle').textContent='Apply · '+job.title;
    ['apName','apEmail','apPhone','apLoc','apLinkedin','apSite','apPitch','apNotes','apComp'].forEach(function(i){ var e=$('#'+i); if(e){e.value='';e.classList.remove('bad');} });
    $$('#apYears .cr__opt').forEach(function(o){o.classList.remove('on')});
    $('#apConsent').checked=false; $('#apErr').classList.remove('on');
    clearPhoto();
    $('#apDrop').classList.remove('has','bad'); $('#apDropT').textContent='Drop your CV here or click to browse';
    $('#apDropS').textContent='PDF, DOC or DOCX · up to 10 MB'; $('#apCount').textContent='0 characters · 100 minimum';
    $('#crApSide').innerHTML='<div class="kx__rolestrip"><div><b>'+esc(job.title)+'</b>'+
      '<span>'+esc(locOf(job))+' · '+esc(job.type)+' · '+esc(job.setup||'Remote')+'</span></div>'+
      '<u>'+esc(job.pay||'')+'</u></div>';
    resetRec();
    /* commission-only roles have no salary to negotiate — don't ask */
    var commOnly = !!job.commission && !job.retainer;
    $('#apCompField').style.display = commOnly ? 'none' : '';
    $('#apPayRow').style.gridTemplateColumns = commOnly ? '1fr' : '';
    $('#apVoiceCard').style.display = job.voice ? '' : 'none';
    $('#apNum3').textContent = job.voice ? '04' : '03';
    goC('apply');
  }
  function v(id){ var e=$('#'+id); return e?String(e.value||'').trim():''; }
  function pick(id){ var e=$('#'+id+' .cr__opt.on'); return e?e.getAttribute('data-val'):''; }
  function mark(id,ok){ var e=$('#'+id); if(e) e.classList.toggle('bad',!ok); return ok; }
  function newId(){ var a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',s=function(n){var o='';for(var i=0;i<n;i++)o+=a.charAt(Math.floor(Math.random()*a.length));return o;};
    return 'INC-'+s(4)+'-'+Math.floor(1000+Math.random()*8999); }

  function submitApp(){
    if(!job) return;
    var em=v('apEmail'), ok=true;
    ok=mark('apName',!!v('apName'))&&ok;
    ok=mark('apEmail',em.indexOf('@')>0&&em.indexOf('.')>2)&&ok;
    ok=mark('apPhone',!!v('apPhone'))&&ok;
    ok=mark('apLoc',!!v('apLoc'))&&ok;
    ok=mark('apPitch',v('apPitch').length>=100)&&ok;
    if(!form.file){ $('#apDrop').classList.add('bad'); ok=false; } else $('#apDrop').classList.remove('bad');
    if(!form.photo){ $('#apPhotoBox').classList.add('bad'); ok=false; } else $('#apPhotoBox').classList.remove('bad');
    if(!pick('apYears')) ok=false;
    if(!$('#apConsent').checked) ok=false;
    /* voice intro is mandatory on any role the recruiter flagged with job.voice —
       there is no skip path. Roles without the flag never see this card at all. */
    if(job.voice && !rec.data){
      $('#apVoiceErr').textContent = recOK()
        ? 'A voice introduction is required for this role — record one above before submitting.'
        : 'This role requires a voice introduction, and this browser cannot record. Open the page in Chrome, Edge or Safari and allow microphone access.';
      $('#apRec').classList.add('bad'); $('#apVoiceErr').classList.add('on'); ok=false;
    } else { $('#apRec').classList.remove('bad'); $('#apVoiceErr').classList.remove('on'); }
    $('#apErr').classList.toggle('on',!ok);
    if(!ok){ var f=$('.bad',cw); if(f&&f.scrollIntoView) f.scrollIntoView({block:'center',behavior:'smooth'}); return; }

    var btn=$('#apSubmit'); btn.disabled=true; btn.textContent='Submitting…';
    setTimeout(function(){
      var id=newId(), now=Date.now();
      var prior=0, ek=em.toLowerCase();
      for(var pk in DB.apps){ if(String(DB.apps[pk].email).toLowerCase()===ek) prior++; }
      DB.apps[id]={id:id,attempt:prior+1,name:v('apName'),email:em,phone:v('apPhone'),jobId:job.id,jobTitle:job.title,loc:v('apLoc'),
        applied:now,stage:0,rejected:false,mine:true,years:pick('apYears'),start:v('apStart'),
        comp:(job.commission&&!job.retainer)?'':v('apComp'),
        file:form.file,photo:form.photo,linkedin:v('apLinkedin'),site:v('apSite'),
        pitch:v('apPitch'),notes:v('apNotes'),
        voice:rec.data?{dur:rec.secs,data:rec.data,type:rec.type}:null,
        next:{title:'Under review · answer within '+(DB.settings.reply||'3 days'),
              note:'Your application for '+job.title+' has been logged. A person reviews every application and you will get a written answer either way.'},
        events:[{t:now,b:'Application received',p:'Submitted via the careers page.'}],msgs:[]};
      if(DB.notify[0]!==false){
        DB.apps[id].events.push({t:now,b:'Email sent to candidate',
          p:'“'+NOTIFY[0].s+'” sent to '+em+' · Track your status: '+trackLink(DB.apps[id])});
      }
      save();
      $('#crDoneId').textContent=id;
      $('#crDoneSub').textContent='Your application for '+job.title+' is with the hiring team.';
      $('#crApForm').style.display='none'; $('#crApDone').style.display='';
      $('#crApBar').style.display='none';
      lastId=id; cw.scrollTop=0;
      btn.disabled=false; btn.textContent='Submit application';
      renderMine(); renderAdmin();
    },850);
  }

  /* ---------- profile photo ---------- */
  function clearPhoto(){
    form.photo=null;
    var box=$('#apPhotoBox'); if(!box) return;
    box.classList.remove('has','bad');
    var pv=$('#apPhotoPv'); pv.classList.remove('filled'); pv.style.backgroundImage='';
    $('#apPhotoT').textContent='Upload a profile photo';
    $('#apPhotoS').textContent='JPG or PNG · a clear head-and-shoulders shot';
    $('#apPhotoClear').style.display='none';
    var f=$('#apPhoto'); if(f) f.value='';
  }
  function readPhoto(file){
    if(!file||!/^image\//.test(file.type)){ toast('Please choose an image file'); return; }
    var fr=new FileReader();
    fr.onload=function(){
      var img=new Image();
      img.onload=function(){
        var S=320, c=document.createElement('canvas'); c.width=c.height=S;
        var ctx=c.getContext('2d'), side=Math.min(img.width,img.height);
        ctx.drawImage(img,(img.width-side)/2,(img.height-side)/2,side,side,0,0,S,S);
        var data; try{ data=c.toDataURL('image/jpeg',0.82); }catch(e){ data=fr.result; }
        form.photo=data;
        var box=$('#apPhotoBox'); box.classList.add('has'); box.classList.remove('bad');
        var pv=$('#apPhotoPv'); pv.classList.add('filled'); pv.style.backgroundImage='url('+data+')';
        $('#apPhotoT').textContent='Photo added';
        $('#apPhotoS').textContent=file.name+' · click to replace';
        $('#apPhotoClear').style.display='';
      };
      img.onerror=function(){ toast('That image could not be read'); };
      img.src=fr.result;
    };
    fr.readAsDataURL(file);
  }

  /* ---------- voice recorder ---------- */
  var rec={mr:null,stream:null,chunks:[],secs:0,timer:null,data:null,type:'',url:null,ok:null};
  function recOK(){
    if(rec.ok===null) rec.ok = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    return rec.ok;
  }
  function mmss(n){ return Math.floor(n/60)+':'+String(n%60).padStart(2,'0'); }
  function resetRec(){
    stopRec(true);
    if(rec.url){ try{URL.revokeObjectURL(rec.url);}catch(e){} }
    rec={mr:null,stream:null,chunks:[],secs:0,timer:null,data:null,type:'',url:null,ok:rec.ok};
    var box=$('#apRec'); if(!box) return;
    box.classList.remove('live','bad');
    var vReq = !!(job && job.voice);
    $('#apRecT').textContent = recOK()?'Tap to start recording'
      :(vReq?'Recording is not available in this browser':'Recording not supported here');
    $('#apRecS').textContent = recOK()?'Take as long as you need — one take is fine'
      :(vReq?'This role requires a recording — try Chrome, Edge or Safari with microphone access'
            :'Your browser blocks microphone access');
    $('#apRecTime').textContent='0:00';
    $('#apRecPlay').classList.remove('on');
    $('#apVoiceErr').classList.remove('on');
    $('#apMic').disabled=!recOK();
    var w=$('#apWave'); if(w&&!w.children.length){ var h=''; for(var i=0;i<22;i++) h+='<i style="animation-delay:'+(i*.06)+'s"></i>'; w.innerHTML=h; }
  }
  function startRec(){
    if(!recOK()) return;
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      rec.stream=stream; rec.chunks=[]; rec.secs=0;
      var mr; try{ mr=new MediaRecorder(stream); }catch(e){ mr=new MediaRecorder(stream,{mimeType:'audio/webm'}); }
      rec.mr=mr;
      mr.ondataavailable=function(e){ if(e.data&&e.data.size) rec.chunks.push(e.data); };
      mr.onstop=function(){
        var blob=new Blob(rec.chunks,{type:rec.chunks[0]?rec.chunks[0].type:'audio/webm'});
        rec.type=blob.type;
        if(rec.url){ try{URL.revokeObjectURL(rec.url);}catch(e){} }
        rec.url=URL.createObjectURL(blob);
        $('#apAudio').src=rec.url;
        $('#apRecPlay').classList.add('on');
        $('#apRecT').textContent='Recording saved · '+mmss(rec.secs);
        $('#apRecS').textContent='Listen back, or record it again if you want another go.';
        $('#apRec').classList.remove('bad'); $('#apVoiceErr').classList.remove('on');
        if(blob.size<4000000){
          var fr=new FileReader();
          fr.onload=function(){ rec.data=fr.result; };
          fr.readAsDataURL(blob);
        } else { rec.data='too-large'; }
        if(rec.stream){ rec.stream.getTracks().forEach(function(t){t.stop()}); rec.stream=null; }
      };
      mr.start();
      $('#apRec').classList.add('live');
      $('#apRecT').textContent='Recording…';
      $('#apRecS').textContent='Tap the mic again to stop';
      $('#apRecPlay').classList.remove('on');
      rec.timer=setInterval(function(){
        rec.secs++; $('#apRecTime').textContent=mmss(rec.secs);
      },1000);
    }).catch(function(){
      $('#apRecT').textContent='Microphone blocked';
      $('#apRecS').textContent='Allow microphone access in your browser, then try again.';
      toast('Microphone permission denied');
    });
  }
  function stopRec(silent){
    if(rec.timer){ clearInterval(rec.timer); rec.timer=null; }
    var box=$('#apRec'); if(box) box.classList.remove('live');
    if(rec.mr && rec.mr.state!=='inactive'){ try{ rec.mr.stop(); }catch(e){} }
    else if(rec.stream){ rec.stream.getTracks().forEach(function(t){t.stop()}); rec.stream=null; }
    if(silent && rec.mr) rec.mr=null;
  }
  function toggleRec(){
    if(rec.mr && rec.mr.state==='recording') stopRec();
    else startRec();
  }

  /* ---------- status ---------- */
  var lastId=null, shown=null;
  function findApp(k){
    if(!k) return null; var u=String(k).trim().toUpperCase();
    if(DB.apps[u]) return DB.apps[u];
    var e=String(k).trim().toLowerCase(), hits=[];
    for(var i in DB.apps) if(String(DB.apps[i].email).toLowerCase()===e) hits.push(DB.apps[i]);
    if(!hits.length) return null;
    hits.sort(function(x,y){ return y.applied-x.applied; });
    var live=hits.filter(function(x){ return !x.closed; });
    return live.length?live[0]:hits[0];
  }
  function renderMine(){
    var mine=[],k; for(k in DB.apps) if(DB.apps[k].mine) mine.push(DB.apps[k]);
    mine.sort(function(a,b){return b.applied-a.applied});
    var el=$('#crMine'); if(!el) return;
    el.innerHTML = mine.length ?
      '<div style="font-family:var(--mono);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--k-dim);margin:24px 0 2px">From this device</div>'+
      mine.map(function(a){
        return '<button class="cr__minerow" type="button" data-cr-look="'+a.id+'">'+
          '<span style="width:9px;height:9px;border-radius:3px;background:#4C7DFF"></span>'+
          '<span><b>'+esc(a.jobTitle)+'</b><span style="display:block;font-size:11.5px;color:var(--k-dim);margin-top:2px">'+
          (a.rejected?'Not moving forward':STAGES[a.stage].n)+' · applied '+fmt(a.applied)+'</span></span><u>'+a.id+'</u></button>';
      }).join('') : '';
  }
  function renderDemoHint(){
    var ids=[]; for(var k in DB.apps){ if(!DB.apps[k].mine) ids.push(k); if(ids.length>=3) break; }
    $('#crDemoHint').innerHTML = ids.length ? 'Sample IDs: '+ids.map(function(i){
      return '<b data-cr-look="'+i+'">'+i+'</b>'; }).join(' ') : '';
  }

  function evAt(a,stage){ var t=null; (a.events||[]).forEach(function(e){ if(e.stage===stage) t=e.t; }); return t; }

  var offerAsk=null, declineChoice=null;
  var DECLINE=['Accepted another offer','Compensation','Role is not the right fit','Timing or notice period',
    'Location or work setup','Personal reasons','Other'];
  function ordinal(n){
    var t=n%100; if(t>=11&&t<=13) return n+'th';
    return n+({1:'st',2:'nd',3:'rd'}[n%10]||'th');
  }
  function showApp(a){
    shown=a;
    if(a.closed){
      $('#crRes').innerHTML=
        '<div class="tk__closed"><div class="tk__cic"><svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2"/>'+
        '<path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div>'+
        '<h3>This tracking ID is closed</h3>'+
        '<p>You declined the offer for <b>'+esc(a.jobTitle)+'</b>'+
        (a.declineReason?' — '+esc(a.declineReason.toLowerCase()):'')+', so <b>'+a.id+'</b> is no longer active.</p>'+
        '<p class="tk__small">If you apply again you will get a new tracking ID for that application.</p>'+
        '<div class="tk__acts" style="justify-content:center"><button class="btn btn--primary" type="button" data-cr-tab="roles">See open roles</button></div>'+
        '</div>';
      $('#crRes').classList.add('on');
      return;
    }

    var d={c:avc(a.name)};
    var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
    var viewed=a.viewedAt||null;
    var shortAt=evAt(a,1);
    var isShort=!a.rejected&&a.stage>=1;
    var isHired=!a.rejected&&a.stage>=4;
    var hiredAt=a.hiredAt||evAt(a,4)||a.offerAt||null;

    var badge = a.rejected?'<span class="cr__badge bad">Not moving forward</span>'
      : isHired?'<span class="cr__badge good">Hired</span>'
      : isShort?'<span class="cr__badge good">Shortlisted</span>'
      : viewed?'<span class="cr__badge active">Under review</span>'
      : '<span class="cr__badge active">Received</span>';

    var EYE='<svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
    var CHK='<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
    var CLK='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
    var XX ='<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>';

    function step(state,icon,title,note,when){
      return '<div class="tk__step '+state+'"><span class="tk__ic">'+icon+'</span>'+
        '<div class="tk__b"><b>'+title+'</b><p>'+note+'</p>'+
        (when?'<small>'+fmtL(when)+'</small>':'')+'</div>'+
        '<span class="tk__tag">'+(state==='done'?'Done':state==='bad'?'Closed':'Waiting')+'</span></div>';
    }

    var one = viewed
      ? step('done',EYE,'Application viewed','Someone from the hiring team has opened and read your application.',viewed)
      : step('wait',CLK,'Application viewed','Your application is in the queue. This updates the moment someone opens it.',null);

    var two = a.rejected
      ? step('bad',XX,'Not moving forward','The team decided not to take this application further. You are welcome to apply for any other open role.',null)
      : isShort
        ? step('done',CHK,'Shortlisted','You have been shortlisted for this role. The hiring team will be in touch with next steps.',shortAt)
        : step('wait',CLK,'Shortlisted','If your application is shortlisted, it will show here.',null);

    var STAR='<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
    var DOC='<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6"/></svg>';
    var ivCard='';
    if(!a.rejected && !(a.iv && a.iv.at)){
      ivCard = a.stage>2
        ? step('done',CHK,'Interview','Your interview stage is complete.',null)
        : step('wait',CLK,'Interview','If you are invited to interview, the date, time and joining link will show here — and you can confirm whether you can attend.',null);
    }
    if(a.iv && a.iv.at && !a.rejected){
      var ivs=a.iv, when=ivWhen(a), past=(Date.now()>ivs.at);
      var joinBtn = ivs.link
        ? '<div class="tk__acts"><button class="tk__join" type="button" data-cr-join="'+a.id+'">'+
          '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 11l7-4v10l-7-4"/></svg>'+
          'Join the interview</button></div>'
        : '';
      ivCard='<div class="tk__step '+(past?'done':'now')+'">'+
        '<span class="tk__ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/>'+
        '<path d="M3 10h18M8 3v4M16 3v4"/></svg></span>'+
        '<div class="tk__b"><b>Interview</b>'+
        '<p>'+(past?'Your interview took place on '+esc(when)+'.'
                   :'Your interview is booked for '+esc(when)+'. We will send a reminder 30 minutes before it starts.')+'</p>'+
        (ivs.status==='rescheduled'?'<small>Rescheduled</small>':'')+
        (past?'':joinBtn)+'</div>'+
        '<span class="tk__tag">'+(past?'Done':'Booked')+'</span></div>';
    }

    var ost=offerState(a);
    var offerCard='';
    if(!ost && !a.rejected){
      offerCard = step('wait',CLK,'Offer letter','If we make you an offer, the letter will appear here for you to read, accept or decline.',null);
    }
    if(ost && !a.rejected){
      var lt=a.letter, done=(ost==='accepted'), gone=(ost==='declined');
      var file=lt?'<a class="tk__dl"'+(lt.data?' href="'+lt.data+'" download="'+esc(lt.name)+'"':'')+'>'+DOC+
        '<span>'+esc(lt.name)+'</span></a>':'';
      var acts;
      if(done||gone) acts='';
      else if(offerAsk==='accepted')
        acts='<div class="tk__ask"><b>Accept this offer?</b>'+
          '<p>You are confirming you want the role. The team will be told straight away and will contact you within 24 hours.</p>'+
          '<div class="tk__acts"><button class="btn btn--primary" type="button" data-cr-ok="'+a.id+':accepted">Yes, accept</button>'+
          '<button class="tk__no" type="button" data-cr-ask="">Cancel</button></div></div>';
      else if(offerAsk==='declined')
        acts='<div class="tk__ask"><b>Decline this offer?</b>'+
          '<p>This cannot be undone from here. If you change your mind you will need to contact the hiring team.</p>'+
          '<div class="tk__acts"><button class="tk__yes" type="button" data-cr-ok="'+a.id+':declined">Yes, decline</button>'+
          '<button class="tk__no" type="button" data-cr-ask="">Cancel</button></div></div>';
      else if(offerAsk==='reason')
        acts='<div class="tk__ask"><b>Before you go — why are you declining?</b>'+
          '<p>It only takes a moment and it helps us make better offers.</p>'+
          '<div class="tk__reasons">'+DECLINE.map(function(r){
            return '<button class="tk__r'+(declineChoice===r?' on':'')+'" type="button" data-cr-reason="'+esc(r)+'">'+
              esc(r)+'</button>'; }).join('')+'</div>'+
          '<textarea class="tk__note" id="crDeclineNote" placeholder="Anything else you would like to add (optional)"></textarea>'+
          '<div class="tk__acts"><button class="btn btn--primary" type="button" data-cr-declinesend="'+a.id+'">Send and close</button>'+
          '<button class="tk__no" type="button" data-cr-ask="">Cancel</button></div></div>';
      else
        acts='<div class="tk__acts">'+
            '<button class="btn btn--primary" type="button" data-cr-ask="accepted">Accept offer</button>'+
            '<button class="tk__no" type="button" data-cr-ask="declined">Decline</button>'+
          '</div>';
      offerCard='<div class="tk__step '+(done?'done':gone?'bad':'now')+'">'+
        '<span class="tk__ic">'+DOC+'</span><div class="tk__b"><b>Offer letter</b>'+
        '<p>'+(done?'You accepted this offer.'+(a.joinAt?' Your agreed start date is '+fmt(a.joinAt)+'.':'')+
                ' The team will be in touch about paperwork.'
              :gone?'You declined this offer. Thank you for letting us know.'
              :'We have sent you an offer for '+esc(a.jobTitle)+'.'+
                (a.joinAt?' The agreed start date is '+fmt(a.joinAt)+'.':'')+
                ' Read it through, then accept or decline below.')+'</p>'+
        file+
        '<small>Sent '+fmtL(a.offerSentAt||a.applied)+'</small>'+
        acts+'</div>'+
        '<span class="tk__tag">'+(done?'Accepted':gone?'Declined':'Action needed')+'</span></div>';
    }
    var three = isHired
      ? step('done',STAR,'Hired','Your offer has been accepted — welcome aboard. The team will be in touch about your start date and paperwork.',hiredAt)
      : (a.rejected ? '' :
         step('wait',CLK,'Hired','If an offer is made and you accept it, it will show here.',null));

    $('#crRes').innerHTML=
      '<div class="kx__rh"><span class="cr__rav'+(a.photo?' img':'')+'" style="'+
        (a.photo?'background-image:url(\''+a.photo+'\')':'background:'+d.c)+'">'+(a.photo?'':ini)+'</span>'+
        '<div><h3>'+esc(a.name)+'</h3><p>'+esc(a.jobTitle)+' · applied '+fmt(a.applied)+'</p>'+
        '<div style="margin-top:10px">'+badge+
          (a.attempt>1?' <span class="cr__badge again">Reapplied · '+ordinal(a.attempt)+' time</span>':'')+'</div></div>'+
        '<div class="kx__rid"><u>Tracking ID</u><b>'+a.id+'</b></div></div>'+
      (a.offerStatus==='accepted'
        ? '<div class="tk__banner ok"><span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>'+
          '<div><b>Thank you, '+esc(a.name.split(' ')[0])+'.</b>'+
          '<p>You accepted the offer for '+esc(a.jobTitle)+'. Our team will contact you within 24 hours with your '+
          'start date and paperwork. This page stays open, so you can check back any time.</p></div></div>'
        : a.offerStatus==='declined'
          ? '<div class="tk__banner out"><span><svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></span>'+
            '<div><b>Thanks for letting us know.</b>'+
            '<p>You declined the offer for '+esc(a.jobTitle)+
            (a.declineReason?' — '+esc(a.declineReason.toLowerCase()):'')+'. You are welcome to apply again for any '+
            'future role, and this page stays open for your records.</p></div></div>'
          : '')+
      '<div class="tk">'+one+two+
        (a.rejected
          ? '<div class="tk__step better"><span class="tk__ic">'+
              '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.4.7-4.7 4.2 1.3 6.1L12 16.7 6.4 19.6l1.3-6.1L3 9.3l6.4-.7L12 3z"/></svg>'+
            '</span><div class="tk__b"><b>Better next time</b>'+
            '<p>This application is closed, but it is not the end of the road. We keep every application on file for '+
            '12 months and would be glad to see you apply again — new roles open regularly.</p>'+
            '<div class="tk__acts"><button class="btn btn--primary" type="button" data-cr-tab="roles">See open roles</button></div>'+
            '</div><span class="tk__tag">Closed</span></div>'
          : ivCard+offerCard+three)+'</div>'+
      '<p class="tk__note">Updates land here as they happen. We will also email '+esc(a.email)+'.</p>';
    $('#crRes').classList.add('on');
  }

  function lookup(k){
    var a=findApp(k);
    if(!a){ $('#crLookErr').classList.add('on'); $('#crLookId').classList.add('bad'); $('#crRes').classList.remove('on'); return; }
    $('#crLookErr').classList.remove('on'); $('#crLookId').classList.remove('bad'); $('#crLookId').value=a.id;
    showApp(a);
  }

  function renderAll(){
    var st=DB.settings||{};
    if(st.head) $('#crHeadTitle').textContent=st.head;
    if(st.sub) $('#crHeadSub').textContent=st.sub;
    renderList(); renderMine(); renderDemoHint();
  }


  /* ==================== ADMIN ==================== */
  var atab='overview', editing=null, curApp=null;
  var A_TABS={overview:['Recruitment','Recruitment dashboard'],jobs:['Recruitment · Job posts','Job posts'],
              apps:['Recruitment · Applicants','Applicants'],short:['Recruitment · Shortlisted','Shortlisted'],intv:['Recruitment · Interview','Interview'],short:['Recruitment · Shortlisted','Shortlisted'],intv:['Recruitment · Interview','Interview'],offered:['Recruitment · Offered','Offer letters'],hired:['Recruitment · Hired','Hired'],notify:['Recruitment · Notifications','Notifications'],audits:['Website · Inbound','Proposal requests'],meets:['Website · Inbound','Meetings scheduled'],chat:['Website · Inbound','Live chat inbox'],team:['Organisation · Workspace','Workspace']};
  function goA(t){ atab=t;
    $$('.adv',aw).forEach(function(x){x.classList.toggle('on',x.getAttribute('data-adv')===t)});
    $$('.ad__nav',aw).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-ad-tab')===t)});
    var meta=A_TABS[t]||A_TABS.overview;
    $('#adCrumb').textContent=meta[0]; $('#adTitle').textContent=meta[1];
    if(t==='audits'){ renderAudits(); }
    else if(t==='meets'){ renderMeets(); }
    else if(t==='chat'){ renderChats(); }
    else if(t==='team'){ renderTeam(); }
    else if(t==='jobs'||t==='apps'||t==='short'||t==='intv'||t==='offered'||t==='hired'||t==='notify') $('#adGrpRec').classList.add('open');
    var sme=$('#adSuserBtn'); if(sme) sme.classList.toggle('on',t==='team');
    $('#adNew').style.display=(t==='jobs'||t==='overview')?'':'none';
  }

  function allApps(){ var o=[],k; for(k in DB.apps) o.push(DB.apps[k]); o.sort(function(a,b){return b.applied-a.applied}); return o; }

  function sendReminder(a,auto){
    if(!a) return false;
    a.remindedAt=Date.now();
    if(DB.notify[9]!==false){
      a.events.push({t:Date.now(),b:'Offer reminder sent',
        p:'“'+NOTIFY[9].s+'” sent to '+a.email+' · Track your status: '+trackLink(a)});
    } else if(!auto){
      a.events.push({t:Date.now(),b:'Offer reminder sent',p:'Reminder logged — the reminder email is switched off.'});
    }
    save();
    return true;
  }
  function runInterviewReminders(){
    allApps().forEach(function(a){
      if(a.rejected || !a.iv || !a.iv.at) return;
      if(a.iv.status!=='upcoming' && a.iv.status!=='rescheduled') return;
      if(a.iv.remindedFor===a.iv.at) return;          /* already sent for this booking */
      var mins=(a.iv.at-Date.now())/60000;
      if(mins>30 || mins<-5) return;                   /* only inside the half-hour window */
      a.iv.remindedFor=a.iv.at;
      if(DB.notify[10]!==false){
        a.events.push({t:Date.now(),b:'Interview reminder sent',
          p:'“'+NOTIFY[10].s+'” sent to '+a.email+
            (a.iv.link?' · Join: '+a.iv.link:'')+' · Track your status: '+trackLink(a)});
      }
      save();
    });
  }
  function runOfferReminders(){
    var changed=false;
    allApps().forEach(function(a){
      if(a.rejected || a.remindedAt) return;
      if(offerState(a)!=='pending' || !a.offerSentAt) return;
      if(Date.now()-a.offerSentAt < 24*3600000) return;
      sendReminder(a,true); changed=true;
    });
    return changed;
  }

  function renderAdmin(){
    runOfferReminders(); runInterviewReminders();
    if(!aw.classList.contains('open')&&!$('#ad').classList.contains('in')) { /* still refresh counts */ }
    var apps=allApps(), jobs=DB.jobs;
    $('#adNavJobs').textContent=jobs.length; $('#adNavApps').textContent=apps.length;
    renderAudits();
    renderMeets();
    renderChats();
    renderEvents();

    /* stats */
    var open=jobs.filter(function(j){return j.status==='open'}).length;
    var prog=apps.filter(function(a){return !a.rejected&&a.stage>0&&a.stage<3}).length;
    var offer=apps.filter(function(a){return !a.rejected&&a.stage===3}).length;
    var hired=apps.filter(function(a){return a.stage===4}).length;
    var week=apps.filter(function(a){return Date.now()-a.applied<7*86400000}).length;
    /* feed */
    var ev=[]; apps.forEach(function(a){ (a.events||[]).forEach(function(e){ ev.push({t:e.t,b:e.b,p:a.name+' · '+a.jobTitle}); }); });
    ev.sort(function(x,y){return y.t-x.t});
    $('#adFeed').innerHTML=ev.slice(0,7).map(function(e){
      return '<div class="ad__fr"><span class="ad__fdot"></span><div><b>'+esc(e.b)+'</b><p>'+esc(e.p)+' · '+fmtL(e.t)+'</p></div></div>';
    }).join('')||'<div class="ad__none">Nothing yet</div>';

    /* ---- tiles ---- */
    var tiles=[
      ['#2456E6','Open roles',open,jobs.length+' posts in total'],
      ['#6D5EF5','Applicants',apps.length,week+' in the last 7 days'],
      ['#C9821A','In process',prog,'shortlisted or interviewing'],
      ['#1FA971','Offers &amp; hires',offer+hired,offer+' out · '+hired+' accepted']
    ];
    if($('#rqTiles')) $('#rqTiles').innerHTML=tiles.map(function(t){
      return '<div class="rq__tile" style="--t:'+t[0]+'"><u>'+t[1]+'</u><b>'+t[2]+'</b><span>'+t[3]+'</span></div>';
    }).join('');

    /* ---- pipeline ---- */
    if($('#rqPipe')){
      var pc=['#8B96AF','#5B85FF','#6D5EF5','#C9821A','#1FA971'];
      var rej=apps.filter(function(a){return a.rejected}).length;
      $('#rqPipe').innerHTML=STAGES.map(function(st,i){
        var n=apps.filter(function(a){return !a.rejected&&a.stage===i}).length;
        return '<div class="rq__pn'+(n?' hot':'')+'" style="--pc:'+pc[i]+'" data-ad-stagego="'+i+'">'+
          '<div class="rq__pd">'+n+'</div><b>'+st.n+'</b><small>'+
          (n===1?'1 candidate':n+' candidates')+'</small></div>';
      }).join('')+
      '<div class="rq__pn rq__pn--rej'+(rej?' hot':'')+'" style="--pc:#E5484D" data-ad-stagego="rejected">'+
        '<div class="rq__pd">'+rej+'</div><b>Rejected</b><small>'+
        (rej===1?'1 candidate':rej+' candidates')+'</small></div>';
    }

    /* ---- upcoming interviews ---- */
    if($('#rqIvs')){
      var ivs=apps.filter(function(a){
        return !a.rejected && a.iv && a.iv.at && (a.iv.status==='upcoming'||a.iv.status==='rescheduled');
      }).sort(function(x,y){ return x.iv.at-y.iv.at; });
      $('#rqIvTotal').textContent=ivs.length?ivs.length+' scheduled':'none scheduled';
      var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      $('#rqIvs').innerHTML = ivs.length ? ivs.slice(0,5).map(function(a){
        var dt=new Date(a.iv.at);
        var hhmm=String(dt.getHours()).padStart(2,'0')+':'+String(dt.getMinutes()).padStart(2,'0');
        var day=Math.round((new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())-
                new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))/86400000);
        var rel=day===0?'today':day===1?'tomorrow':day<0?Math.abs(day)+' days ago':'in '+day+' days';
        return '<div class="rq__iv" data-ad-app="'+a.id+'">'+
          '<div class="rq__ivd"><u>'+MON[dt.getMonth()]+'</u><b>'+dt.getDate()+'</b></div>'+
          '<div class="rq__ivm"><b>'+esc(a.name)+'</b><small>'+esc(a.jobTitle)+' · '+rel+
            (a.iv.status==='rescheduled'?' · rescheduled':'')+'</small></div>'+
          '<span class="rq__ivt">'+hhmm+'</span>'+
          (a.iv.link?'<button class="iv__join" type="button" data-ad-ivjoin="'+a.id+'">'+
            '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 11l7-4v10l-7-4"/></svg>Join</button>':'')+
        '</div>';
      }).join('') : '<div class="rq__ivnone">No interviews scheduled. Book one from Shortlisted or Interview.</div>';
    }

    /* ---- offer letters ---- */
    if($('#rqOffers')){
      var offers=apps.filter(function(a){ return a.stage>=3 || a.offerStatus; });
      var acc=0,dec=0,non=0,pen=0;
      offers.forEach(function(a){ var st=offerState(a);
        if(st==='accepted') acc++; else if(st==='declined') dec++; else if(st==='noanswer') non++; else if(st==='pending') pen++; });
      var why={}, topWhy='', topN=0;
      offers.forEach(function(a){
        if(offerState(a)==='declined' && a.declineReason){
          why[a.declineReason]=(why[a.declineReason]||0)+1;
          if(why[a.declineReason]>topN){ topN=why[a.declineReason]; topWhy=a.declineReason; }
        }
      });
      $('#rqOfferTotal').textContent=offers.length+' sent';
      $('#rqOffers').innerHTML=
        '<div class="rq__of ok" data-ad-offergo="accepted"><u><i></i>Accepted</u><b>'+acc+'</b><span>signed and joined</span></div>'+
        '<div class="rq__of no" data-ad-offergo="declined"><u><i></i>Declined</u><b>'+dec+'</b><span>'+
          (topWhy?'mostly '+esc(topWhy.toLowerCase()):'turned the offer down')+'</span></div>'+
        '<div class="rq__of wait" data-ad-offergo="noanswer"><u><i></i>No answer</u><b>'+non+'</b><span>'+
          (pen?pen+' still within the window':'no reply after 7 days')+'</span></div>';
    }

    [renderJobRows,renderAppRows,renderShortRows,renderIntvRows,renderOfferRows,renderHiredRows,renderNotify]
      .forEach(function(fn){ try{ fn(); }catch(err){ if(window.console) console.error(err); } });
    var sel=$('#adAppJob'), cur=sel.value;
    sel.innerHTML='<option value="all">All roles</option>'+jobs.map(function(j){return '<option value="'+j.id+'">'+esc(j.title)+'</option>'}).join('');
    if(cur) sel.value=cur;
  }

  var fJobStatus='all', appSort='new';

  function renderJobRows(){
    var q=($('#adJobSearch').value||'').toLowerCase();
    var counts={all:DB.jobs.length,open:0,draft:0,closed:0};
    DB.jobs.forEach(function(j){ if(counts[j.status]!=null) counts[j.status]++; });
    $('#adJobSeg').innerHTML=[['all','All'],['open','Open'],['draft','Draft'],['closed','Closed']].map(function(t){
      return '<button class="ad__sg'+(fJobStatus===t[0]?' on':'')+'" type="button" data-ad-jstat="'+t[0]+'">'+
        t[1]+'<em>'+counts[t[0]]+'</em></button>';
    }).join('');

    var rows=DB.jobs.filter(function(j){
      if(fJobStatus!=='all'&&j.status!==fJobStatus) return false;
      if(q&&(j.title+' '+j.loc+' '+j.type+' '+j.summary).toLowerCase().indexOf(q)<0) return false;
      return true;
    });
    $('#adJobCount').textContent=rows.length+' shown';
    $('#adJobRows').innerHTML = rows.length ? rows.map(function(j){
      var mine=allApps().filter(function(a){return a.jobId===j.id}), n=mine.length;
      var stack=mine.slice(0,4).map(function(a){
        var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
        return '<span style="'+(a.photo?'background-image:url(\''+a.photo+'\')':'background:'+avc(a.name))+'">'+
          (a.photo?'':ini)+'</span>';
      }).join('');
      var comp = j.retainer&&j.commission?'Retainer + commission':j.commission?'Commission only':j.retainer?'Base retainer':'';
      return '<div class="jc '+j.status+'" data-ad-edit="'+j.id+'">'+
        '<div class="jc__top"><span class="ad__pill '+j.status+'">'+j.status+'</span>'+
          (j.voice?'<span class="ad__chip">Voice intro</span>':'')+
          '<span class="jc__act">'+
            '<button class="ad__ib" type="button" data-ad-edit="'+j.id+'" title="Edit"><svg viewBox="0 0 24 24"><path d="M4 20h4L20 8l-4-4L4 16v4z"/></svg></button>'+
            '<button class="ad__ib" type="button" data-ad-toggle="'+j.id+'" title="Open or close"><svg viewBox="0 0 24 24">'+
              (j.status==='open'?'<path d="M18 6L6 18M6 6l12 12"/>':'<path d="M20 6L9 17l-5-5"/>')+'</svg></button>'+
            '<button class="ad__ib danger" type="button" data-ad-del="'+j.id+'" title="Delete"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button>'+
          '</span></div>'+
        '<h4>'+esc(j.title)+'</h4>'+
        '<p class="jc__sum">'+esc(j.summary)+'</p>'+
        '<div class="jc__meta"><span class="ad__chip">'+esc(j.type)+'</span>'+
          '<span class="ad__chip">'+esc(j.setup||'Remote')+'</span>'+
          '<span class="ad__chip">'+esc(locOf(j))+'</span>'+
          (comp?'<span class="ad__chip">'+comp+'</span>':'')+'</div>'+
        '<div class="jc__foot">'+
          (n?'<span class="jc__stack">'+stack+'</span>':'')+
          '<span class="jc__n">'+(n?n+(n===1?' applicant':' applicants'):'No applicants yet')+'</span>'+
          (n?'<button class="jc__view" type="button" data-ad-jobapps="'+j.id+'">Review'+
            '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>':
            '<button class="jc__view" type="button" data-ad-edit="'+j.id+'">Edit post'+
            '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>')+
        '</div></div>';
    }).join('') : '<div class="jc__empty">No job posts match. Create one with “New job post”.</div>';
  }

  function renderAppRows(){
    var jf=$('#adAppJob').value, q=($('#adAppSearch').value||'').toLowerCase();
    var all=allApps();
    var rows=all.filter(function(a){
      if(jf!=='all'&&a.jobId!==jf) return false;
      if(q&&(a.name+' '+a.email+' '+a.id+' '+a.jobTitle).toLowerCase().indexOf(q)<0) return false;
      return true;
    });
    rows.sort(function(x,y){ return appSort==='old' ? x.applied-y.applied : y.applied-x.applied; });
    $('#adAppSort').textContent = appSort==='old' ? 'Oldest first' : 'Newest first';
    $('#adAppCount').textContent=rows.length+' of '+all.length;
    var head='<div class="rw__head"><span>Candidate</span><span>Role</span><span>Status</span>'+
      '<span>Applied</span><span></span></div>';
    $('#adAppRows').innerHTML = rows.length ? head+rows.map(apCard).join('')
      : head+'<div class="ac__empty">No applicants match this search.</div>';
  }

  var SC=['#8B96AF','#5B85FF','#6D5EF5','#C9821A','#1FA971'];
  var MIC='<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/></svg>';
  function apCard(a){
    var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
    var sc=a.rejected?'#E5484D':SC[a.stage];
    return '<div class="rw rw--ap'+(a.rejected?' out':'')+'" style="--sc:'+sc+'" data-ad-app="'+a.id+'">'+
      '<div class="rw__who"><span class="rw__av" style="'+
        (a.photo?'background-image:url(\''+a.photo+'\')':'background:'+avc(a.name))+'">'+(a.photo?'':ini)+'</span>'+
        '<div class="rw__id"><b>'+esc(a.name)+
          (a.voice&&a.voice.data?'<span class="rw__mic" title="Voice introduction">'+MIC+'</span>':'')+
          (a.attempt>1?'<span class="rw__again">'+ordinal(a.attempt)+' application</span>':'')+'</b>'+
          '<small>'+esc(a.email)+'</small></div></div>'+
      '<span class="rw__col">'+esc(a.jobTitle)+'</span>'+
      '<span class="rw__chip"><i></i>'+(a.rejected?'Rejected':STAGES[a.stage].n)+'</span>'+
      '<span class="rw__col mono">'+fmt(a.applied)+'</span>'+
      '<span class="rw__acts">'+
        (!a.rejected&&a.stage<4?'<button class="rw__ib" type="button" data-ad-adv="'+a.id+'" title="Advance a stage">'+
          '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>':'')+
        (!a.rejected?'<button class="rw__ib no" type="button" data-ad-rej="'+a.id+'" title="Reject">'+
          '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>':'')+
        '<button class="rw__ib" type="button" data-ad-app="'+a.id+'" title="Open record">'+
          '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button>'+
      '</span></div>';
  }

  function renderStageView(stage,ids,emptyMsg){
    var q=($('#'+ids.search).value||'').toLowerCase();
    var list=allApps().filter(function(a){ return !a.rejected && a.stage===stage; });
    $('#'+ids.nav).textContent=list.length;
    var rows=list.filter(function(a){
      return !q || (a.name+' '+a.email+' '+a.jobTitle+' '+a.id).toLowerCase().indexOf(q)>-1;
    });
    var c=$('#'+ids.count); if(c) c.textContent=rows.length+' shown';
    var box=$('#'+ids.rows); if(!box) return;
    var head='<div class="rw__head"><span>Candidate</span><span>Role</span><span>Stage</span>'+
      '<span>Since</span><span></span></div>';
    box.innerHTML = head + (rows.length ? rows.map(function(a){
      var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
      var moved=evAt(a,a.stage)||a.applied;
      return '<div class="rw rw--ap" style="--sc:'+SC[a.stage]+'" data-ad-app="'+a.id+'">'+
        '<div class="rw__who"><span class="rw__av" style="'+
          (a.photo?'background-image:url(\''+a.photo+'\')':'background:'+avc(a.name))+'">'+(a.photo?'':ini)+'</span>'+
          '<div class="rw__id"><b>'+esc(a.name)+
            (a.voice&&a.voice.data?'<span class="rw__mic" title="Voice introduction">'+MIC+'</span>':'')+
            (a.attempt>1?'<span class="rw__again">'+ordinal(a.attempt)+' application</span>':'')+'</b>'+
            '<small>'+esc(a.email)+'</small></div></div>'+
        '<span class="rw__col">'+esc(a.jobTitle)+'</span>'+
        '<span class="rw__chip"><i></i>'+STAGES[a.stage].n+'</span>'+
        '<span class="rw__col mono">'+since(moved)+'</span>'+
        '<span class="rw__acts">'+
          (stage===1?'<button class="iv__join'+(shOpen[a.id]?' off':'')+'" type="button" data-ad-sched="'+a.id+'">'+
            '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'+
            'Schedule</button>':
            '<button class="rw__ib" type="button" data-ad-adv="'+a.id+'" title="Advance a stage">'+
            '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>')+
          '<button class="rw__ib no" type="button" data-ad-rej="'+a.id+'" title="Reject">'+
            '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg></button>'+
          '<button class="rw__ib" type="button" data-ad-app="'+a.id+'" title="Open record">'+
            '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button>'+
        '</span></div>'+
        (stage===1&&shOpen[a.id]
          ? '<div class="rw__panel open"><div class="rw__plbl">Schedule the interview</div>'+
            '<p class="rw__hint">Pick a date and send the link. '+esc(a.name.split(' ')[0])+
            ' moves to Interview once this is saved.</p>'+ivForm(a,'Schedule &amp; move to Interview')+'</div>'
          : '');
    }).join('') : '<div class="ac__empty">'+emptyMsg+'</div>');
  }
  function renderShortRows(){
    renderStageView(1,{search:'adShortSearch',nav:'adNavShort',count:'adShortCount',rows:'adShortRows'},
      'Nobody is shortlisted right now.');
  }
  var IV_ST={none:{n:'To schedule',c:'#8B96AF'},upcoming:{n:'Upcoming',c:'#2456E6'},
    cancelled:{n:'Cancelled',c:'#E5484D'},confirmed:{n:'Confirmed',c:'#1FA971'},
    rescheduled:{n:'Rescheduled',c:'#6D5EF5'},missed:{n:'Missed',c:'#E5484D'},noshow:{n:'No show',c:'#C9821A'},
    done:{n:'Completed',c:'#1FA971'}};
  var fIv='all', ivOpen={}, shOpen={};
  function ivState(a){ return (a.iv&&a.iv.status)||'none'; }
  function ivWhen(a){
    if(!a.iv||!a.iv.at) return null;
    var d2=new Date(a.iv.at);
    return fmt(a.iv.at)+' · '+String(d2.getHours()).padStart(2,'0')+':'+String(d2.getMinutes()).padStart(2,'0');
  }

  function ivForm(a,label){
    var iv=a.iv||{}, dv='', tv='';
    if(iv.at){ var dd=new Date(iv.at);
      dv=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');
      tv=String(dd.getHours()).padStart(2,'0')+':'+String(dd.getMinutes()).padStart(2,'0'); }
    return '<div data-iv-form>'+
      '<div class="iv__f2">'+
        '<div class="iv__f"><label>Date</label><input type="date" data-f="date" value="'+dv+'"></div>'+
        '<div class="iv__f"><label>Time</label><input type="time" data-f="time" value="'+tv+'"></div>'+
      '</div>'+
      '<div class="iv__f"><label>Meeting link</label><input type="url" data-f="link" placeholder="https://meet…" value="'+
        esc(iv.link||'')+'"></div>'+
      '<div class="iv__acts"><button class="rw__btn yes" type="button" data-ad-ivsave="'+a.id+'">'+
        (label||(iv.at?'Reschedule':'Schedule interview'))+'</button>'+
      (a.stage>=2?'<button class="rw__btn no" type="button" data-ad-ivst="'+a.id+':missed">Missed</button>'+
        '<button class="rw__btn" type="button" data-ad-ivst="'+a.id+':noshow">No show</button>'+
        '<button class="rw__btn" type="button" data-ad-ivst="'+a.id+':done">Completed</button>':'')+
      '</div></div>';
  }

  function renderIntvRows(){
    var q=($('#adIntvSearch').value||'').toLowerCase();
    var list=allApps().filter(function(a){ return !a.rejected && a.stage===2 && a.iv && a.iv.at; });
    $('#adNavIntv').textContent=list.length;

    var counts={all:list.length,upcoming:0,rescheduled:0,missed:0,noshow:0,done:0};
    list.forEach(function(a){ var st=ivState(a); if(counts[st]!=null) counts[st]++; });
    var seg=$('#adIvSeg');
    if(seg) seg.innerHTML=[['all','All'],['upcoming','Upcoming'],['rescheduled','Rescheduled'],
      ['missed','Missed'],['noshow','No show'],['done','Completed']].map(function(t){
        return '<button class="ad__sg'+(fIv===t[0]?' on':'')+'" type="button" data-ad-ivseg="'+t[0]+'">'+
          t[1]+'<em>'+counts[t[0]]+'</em></button>'; }).join('');

    var rows=list.filter(function(a){
      if(fIv!=='all' && ivState(a)!==fIv) return false;
      return !q || (a.name+' '+a.email+' '+a.jobTitle+' '+a.id).toLowerCase().indexOf(q)>-1;
    });
    var c=$('#adIntvCount'); if(c) c.textContent=rows.length+' shown';
    var box=$('#adIntvRows'); if(!box) return;

    box.innerHTML = rows.length ? rows.map(function(a){
      var st=ivState(a), meta=IV_ST[st], iv=a.iv||{}, when=ivWhen(a);
      var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
      var canJoin=!!iv.link && (st==='upcoming'||st==='rescheduled');
      var dv='', tv='';
      if(iv.at){ var dd=new Date(iv.at);
        dv=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');
        tv=String(dd.getHours()).padStart(2,'0')+':'+String(dd.getMinutes()).padStart(2,'0'); }
      var open=!!ivOpen[a.id];
      return '<div class="rw rw--iv'+(open?' open':'')+'" style="--sc:'+meta.c+'" data-ad-iv="'+a.id+'">'+
        '<div class="rw__who"><span class="rw__av" style="'+
          (a.photo?'background-image:url(\''+a.photo+'\')':'background:'+avc(a.name))+'">'+(a.photo?'':ini)+'</span>'+
          '<div class="rw__id"><b>'+esc(a.name)+'</b><small>'+esc(a.jobTitle)+'</small></div></div>'+
        '<div class="iv__when">'+(when?'<b>'+when+'</b><small>interview</small>':'<b>—</b><small>not set</small>')+'</div>'+
        '<span class="iv__st" style="--ic:'+meta.c+'">'+meta.n+'</span>'+
        (canJoin
          ? '<button class="iv__join" type="button" data-ad-ivjoin="'+a.id+'">'+
              '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 11l7-4v10l-7-4"/></svg>Join</button>'
          : '<button class="iv__join off" type="button" data-ad-iv="'+a.id+'">'+
              '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'+
              (iv.at?'Details':'Schedule')+'</button>')+
        '<span class="rw__ib rw__caret"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span>'+
        '<button class="rw__ib" type="button" data-ad-app="'+a.id+'" title="Open record">'+
          '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button>'+
      '</div>'+
      '<div class="rw__panel'+(open?' open':'')+'"><div class="iv__pgrid">'+
        '<div><div class="rw__plbl">Schedule</div>'+ivForm(a)+'</div>'+
        '<div><div class="rw__plbl">Interview notes</div>'+
          '<div class="iv__f"><label>Remarks</label><textarea data-f="remarks" placeholder="Quick notes during the call…">'+
            esc(iv.remarks||'')+'</textarea></div>'+
          '<div class="iv__f"><label>Interview summary</label><textarea data-f="summary" placeholder="How it went, strengths, concerns, recommendation…">'+
            esc(iv.summary||'')+'</textarea></div>'+
          '<div class="iv__acts"><button class="rw__btn" type="button" data-ad-ivnotes="'+a.id+'">Save notes</button>'+
            '<button class="rw__btn" type="button" data-ad-app="'+a.id+'">Open record</button></div>'+
        '</div>'+
      '</div></div>';
    }).join('') : '<div class="ac__empty">'+(fIv==='all'
      ? 'No interviews booked. Schedule one from the Shortlisted section.'
      : 'Nobody matches this filter.')+'</div>';
  }

  var fOffer='all', hxOpen={}, pendingLetter=null, pendingStage=null;
  function renderOfferRows(){
    var all=allApps().filter(function(a){
      if(a.rejected) return false;
      return a.stage===3 || !!a.offerStatus || a.stage===4;   /* every offer that went out */
    });
    $('#adNavOffer').textContent=all.length;
    var counts={all:all.length,pending:0,accepted:0,noanswer:0,declined:0};
    all.forEach(function(a){ var st=offerState(a); if(counts[st]!=null) counts[st]++; });
    var seg=$('#adOfferSeg');
    if(seg) seg.innerHTML=[['all','All'],['pending','Awaiting reply'],['accepted','Accepted'],['declined','Declined'],
      ['noanswer','No answer']]
      .map(function(t){ return '<button class="ad__sg'+(fOffer===t[0]?' on':'')+'" type="button" data-ad-oseg="'+t[0]+'">'+
        t[1]+'<em>'+counts[t[0]]+'</em></button>'; }).join('');

    var rows=all.filter(function(a){ return fOffer==='all'||offerState(a)===fOffer; });
    var box=$('#adOfferRows'); if(!box) return;
    var COL={pending:'#C9821A',declined:'#E5484D',noanswer:'#8B96AF',accepted:'#1FA971'};
    var ofHead = '<div class="rw__head rw__head--of"><span>Candidate</span><span>Offer letter</span>'+
      '<span>Status</span><span>Response</span><span></span></div>';
    box.innerHTML = ofHead + (rows.length ? rows.map(function(a){
      var st=offerState(a), col=COL[st]||'#C9821A';
      var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
      var sent=a.offerSentAt||a.applied;
      var days=Math.max(0,Math.floor((Date.now()-sent)/86400000));
      return '<div class="rw rw--of rw--ofc" style="--sc:'+col+'" data-ad-app="'+a.id+'">'+
        '<div class="rw__who"><span class="rw__av" style="'+
          (a.photo?'background-image:url(\''+a.photo+'\')':'background:'+avc(a.name))+'">'+(a.photo?'':ini)+'</span>'+
        '<div class="rw__id"><b>'+esc(a.name)+
          (st==='declined'&&a.declineReason?'<span class="rw__why" title="'+esc(a.declineNote||'')+'">'+
            esc(a.declineReason)+'</span>':'')+'</b>'+
          '<small>'+esc(a.jobTitle)+' · sent '+fmt(sent)+' · '+
          (st==='declined'
            ? 'declined'+(a.offerAt?' '+fmt(a.offerAt):'')
            : st==='accepted'
              ? 'accepted'+(a.offerAt?' '+fmt(a.offerAt):'')
              : st==='noanswer'
                ? 'no answer after '+days+' days'
                : (days===0?'today':days+(days===1?' day':' days')+' waiting'))+
          (a.joinAt?' · starts '+fmt(a.joinAt):'')+
          (st==='declined'&&a.declineNote?' · “'+esc(a.declineNote)+'”':'')+'</small></div></div>'+
        (a.letter
          ? '<button class="rw__file" type="button" data-ad-letter="'+a.id+'" title="'+esc(a.letter.name)+'">'+
              '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'+
              '<span>'+esc(a.letter.name)+'</span></button>'
          : '<button class="rw__file none" type="button" data-ad-attach="'+a.id+'">'+
              '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span>Attach letter</span></button>')+
        '<span class="rw__state">'+OFFER_LBL[st]+'</span>'+
        '<span class="rw__ans '+st+'">'+
          (st==='accepted'?'Accepted'+(a.offerAt?' '+fmt(a.offerAt):'')
           :st==='declined'?'Declined'+(a.offerAt?' '+fmt(a.offerAt):'')
           :st==='noanswer'?'No answer'
           :'Waiting on the candidate')+'</span>'+
        '<span class="rw__acts">'+
          (st==='pending'||st==='noanswer'
            ? '<button class="rw__ib" type="button" data-ad-remind="'+a.id+'" title="'+
              (a.remindedAt?'Reminder sent '+fmt(a.remindedAt)+' — send again':'Send a reminder')+'">'+
              '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></button>'
            : '')+
          '<button class="rw__ib" type="button" data-ad-app="'+a.id+'" title="Open record">'+
            '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button>'+
        '</span></div>';
    }).join('') : '<div class="of__empty">'+(fOffer==='all'
      ? 'No offers are out right now. Move someone to Offer from Interview — you will be asked to attach the letter.'
      : 'No offer letters in this state.')+'</div>');
  }

  var ntOpen={};
  /* ==================== WORKSPACE (team · permissions · channels · settings) ==================== */
  var PERMS=[
    {k:'jobs', n:'Job posts',        d:'Create, edit and close roles'},
    {k:'apps', n:'Applicants',       d:'Open records and move stages'},
    {k:'intv', n:'Interviews',       d:'Schedule, reschedule, cancel'},
    {k:'offer',n:'Offers',           d:'Attach letters and send offers'},
    {k:'chan', n:'Email & calendar', d:'Connect and manage channels'},
    {k:'admin',n:'Workspace admin',  d:'Manage members and settings'}
  ];
  var ROLES={
    owner:      {n:'Owner',       p:['jobs','apps','intv','offer','chan','admin']},
    admin:      {n:'Admin',       p:['jobs','apps','intv','offer','chan','admin']},
    recruiter:  {n:'Recruiter',   p:['jobs','apps','intv','offer']},
    interviewer:{n:'Interviewer', p:['apps','intv']},
    viewer:     {n:'Viewer',      p:['apps']},
    custom:     {n:'Custom',      p:[]}
  };
  var wkTab='home';
  function permsOf(m){ return m.perms || (ROLES[m.role]||ROLES.viewer).p.slice(); }
  function wkInit(){
    if(!DB.team || !DB.team.length){
      DB.team=[
        {id:'tm-owner',name:'Samules A.',email:'samules@incomera.com',role:'owner',status:'active',at:ago(120)},
        {id:'tm-2',name:'Hina Farooq',email:'hina@incomera.com',role:'recruiter',status:'active',at:ago(46)},
        {id:'tm-3',name:'Omar Siddiqui',email:'omar@incomera.com',role:'interviewer',status:'active',at:ago(21)},
        {id:'tm-4',name:'Rachel Adeyemi',email:'rachel@incomera.com',role:'viewer',status:'invited',at:ago(2)}
      ];
    }
    if(!DB.channels){
      DB.channels={emails:[{id:'em-1',addr:'careers@incomera.com',use:'Candidate email',
        prov:'Gmail / Google Workspace',status:'connected',primary:true,at:ago(120)}],
        cal:{google:{acct:'samules@incomera.com',at:ago(120)},outlook:null},
        prefs:{window:'30 minutes',buffer:'15 minutes',hours:'09:00 – 18:00'}};
    }
    DB.settings=DB.settings||{};
    if(DB.settings.ws===undefined) DB.settings.ws='Incomera';
    if(DB.settings.requireJoin===undefined) DB.settings.requireJoin=true;
    if(DB.settings.requireLetter===undefined) DB.settings.requireLetter=true;
    if(DB.settings.pass===undefined) DB.settings.pass='admin123';
  }
  function wkGo(t){
    wkTab=t;
    if(t==='cal'){ try{ renderEvents(); }catch(e){} }
    $$('.wkv',aw).forEach(function(x){x.classList.toggle('on',x.getAttribute('data-wkv')===t)});
    $$('.wk__t',aw).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-wk')===t)});
    try{ aw.scrollTop=0; }catch(e){}
  }
  function wkStats(){
    wkInit();
    var t=DB.team||[], ch=DB.channels, st=DB.settings||{};
    var invited=t.filter(function(m){return m.status==='invited';}).length;
    var full=t.filter(function(m){return permsOf(m).length===PERMS.length;}).length;
    var cals=(ch.cal.google?1:0)+(ch.cal.outlook?1:0);
    var prim=ch.emails.filter(function(e){return e.primary;}).length;
    return {team:t.length, active:t.length-invited, invited:invited, full:full,
            mail:ch.emails.length, prim:prim, cal:cals, weak:(st.pass||'')==='admin123'};
  }
  function wkAttention(){
    var s=wkStats(), out=[];
    if(s.invited) out.push({c:'#C9821A', b:s.invited+' invite'+(s.invited===1?'':'s')+' still pending',
      d:'They cannot sign in until the invite link is used. Resend it from Team members.', go:'team'});
    if(!s.cal) out.push({c:'#E5484D', b:'No calendar connected',
      d:'Interview slots are being offered without checking anyone\u2019s real availability.', go:'cal'});
    if(!s.mail || !s.prim) out.push({c:'#E5484D', b:'No primary sending address',
      d:'Candidate emails have nowhere to send from. Connect an address and mark it primary.', go:'email'});
    if(s.weak) out.push({c:'#E5484D', b:'Admin portal is on the default password',
      d:'Anyone with the link can open this portal. Change it under Admin settings.', go:'set'});
    if(s.full>1) out.push({c:'#C9821A', b:s.full+' people hold full workspace access',
      d:'Full access includes members, settings and the admin password. Trim anyone who does not need it.', go:'perms'});
    return out;
  }
  function renderTeam(){
    if(!$('#wkTeamRows')) return;
    wkInit();
    var S=wkStats();

    /* role dropdown on the invite form */
    var sel=$('#wkRole');
    if(sel && !sel.options.length){
      sel.innerHTML=['recruiter','interviewer','viewer','admin'].map(function(r){
        return '<option value="'+r+'"'+(r==='recruiter'?' selected':'')+'>'+ROLES[r].n+'</option>'; }).join('');
    }

    /* ---- overview ---- */
    var att=wkAttention();
    var TILES=[
      {c:'#2456E6', u:'Team', v:S.team, s:S.active+' active · '+S.invited+' invited'},
      {c:'#6D5EF5', u:'Full access', v:S.full, s:'can manage members & settings'},
      {c:'#0FB5A6', u:'Sending addresses', v:S.mail, s:S.prim?'primary address set':'no primary address'},
      {c:(S.cal?'#1FA971':'#E5484D'), u:'Calendars', v:S.cal+' / 2', s:S.cal?'availability checked live':'slots offered blind'}
    ];
    $('#wkTiles').innerHTML=TILES.map(function(t){
      return '<div class="wk__tile" style="--tc:'+t.c+'"><u>'+t.u+'</u><b>'+t.v+'</b><small>'+t.s+'</small></div>';
    }).join('');

    $('#wkAtt').innerHTML = att.length ? att.map(function(a){
      return '<div class="wk__att" style="--ac:'+a.c+'"><i></i>'+
        '<div><b>'+esc(a.b)+'</b><small>'+a.d+'</small></div>'+
        '<button class="rw__btn" type="button" data-wk="'+a.go+'">Fix</button></div>';
    }).join('') : '<div class="wk__clear"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>'+
        '<b>Nothing open. Access, channels and rules are all set.</b></div>';

    /* ---- nav counters ---- */
    (function(){
      var map={wkNcHome:att.length, wkNcTeam:S.team, wkNcPerm:S.full, wkNcMail:S.mail, wkNcCal:S.cal,
               wkNcSet:(S.weak?1:0)};
      Object.keys(map).forEach(function(k){
        var n=$('#'+k); if(!n) return;
        n.textContent=map[k];
        if(k==='wkNcHome'||k==='wkNcSet') n.classList.toggle('warn', map[k]>0);
        if(k==='wkNcSet') n.style.display=map[k]?'':'none';
      });
      var wsn=$('#wkRailWs'); if(wsn) wsn.textContent=DB.settings.ws||'Incomera';
    })();

    /* ---- members ---- */
    $('#wkTeamRows').innerHTML=DB.team.map(function(m){
      var own=m.role==='owner';
      var ini=m.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
      return '<div class="wk__row">'+
        '<span class="wk__ra" style="background:'+avc(m.name)+'">'+ini+'</span>'+
        '<div class="wk__rm"><b>'+esc(m.name)+
          (own?'<span class="wk__tag you">You</span>':'')+
          '<span class="wk__tag '+(m.status==='active'?'act':'inv')+'">'+
            (m.status==='active'?'Active':'Invited')+'</span></b>'+
          '<small>'+esc(m.email)+' · '+(m.status==='active'?'joined ':'invited ')+since(m.at)+
          ' · '+permsOf(m).length+' of '+PERMS.length+' permissions</small></div>'+
        '<select class="wk__sel" data-wk-role="'+m.id+'"'+(own?' disabled':'')+'>'+
          ['owner','admin','recruiter','interviewer','viewer','custom'].map(function(r){
            if(r==='owner'&&!own) return '';
            if(r==='custom'&&m.role!=='custom') return '';
            return '<option value="'+r+'"'+(m.role===r?' selected':'')+'>'+ROLES[r].n+'</option>';
          }).join('')+'</select>'+
        (m.status==='invited'
          ? '<button class="rw__btn" type="button" data-wk-resend="'+m.id+'">Resend invite</button>' : '')+
        (own?'' : '<button class="wk__x" type="button" data-wk-del="'+m.id+'" title="Remove from workspace">'+
          '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>')+
      '</div>';
    }).join('');

    /* ---- permissions: one matrix, members down, permissions across ---- */
    var TICK='<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
    $('#wkPermRows').innerHTML=
      '<div class="wk__mx"><table><thead><tr><th>Member</th>'+
        PERMS.map(function(p){ return '<th title="'+esc(p.d)+'">'+p.n+'</th>'; }).join('')+
      '</tr></thead><tbody>'+
      DB.team.map(function(m){
        var have=permsOf(m), own=m.role==='owner';
        var ini=m.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
        return '<tr><td><div class="wk__mxm">'+
            '<span class="wk__ra" style="background:'+avc(m.name)+'">'+ini+'</span>'+
            '<div><b>'+esc(m.name)+'</b><small>'+(ROLES[m.role]||ROLES.custom).n+
              (own?' · locked':'')+'</small></div></div></td>'+
          PERMS.map(function(p){
            var on=have.indexOf(p.k)>-1;
            return '<td><button class="wk__cell'+(on?' on':'')+'" type="button" '+
              'title="'+esc(m.name+' · '+p.d)+'"'+
              (own?' disabled':' data-wk-perm="'+m.id+':'+p.k+'"')+'>'+TICK+'</button></td>';
          }).join('')+'</tr>';
      }).join('')+
      '</tbody></table></div>'+
      '<div class="wk__mxlg"><span><b>Tap any cell</b> to grant or revoke that one permission.</span>'+
        '<span>Change a permission and the role becomes <b>Custom</b>.</span>'+
        '<span>The <b>Owner</b> row cannot be edited.</span></div>';

    /* ---- email ---- */
    var em=DB.channels.emails;
    $('#wkMailRows').innerHTML = em.length ? em.map(function(e){
      return '<div class="wk__row">'+
        '<span class="wk__ra" style="background:linear-gradient(160deg,#3B6BF5,#2456E6)">'+
          '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:#fff;stroke-width:1.7">'+
          '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></span>'+
        '<div class="wk__rm"><b>'+esc(e.addr)+
          (e.primary?'<span class="wk__tag you">Primary</span>':'')+
          '<span class="wk__tag act">Connected</span></b>'+
          '<small>'+esc(e.use)+' · '+esc(e.prov)+' · added '+since(e.at)+'</small></div>'+
        (e.primary?'':'<button class="rw__btn" type="button" data-wk-prim="'+e.id+'">Make primary</button>')+
        '<button class="wk__x" type="button" data-wk-mdel="'+e.id+'" title="Disconnect">'+
          '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>'+
      '</div>';
    }).join('') : '<div class="ad__none">No addresses connected yet.</div>';

    /* ---- calendar ---- */
    var cal=DB.channels.cal;
    var CALS=[{k:'google',n:'Google Calendar',d:'Two-way sync with Google Workspace.'},
              {k:'outlook',n:'Outlook Calendar',d:'Two-way sync with Microsoft 365.'}];
    $('#wkCalCards').innerHTML=CALS.map(function(c){
      var on=!!cal[c.k];
      return '<div class="wk__cc'+(on?' on':'')+'">'+
        '<span class="wk__ci"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/>'+
          '<path d="M3 10h18M8 3v4M16 3v4"/>'+(on?'<path d="M9 15l2 2 4-4"/>':'')+'</svg></span>'+
        '<div class="wk__cb"><b>'+c.n+'</b>'+
          '<small>'+(on?'Connected as '+esc(cal[c.k].acct)+' · syncing since '+since(cal[c.k].at):c.d)+'</small>'+
          '<button class="'+(on?'rw__btn':'ad__ghost')+'" type="button" data-wk-cal="'+c.k+'">'+
            (on?'Disconnect':'Connect')+'</button></div></div>';
    }).join('');
    var pf=DB.channels.prefs;
    $('#wkCalPrefs').innerHTML='<b>Booking rules</b><span>Applied to every interview slot offered to a candidate.</span>'+
      '<div class="wk__fg">'+
        '<div><label>Default slot length</label><select class="wk__sel" style="width:100%" data-wk-pref="window">'+
          ['15 minutes','30 minutes','45 minutes','60 minutes'].map(function(o){
            return '<option'+(pf.window===o?' selected':'')+'>'+o+'</option>'; }).join('')+'</select></div>'+
        '<div><label>Buffer between interviews</label><select class="wk__sel" style="width:100%" data-wk-pref="buffer">'+
          ['None','10 minutes','15 minutes','30 minutes'].map(function(o){
            return '<option'+(pf.buffer===o?' selected':'')+'>'+o+'</option>'; }).join('')+'</select></div>'+
        '<div><label>Bookable hours</label><select class="wk__sel" style="width:100%" data-wk-pref="hours">'+
          ['08:00 – 16:00','09:00 – 18:00','10:00 – 19:00','Around the clock'].map(function(o){
            return '<option'+(pf.hours===o?' selected':'')+'>'+o+'</option>'; }).join('')+'</select></div>'+
      '</div>';

    /* ---- settings ---- */
    var st=DB.settings;
    $('#wkSetBody').innerHTML=
      '<div class="wk__set"><b>Workspace</b><span>How this workspace is named and how fast you promise to reply.</span>'+
        '<div class="wk__fg">'+
          '<div><label>Workspace name</label><input type="text" data-wk-set="ws" value="'+esc(st.ws||'')+'"></div>'+
          '<div><label>Careers page heading</label><input type="text" data-wk-set="head" value="'+esc(st.head||'')+'"></div>'+
          '<div><label>Reply promise</label><select class="wk__sel" style="width:100%" data-wk-set="reply">'+
            ['24 hours','2 days','3 days','5 days','1 week'].map(function(o){
              return '<option'+(st.reply===o?' selected':'')+'>'+o+'</option>'; }).join('')+'</select></div>'+
        '</div></div>'+
      '<div class="wk__set"><b>Hiring rules</b><span>Checks that run before a candidate can be moved forward.</span>'+
        '<div class="wk__sw"><div><b>Confirm the joining date before an offer</b>'+
          '<small>Nobody reaches the Offer stage until a start date is agreed and logged.</small></div>'+
          '<button class="nt__sw'+(st.requireJoin!==false?' on':'')+'" type="button" data-wk-set="requireJoin"></button></div>'+
        '<div class="wk__sw"><div><b>Require an offer letter</b>'+
          '<small>The letter has to be attached before the offer email goes out.</small></div>'+
          '<button class="nt__sw'+(st.requireLetter!==false?' on':'')+'" type="button" data-wk-set="requireLetter"></button></div>'+
      '</div>'+
      '<div class="wk__set"><b>Access</b><span>The password the admin portal asks for at sign-in.'+
        (S.weak?' <b style="color:#C9821A">This is still the default — change it.</b>':'')+'</span>'+
        '<div class="wk__fg"><div><label>Admin password</label>'+
          '<input type="text" data-wk-set="pass" value="'+esc(st.pass||'admin123')+'"></div></div></div>';

    $('#wkHeroSub').textContent=S.team+' member'+(S.team===1?'':'s')+' · '+S.mail+' address'+
      (S.mail===1?'':'es')+' · '+S.cal+' calendar'+(S.cal===1?'':'s');
  }

  /* ---- website alert settings (workspace › notifications) ---- */
  function webNotify(){
    DB.webNotify=DB.webNotify||{prop:true,meet:true,to:''};
    DB.senders=DB.senders||{};
    return DB.webNotify;
  }
  var WEBN=[
    {k:'prop',n:'New proposal request',c:'#2456E6',
     d:'Someone completes the proposal form on the website.',
     s:'New proposal request — {name} ({company})',
     to:'you@yourcompany.com',
     b:'A new proposal request was submitted on the website.\n\nName: Priya Raman\nCompany: Vaultline\nEmail: priya@vaultline.com\nWants: Meeting + Subscription Engine\n\nIn their own words:\nBoth ends honestly. Pipeline is thin and the customers we do win drift off after month four.\n\nOpen the admin panel to reply.'},
    {k:'meet',n:'New meeting booked',c:'#1FA971',
     d:'Someone picks a slot from the booking page.',
     s:'Meeting booked — {name}, {when}',
     to:'you@yourcompany.com',
     b:'A meeting was just booked from the website.\n\nWho: Tom Keane, Ironvale\nWhen: Thursday 11 Jun, 14:00 (Asia/Karachi)\nLength: 30 minutes\nLocation: Google Meet — link in the invite\n\nTopic: Acquisition — more booked meetings\n\nIt is already on the calendar and in Growth › Meetings scheduled.'}
  ];
  var ntwOpen={};

  /* ---- connected sending addresses ---- */
  function sendAddrs(){
    try{ wkInit(); }catch(e){}
    var list=((DB.channels&&DB.channels.emails)||[]).filter(function(m){ return m.status==='connected'; });
    return list;
  }
  function senderFor(key){
    DB.senders=DB.senders||{};
    var list=sendAddrs();
    if(!list.length) return '';
    if(!DB.senders[key] || !list.some(function(m){ return m.addr===DB.senders[key]; })){
      var pri=list.filter(function(m){ return m.primary; })[0]||list[0];
      DB.senders[key]=pri.addr;
    }
    return DB.senders[key];
  }
  function senderPicker(key){
    var list=sendAddrs();
    if(!list.length){
      return '<div class="nt__from"><label>Send from</label>'+
        '<span class="nt__nocon">No address connected yet — <b data-wk="email">connect one</b> to start sending.</span></div>';
    }
    var cur=senderFor(key);
    return '<div class="nt__from"><label>Send from</label>'+
      '<select class="nt__sel" data-nt-from="'+esc(key)+'">'+
        list.map(function(m){
          return '<option value="'+esc(m.addr)+'"'+(m.addr===cur?' selected':'')+'>'+
            esc(m.addr)+' — '+esc(m.prov)+(m.primary?' · primary':'')+'</option>';
        }).join('')+
      '</select><span class="nt__vfy"><i></i>Verified</span></div>';
  }

  function renderWebNotify(){
    var w=webNotify();
    var to=$('#ntWebTo');
    if(to && document.activeElement!==to) to.value=w.to||'';
    var c=$('#wkNcNotif');
    if(c) c.textContent=WEBN.filter(function(n){ return w[n.k]!==false; }).length;

    var box=$('#ntWebList'); if(!box) return;
    var addr=w.to||'you@yourcompany.com';
    box.innerHTML=WEBN.map(function(n,i){
      var on=w[n.k]!==false;
      var subj=n.s.replace('{name}','Priya Raman').replace('{company}','Vaultline')
                  .replace('{when}','Thu 14:00');
      return '<div class="nt" style="--nc:'+n.c+'">'+
        '<span class="nt__i" style="background:'+n.c+'1f;color:'+n.c+'"><b>'+(i+1)+'</b></span>'+
        '<div class="nt__m"><b>'+n.n+'</b><small>'+esc(n.d)+'</small>'+
          '<span class="nt__sub">Subject · '+esc(subj)+' · sent to you</span>'+
          '<button class="nt__pv" type="button" data-ad-ntwpv="'+n.k+'">'+
            (ntwOpen[n.k]?'Hide preview':'Preview email')+'</button>'+
          senderPicker('web:'+n.k)+'</div>'+
        '<button class="nt__sw'+(on?' on':'')+'" type="button" data-ad-webn="'+n.k+'" '+
          'aria-label="Toggle '+n.n+' alert"></button>'+
      '</div>'+
      (ntwOpen[n.k]
        ? '<div class="nt__mail"><div class="nt__mhead"><u>From</u><b>'+esc(senderFor('web:'+n.k)||'not connected')+'</b></div>'+
          '<div class="nt__mhead"><u>To</u><b>'+esc(addr)+'</b></div>'+
          '<div class="nt__mhead"><u>Subject</u><b>'+esc(subj)+'</b></div>'+
          '<div class="nt__mbody">'+
            n.b.split('\n\n').map(function(par){ return '<p>'+esc(par)+'</p>'; }).join('')+
            '<p>— Incomera notifications</p></div></div>'
        : '');
    }).join('');
  }

  document.addEventListener('change',function(e){
    var el=e.target;
    if(!el||!el.getAttribute) return;
    var key=el.getAttribute('data-nt-from');
    if(key){
      DB.senders=DB.senders||{};
      DB.senders[key]=el.value;
      save();
      try{ toast('Sending from '+el.value); }catch(x){}
      try{ renderNotify(); }catch(x){}
    }
  });

  document.addEventListener('click',function(e){
    var t=e.target, el;
    if(!t||!t.closest) return;
    if((el=t.closest('[data-ad-ntwpv]'))){
      var pk=el.getAttribute('data-ad-ntwpv');
      ntwOpen[pk]=!ntwOpen[pk]; renderWebNotify(); return;
    }
    if((el=t.closest('[data-ad-webn]'))){
      var wk=el.getAttribute('data-ad-webn'), w=webNotify();
      w[wk]=(w[wk]===false);
      save(); renderWebNotify(); return;
    }
  });
  document.addEventListener('input',function(e){
    if(e.target&&e.target.id==='ntWebTo'){ webNotify().to=e.target.value.trim(); save(); }
  });

  function renderNotify(){
    var box=$('#adNotify')||$('#adNotify2'); if(!box) return;
    var who=allApps()[0]||{id:'INC-XXXX-XXXX',name:'Alex Morgan',email:'you@email.com',jobTitle:'the role'};
    var lk=$('#ntLink'), sample=allApps()[0];
    if(lk) lk.textContent = sample ? trackLink(sample)
      : ((function(){ try{ return location.origin+location.pathname; }catch(e){ return ''; } })()+'#careers/status/INC-XXXX-XXXX');
    var html=NOTIFY.map(function(n){
      var head = n.k===5 ? '<div class="nt__grp">Offer responses</div>'
               : n.k===7 ? '<div class="nt__grp">Closing an application</div>'
               : n.k===8 ? '<div class="nt__grp">Activity</div>'
               : n.k===9 ? '<div class="nt__grp">Reminders</div>' : '';
      var on=DB.notify[n.k]!==false;
      return head+'<div class="nt" style="--nc:'+n.c+'">'+
        '<span class="nt__i" style="background:'+n.c+'1f;color:'+n.c+'"><b>'+(n.k+1)+'</b></span>'+
        '<div class="nt__m"><b>'+n.n+'</b><small>'+esc(n.d)+'</small>'+
          '<span class="nt__sub">Subject · '+esc(n.s)+(n.noTrack?'':' · with tracking link')+'</span>'+
          '<button class="nt__pv" type="button" data-ad-ntpv="'+n.k+'">'+(ntOpen[n.k]?'Hide preview':'Preview email')+'</button>'+
          senderPicker('app:'+n.k)+'</div>'+
        '<button class="nt__sw'+(on?' on':'')+'" type="button" data-ad-notify="'+n.k+'" '+
          'aria-label="Toggle '+n.n+' email"></button>'+
      '</div>'+
      (ntOpen[n.k]
        ? '<div class="nt__mail"><div class="nt__mhead"><u>From</u><b>'+esc(senderFor('app:'+n.k)||'not connected')+'</b></div>'+
          '<div class="nt__mhead"><u>To</u><b>'+esc(who.email)+'</b></div>'+
          '<div class="nt__mhead"><u>Subject</u><b>'+esc(n.s)+'</b></div>'+
          '<div class="nt__mbody"><p>Hi '+esc(who.name.split(' ')[0])+',</p>'+
            n.b.replace('{role}',who.jobTitle)
               .replace('{link}',(who.iv&&who.iv.link)||'https://meet.example.com/interview')
               .split('\n\n').map(function(par){ return '<p>'+esc(par)+'</p>'; }).join('')+
            (n.noTrack ? '' :
              '<p class="nt__mtrack"><span>Track your application</span>'+
                '<b>'+esc(who.id)+'</b>'+
                '<a>'+esc(trackLink(who))+'</a></p>')+
            '<p>— The Incomera hiring team</p></div></div>'
        : '');
    }).join('');
    var b1=$('#adNotify'); if(b1) b1.innerHTML=html;
    var b2=$('#adNotify2'); if(b2) b2.innerHTML=html;
    renderWebNotify();
  }

  function renderHiredRows(){
    var q=($('#adHiredSearch').value||'').toLowerCase();
    var hired=allApps().filter(function(a){ return !a.rejected && a.stage===4; });
    $('#adNavHired').textContent=hired.length;
    var rows=hired.filter(function(a){
      return !q || (a.name+' '+a.email+' '+a.jobTitle+' '+a.id).toLowerCase().indexOf(q)>-1;
    });
    var el=$('#adHiredCount'); if(el) el.textContent=rows.length+' shown';
    var box=$('#adHiredRows'); if(!box) return;
    var TICKS='<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
    box.innerHTML = rows.length ? rows.map(function(a){
      var ini=a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase();
      var docs=a.docs||{}, have=0;
      DOCS.forEach(function(d,k){ if(docs[k]) have++; });
      var chips=DOCS.map(function(dn,k){
        return '<button class="rw__doc'+(docs[k]?' on':'')+'" type="button" data-ad-doc="'+a.id+':'+k+'">'+
          '<i>'+TICKS+'</i>'+esc(dn)+'</button>';
      }).join('');
      var open=!!hxOpen[a.id];
      return '<div class="rw rw--hr'+(open?' open':'')+'" style="--sc:#1FA971" data-ad-hx="'+a.id+'">'+
        '<span class="rw__av" style="'+(a.photo?'background-image:url(\''+a.photo+'\')':'background:'+avc(a.name))+'">'+
          (a.photo?'':ini)+'</span>'+
        '<div class="rw__id"><b>'+esc(a.name)+'</b>'+
          '<small>'+esc(a.jobTitle)+' · offer accepted · hired '+fmt(a.hiredAt||a.offerAt||a.applied)+'</small></div>'+
        '<div class="hr__join'+(a.joinAt?'':' none')+'"><u>Joining</u><b>'+
          (a.joinAt?fmt(a.joinAt):'Not set')+'</b></div>'+
        '<div class="rw__docs"><u>Documents<b>'+have+'/'+DOCS.length+'</b></u>'+
          '<div class="rw__bar"><s style="width:'+Math.round(have/DOCS.length*100)+'%"></s></div></div>'+
        '<span class="rw__acts">'+
          '<button class="rw__ib" type="button" data-ad-app="'+a.id+'" title="Open record">'+
            '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button></span>'+
        '<span class="rw__ib rw__caret"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span>'+
      '</div>'+
      '<div class="rw__panel'+(open?' open':'')+'"><div class="rw__pgrid">'+
        '<div><div class="rw__plbl">Offer letter</div>'+
          '<div class="rw__odates">Sent '+fmt(a.offerSentAt||a.applied)+'<br>Accepted '+
            fmt(a.offerAt||a.hiredAt||a.applied)+'</div>'+
          '<div class="hr__jset"><label>Joining date</label>'+
            '<input type="date" data-f="join" value="'+(a.joinAt?new Date(a.joinAt).toISOString().slice(0,10):'')+'">'+
            '<button class="rw__btn yes" type="button" data-ad-join="'+a.id+'">Save</button></div>'+
          '<button class="rw__letter" type="button" data-ad-'+(a.letter?'letter':'attach')+'="'+a.id+'">'+
            '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'+
            (a.letter?esc(a.letter.name):'Attach offer letter')+'</button></div>'+
        '<div><div class="rw__plbl">Documentation</div><div class="rw__chips">'+chips+'</div></div>'+
      '</div></div>';
    }).join('') : '<div class="ac__empty">Nobody has been hired yet. Move a candidate to Hired from their record.</div>';
  }

  /* job drawer */
  var jfStat='open';
  function jfPreview(){
    var el=$('#jfPreview'); if(!el) return;
    var title=$('#jfTitle').value.trim()||'Untitled role';
    var sum=$('#jfSummary').value.trim()||'Your summary will appear here — two or three sentences describing the job.';
    var loc=$('#jfLoc').value.trim()||'Anywhere';
    var r=$('#jfRetainer').checked, c=$('#jfCommission').checked;
    var comp=r&&c?'Retainer + commission':c?'Commission only':r?'Base retainer':'';
    $('#jfSumCount').textContent=$('#jfSummary').value.trim().length+' characters';
    el.innerHTML='<b>'+esc(title)+'</b><p>'+esc(sum)+'</p>'+
      '<div class="jf__pchips"><span>'+esc(loc)+'</span><span>'+esc($('#jfType').value)+'</span>'+
      '<span>'+esc($('#jfSetup').value)+'</span>'+
      (comp?'<span class="pay">'+comp+'</span>':'')+
      ($('#jfVoice').checked?'<span class="mic">Voice intro</span>':'')+'</div>';
  }
  function openJobDrawer(id){
    editing=id?jobById(id):null;
    $('#adJobDwT').textContent=editing?'Edit job post':'New job post';
    $('#adJobDwS').textContent=editing?'Changes go live on the careers page when you save':'Published roles appear on the careers page immediately';
    var j=editing||{dept:'sales',type:'Full-time',level:'Mid',status:'open',seats:1,badge:'',does:[],wants:[],
      voice:false,retainer:false,commission:false,setup:'Remote'};
    $('#jfTitle').value=j.title||''; $('#jfType').value=j.type; $('#jfSetup').value=j.setup||'Remote';
    $('#jfLoc').value=j.loc||'';
    $('#jfPay').value=j.pay||'';
    $('#jfSummary').value=j.summary||''; $('#jfDoes').value=(j.does||[]).join('\n'); $('#jfWants').value=(j.wants||[]).join('\n');
    jfStat=j.status||'open';
    $$('#jfStatusSeg .ad__sg',aw).forEach(function(b){ b.classList.toggle('on',b.getAttribute('data-jf-stat')===jfStat); });
    $('#jfVoice').checked=!!j.voice;
    $('#jfRetainer').checked=!!j.retainer; $('#jfCommission').checked=!!j.commission;
    $('#jfErr').classList.remove('on'); $('#jfTitle').classList.remove('bad'); $('#jfSummary').classList.remove('bad');
    jfPreview();
    $('#adJobDw').classList.add('open');
    $('#adJobDw').querySelector('.ad__dwb').scrollTop=0;
  }
  function saveJob(){
    var t=$('#jfTitle').value.trim(), s=$('#jfSummary').value.trim();
    $('#jfTitle').classList.toggle('bad',!t); $('#jfSummary').classList.toggle('bad',!s);
    if(!t||!s){ $('#jfErr').classList.add('on'); return; }
    var lines=function(x){ return x.split('\n').map(function(l){return l.trim()}).filter(Boolean); };
    var data={title:t,dept:(editing&&editing.dept)||'sales',type:$('#jfType').value,setup:$('#jfSetup').value,
      loc:$('#jfLoc').value.trim(),
      level:'',pay:$('#jfPay').value.trim(),seats:1,
      summary:s,does:lines($('#jfDoes').value),wants:lines($('#jfWants').value),voice:$('#jfVoice').checked,
      retainer:$('#jfRetainer').checked,commission:$('#jfCommission').checked,
      status:jfStat,badge:''};
    if(editing){ for(var k in data) editing[k]=data[k]; toast('Job post updated'); }
    else{
      data.id=t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,32)+'-'+Math.floor(Math.random()*900+100);
      data.posted=Date.now(); DB.jobs.unshift(data);
      toast(data.status==='open'?'Job posted — now live on the careers page':'Job saved as '+data.status);
    }
    save(); $('#adJobDw').classList.remove('open'); renderAdmin(); renderAll();
  }

  /* applicant drawer */
  function openAppDrawer(id){
    curApp=DB.apps[id]; if(!curApp) return;
    var a=curApp, d={c:avc(a.name)};
    /* tell the candidate their application was opened (throttled to once an hour) */
    var now=Date.now();
    if(!a.rejected && (!a.viewedAt || now-a.viewedAt>3600000)){
      a.viewedAt=now; a.views=(a.views||0)+1;
      a.events.push({t:now,b:'Application opened',p:'Someone from the hiring team opened your application.'});
      notifyStage(a,8);
      save(); renderMine();
      if(shown&&shown.id===a.id) showApp(a);
    }
    $('#adAppDwT').textContent=a.name;
    $('#adAppDwS').textContent=a.jobTitle+' · '+a.id;
    function r(k,val){ return val?'<div class="cr__kvr" style="padding:9px 0;border-bottom:1px solid var(--line-soft)"><u>'+k+'</u><b>'+esc(val)+'</b></div>':''; }
    $('#adAppDwB').innerHTML=
      '<div style="display:flex;align-items:center;gap:13px">'+
        '<span class="cr__rav'+(a.photo?' img':'')+'" style="width:52px;height:52px;border-radius:15px;font-size:15px;'+
          (a.photo?'background-image:url(\''+a.photo+'\')':'background:'+d.c)+'">'+
          (a.photo?'':a.name.split(' ').map(function(x){return x.charAt(0)}).join('').slice(0,2).toUpperCase())+'</span>'+
        '<div><div style="font-size:15px;font-weight:600;color:var(--ink)">'+esc(a.name)+
          (a.attempt>1?'<span class="rw__again">'+ordinal(a.attempt)+' application</span>':'')+'</div>'+
        '<div style="font-size:12.5px;color:var(--muted);margin-top:3px">'+esc(a.loc||'')+' · applied '+since(a.applied)+'</div></div>'+
        '<span style="margin-left:auto" class="ad__pill '+(a.rejected?'rej':a.stage>=3?'open':'blue')+'">'+
        (a.rejected?'Rejected':STAGES[a.stage].n)+'</span></div>'+

      '<div class="ad__sec">Stage</div>'+
      (a.stage<3?'<p class="ad__note">Moving to Offer needs a confirmed joining date'+
        (a.letter?'':' and an offer letter attached')+'. You will be asked for '+
        (a.letter?'it':'both')+' when you advance the stage.</p>':'')+
      '<div class="ad__stagepick">'+STAGES.map(function(s,i){
        return '<button class="ad__sp '+(i<a.stage?'done':i===a.stage?'on':'')+'" type="button" data-ad-stage="'+i+'">'+
          '<i>'+(i<a.stage?'✓':i+1)+'</i>'+s.n+(i===a.stage?'<em>current</em>':'')+'</button>';
      }).join('')+'</div>'+

      (offerState(a) ? '<div class="ad__sec">Offer letter</div>'+
        '<div class="ad__offer"><div class="ad__ofrow"><span class="ad__pill '+
          (offerState(a)==='accepted'?'open':offerState(a)==='declined'?'rej':'draft')+'">'+
          OFFER_LBL[offerState(a)]+'</span>'+
          '<em>Sent '+fmt(a.offerSentAt||a.applied)+'</em></div>'+
          (a.joinAt?'<p style="font-size:12.5px;color:var(--a-mut);margin-top:9px">'+
            'Confirmed joining date · <b style="color:var(--a-ink);font-weight:640">'+fmt(a.joinAt)+'</b></p>':'')+
          (offerState(a)==='accepted'?'':
            '<div class="ad__ofacts">'+
              '<button class="ad__ghost" type="button" data-ad-offer="'+a.id+':accepted">Mark accepted</button>'+
              '<button class="ad__ghost" type="button" data-ad-offer="'+a.id+':declined">Declined</button>'+
              '<button class="ad__ghost" type="button" data-ad-offer="'+a.id+':noanswer">No answer</button>'+
            '</div>')+
        '</div>' : '')+
      (a.declineReason?'<div class="ad__sec">Offer declined</div>'+
        '<div class="ad__offer"><div class="ad__ofrow"><span class="ad__pill rej">'+esc(a.declineReason)+'</span></div>'+
        (a.declineNote?'<p style="font-size:12.5px;color:var(--a-mut);margin-top:10px;line-height:1.6">'+
          esc(a.declineNote)+'</p>':'')+'</div>':'')+
      (a.letter?'<div class="cr__f"><label>Offer letter</label>'+
        '<button class="rw__file" type="button" data-ad-letter="'+a.id+'" style="max-width:none">'+
        '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'+
        '<span>'+esc(a.letter.name)+'</span></button></div>':'')+
      ((!a.rejected && a.stage>=1 && a.stage<3)
        ? '<div class="ad__sec">Interview</div>'+
          '<button class="iv__join ad__ivbtn" type="button" data-ad-goiv="'+a.id+'">'+
            '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'+
            (a.iv&&a.iv.at?'Reschedule interview':'Schedule interview')+'</button>'
        : '')+
      '<div class="ad__sec">Tracking</div>'+
      '<div class="ad__track">'+
        '<div class="ad__trow"><u>Tracking ID</u><b>'+a.id+'</b>'+
          '<button class="rw__btn" type="button" data-ad-copy="'+a.id+'">Copy ID</button></div>'+
        '<div class="ad__trow"><u>Status link</u><code>'+esc(trackLink(a))+'</code></div>'+
        '<div class="ad__tacts">'+
          '<button class="rw__btn" type="button" data-ad-copylink="'+a.id+'">Copy link</button>'+
          '<button class="rw__btn" type="button" data-ad-openlink="'+a.id+'">Open status page</button>'+
        '</div>'+
      '</div>'+
      '<div class="ad__sec">Contact</div>'+
      r('Email',a.email)+r('Phone',a.phone)+r('Location',a.loc)+r('LinkedIn',a.linkedin)+r('Portfolio',a.site)+

      (a.voice ? '<div class="ad__sec">Voice introduction</div>'+
        '<div class="ad__voice"><u><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/></svg>'+
          (a.voice.dur?'Recorded · '+Math.floor(a.voice.dur/60)+':'+String(a.voice.dur%60).padStart(2,'0'):'Not recorded')+'</u>'+
          (a.voice.data && a.voice.data!=='too-large'
            ? '<audio controls preload="none" src="'+a.voice.data+'"></audio>'
            : '<p>'+(a.voice.data==='too-large'?'The recording was too large to store in this demo.':'This candidate submitted without a recording.')+'</p>')+
        '</div>' : '')+
      '<div class="ad__sec">Application</div>'+
      r('Role',a.jobTitle)+r('Experience',a.years)+r('Earliest start',a.start)+r('Expected pay',a.comp)+
      r('Résumé',a.file)+
      '<div class="cr__f"><label>Why they are a fit</label><div style="font-size:13px;color:var(--ink-2);line-height:1.65;'+
        'background:var(--bg);border:1px solid var(--line);border-radius:11px;padding:13px">'+esc(a.pitch||'—')+'</div></div>'+
      (a.notes?'<div class="cr__f"><label>Other notes</label><div style="font-size:13px;color:var(--ink-2);line-height:1.6;'+
        'background:var(--bg);border:1px solid var(--line);border-radius:11px;padding:13px">'+esc(a.notes)+'</div></div>':'')+

      '<div class="ad__sec">History</div>'+
      '<div class="cr__msgs">'+(a.events||[]).slice().reverse().map(function(e){
        return '<div class="cr__msg"><em style="background:'+d.c+'">'+e.b.charAt(0)+'</em><div><b>'+esc(e.b)+'</b><p>'+esc(e.p)+'</p><small>'+fmtL(e.t)+'</small></div></div>';
      }).join('')+'</div>';
    $('#adAdvance').style.display=(a.rejected||a.stage>=4)?'none':'';
    $('#adReject').style.display=a.rejected?'none':'';
    $('#adAppDw').classList.add('open');
  }
  var DOCS=['Signed offer letter','ID / passport','Employment contract','Bank details','Reference check'];
  function offerState(a){
    if(!a||a.stage<3) return null;
    if(a.offerStatus==='accepted'||a.stage===4) return 'accepted';
    if(a.offerStatus==='declined') return 'declined';
    if(a.offerStatus==='noanswer') return 'noanswer';
    if(a.offerSentAt && Date.now()-a.offerSentAt>7*86400000) return 'noanswer';
    return 'pending';
  }
  var OFFER_LBL={accepted:'Accepted',declined:'Declined',noanswer:'No answer',pending:'Awaiting response'};
  function setOffer(a,st){
    if(!a) return;
    a.offerStatus=st; a.offerAt=Date.now();
    if(st==='accepted'){ notifyStage(a,5); moveStage(a,4); return; }
    if(st==='declined') notifyStage(a,6);
    a.events.push({t:Date.now(),b:'Offer '+OFFER_LBL[st].toLowerCase(),
      p:st==='declined'?'The candidate declined the offer.':'No response to the offer letter yet.'});
    save(); renderAdmin(); renderMine();
    if(shown&&shown.id===a.id) showApp(a);
    toast('Offer marked '+OFFER_LBL[st].toLowerCase());
  }
  function needSchedule(a,i){
    /* the interview stage means a booked interview */
    if(i!==2 || (a&&a.iv&&a.iv.at)) return false;
    if(a.stage<2){ shOpen[a.id]=true; goA('short'); renderShortRows(); }
    else { ivOpen[a.id]=true; goA('intv'); renderIntvRows(); }
    $$('.ad__dw',aw).forEach(function(x){x.classList.remove('open')});
    toast('Pick a date to move '+a.name.split(' ')[0]+' to Interview');
    return true;
  }
  /* ---------- joining date: confirmed before an offer ever goes out ---------- */
  var pendingJoin=null, pendingJoinStage=null;
  function ymd(ts){ var d=new Date(ts);
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function joinDefault(a){
    if(a&&a.joinAt) return a.joinAt;
    var d=new Date(); d.setDate(d.getDate()+14); d.setHours(9,0,0,0);
    while(d.getDay()===0||d.getDay()===6) d.setDate(d.getDate()+1);
    return d.getTime();
  }
  function joinNote(){
    var v=$('#adJoinDate').value, box=$('#adJoinNote'), go=$('#adJoinGo');
    if(!box||!go) return;
    if(!v){ box.className='jd__note bad'; box.textContent='Pick a start date — the offer cannot go out without one.';
      go.disabled=true; return; }
    var t=new Date(v+'T09:00').getTime();
    var days=Math.round((t-new Date().setHours(9,0,0,0))/86400000);
    var wd=new Date(t).getDay(), weekend=(wd===0||wd===6);
    if(days<0){ box.className='jd__note bad'; box.textContent='That date has already passed. Pick today or later.';
      go.disabled=true; return; }
    go.disabled=false;
    box.className='jd__note'+(weekend?' bad':'');
    box.innerHTML = weekend
      ? 'Starting <b>'+fmt(t)+'</b> falls on a weekend. Confirm only if that is intended.'
      : 'Starting <b>'+fmt(t)+'</b> · '+(days===0?'today':days===1?'tomorrow':'in '+days+' days')+
        '. This goes into the offer and onto the candidate’s status page.';
  }
  function needJoinDate(a,i){
    /* nobody moves into Offer until a start date is agreed */
    if(i!==3 || !a || a.stage===3) return false;
    if(DB.settings && DB.settings.requireJoin===false) return false;
    if(a.joinConfirmed && a.joinAt) return false;
    pendingJoin=a.id; pendingJoinStage=i;
    $('#adJoinWho').innerHTML='<b>'+esc(a.name)+'</b> · '+esc(a.jobTitle)+
      '<br>Agree the start date first — it is part of the offer.';
    $('#adJoinDate').value=ymd(joinDefault(a));
    joinNote();
    $('#adJoinDw').classList.add('open');
    setTimeout(function(){ try{ $('#adJoinDate').focus(); }catch(e){} },70);
    return true;
  }
  function closeJoinDw(){ $('#adJoinDw').classList.remove('open'); pendingJoin=null; pendingJoinStage=null; }
  function confirmJoin(){
    var a=DB.apps[pendingJoin], v=$('#adJoinDate').value;
    if(!a){ closeJoinDw(); return; }
    if(!v){ joinNote(); return; }
    var t=new Date(v+'T09:00').getTime();
    if(t < new Date().setHours(0,0,0,0)){ joinNote(); return; }
    var moved=(a.joinAt&&a.joinAt!==t);
    a.joinAt=t; a.joinConfirmed=true;
    a.events.push({t:Date.now(),b:moved?'Joining date changed':'Joining date confirmed',
      p:'Agreed start date: '+fmt(t)+' · confirmed before the offer was sent.'});
    var go=pendingJoinStage;
    closeJoinDw(); save();
    if(curApp&&curApp.id===a.id) setStage(go); else moveStage(a,go);
  }
  function needLetter(a,i){
    /* an offer cannot go out without the letter attached */
    if(i!==3 || (a&&a.letter)) return false;
    if(DB.settings && DB.settings.requireLetter===false) return false;
    pendingLetter=a.id; pendingStage=3;
    var f=$('#adLetterFile'); if(f){ f.value=''; f.click(); }
    toast('Attach the offer letter to move '+a.name.split(' ')[0]+' to Offer');
    return true;
  }
  function copyText(txt){
    try{ navigator.clipboard.writeText(txt); }
    catch(e){
      try{
        var ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      }catch(e2){}
    }
  }
  function trackLink(a){
    var base='';
    try{ base=location.origin+location.pathname; }catch(e){}
    return base+'#careers/status/'+a.id;
  }
  function notifyStage(a,i){
    if(!a || DB.notify[i]===false) return;
    var n=NOTIFY[i]; if(!n) return;
    a.events.push({t:Date.now(),b:'Email sent to candidate',
      p:'“'+n.s+'” sent to '+a.email+(n.noTrack?'.':' · Track your status: '+trackLink(a))});
  }
  function moveStage(a,i){
    if(!a) return;
    if(needSchedule(a,i)) return;
    if(needJoinDate(a,i)) return;
    if(needLetter(a,i)) return;
    if(i===3&&a.stage!==3){ a.offerStatus='pending'; a.offerSentAt=Date.now(); }
    if(i===4){ a.offerStatus='accepted'; a.offerAt=a.offerAt||Date.now(); a.hiredAt=Date.now(); }
    a.stage=i; a.rejected=false;
    var jn=((i===3||i===4)&&a.joinAt)?' Start date: '+fmt(a.joinAt)+'.':'';
    a.events.push({t:Date.now(),b:'Moved to '+STAGES[i].n,p:STAGES[i].d+jn,stage:i});
    a.next={title:i===4?'Welcome aboard':i===3?'Offer sent — awaiting your response':STAGES[i].n+' · in progress',
            note:STAGES[i].d+jn};
    notifyStage(a,i);
    save(); renderAdmin(); renderMine();
    if(shown&&shown.id===a.id) showApp(a);
    toast(a.name.split(' ')[0]+' moved to '+STAGES[i].n);
  }
  function rejectAppById(a){
    if(!a) return;
    a.rejected=true;
    a.events.push({t:Date.now(),b:'Application closed',p:'The team decided not to move forward at the '+STAGES[a.stage].n+' stage.',stage:a.stage});
    notifyStage(a,7);
    a.next=null; save(); renderAdmin(); renderMine();
    if(shown&&shown.id===a.id) showApp(a);
    toast(a.name.split(' ')[0]+' rejected');
  }
  function setStage(i,label,note){
    var a=curApp; if(!a) return;
    if(needSchedule(a,i)) return;
    if(needJoinDate(a,i)) return;
    if(needLetter(a,i)) return;
    if(i===3&&a.stage!==3){ a.offerStatus='pending'; a.offerSentAt=Date.now(); }
    if(i===4){ a.offerStatus='accepted'; a.offerAt=a.offerAt||Date.now(); a.hiredAt=Date.now(); }
    a.stage=i; a.rejected=false;
    var jn=((i===3||i===4)&&a.joinAt)?' Start date: '+fmt(a.joinAt)+'.':'';
    a.events.push({t:Date.now(),b:label||('Moved to '+STAGES[i].n),p:note||(STAGES[i].d+jn),stage:i});
    a.next={title:i===4?'Welcome aboard':i===3?'Offer sent — awaiting your response':STAGES[i].n+' · in progress',
            note:STAGES[i].d+jn};
    notifyStage(a,i);
    save(); openAppDrawer(a.id); renderAdmin(); renderMine();
    if(shown&&shown.id===a.id) showApp(a);
    toast('Moved to '+STAGES[i].n+(DB.notify[i]===false?'':' · email sent'));
  }
  function rejectApp(){
    var a=curApp; if(!a) return;
    a.rejected=true;
    a.events.push({t:Date.now(),b:'Application closed',p:'The team decided not to move forward at the '+STAGES[a.stage].n+' stage.',stage:a.stage});
    notifyStage(a,7);
    a.next=null; save(); openAppDrawer(a.id); renderAdmin(); renderMine();
    if(shown&&shown.id===a.id) showApp(a);
    toast('Candidate rejected');
  }

  /* ==================== events ==================== */
  document.addEventListener('click',function(e){
    var t=e.target, el;
    if(!t||!t.closest) return;

    /* site entry points */
    if((el=t.closest('[data-careers-open]'))){ e.preventDefault(); openCareers(el.getAttribute('data-careers-open')||'roles'); return; }

    /* ---- careers ---- */
    if(cw.contains(t)){
      if(t.closest('#crExit')||t.closest('#crExit2')){ closeCareers(); return; }
      if((el=t.closest('[data-cr-tab]'))){ var k=el.getAttribute('data-cr-tab'); goC(k); if(k==='status'){renderMine();renderDemoHint();} return; }
      if((el=t.closest('[data-cr-job]'))){ openJob(el.getAttribute('data-cr-job')); return; }
      if(t.closest('#crApplyBtn')){ openApply(); return; }
      if(t.closest('#crApBack')){ if(job) openJob(job.id); else goC('roles'); return; }
      if(t.closest('#apSubmit')){ submitApp(); return; }
      if(t.closest('#apPhotoClear')){ clearPhoto(); return; }
      if(t.closest('#apMic')){ toggleRec(); return; }
      if(t.closest('#apReRec')){ var u=rec.url,o=rec.ok; resetRec(); rec.ok=o; startRec(); return; }
      if(t.closest('#apDelRec')){ resetRec(); toast('Recording deleted'); return; }
      if((el=t.closest('.cr__opt'))){ $$('.cr__opt',el.parentNode).forEach(function(o){o.classList.remove('on')}); el.classList.add('on'); return; }
      if(t.closest('#crCopyId')){ try{navigator.clipboard.writeText($('#crDoneId').textContent);}catch(x){} toast('Tracking ID copied'); return; }
      if(t.closest('#crGoTrack')){ goC('status'); renderMine(); renderDemoHint(); lookup(lastId); return; }
      if(t.closest('#crLookGo')){ lookup($('#crLookId').value); return; }
      if((el=t.closest('[data-cr-look]'))){ goC('status'); lookup(el.getAttribute('data-cr-look')); return; }
      if((el=t.closest('[data-cr-join]'))){
        var jv=DB.apps[el.getAttribute('data-cr-join')];
        if(jv&&jv.iv&&jv.iv.link){ try{ window.open(jv.iv.link,'_blank'); }catch(e4){} }
        else toast('The joining link will be emailed to you');
        return;
      }
      if((el=t.closest('[data-cr-ask]'))){
        offerAsk=el.getAttribute('data-cr-ask')||null;
        if(shown) showApp(shown);
        return;
      }
      if((el=t.closest('[data-cr-ok]'))){
        var pr3=el.getAttribute('data-cr-ok').split(':'), oa=DB.apps[pr3[0]];
        if(pr3[1]==='accepted'){
          offerAsk=null;
          if(oa){ setOffer(oa,'accepted'); toast('Offer accepted'); }
        } else {
          offerAsk='reason'; declineChoice=null;
          if(shown) showApp(shown);
        }
        return;
      }
      if((el=t.closest('[data-cr-reason]'))){
        declineChoice=el.getAttribute('data-cr-reason');
        var keep=$('#crDeclineNote'), kept=keep?keep.value:'';
        if(shown) showApp(shown);
        var back=$('#crDeclineNote'); if(back) back.value=kept;
        return;
      }
      if((el=t.closest('[data-cr-declinesend]'))){
        var da=DB.apps[el.getAttribute('data-cr-declinesend')];
        if(!declineChoice){ toast('Pick a reason so we can close this off'); return; }
        if(da){
          var nt=$('#crDeclineNote');
          da.declineReason=declineChoice;
          da.declineNote=nt?nt.value.trim():'';
          da.events.push({t:Date.now(),b:'Offer declined by candidate',
            p:declineChoice+(da.declineNote?' — '+da.declineNote:'')});
          da.closed=true; da.closedAt=Date.now();
          setOffer(da,'declined');
          toast('Thanks — your answer has been recorded');
        }
        offerAsk=null; declineChoice=null;
        return;
      }
      if((el=t.closest('[data-cr-act]'))){
        var act=el.getAttribute('data-cr-act');
        if(act==='withdraw'&&shown&&DB.apps[shown.id]){
          DB.apps[shown.id].rejected=true;
          DB.apps[shown.id].events.push({t:Date.now(),b:'Application withdrawn',p:'You withdrew this application.',stage:DB.apps[shown.id].stage});
          DB.apps[shown.id].next=null; save(); showApp(DB.apps[shown.id]); renderMine(); renderAdmin(); toast('Application withdrawn');
        }
        else if(act==='ask') toast('Your question has been sent to the hiring team');
        else toast('We have emailed you a link to update your details');
        return;
      }
      return;
    }

    /* ---- admin ---- */
    if(aw.contains(t)){
      /* joining-date gate takes precedence while it is open */
      if(t.closest('[data-jd-cancel]')){
        closeJoinDw(); toast('Offer not sent — the joining date was not confirmed'); return; }
      if(t.closest('#adJoinGo')){ confirmJoin(); return; }
      if((el=t.closest('[data-jd-add]'))){
        var jdd=new Date(); jdd.setDate(jdd.getDate()+(+el.getAttribute('data-jd-add')));
        $('#adJoinDate').value=ymd(jdd.getTime()); joinNote(); return;
      }
      /* ---- workspace: team, permissions, channels, settings ---- */
      if(t.closest('#adSuserBtn')){ goA('team'); wkGo('home'); aw.scrollTop=0; return; }
      if((el=t.closest('[data-wk]'))){ wkGo(el.getAttribute('data-wk')); return; }

      if(t.closest('#wkAddBtn')){ var af=$('#wkAddForm'); af.classList.toggle('open');
        if(af.classList.contains('open')) $('#wkName').focus(); return; }
      if(t.closest('#wkAddCancel')){ $('#wkAddForm').classList.remove('open'); return; }
      if(t.closest('#wkAddSave')){
        var nmv=$('#wkName').value.trim(), emv=$('#wkEmail').value.trim();
        if(!nmv){ $('#wkName').classList.add('bad'); toast('Give the new member a name'); return; }
        if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emv)){ $('#wkEmail').classList.add('bad'); toast('That email does not look right'); return; }
        if(DB.team.some(function(m){return m.email.toLowerCase()===emv.toLowerCase();})){
          toast(emv+' is already on the team'); return; }
        $('#wkName').classList.remove('bad'); $('#wkEmail').classList.remove('bad');
        DB.team.push({id:'tm-'+Date.now().toString(36),name:nmv,email:emv,
          role:$('#wkRole').value,status:'invited',at:Date.now()});
        $('#wkName').value=''; $('#wkEmail').value=''; $('#wkAddForm').classList.remove('open');
        save(); renderTeam(); toast('Invite sent to '+emv);
        return;
      }
      if((el=t.closest('[data-wk-resend]'))){
        var rm=DB.team.filter(function(m){return m.id===el.getAttribute('data-wk-resend')})[0];
        if(rm){ rm.at=Date.now(); save(); renderTeam(); toast('Invite resent to '+rm.email); }
        return;
      }
      if((el=t.closest('[data-wk-del]'))){
        var did=el.getAttribute('data-wk-del'), dm=DB.team.filter(function(m){return m.id===did})[0];
        if(dm && dm.role!=='owner'){
          DB.team=DB.team.filter(function(m){return m.id!==did});
          save(); renderTeam(); toast(dm.name.split(' ')[0]+' removed from the workspace');
        }
        return;
      }
      if((el=t.closest('[data-wk-perm]'))){
        var pp=el.getAttribute('data-wk-perm').split(':');
        var pm=DB.team.filter(function(m){return m.id===pp[0]})[0];
        if(pm && pm.role!=='owner'){
          var cur=permsOf(pm), ix=cur.indexOf(pp[1]);
          if(ix>-1) cur.splice(ix,1); else cur.push(pp[1]);
          var match=null,rk;
          for(rk in ROLES){ if(rk==='custom'||rk==='owner') continue;
            if(ROLES[rk].p.length===cur.length && ROLES[rk].p.every(function(k){return cur.indexOf(k)>-1;})){ match=rk; break; } }
          if(match){ pm.role=match; pm.perms=null; } else { pm.role='custom'; pm.perms=cur; }
          save(); renderTeam();
        }
        return;
      }
      if((el=t.closest('[data-wk-prim]'))){
        var pid=el.getAttribute('data-wk-prim');
        DB.channels.emails.forEach(function(e){ e.primary=(e.id===pid); });
        save(); renderTeam(); toast('Primary sending address updated'); return;
      }
      if((el=t.closest('[data-wk-mdel]'))){
        var mid=el.getAttribute('data-wk-mdel'), was=DB.channels.emails.filter(function(e){return e.id===mid})[0];
        DB.channels.emails=DB.channels.emails.filter(function(e){return e.id!==mid});
        if(was&&was.primary&&DB.channels.emails[0]) DB.channels.emails[0].primary=true;
        save(); renderTeam(); toast(was?was.addr+' disconnected':'Address disconnected'); return;
      }
      if(t.closest('#wkMailBtn')){ var mf=$('#wkMailForm'); mf.classList.toggle('open');
        if(mf.classList.contains('open')) $('#wkMailAddr').focus(); return; }
      if(t.closest('#wkMailCancel')){ $('#wkMailForm').classList.remove('open'); return; }
      if(t.closest('#wkMailSave')){
        var ad2=$('#wkMailAddr').value.trim();
        if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ad2)){ $('#wkMailAddr').classList.add('bad'); toast('That email does not look right'); return; }
        if(DB.channels.emails.some(function(e){return e.addr.toLowerCase()===ad2.toLowerCase();})){
          toast(ad2+' is already connected'); return; }
        $('#wkMailAddr').classList.remove('bad');
        DB.channels.emails.push({id:'em-'+Date.now().toString(36),addr:ad2,use:$('#wkMailUse').value,
          prov:$('#wkMailProv').value,status:'connected',primary:!DB.channels.emails.length,at:Date.now()});
        $('#wkMailAddr').value=''; $('#wkMailForm').classList.remove('open');
        save(); renderTeam(); toast(ad2+' connected'); return;
      }
      if((el=t.closest('[data-wk-cal]'))){
        var ck=el.getAttribute('data-wk-cal');
        if(DB.channels.cal[ck]){ DB.channels.cal[ck]=null; toast('Calendar disconnected'); }
        else {
          var prim=(DB.channels.emails.filter(function(e){return e.primary})[0]||{}).addr||'samules@incomera.com';
          DB.channels.cal[ck]={acct:prim,at:Date.now()};
          toast((ck==='google'?'Google':'Outlook')+' Calendar connected as '+prim);
        }
        save(); renderTeam(); return;
      }
      if((el=t.closest('.nt__sw[data-wk-set]'))){
        var sk=el.getAttribute('data-wk-set');
        DB.settings[sk]=DB.settings[sk]===false;
        save(); renderTeam();
        toast((sk==='requireJoin'?'Joining date':'Offer letter')+' check '+(DB.settings[sk]?'on':'off'));
        return;
      }
      if(t.closest('#adGo')){
        if($('#adPass').value.trim()!==((DB.settings&&DB.settings.pass)||'admin123')){ $('#adErr').classList.add('on'); $('#adPass').classList.add('bad'); return; }
        $('#adErr').classList.remove('on'); $('#adPass').classList.remove('bad'); $('#ad').classList.add('in');
        renderAdmin(); goA('overview'); toast('Signed in as super admin'); return;
      }
      if(t.closest('#adBack')){ closeAdmin(); return; }
      if(t.closest('#adOut')){ $('#ad').classList.remove('in'); $('#adPass').value=''; toast('Signed out'); return; }
      if(t.closest('#adGrpBtn')){ $('#adGrpRec').classList.toggle('open'); goA('overview'); return; }
      if((el=t.closest('[data-ad-tab]'))){ goA(el.getAttribute('data-ad-tab')); return; }
      if(t.closest('#adNew')){ openJobDrawer(null); return; }
      if(t.closest('[data-ad-close]')){ $$('.ad__dw',aw).forEach(function(x){x.classList.remove('open')}); return; }
      if((el=t.closest('[data-ad-edit]'))){ openJobDrawer(el.getAttribute('data-ad-edit')); return; }
      if((el=t.closest('[data-ad-toggle]'))){
        var jj=jobById(el.getAttribute('data-ad-toggle'));
        if(jj){ jj.status = jj.status==='open'?'closed':'open'; save(); renderAdmin(); renderAll();
          toast(jj.status==='open'?'“'+jj.title+'” is live on the careers page':'“'+jj.title+'” closed'); }
        return;
      }
      if((el=t.closest('[data-ad-del]'))){
        var id2=el.getAttribute('data-ad-del');
        if(el.getAttribute('data-armed')){ DB.jobs=DB.jobs.filter(function(x){return x.id!==id2}); save(); renderAdmin(); renderAll(); toast('Job post deleted'); }
        else { el.setAttribute('data-armed','1'); el.classList.add('danger'); el.style.borderColor='var(--rev)'; el.style.color='var(--rev)';
          toast('Click delete again to confirm'); setTimeout(function(){ el.removeAttribute('data-armed'); el.style.borderColor=''; el.style.color=''; },3000); }
        return;
      }
      if((el=t.closest('[data-jf-stat]'))){ jfStat=el.getAttribute('data-jf-stat');
        $$('#jfStatusSeg .ad__sg',aw).forEach(function(b){ b.classList.toggle('on',b===el); }); return; }
      if(t.closest('#jfSave')){ saveJob(); return; }
      if(t.closest('[data-ad-new]')){ openJobDrawer(null); return; }
      if((el=t.closest('[data-ad-stagego]'))){ goA('apps'); $('#adAppJob').value='all'; renderAppRows(); return; }
      if(t.closest('#ntCopy')){ copyText($('#ntLink').textContent); toast('Example link copied'); return; }
      if(t.closest('#adAppSortBtn')){ appSort = appSort==='new' ? 'old' : 'new'; renderAppRows(); return; }
      if((el=t.closest('[data-ad-jstat]'))){ fJobStatus=el.getAttribute('data-ad-jstat'); renderJobRows(); return; }
      if((el=t.closest('[data-ad-jobapps]'))){ goA('apps'); $('#adAppJob').value=el.getAttribute('data-ad-jobapps');
        renderAppRows(); return; }
      if((el=t.closest('[data-ad-goiv]'))){
        var gid=el.getAttribute('data-ad-goiv'), ga=DB.apps[gid];
        $$('.ad__dw',aw).forEach(function(x){x.classList.remove('open')});
        if(ga && ga.stage<2){ shOpen[gid]=true; goA('short'); renderShortRows(); }
        else { ivOpen[gid]=true; goA('intv'); fIv='all'; renderIntvRows(); }
        return;
      }
      if((el=t.closest('[data-ad-sched]'))){
        var sid=el.getAttribute('data-ad-sched');
        shOpen[sid]=!shOpen[sid]; renderShortRows(); return;
      }
      if((el=t.closest('[data-ad-ivseg]'))){ fIv=el.getAttribute('data-ad-ivseg'); renderIntvRows(); return; }
      if((el=t.closest('[data-ad-ivjoin]'))){
        var ja=DB.apps[el.getAttribute('data-ad-ivjoin')];
        if(ja&&ja.iv&&ja.iv.link){ try{ window.open(ja.iv.link,'_blank'); }catch(e3){} }
        else toast('No meeting link yet');
        return;
      }
      if((el=t.closest('[data-ad-ivsave]'))){
        var sa=DB.apps[el.getAttribute('data-ad-ivsave')], pn=el.closest('[data-iv-form]');
        if(sa&&pn){
          var dv=pn.querySelector('[data-f="date"]').value, tv=pn.querySelector('[data-f="time"]').value;
          if(!dv){ toast('Pick a date for the interview'); return; }
          var when=new Date(dv+'T'+(tv||'10:00')).getTime();
          var had=sa.iv&&sa.iv.at;
          sa.iv=sa.iv||{};
          sa.iv.at=when; sa.iv.link=pn.querySelector('[data-f="link"]').value.trim();
          sa.iv.status = had && had!==when ? 'rescheduled' : 'upcoming';
          sa.iv.remindedFor=null;
          sa.events.push({t:Date.now(),b:had?'Interview rescheduled':'Interview scheduled',
            p:'Set for '+ivWhen(sa)+'.'});
          if(DB.notify[2]!==false){
            sa.events.push({t:Date.now(),b:'Email sent to candidate',
              p:'“'+NOTIFY[2].s+'” sent to '+sa.email+' · Track your status: '+trackLink(sa)});
          }
          var promoted=false;
          if(sa.stage<2){ moveStage(sa,2); promoted=true; shOpen[sa.id]=false; ivOpen[sa.id]=true; }
          save(); renderAdmin();
          if(curApp&&curApp.id===sa.id) openAppDrawer(sa.id);
          if(shown&&shown.id===sa.id) showApp(sa);
          toast(promoted?'Interview scheduled — moved to Interview':(had?'Interview rescheduled':'Interview scheduled'));
        }
        return;
      }
      if((el=t.closest('[data-ad-ivnotes]'))){
        var na=DB.apps[el.getAttribute('data-ad-ivnotes')], pn2=el.closest('.rw__panel')||el.closest('[data-iv-form]');
        if(na&&pn2){
          na.iv=na.iv||{};
          na.iv.remarks=pn2.querySelector('[data-f="remarks"]').value.trim();
          na.iv.summary=pn2.querySelector('[data-f="summary"]').value.trim();
          save(); toast('Interview notes saved');
        }
        return;
      }
      if((el=t.closest('[data-ad-ivst]'))){
        var pr4=el.getAttribute('data-ad-ivst').split(':'), ia=DB.apps[pr4[0]];
        if(ia){
          ia.iv=ia.iv||{}; ia.iv.status=pr4[1];
          ia.events.push({t:Date.now(),b:'Interview '+IV_ST[pr4[1]].n.toLowerCase(),
            p:pr4[1]==='done'?'The interview took place.':'Marked as '+IV_ST[pr4[1]].n.toLowerCase()+'.'});
          save(); renderAdmin(); toast('Marked '+IV_ST[pr4[1]].n.toLowerCase());
        }
        return;
      }
      if((el=t.closest('[data-ad-iv]')) && !t.closest('[data-ad-app]') && !t.closest('input') && !t.closest('textarea')
         && !t.closest('[data-ad-ivsave]') && !t.closest('[data-ad-ivnotes]') && !t.closest('[data-ad-ivst]')){
        var iid=el.getAttribute('data-ad-iv'); ivOpen[iid]=!ivOpen[iid]; renderIntvRows(); return;
      }
      if((el=t.closest('[data-ad-hx]')) && !t.closest('[data-ad-app]') && !t.closest('[data-ad-doc]')){
        var hid=el.getAttribute('data-ad-hx'); hxOpen[hid]=!hxOpen[hid]; renderHiredRows(); return;
      }
      if((el=t.closest('[data-ad-doc]'))){
        var pr=el.getAttribute('data-ad-doc').split(':'), ap=DB.apps[pr[0]];
        if(ap){ ap.docs=ap.docs||{}; ap.docs[pr[1]]=!ap.docs[pr[1]]; save(); renderHiredRows(); renderAdmin(); }
        return;
      }
      if((el=t.closest('[data-ad-attach]'))){ pendingLetter=el.getAttribute('data-ad-attach');
        $('#adLetterFile').value=''; $('#adLetterFile').click(); return; }
      if((el=t.closest('[data-ad-copy]'))){
        copyText(el.getAttribute('data-ad-copy')); toast('Tracking ID copied'); return;
      }
      if((el=t.closest('[data-ad-copylink]'))){
        var ca=DB.apps[el.getAttribute('data-ad-copylink')];
        if(ca){ copyText(trackLink(ca)); toast('Status link copied'); }
        return;
      }
      if((el=t.closest('[data-ad-openlink]'))){
        var oa2=DB.apps[el.getAttribute('data-ad-openlink')];
        if(oa2){
          $$('.ad__dw',aw).forEach(function(x){x.classList.remove('open')});
          closeAdmin(); openCareers('roles'); goC('status');
          $('#crLookId').value=oa2.id; lookup(oa2.id);
        }
        return;
      }
      if((el=t.closest('[data-ad-ntpv]'))){
        var pk=el.getAttribute('data-ad-ntpv'); ntOpen[pk]=!ntOpen[pk]; renderNotify(); return;
      }
      if((el=t.closest('[data-ad-notify]'))){
        var nk=el.getAttribute('data-ad-notify');
        DB.notify[nk]=DB.notify[nk]===false;
        save(); renderNotify();
        toast(NOTIFY[nk].n+' email '+(DB.notify[nk]?'on':'off'));
        return;
      }
      if((el=t.closest('[data-ad-join]'))){
        var ja2=DB.apps[el.getAttribute('data-ad-join')], jp=el.closest('.hr__jset');
        if(ja2&&jp){
          var jv=jp.querySelector('[data-f="join"]').value;
          if(!jv){ toast('Pick a joining date'); return; }
          var had2=ja2.joinAt;
          ja2.joinAt=new Date(jv+'T09:00').getTime(); ja2.joinConfirmed=true;
          ja2.events.push({t:Date.now(),b:had2?'Joining date changed':'Joining date set',
            p:(had2?'Moved from '+fmt(had2)+' to ':'Starting ')+fmt(ja2.joinAt)+'.'});
          save(); renderAdmin();
          if(shown&&shown.id===ja2.id) showApp(ja2);
          toast('Joining date set for '+fmt(ja2.joinAt));
        }
        return;
      }
      if((el=t.closest('[data-ad-remind]'))){
        var ra=DB.apps[el.getAttribute('data-ad-remind')];
        if(ra){ sendReminder(ra,false); renderAdmin();
          if(shown&&shown.id===ra.id) showApp(ra);
          toast('Reminder sent to '+ra.name.split(' ')[0]); }
        return;
      }
      if((el=t.closest('[data-ad-letter]'))){
        var la=DB.apps[el.getAttribute('data-ad-letter')];
        if(la&&la.letter&&la.letter.data){ try{ window.open(la.letter.data,'_blank'); }catch(e){} }
        else toast(la&&la.letter?'“'+la.letter.name+'” is attached':'No offer letter attached yet');
        return;
      }
      if((el=t.closest('[data-ad-oseg]'))){ fOffer=el.getAttribute('data-ad-oseg'); renderOfferRows(); return; }
      if((el=t.closest('[data-ad-offergo]'))){
        fOffer=el.getAttribute('data-ad-offergo'); goA('offered'); renderOfferRows(); return;
      }
      if((el=t.closest('[data-ad-offer]'))){
        var pr2=el.getAttribute('data-ad-offer').split(':');
        setOffer(DB.apps[pr2[0]],pr2[1]); return;
      }
      if((el=t.closest('[data-ad-adv]'))){ var av=DB.apps[el.getAttribute('data-ad-adv')];
        if(av&&av.stage<4) moveStage(av,av.stage+1); return; }
      if((el=t.closest('[data-ad-rej]'))){ rejectAppById(DB.apps[el.getAttribute('data-ad-rej')]); return; }
      if((el=t.closest('[data-ad-app]'))){ openAppDrawer(el.getAttribute('data-ad-app')); return; }
      if((el=t.closest('[data-ad-stage]'))){ setStage(+el.getAttribute('data-ad-stage')); return; }
      if(t.closest('#adAdvance')){ if(curApp&&curApp.stage<4) setStage(curApp.stage+1); return; }
      if(t.closest('#adReject')){ rejectApp(); return; }
      return;
    }
  });

  /* inputs */
  $('#crLookId').addEventListener('keydown',function(e){ if(e.key==='Enter') lookup(this.value); });
  $('#apPitch').addEventListener('input',function(){
    var n=this.value.trim().length; $('#apCount').textContent=n+' characters · 100 minimum'+(n>=100?' ✓':'');
    $('#apCount').style.color=n>=100?'var(--good)':'var(--muted)'; });
  $('#adJobSearch').addEventListener('input',renderJobRows);
  $('#adHiredSearch').addEventListener('input',renderHiredRows);
  $('#adShortSearch').addEventListener('input',renderShortRows);
  $('#adIntvSearch').addEventListener('input',renderIntvRows);
  $('#adShortSearch').addEventListener('input',renderShortRows);
  $('#adIntvSearch').addEventListener('input',renderIntvRows);
  aw.addEventListener('change',function(e){
    var el=e.target, k;
    if(!el||!el.getAttribute) return;
    if((k=el.getAttribute('data-wk-role'))){
      var m=DB.team.filter(function(x){return x.id===k})[0];
      if(m && m.role!=='owner'){ m.role=el.value; m.perms=null; save(); renderTeam();
        toast(m.name.split(' ')[0]+' is now '+(ROLES[m.role]||ROLES.custom).n.toLowerCase()); }
      return;
    }
    if((k=el.getAttribute('data-wk-pref'))){ DB.channels.prefs[k]=el.value; save(); toast('Booking rules saved'); return; }
    if((k=el.getAttribute('data-wk-set')) && el.tagName==='SELECT'){ DB.settings[k]=el.value; save(); toast('Settings saved'); return; }
  });
  aw.addEventListener('input',function(e){
    var el=e.target, k;
    if(!el||!el.getAttribute) return;
    if((k=el.getAttribute('data-wk-set')) && el.tagName==='INPUT'){
      DB.settings[k]=el.value; save();
      if(k==='head'||k==='ws') renderAll();
    }
  });
  ['input','change'].forEach(function(ev){ $('#adJoinDate').addEventListener(ev,joinNote); });
  $('#adJoinDate').addEventListener('keydown',function(e){ if(e.key==='Enter') confirmJoin(); });
  $('#adLetterFile').addEventListener('change',function(){
    var f=this.files&&this.files[0], ap=DB.apps[pendingLetter];
    if(!f||!ap){ pendingLetter=null; pendingStage=null; return; }
    var meta={name:f.name,size:f.size,type:f.type,at:Date.now()};
    function finish(){
      ap.letter=meta;
      ap.events.push({t:Date.now(),b:'Offer letter attached',p:f.name+' was added to this application.'});
      save();
      var goStage=pendingStage; pendingLetter=null; pendingStage=null;
      if(goStage!=null){
        if(curApp&&curApp.id===ap.id) setStage(goStage); else moveStage(ap,goStage);
        toast('Offer letter attached · moved to Offer');
      } else {
        renderAdmin();
        if(shown&&shown.id===ap.id) showApp(ap);
        toast('Offer letter attached');
      }
    }
    if(f.size<3500000){
      var fr=new FileReader();
      fr.onload=function(){ meta.data=fr.result; finish(); };
      fr.onerror=finish;
      fr.readAsDataURL(f);
    } else finish();
  });
  ['jfTitle','jfSummary','jfLoc','jfType','jfSetup','jfRetainer','jfCommission','jfVoice'].forEach(function(id){
    var e=$('#'+id); if(e){ e.addEventListener('input',jfPreview); e.addEventListener('change',jfPreview); }
  });
  ['adAppJob','adAppSearch'].forEach(function(i){ $('#'+i).addEventListener('input',renderAppRows); });
  $('#adPass').addEventListener('keydown',function(e){ if(e.key==='Enter') $('#adGo').click(); });
  (function(){
    var pbox=$('#apPhotoBox'), pin=$('#apPhoto');
    pin.addEventListener('change',function(){ if(this.files&&this.files[0]) readPhoto(this.files[0]); });
    ['dragenter','dragover'].forEach(function(ev){ pbox.addEventListener(ev,function(e){e.preventDefault();pbox.classList.add('hot');}); });
    ['dragleave'].forEach(function(ev){ pbox.addEventListener(ev,function(){pbox.classList.remove('hot');}); });
    pbox.addEventListener('drop',function(e){ e.preventDefault(); pbox.classList.remove('hot');
      if(e.dataTransfer&&e.dataTransfer.files[0]) readPhoto(e.dataTransfer.files[0]); });
  })();
  (function(){
    var drop=$('#apDrop'), file=$('#apFile');
    file.addEventListener('change',function(){ if(!this.files||!this.files[0])return; var f=this.files[0];
      form.file=f.name; drop.classList.add('has'); drop.classList.remove('bad');
      $('#apDropT').textContent=f.name; $('#apDropS').textContent=Math.max(1,Math.round(f.size/1024))+' KB · click to replace'; });
    ['dragenter','dragover'].forEach(function(ev){ drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add('hot');}); });
    ['dragleave','drop'].forEach(function(ev){ drop.addEventListener(ev,function(){drop.classList.remove('hot');}); });
  })();
  window.addEventListener('focus',function(){
    /* the file dialog was dismissed without choosing anything */
    setTimeout(function(){
      if(pendingStage!=null && pendingLetter){
        var pa=DB.apps[pendingLetter];
        if(!pa||!pa.letter) toast('Offer not sent — an offer letter is required');
        pendingLetter=null; pendingStage=null;
      }
    },500);
  });

  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape') return;
    if($('#adJoinDw').classList.contains('open')){
      closeJoinDw(); toast('Offer not sent — the joining date was not confirmed'); return; }
    if(aw.classList.contains('open')){ var d=$('.ad__dw.open',aw); if(d){d.classList.remove('open');} else closeAdmin(); return; }
    if(cw.classList.contains('open')) closeCareers();
  });

  /* deep links */
  function fromHash(){
    var h=location.hash||'';
    if(h.indexOf('#admin')===0){ openAdmin(); return; }
    if(h.indexOf('#careers')!==0) return;
    var p=h.replace('#careers','').replace(/^\//,'');
    openCareers('roles');
    if(p.indexOf('status')===0){
      goC('status'); renderMine(); renderDemoHint();
      var tid=p.split('/')[1];
      if(tid){ $('#crLookId').value=tid.toUpperCase(); lookup(tid); }
    }
    else if(p) openJob(p);
  }
  window.addEventListener('hashchange',fromHash);

  setInterval(function(){
    try{ if(runInterviewReminders===undefined) return; }catch(e){ return; }
    var before=JSON.stringify(allApps().map(function(a){ return a.iv&&a.iv.remindedFor; }));
    runInterviewReminders(); runOfferReminders();
    if(JSON.stringify(allApps().map(function(a){ return a.iv&&a.iv.remindedFor; }))!==before){
      renderAdmin(); renderMine();
      if(shown) showApp(shown);
    }
  },60000);

  wkInit(); renderAll(); renderAdmin(); goA('overview'); fromHash();
})();
