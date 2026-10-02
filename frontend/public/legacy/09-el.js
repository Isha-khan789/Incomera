/* ===== ENGINE SWITCH — meetings vs subscriptions ===== */
  (function(){
    var card=document.getElementById('pkgCard'), sw=document.getElementById('pkgSwitch');
    if(!card||!sw) return;
    var CK='<span class="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span>';
    var ENG={
      meet:{
        plan:'Meeting Engine',
        icon:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><path d="M8.5 14.5l2.2 2.2 4.3-4.3"/></svg>',
        out:'Booked meetings, every single day',
        desc:'A meeting is won or lost in the first few minutes. We build the motion that gets there first \u2014 sourcing the accounts worth your time, opening the conversation in your voice, working every reply until it is qualified, and putting the real ones on your calendar with the context already attached. You show up prepared. That is the whole job.',
        steps:['<b>Source and verify.</b> Accounts matched to your ICP, contacts enriched and email-verified before a single send.',
               '<b>Open and work the reply.</b> Multi-channel sequences, objection handling in your voice, every response answered in seconds.',
               '<b>Qualify, book, protect.</b> Fit checked against your rules, slot booked against real availability, reminders and no-show recovery on top.'],
        list:['Targeted outbound plus inbound capture on every form, chat and inbox',
              'Reply qualification and instant routing to the right rep',
              'Calendar booking, reminders, reschedules and no-show recovery',
              'Deliverability managed \u2014 domains, warming, sending limits',
              'Copy, list and send timing tuned every single day'],
        buy:'A calendar that fills itself while you work.',
        price:'$2,200',
        meta:[['Live in','30 days'],['Response time','Under 10 seconds'],['Reporting','Daily'],['You handle','Showing up']],
        note:'Median inbound response of 8 seconds, around the clock. Most clients see their first engine-booked meeting inside the first week of go-live.'
      },
      sub:{
        plan:'Subscription Engine',
        icon:'<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5"/><path d="M20 4.5v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5"/><path d="M4 19.5v-4h4"/></svg>',
        out:'Recurring income, every month',
        desc:'Signups are not income. The gap between a trial starting and a card being charged is where most recurring revenue quietly dies. We build the motion that lives in that gap \u2014 nurturing every trial against what they actually did in the product, asking for the upgrade at the moment intent peaks, rescuing the payments that fail, and going back for the ones who left.',
        steps:['<b>Watch the signal.</b> Product usage, email engagement and trial age scored into one intent picture per account.',
               '<b>Nurture and ask.</b> Sequences that respond to behaviour, not calendars \u2014 and an upgrade prompt timed to the moment it lands.',
               '<b>Keep and recover.</b> Failed payments chased, cancellations intercepted, churned accounts re-approached with a reason to return.'],
        list:['Trial, freemium and post-demo nurture built on real usage signals',
              'Upgrade and expansion prompts timed to intent, not to a drip schedule',
              'Failed-payment and dunning recovery before the account lapses',
              'Cancellation save flows and win-back for churned accounts',
              'Cohort reporting on trial-to-paid, expansion and recovered revenue'],
        buy:'Income that renews without anyone chasing it.',
        price:'$4,000',
        meta:[['Live in','30 days'],['Runs against','Product + billing data'],['Reporting','Daily'],['You handle','Building the product']],
        note:'Every trial, prospect and lapsed account stays in a flow until it converts or opts out. Nothing goes quiet because a follow-up was somebody\u2019s side task.'
      }
    };
    var ids={ic:'pkgIc',name:'pkgName',out:'pkgOut',desc:'pkgDesc',list:'pkgList',steps:'pkgSteps',
             meta:'pkgMeta',buy:'pkgBuy',price:'pkgPrice',note:'pkgNote'};
    function el(k){ return document.getElementById(ids[k]); }
    function paint(k){
      var e=ENG[k];
      el('ic').innerHTML=e.icon;
      el('name').textContent=e.plan;
      el('out').textContent=e.out;
      el('desc').textContent=e.desc;
      el('list').innerHTML=e.list.map(function(x){ return '<li>'+CK+x+'</li>'; }).join('');
      el('steps').innerHTML=e.steps.map(function(x){ return '<li>'+x+'</li>'; }).join('');
      el('meta').innerHTML=e.meta.map(function(r){ return '<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>'; }).join('');
      el('buy').textContent=e.buy;
      el('price').textContent=e.price;
      el('note').textContent=e.note;
      card.setAttribute('data-eng',k);
      sw.classList.toggle('is-sub',k==='sub');
      [].forEach.call(sw.querySelectorAll('.pkgsw__b'),function(b){
        var on=b.getAttribute('data-eng')===k;
        b.classList.toggle('on',on);
        b.setAttribute('aria-selected',on?'true':'false');
      });
      var st=document.getElementById('pkgStart');
      if(st) st.setAttribute('data-plan',e.plan);
    }
    function go(k){
      if(card.getAttribute('data-eng')===k) return;
      card.classList.add('pkg--swap');
      setTimeout(function(){ paint(k); card.classList.remove('pkg--swap'); },170);
    }
    [].forEach.call(sw.querySelectorAll('.pkgsw__b'),function(b){
      b.addEventListener('click',function(){ go(b.getAttribute('data-eng')); });
    });
    paint('meet');
    window.setEngine=go;
  })();
