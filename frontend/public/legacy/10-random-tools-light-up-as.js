/* ===== STACK STRIP — live integrations ===== */
  (function(){
    var wrap=document.getElementById('stack'); if(!wrap) return;
    var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var A=document.getElementById('stkA'), B=document.getElementById('stkB');

    var ROW1=[
      ['CRM','HubSpot'],['CRM','Salesforce'],['CRM','Pipedrive'],['CRM','Zoho'],['CRM','Close'],
      ['CRM','Attio'],['CRM','Copper'],['CRM','Monday'],
      ['Inbox','Gmail'],['Inbox','Outlook'],['Inbox','Front'],['Inbox','Superhuman'],
      ['Calendar','Google Calendar'],['Calendar','Calendly'],['Calendar','Chili Piper'],['Calendar','Cal.com'],
      ['Comms','Slack'],['Comms','Teams'],['Comms','Twilio'],['Comms','WhatsApp Business'],
      ['Chat','Intercom'],['Chat','Drift'],['Chat','Crisp']
    ];
    var ROW2=[
      ['Outreach','Instantly'],['Outreach','Smartlead'],['Outreach','Lemlist'],['Outreach','Outreach.io'],
      ['Outreach','Salesloft'],['Outreach','Reply.io'],['Outreach','Woodpecker'],['Outreach','Apollo'],
      ['LinkedIn','Sales Navigator'],['LinkedIn','Expandi'],['LinkedIn','HeyReach'],['LinkedIn','Dripify'],
      ['Data','Clay'],['Data','ZoomInfo'],['Data','Clearbit'],['Data','Hunter'],['Data','Cognism'],
      ['Data','PhantomBuster'],
      ['Lifecycle','Customer.io'],['Lifecycle','Braze'],['Lifecycle','Mailchimp'],
      ['Billing','Stripe'],['Billing','Chargebee'],['Billing','Paddle'],['Billing','Recurly'],
      ['Analytics','Segment'],['Analytics','Mixpanel'],['Analytics','Amplitude'],
      ['Ads','Google Ads'],['Ads','Meta Ads'],
      ['Ops','Zapier'],['Ops','Make'],['Ops','Airtable'],['Ops','Notion']
    ];

    function chip(t){ return '<span class="chip live"><u>'+t[0]+'</u>'+t[1]+'</span>'; }
    function fill(el,rows){ var h=rows.map(chip).join(''); el.innerHTML = reduce ? h : h+h; }
    fill(A,ROW1); fill(B,ROW2);

    if(reduce) return;

    /* random tools light up as "syncing" */
    var chips=wrap.querySelectorAll('.chip');
    var timer=null;
    function pulse(){
      var el=chips[(Math.random()*chips.length)|0];
      el.classList.add('sync');
      var twin=[].filter.call(chips,function(x){ return x!==el && x.textContent===el.textContent; })[0];
      if(twin) twin.classList.add('sync');
      setTimeout(function(){
        el.classList.remove('sync'); if(twin) twin.classList.remove('sync');
      },1500+Math.random()*900);
    }
    function run(){ if(!timer) timer=setInterval(pulse,700); }
    function stop(){ clearInterval(timer); timer=null; }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(en){
        en.forEach(function(e){ e.isIntersecting ? run() : stop(); });
      },{threshold:.15}).observe(wrap);
    } else { run(); }
  })();
