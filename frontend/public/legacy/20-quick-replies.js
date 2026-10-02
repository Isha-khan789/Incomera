/* ===== LIVE CHAT WIDGET ===== */
  (function(){
    var root=document.getElementById('chatw');
    if(!root) return;
    var btn=document.getElementById('chatBtn'),
        panel=document.getElementById('chatPanel'),
        log=document.getElementById('chatLog'),
        chips=document.getElementById('chatChips'),
        input=document.getElementById('chatInput'),
        send=document.getElementById('chatSend'),
        dot=document.getElementById('chatDot'),
        teaser=document.getElementById('chatTeaser'),
        tx=document.getElementById('chatTx'),
        minBtn=document.getElementById('chatMin');

    function esc(s){ return String(s).replace(/[&<>"]/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
    function clock(){ var d=new Date();
      return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }

    var started=false, busy=false, unread=0, threadId=null;
    function mirror(who,text){
      try{
        if(typeof window.incomeraChat!=='function') return;
        threadId=window.incomeraChat({id:threadId, who:who,
          body:String(text).replace(/<[^>]+>/g,''),
          name:'Website visitor', page:(location.hash||'/#top')})||threadId;
      }catch(e){}
    }

    function stamp(who){
      var s=document.createElement('span');
      s.className='chatw__t'+(who==='u'?' chatw__t--u':'');
      s.textContent=(who==='u'?'You · ':'Rana · ')+clock();
      log.appendChild(s);
    }
    function bubble(who,html){
      var d=document.createElement('div');
      d.className='chatw__m chatw__m--'+who;
      d.innerHTML=html;
      log.appendChild(d);
      stamp(who);
      log.scrollTop=log.scrollHeight;
      return d;
    }
    function typing(on){
      var ex=log.querySelector('.chatw__typ');
      if(!on){ if(ex) ex.remove(); return; }
      if(ex) return;
      var t=document.createElement('div');
      t.className='chatw__typ';
      t.innerHTML='<i></i><i></i><i></i>';
      log.appendChild(t);
      log.scrollTop=log.scrollHeight;
    }
    function botSay(html,after,delay){
      busy=true; typing(true);
      setTimeout(function(){
        typing(false); bubble('b',html);
        mirror('bot',html);
        busy=false;
        if(!root.classList.contains('open')){ unread++; dot.textContent=unread; dot.classList.add('on'); }
        if(after) after();
      }, delay || (700+Math.min(html.length*11,1400)));
    }

    /* --- quick replies --- */
    var CHIPS=[
      {k:'What does it cost?'},
      {k:'What is the free proposal?'},
      {k:'How long until it is live?'},
      {k:'Do I need a new CRM?'},
      {k:'Book a meeting'}
    ];
    function setChips(list){
      chips.innerHTML='';
      (list||CHIPS).forEach(function(c){
        var b=document.createElement('button');
        b.className='chatw__chip'; b.type='button'; b.textContent=c.k;
        b.addEventListener('click',function(){ if(busy) return; say(c.k); });
        chips.appendChild(b);
      });
    }

    /* --- answers --- */
    function openAudit(){
      var t=document.querySelector('.js-audit-open');
      if(t){ close(); setTimeout(function(){ t.click(); },260); }
    }
    var AUDIT_LINK='<button class="chatw__chip" type="button" data-cw-audit style="margin-top:9px">Get a proposal &rarr;</button>';
    var BOOK_LINK='<button class="chatw__chip js-book-open" type="button" style="margin-top:9px">Pick a slot &rarr;</button>';

    var RULES=[
      {re:/(cost|price|pricing|how much|fee|charge|budget|expensive)/i,
       a:'It is a <b>single one-time setup fee</b> &mdash; proposal, build, training and launch, billed once. There is nothing monthly behind it and no change orders halfway through. The exact number depends on which engine you need, so the packages section on this page will show you the figure for each. '+AUDIT_LINK},
      {re:/(proposal|audit|leak|leaking|baseline|outcome|free)/i,
       a:'The proposal is free and there is no pitch attached. It comes in two halves. The <b>baseline</b>: where your leads and trials are dying today, how long they wait before anyone touches them, and what that gap costs you a month. Then the <b>outcome</b>: what we would build, what it should move, and what it costs. It lands within 24 hours. '+AUDIT_LINK},
      {re:/(how long|timeline|when|live|30 day|thirty|fast|quick)/i,
       a:'<b>30 days, proposal to launch.</b> Days 1&ndash;5 we set the baseline, 6&ndash;18 we build, 19&ndash;25 we train it on your voice and rules, 26&ndash;30 we launch and tune. Most clients see their first bookings inside week one after go-live.'},
      {re:/(crm|stack|tool|hubspot|salesforce|migrat|integrat|new system|seats)/i,
       a:'No migration and no new software. It runs <b>inside the stack you already pay for</b> &mdash; your CRM, inbox, calendar and billing stay exactly where they are. Nobody on your team has to learn a new tool, and the domains, sequences and records stay in your accounts.'},
      {re:/(meeting|booking|calendar|appointment|outbound|cold)/i,
       a:'That is the <b>Meeting Engine</b>. We source and verify accounts against your market, open the conversation in your voice, work every reply until it qualifies, and drop the real ones on your calendar with the context already attached. Median first reply is 8 seconds, any hour of the day.'},
      {re:/(subscri|trial|churn|retain|upgrade|payment|dunning|mrr|recurring)/i,
       a:'That is the <b>Subscription Engine</b>. Trials nurtured, the upgrade asked for at the right moment, cancel intent caught, and failed payments chased until they clear. If you do not have trials or signups yet, we build the acquisition half first and put this on top of it.'},
      {re:/(book|slot|calendar|schedule|human|person|real|agent|call me|speak|talk)/i,
       a:'Happy to. Pick a slot that suits you and a <b>named operator</b> &mdash; not a bot, not a junior &mdash; will be on the call. Thirty minutes, no deck. '+BOOK_LINK},
      {re:/(job|hiring|career|apply|role|vacanc)/i,
       a:'We are hiring. The <b>Careers</b> link in the top navigation has every open role, and applications take a few minutes. You can check where yours stands at any point with the tracking ID we email you.'},
      {re:/(industry|sector|saas|fintech|health|agency|ecommerce|b2b|work with)/i,
       a:'SaaS, fintech, healthcare, agencies, professional services, property, e-commerce and manufacturing, plus a long tail beyond that. We do not reuse playbooks though &mdash; whatever we build is written from <b>your</b> market and offer, and it stays yours.'},
      {re:/(data|own|keep|leave|cancel|contract|lock)/i,
       a:'Everything stays yours. Domains, sequences, lists and records live in <b>your</b> accounts, not ours. If you ever stop working with us, the engine and its data stay behind with you.'},
      {re:/(hi|hey|hello|salam|good morning|good evening)/i,
       a:'Hey! Good to have you here. What are you trying to fix &mdash; not enough meetings, or signups that never turn into paying subscribers?'},
      {re:/(thank|thanks|cheers|great|nice|ok|okay)/i,
       a:'Any time. If you want the specifics for your own numbers, the proposal is the fastest way to get them. '+AUDIT_LINK}
    ];
    function answer(q){
      for(var i=0;i<RULES.length;i++){ if(RULES[i].re.test(q)) return RULES[i].a; }
      return 'Good question &mdash; let me get that to the operator who can answer it properly. In the meantime, the fastest way to a real answer about your own numbers is the free proposal: you tell us which end is leaking and we send back the baseline and the outcome within 24 hours. '+AUDIT_LINK;
    }

    function say(text){
      if(busy) return;
      bubble('u',esc(text));
      mirror('v',text);
      botSay(answer(text));
    }

    /* --- open / close --- */
    function start(){
      if(started) return;
      started=true;
      var d=document.createElement('span');
      d.className='chatw__day'; d.textContent='Today · '+clock();
      log.appendChild(d);
      botSay('Hi, I am Rana &mdash; I run income engines here at Incomera. Ask me anything about how this works, what it costs, or how fast it goes live.',function(){
        botSay('If it is easier, tap one of the questions below.',null,600);
      },500);
      setChips();
    }
    function open(){
      root.classList.add('open','seen');
      panel.setAttribute('aria-hidden','false');
      btn.setAttribute('aria-expanded','true');
      btn.setAttribute('aria-label','Close chat');
      unread=0; dot.classList.remove('on');
      hideTeaser();
      start();
      setTimeout(function(){ log.scrollTop=log.scrollHeight; if(window.innerWidth>600) input.focus(); },320);
    }
    function close(){
      root.classList.remove('open');
      panel.setAttribute('aria-hidden','true');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Open chat');
    }
    function toggle(){ root.classList.contains('open')?close():open(); }

    function hideTeaser(){ if(teaser) teaser.classList.remove('on'); }

    btn.addEventListener('click',toggle);
    if(minBtn) minBtn.addEventListener('click',close);
    if(tx) tx.addEventListener('click',function(e){ e.stopPropagation(); hideTeaser(); root.classList.add('seen'); });
    if(teaser) teaser.addEventListener('click',function(e){ if(e.target!==tx) open(); });

    /* audit buttons rendered inside bot bubbles */
    log.addEventListener('click',function(e){
      var b=e.target.closest&&e.target.closest('[data-cw-audit]');
      if(b) openAudit();
    });

    /* composer */
    function sync(){
      var v=input.value.trim();
      send.classList.toggle('on',!!v);
      input.style.height='auto';
      input.style.height=Math.min(input.scrollHeight,88)+'px';
    }
    input.addEventListener('input',sync);
    input.addEventListener('keydown',function(e){
      if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); submit(); }
    });
    function submit(){
      var v=input.value.trim();
      if(!v||busy) return;
      input.value=''; sync();
      say(v);
    }
    send.addEventListener('click',submit);

    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&root.classList.contains('open')) close();
    });

    /* proactive teaser once, after a while on page */
    setTimeout(function(){
      if(!root.classList.contains('open')&&!root.classList.contains('seen')&&teaser){
        teaser.classList.add('on');
        unread=1; dot.textContent='1'; dot.classList.add('on');
      }
    },14000);

    /* hide behind overlays and modals */
    var cw=document.getElementById('careersWrap'), aw=document.getElementById('adminWrap');
    function overlayed(){
      return document.body.classList.contains('modal-open')
        || (cw&&cw.classList.contains('open'))
        || (aw&&aw.classList.contains('open'));
    }
    function guard(){
      var h=overlayed();
      root.classList.toggle('hide',h);
      if(h) close();
    }
    if(window.MutationObserver){
      var mo=new MutationObserver(guard);
      mo.observe(document.body,{attributes:true,attributeFilter:['class']});
      if(cw) mo.observe(cw,{attributes:true,attributeFilter:['class']});
      if(aw) mo.observe(aw,{attributes:true,attributeFilter:['class']});
    }
    guard();
  })();
