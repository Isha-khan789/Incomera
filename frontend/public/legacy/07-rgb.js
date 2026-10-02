/* ===== INDUSTRIES — master/detail console ===== */
  (function(){
    var listEl=document.getElementById('serveList'), detEl=document.getElementById('serveDetail');
    if(!listEl||!detEl) return;
    var tr=document.getElementById('serveTrack'); if(tr) tr.innerHTML=tr.innerHTML+tr.innerHTML;
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var BLUE='36,86,230', CYAN='14,166,196';
    function rgb(i){return i%2===0?BLUE:CYAN;}

    var DATA=[
      {nm:'SaaS & Software',id:'VRT-01',n:4210,seed:1.3,
       ic:'<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 8.5h18"/><path d="M9.6 12.4 8 14l1.6 1.6M14.4 12.4 16 14l-1.6 1.6"/>',
       desc:'PLG funnels, demo requests, and trial nudges — qualified and converted before they cool.',
       stats:[['Reply rate','38%'],['Meetings / wk','142'],['Avg cycle','18d'],['Win rate','24%']]},
      {nm:'Fintech & Banking',id:'VRT-02',n:3180,seed:4.6,
       ic:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 14.6l2.3-2 2 1.5 3-3"/>',
       desc:'Compliant outreach and instant lead routing for high-trust financial buyers.',
       stats:[['Reply rate','31%'],['Meetings / wk','96'],['Avg cycle','34d'],['Win rate','19%']]},
      {nm:'Healthcare & Life Sci',id:'VRT-03',n:2640,seed:2.1,
       ic:'<path d="M12 3l7 2.5v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9v-5L12 3z"/><path d="M12 9.5v5M9.5 12h5"/>',
       desc:'Privacy-aware intake, instant triage, and meetings that actually hold.',
       stats:[['Reply rate','27%'],['Meetings / wk','74'],['Avg cycle','41d'],['Win rate','17%']]},
      {nm:'Agencies & Marketing',id:'VRT-04',n:3920,seed:5.4,
       ic:'<path d="M3 10.5v3l11 4.5V6L3 10.5z"/><path d="M17 9.6a4 4 0 0 1 0 4.8"/><path d="M6 14v3"/>',
       desc:'Pipeline for the pitch — prospecting that runs while your team creates.',
       stats:[['Reply rate','44%'],['Meetings / wk','168'],['Avg cycle','12d'],['Win rate','29%']]},
      {nm:'Professional Services',id:'VRT-05',n:1870,seed:3.0,
       ic:'<rect x="3" y="7.5" width="18" height="11" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
       desc:'Consults booked for you while your team stays billable and focused.',
       stats:[['Reply rate','35%'],['Meetings / wk','58'],['Avg cycle','22d'],['Win rate','26%']]},
      {nm:'Real Estate & PropTech',id:'VRT-06',n:2250,seed:6.1,
       ic:'<path d="M4 20V7.5l8-3.5 8 3.5V20"/><path d="M4 20h16M9 11h2M13 11h2M9 15h2M13 15h2"/>',
       desc:'Speed-to-lead that wins the listing and books the showing first.',
       stats:[['Reply rate','52%'],['Meetings / wk','120'],['Avg cycle','9d'],['Win rate','33%']]},
      {nm:'E-commerce & Retail',id:'VRT-07',n:2980,seed:2.7,
       ic:'<path d="M6 8h12l-1 11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
       desc:'Wholesale outreach and B2B reorders, handled from first touch to PO.',
       stats:[['Reply rate','40%'],['Meetings / wk','134'],['Avg cycle','15d'],['Win rate','28%']]},
      {nm:'Manufacturing & Industrial',id:'VRT-08',n:1540,seed:4.0,
       ic:'<circle cx="12" cy="12" r="3.1"/><path d="M12 4v2.2M12 17.8V20M4 12h2.2M17.8 12H20M6.4 6.4l1.5 1.5M16.1 16.1l1.5 1.5M17.6 6.4l-1.5 1.5M7.9 16.1l-1.5 1.5"/>',
       desc:'Long, technical buying cycles nurtured automatically from inquiry to PO.',
       stats:[['Reply rate','22%'],['Meetings / wk','46'],['Avg cycle','63d'],['Win rate','15%']]}
    ];

    var rows=[], cur=-1, userPick=0;
    DATA.forEach(function(d,i){
      d._v=d.n;
      var r=document.createElement('div'); r.className='vrow'; r.style.setProperty('--fc',rgb(i));
      r.innerHTML='<span class="vrow__ic"><svg viewBox="0 0 24 24">'+d.ic+'</svg></span>'+
        '<span class="vrow__nm">'+d.nm+'<small>'+d.id+'</small></span>'+
        '<span class="vrow__n"><b>'+d.n.toLocaleString()+'</b><small>in motion</small></span>';
      r.addEventListener('click',function(){ userPick=performance.now(); select(i); });
      listEl.appendChild(r); rows.push(r);
    });

    detEl.insertAdjacentHTML('beforeend',
      '<div class="idetail__hd"><div class="idetail__ic" id="dIc"></div>'+
      '<div><div class="idetail__id" id="dId"></div><h3 id="dNm"></h3></div>'+
      '<span class="idetail__status"><i></i>Active</span></div>'+
      '<p class="idetail__desc" id="dDesc"></p>'+
      '<div class="idetail__stats" id="dStats"></div>'+
      '<div class="idetail__chart"><canvas id="dSpark"></canvas></div>'+
      '<div class="idetail__feed"><div class="h">Live activity · this vertical</div><div id="dFeed"></div></div>');
    var dIc=document.getElementById('dIc'),dId=document.getElementById('dId'),dNm=document.getElementById('dNm'),
        dDesc=document.getElementById('dDesc'),dStats=document.getElementById('dStats'),
        dFeed=document.getElementById('dFeed'),dCanvas=document.getElementById('dSpark');
    var dctx=dCanvas.getContext('2d'), dW=0,dH=0,ddpr=1, det={rgb:BLUE,seed:1.3};
    function sizeSpark(){var r=dCanvas.getBoundingClientRect();ddpr=Math.min(window.devicePixelRatio||1,2);
      dW=r.width||400;dH=r.height||92;dCanvas.width=dW*ddpr;dCanvas.height=dH*ddpr;dctx.setTransform(ddpr,0,0,ddpr,0,0);}
    window.addEventListener('resize',sizeSpark);

    var scanEl=document.getElementById('serveScan'), actEl=document.getElementById('serveActive');
    function totalActive(){var s=0;DATA.forEach(function(d){s+=d._v;});return s;}

    var actions=['MEETING BOOKED','DEAL WON','LEAD ROUTED','REPLY SENT','DEMO SET','QUOTE SENT','RENEWAL'];
    function clock(){var dd=new Date();function p(n){return(n<10?'0':'')+n;}return p(dd.getHours())+':'+p(dd.getMinutes())+':'+p(dd.getSeconds());}
    function pushScoped(i){
      var a=actions[(Math.random()*actions.length)|0];
      var row=document.createElement('div'); row.className='idfeed__row';
      row.innerHTML='<span class="t">'+clock()+'</span><span class="v">▸ '+DATA[i].nm+'</span><span class="a">'+a+'</span>';
      dFeed.insertBefore(row,dFeed.firstChild);
      while(dFeed.children.length>4) dFeed.removeChild(dFeed.lastChild);
    }

    function select(i){
      if(i===cur) return; if(cur>=0) rows[cur].classList.remove('on');
      cur=i; rows[i].classList.add('on');
      var d=DATA[i], col=rgb(i);
      detEl.style.setProperty('--fc',col);
      dIc.innerHTML='<svg viewBox="0 0 24 24">'+d.ic+'</svg>';
      dId.textContent=d.id+' · LIVE';
      dNm.textContent=d.nm;
      dDesc.textContent=d.desc;
      dStats.innerHTML=d.stats.map(function(s){return '<div class="istat"><div class="sv">'+s[1]+'</div><div class="sk">'+s[0]+'</div></div>';}).join('');
      det.rgb=col; det.seed=d.seed;
      if(scanEl) scanEl.innerHTML=d.nm;
      dFeed.innerHTML=''; for(var k=0;k<3;k++) pushScoped(i);
    }

    function osc(t,s){return Math.sin(t*0.9+s)*0.5+Math.sin(t*2.1+s*1.6)*0.3+Math.sin(t*3.7+s*0.5)*0.16;}
    function sval(t,seed){return t*0.5+osc(t,seed)*1.3+3;}
    var ST=8, last=performance.now();
    function drawSpark(){
      var ctx=dctx,W=dW,H=dH,NS=Math.max(40,(W/5)|0),WIN=5.5,seed=det.seed,col=det.rgb;
      var lo=1e9,hi=-1e9,arr=[];
      for(var i=0;i<NS;i++){var ti=ST-WIN*(1-i/(NS-1));var v=sval(ti,seed);arr.push(v);if(v<lo)lo=v;if(v>hi)hi=v;}
      var rng=Math.max(hi-lo,1e-3);lo-=rng*0.2;hi+=rng*0.25;
      function X(i){return (i/(NS-1))*W;} function Y(v){return H-3-(v-lo)/(hi-lo)*(H-9);}
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='rgba(14,35,80,0.05)';ctx.lineWidth=1;
      for(var g=0;g<=2;g++){var yy=4+(H-9)*g/2;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(W,yy);ctx.stroke();}
      ctx.beginPath();ctx.moveTo(0,Y(arr[0]));for(var i=1;i<NS;i++)ctx.lineTo(X(i),Y(arr[i]));
      ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();
      var gd=ctx.createLinearGradient(0,0,0,H);gd.addColorStop(0,'rgba('+col+',0.24)');gd.addColorStop(1,'rgba('+col+',0)');
      ctx.fillStyle=gd;ctx.fill();
      ctx.beginPath();ctx.moveTo(0,Y(arr[0]));for(var i=1;i<NS;i++)ctx.lineTo(X(i),Y(arr[i]));
      ctx.shadowColor='rgba('+col+',0.5)';ctx.shadowBlur=7;ctx.strokeStyle='rgb('+col+')';ctx.lineWidth=2;ctx.lineJoin='round';ctx.stroke();ctx.shadowBlur=0;
      var lx=X(NS-1),ly=Y(arr[NS-1]),pulse=0.5+0.5*Math.sin(ST*5);
      ctx.fillStyle='rgb('+col+')';ctx.beginPath();ctx.arc(lx,ly,2.6,0,7);ctx.fill();
      ctx.strokeStyle='rgba('+col+','+(0.4*(1-pulse*0.5)).toFixed(2)+')';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(lx,ly,3+pulse*4,0,7);ctx.stroke();
    }
    function loop(now){var dt=Math.min(now-last,50);last=now;if(!reduce)ST+=dt/1000*0.45;drawSpark();if(!reduce)requestAnimationFrame(loop);}

    sizeSpark(); select(0);
    if(reduce){ drawSpark(); if(actEl)actEl.textContent=totalActive().toLocaleString(); }
    else {
      requestAnimationFrame(loop);
      setInterval(function(){ if(performance.now()-userPick<6500) return; select((cur+1)%DATA.length); },2600);
      setInterval(function(){ if(cur>=0) pushScoped(cur); },1500);
      setInterval(function(){
        DATA.forEach(function(d,i){ if(Math.random()<0.6){ d._v+=Math.floor(Math.random()*5);
          var b=rows[i].querySelector('.vrow__n b'); if(b)b.textContent=d._v.toLocaleString(); } });
        if(actEl) actEl.textContent=totalActive().toLocaleString();
      },1600);
    }
  })();
