/* ===== COMMAND CENTER DASHBOARD ===== */
  (function(){
    var modal=document.getElementById('dmodal'); if(!modal) return;
    var opens=document.querySelectorAll('.dashOpen'), body=modal.querySelector('.cc__body');
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var liveT=null, feedT=null, rafId=null;

    function fmt(v,t){
      if(t==='money'){ if(v>=1e6) return '$'+(v/1e6).toFixed(2)+'M'; if(v>=1e3) return '$'+Math.round(v).toLocaleString(); return '$'+Math.round(v); }
      if(t==='pct') return Math.round(v)+'%';
      return Math.round(v).toLocaleString();
    }
    function countUp(){
      var vs=modal.querySelectorAll('.v[data-target]'), steps=reduce?1:26;
      [].forEach.call(vs,function(el){
        var target=parseFloat(el.dataset.target), t=el.dataset.t, s=0;
        if(el._t) clearInterval(el._t);
        el._t=setInterval(function(){ s++; var p=s/steps; el.textContent=fmt(target*0.8+target*0.2*p,t);
          if(s>=steps){ clearInterval(el._t); el.textContent=fmt(target,t); } }, reduce?0:16);
      });
    }
    function animateBars(){
      requestAnimationFrame(function(){ requestAnimationFrame(function(){
        [].forEach.call(modal.querySelectorAll('[data-w]'),function(el){ el.style.width=el.dataset.w; });
      });});
    }

    /* live activity feed */
    var FEED=['<b>New lead imported</b> · Acme Corp · USA','<b>Email opened</b> · John Carter','<b>Reply received</b> · booking a meeting',
      '<b>Meeting booked</b> · tomorrow 10:00 AM','<b>Order placed</b> · PO #87456 · $12,450','<b>Invoice paid</b> · INV #55432 · $8,900',
      '<b>AI recommendation</b> · new supplier found','<b>Shipment dispatched</b> · Order #87456'];
    function seedFeed(){ var f=document.getElementById('ccFeed'); if(!f) return; f.innerHTML='';
      for(var i=0;i<5;i++){ var row=document.createElement('div'); row.className='dfeed__row';
        row.innerHTML='<span class="dfeed__dot"></span><span class="dfeed__tx">'+FEED[i%FEED.length]+'</span><span class="dfeed__t">'+((i+1)*2)+'m</span>';
        f.appendChild(row); } }
    function pushFeed(){ var f=document.getElementById('ccFeed'); if(!f) return;
      var row=document.createElement('div'); row.className='dfeed__row';
      row.innerHTML='<span class="dfeed__dot"></span><span class="dfeed__tx">'+FEED[Math.floor(Math.random()*FEED.length)]+'</span><span class="dfeed__t">now</span>';
      f.insertBefore(row,f.firstChild); while(f.children.length>5) f.removeChild(f.lastChild); }

    /* revenue trend chart */
    var CHARTS=[
      {id:'rTrend',col:'36,86,230',seed:1.7,slope:0.6,nowId:'rNow'},
      {id:'pTrend',col:'31,169,113',seed:2.9,slope:0.42,nowId:'pNow'},
      {id:'mTrend',col:'123,92,240',seed:4.1,slope:0.5,nowId:'mNow'}
    ];
    var chartT=8,lastFrame=0;
    function osc(t,s){return Math.sin(t*0.8+s)*0.5+Math.sin(t*1.9+s*1.5)*0.3+Math.sin(t*3.4+s*0.4)*0.15;}
    function sizeCharts(){ CHARTS.forEach(function(c){ var cv=document.getElementById(c.id); if(!cv){c._cv=null;return;}
      var cx=cv.getContext('2d'),r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=r.width||420,h=r.height||120;
      cv.width=w*dpr; cv.height=h*dpr; cx.setTransform(dpr,0,0,dpr,0,0); c._cv=cv; c._cx=cx; c._w=w; c._h=h; }); }
    function drawOne(c){ if(!c._cv||!c._cx) return; var cx=c._cx,W=c._w,H=c._h,col=c.col,N=Math.max(46,(W/6)|0),WIN=5.4,lo=1e9,hi=-1e9,arr=[];
      for(var i=0;i<N;i++){var ti=chartT-WIN*(1-i/(N-1));var v=ti*c.slope+osc(ti,c.seed)*1.5+4;arr.push(v);if(v<lo)lo=v;if(v>hi)hi=v;}
      var rng=Math.max(hi-lo,1e-3);lo-=rng*.24;hi+=rng*.3;
      function X(i){return (i/(N-1))*W;} function Y(v){return H-6-(v-lo)/(hi-lo)*(H-14);}
      cx.clearRect(0,0,W,H); cx.strokeStyle='rgba(14,35,80,0.06)'; cx.lineWidth=1;
      for(var g=0;g<=3;g++){var yy=6+(H-14)*g/3;cx.beginPath();cx.moveTo(0,yy);cx.lineTo(W,yy);cx.stroke();}
      cx.beginPath();cx.moveTo(0,Y(arr[0]));for(var i=1;i<N;i++)cx.lineTo(X(i),Y(arr[i]));
      cx.lineTo(W,H);cx.lineTo(0,H);cx.closePath();
      var gd=cx.createLinearGradient(0,0,0,H);gd.addColorStop(0,'rgba('+col+',0.24)');gd.addColorStop(1,'rgba('+col+',0)');cx.fillStyle=gd;cx.fill();
      cx.beginPath();cx.moveTo(0,Y(arr[0]));for(var i=1;i<N;i++)cx.lineTo(X(i),Y(arr[i]));
      cx.shadowColor='rgba('+col+',0.4)';cx.shadowBlur=8;cx.strokeStyle='rgb('+col+')';cx.lineWidth=2.2;cx.lineJoin='round';cx.stroke();cx.shadowBlur=0;
      var lx=X(N-1),ly=Y(arr[N-1]),pulse=.5+.5*Math.sin(chartT*5);
      cx.fillStyle='rgb('+col+')';cx.beginPath();cx.arc(lx,ly,3,0,7);cx.fill();
      cx.strokeStyle='rgba('+col+','+(.45*(1-pulse*.5)).toFixed(2)+')';cx.lineWidth=1.4;cx.beginPath();cx.arc(lx,ly,4+pulse*5,0,7);cx.stroke();
      var nowEl=document.getElementById(c.nowId); if(nowEl) nowEl.textContent='live · '+arr[N-1].toFixed(1)+'K';
    }
    function drawCharts(){ CHARTS.forEach(drawOne); }

    /* ---- 3D Earth globe ---- */
    var GSPANS={1:[[28,31],[20,25],[48,60]],2:[[12,26],[27,32],[41,64]],3:[[3,6],[9,26],[27,31],[36,38],[40,66]],4:[[2,6],[8,26],[28,30],[34,39],[40,67]],5:[[6,26],[34,39],[40,68]],6:[[6,25],[33,40],[41,68]],7:[[7,24],[34,41],[42,66]],8:[[8,23],[33,41],[42,58],[55,63]],9:[[8,22],[34,46],[48,50],[54,63]],10:[[9,21],[34,46],[48,51],[54,61]],11:[[12,18],[34,47],[48,52],[54,60]],12:[[13,18],[34,46],[49,51],[54,60]],13:[[15,18],[33,45],[40,43],[55,62]],14:[[20,25],[33,44],[55,63]],15:[[20,26],[34,43],[56,63]],16:[[20,27],[35,43],[57,63]],17:[[21,28],[36,43],[58,62]],18:[[21,28],[37,43],[59,62]],19:[[21,28],[38,43],[60,65]],20:[[22,27],[38,42],[59,66]],21:[[23,27],[39,42],[59,66]],22:[[23,26],[39,41],[60,65]],23:[[23,26],[39,40],[60,64]],24:[[23,25],[60,63]],25:[[23,24],[68,69]],26:[[23,24]],27:[[23,23]],30:[[8,62]]};
    function ll2v(lonDeg,latDeg){var lo=lonDeg*Math.PI/180,la=latDeg*Math.PI/180,cl=Math.cos(la);return [cl*Math.cos(lo),cl*Math.sin(lo),Math.sin(la)];}
    var LAND=(function(){var a=[];for(var rw in GSPANS){GSPANS[rw].forEach(function(sp){for(var c=sp[0];c<=sp[1];c++){var lon=-180+(c+0.5)*(360/70),lat=83-(rw*1+0.5)*(166/33);a.push(ll2v(lon,lat));}});}return a;})();
    var HUBS=[['USA',-98,39,'#2456E6'],['Europe',10,50,'#7b5cf0'],['Asia',105,35,'#1FA971'],['MidEast',45,25,'#F59E0B'],['SAm',-60,-15,'#15C5DE'],['Aus',134,-25,'#0A7E92']].map(function(h){return {name:h[0],c:h[3],v:ll2v(h[1],h[2])};});
    var CONN=[[0,1],[1,2],[0,2],[4,0],[2,5]];
    var ecv,ectx,eW,eH,eR,ecx,ecy,earthT=0;
    function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
    function sizeEarth(){ ecv=document.getElementById('earthCanvas'); if(!ecv){ectx=null;return;} ectx=ecv.getContext('2d');
      var r=ecv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),w=r.width||260,h=r.height||150;
      ecv.width=w*dpr; ecv.height=h*dpr; ectx.setTransform(dpr,0,0,dpr,0,0); eW=w; eH=h; ecx=w/2; ecy=h/2; eR=Math.min(w,h)/2-6; }
    function slerp(a,b,t){var d=Math.max(-1,Math.min(1,dot(a,b))),o=Math.acos(d);if(o<1e-4)return a;var s=Math.sin(o),c1=Math.sin((1-t)*o)/s,c2=Math.sin(t*o)/s;return [a[0]*c1+b[0]*c2,a[1]*c1+b[1]*c2,a[2]*c1+b[2]*c2];}
    function norm3(v){var m=Math.hypot(v[0],v[1],v[2])||1;return [v[0]/m,v[1]/m,v[2]/m];}
    function drawEarth(){ if(!ectx) return; var W=eW,H=eH,R=eR,cx=ecx,cy=ecy,i,P,dp,sx,sy;
      ectx.clearRect(0,0,W,H);
      var lon0=earthT*0.3, lat0=0.32;
      var C=[Math.cos(lat0)*Math.cos(lon0),Math.cos(lat0)*Math.sin(lon0),Math.sin(lat0)];
      var eh=Math.hypot(-C[1],C[0])||1e-6, E=[-C[1]/eh,C[0]/eh,0];
      var N=[C[1]*E[2]-C[2]*E[1],C[2]*E[0]-C[0]*E[2],C[0]*E[1]-C[1]*E[0]];
      var S=norm3([C[0]*0.5+E[0]*-0.62+N[0]*0.55,C[1]*0.5+E[1]*-0.62+N[1]*0.55,C[2]*0.5+E[2]*-0.62+N[2]*0.55]);
      var lx=cx+R*dot(S,E), ly=cy-R*dot(S,N);
      // atmosphere halo
      var ga=ectx.createRadialGradient(cx,cy,R*0.93,cx,cy,R*1.28);
      ga.addColorStop(0,'rgba(96,156,255,.28)');ga.addColorStop(.55,'rgba(96,156,255,.10)');ga.addColorStop(1,'rgba(96,156,255,0)');
      ectx.fillStyle=ga;ectx.beginPath();ectx.arc(cx,cy,R*1.28,0,7);ectx.fill();
      // ocean sphere (lit)
      var og=ectx.createRadialGradient(lx,ly,R*0.08,cx,cy,R*1.02);
      og.addColorStop(0,'#e2ecff');og.addColorStop(.32,'#8fb2f0');og.addColorStop(.7,'#3f6cc4');og.addColorStop(1,'#1f3c82');
      ectx.fillStyle=og;ectx.beginPath();ectx.arc(cx,cy,R,0,7);ectx.fill();
      ectx.save();ectx.beginPath();ectx.arc(cx,cy,R,0,7);ectx.clip();
      // continents (solid tiles, lambert-shaded)
      for(i=0;i<LAND.length;i++){P=LAND[i];dp=dot(P,C);if(dp<=0.02)continue;
        var b=dot(P,S);if(b<0)b=0;var sh=0.34+0.66*b;
        sx=cx+R*dot(P,E);sy=cy-R*dot(P,N);
        var rr=(38*sh+16)|0,gg=(150*sh+42)|0,bb=(92*sh+34)|0;
        ectx.fillStyle='rgb('+rr+','+gg+','+bb+')';
        var sz=6.6*(0.42+0.58*dp);
        ectx.fillRect(sx-sz/2,sy-sz/2,sz,sz);}
      // day/night terminator + soft shading
      var ov=ectx.createRadialGradient(lx,ly,R*0.15,cx,cy,R*1.2);
      ov.addColorStop(0,'rgba(255,255,255,.12)');ov.addColorStop(.5,'rgba(255,255,255,0)');ov.addColorStop(1,'rgba(5,13,36,.52)');
      ectx.fillStyle=ov;ectx.beginPath();ectx.arc(cx,cy,R,0,7);ectx.fill();
      // sun glint
      var sp=ectx.createRadialGradient(lx,ly,0,lx,ly,R*0.3);
      sp.addColorStop(0,'rgba(255,255,255,.38)');sp.addColorStop(1,'rgba(255,255,255,0)');
      ectx.fillStyle=sp;ectx.beginPath();ectx.arc(lx,ly,R*0.3,0,7);ectx.fill();
      // routes + travelling order dots
      for(var k=0;k<CONN.length;k++){var A=HUBS[CONN[k][0]].v,Bv=HUBS[CONN[k][1]].v;
        ectx.strokeStyle='rgba(255,255,255,.5)';ectx.lineWidth=1;ectx.beginPath();var started=false;
        for(var s=0;s<=22;s++){P=slerp(A,Bv,s/22);dp=dot(P,C);if(dp<=0){started=false;continue;}
          sx=cx+R*dot(P,E);sy=cy-R*dot(P,N);if(!started){ectx.moveTo(sx,sy);started=true;}else ectx.lineTo(sx,sy);}
        ectx.stroke();
        var tt=((earthT*0.3)+k*0.37)%1, Pm=slerp(A,Bv,tt),dpm=dot(Pm,C);
        if(dpm>0){var mx=cx+R*dot(Pm,E),my=cy-R*dot(Pm,N);
          ectx.fillStyle='rgba(255,255,255,.95)';ectx.beginPath();ectx.arc(mx,my,1.9,0,7);ectx.fill();}}
      ectx.restore();
      // hubs
      var pulse=(earthT*1.2)%1;
      for(var j=0;j<HUBS.length;j++){P=HUBS[j].v;dp=dot(P,C);if(dp<=0)continue;
        sx=cx+R*dot(P,E);sy=cy-R*dot(P,N);var col=HUBS[j].c;
        ectx.globalAlpha=0.18;ectx.fillStyle=col;ectx.beginPath();ectx.arc(sx,sy,7,0,7);ectx.fill();ectx.globalAlpha=1;
        ectx.strokeStyle=col;ectx.globalAlpha=(1-pulse)*0.6;ectx.lineWidth=1;ectx.beginPath();ectx.arc(sx,sy,2.5+pulse*7,0,7);ectx.stroke();ectx.globalAlpha=1;
        ectx.fillStyle=col;ectx.beginPath();ectx.arc(sx,sy,2.7,0,7);ectx.fill();
        ectx.strokeStyle='#fff';ectx.lineWidth=.9;ectx.beginPath();ectx.arc(sx,sy,2.7,0,7);ectx.stroke();}
      // rim highlight
      var rim=ectx.createRadialGradient(cx,cy,R*0.9,cx,cy,R);
      rim.addColorStop(0,'rgba(255,255,255,0)');rim.addColorStop(1,'rgba(190,220,255,.55)');
      ectx.strokeStyle='rgba(255,255,255,.35)';ectx.lineWidth=1;ectx.beginPath();ectx.arc(cx,cy,R,0,7);ectx.stroke();
    }
    function loop(now){var dt=Math.min(now-lastFrame,60);lastFrame=now;if(!reduce){chartT+=dt/1000*.5;earthT+=dt/1000;}drawCharts();drawEarth();if(modal.classList.contains('open')&&!reduce)rafId=requestAnimationFrame(loop);}

    function open(){
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; document.body.classList.add('modal-open');
      countUp(); animateBars(); seedFeed(); sizeCharts(); drawCharts(); sizeEarth(); drawEarth();
      if(!reduce){ lastFrame=performance.now(); rafId=requestAnimationFrame(loop);
        feedT=setInterval(pushFeed,2600);
        liveT=setInterval(function(){
          [].forEach.call(modal.querySelectorAll('.kstat .v[data-target]'),function(el){
            var t=el.dataset.t,base=parseFloat(el.dataset.target); if(t==='pct') return; base+=base*(0.0004+Math.random()*0.001); el.dataset.target=base; el.textContent=fmt(base,t);
          });
        },1900);
      }
    }
    function close(){
      modal.classList.remove('open','expanded'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; document.body.classList.remove('modal-open');
      var eb=document.getElementById('dashExpand'); if(eb){ eb.setAttribute('aria-label','Expand'); eb.title='Expand'; }
      if(typeof setPane==='function') setPane();
      if(rafId){cancelAnimationFrame(rafId);rafId=null;} if(feedT){clearInterval(feedT);feedT=null;} if(liveT){clearInterval(liveT);liveT=null;}
    }

    opens.forEach(function(b){ b.addEventListener('click',open); });
    var expBtn=document.getElementById('dashExpand');
    if(expBtn) expBtn.addEventListener('click',function(){
      var on=modal.classList.toggle('expanded');
      expBtn.setAttribute('aria-label',on?'Collapse':'Expand'); expBtn.title=on?'Collapse':'Expand';
      requestAnimationFrame(function(){ sizeCharts(); drawCharts(); });
    });
    /* single pane: AI Commerce command center */
    var bName=document.getElementById('ccBrandName'), bSub=document.getElementById('ccBrandSub');
    function setPane(){
      if(bName) bName.textContent='AI Commerce';
      if(bSub) bSub.textContent='Command Center';
      animateBars(); requestAnimationFrame(function(){ sizeCharts(); drawCharts(); });
    }
    [].forEach.call(modal.querySelectorAll('[data-dclose],.dashClose'),function(el){ el.addEventListener('click',close); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal.classList.contains('open')) close(); });
    window.addEventListener('resize',function(){ if(modal.classList.contains('open')){ sizeCharts(); drawCharts(); sizeEarth(); drawEarth(); } });
  })();
