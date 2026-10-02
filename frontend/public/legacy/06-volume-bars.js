/* ===== LIVE JARVIS GROWTH CHART (white, advanced) ===== */
  (function(){
    var c=document.getElementById('growthCanvas'); if(!c) return;
    var ctx=c.getContext('2d');
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W=0,H=0,dpr=1,T=20;
    var BLUE='36,86,230', CYAN='14,166,196';
    var padL=58,padR=66,padT=22,padB=30, NOWF=0.70, WINDOW=6;
    var hoverX=null;
    var showOut=true, showIn=true;
    function resize(){var r=c.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);
      W=r.width||640;H=r.height||320;c.width=W*dpr;c.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
    resize(); window.addEventListener('resize',resize);
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();hoverX=e.clientX-r.left;});
    c.addEventListener('mouseleave',function(){hoverX=null;});
    c.addEventListener('touchmove',function(e){var r=c.getBoundingClientRect();if(e.touches[0])hoverX=e.touches[0].clientX-r.left;},{passive:true});
    c.addEventListener('touchend',function(){hoverX=null;});
    var seg=document.getElementById('gRange');
    if(seg) seg.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      WINDOW=parseInt(b.getAttribute('data-r'),10)||6;
      [].forEach.call(seg.children,function(x){x.classList.toggle('on',x===b);}); });

    function osc(t,s){return Math.sin(t*0.85+s)*0.5+Math.sin(t*1.9+s*1.6)*0.30+Math.sin(t*3.6+s*0.7)*0.17;}
    function vOut(t){return t*1.00+osc(t,1.3)*1.5+4;}
    function vIn(t){return t*0.60+osc(t,4.6)*1.0+2;}
    function vol(t){return 0.55+0.45*Math.sin(t*1.6+0.6)+0.2*Math.sin(t*3.3+1.1);}
    function usd(v){return v*34000;}
    function fmtUSD(d){return d>=1e6?'$'+(d/1e6).toFixed(2)+'M':'$'+Math.round(d/1000)+'K';}
    function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
    var elM=document.getElementById('gMetric'),elD=document.getElementById('gDelta'),
        kM=document.getElementById('kMeet'),kS=document.getElementById('kSale'),
        kU=document.getElementById('kSub'),kR=document.getElementById('kRev');
    var sparks=[], last=performance.now(), uiAcc=999, sparkAcc=0;

    function frame(now){
      var dt=Math.min(now-last,50); last=now;
      if(!reduce) T+=dt/1000*0.17;
      var plotW=W-padL-padR, plotB=H-padB, plotT=padT;
      var volH=(plotB-plotT)*0.16, lineB=plotB-volH-10;
      var nowX=padL+plotW*NOWF, pxT=(plotW*NOWF)/WINDOW;
      function xAt(t){return nowX+(t-T)*pxT;}
      function timeAt(x){return T+(x-nowX)/pxT;}
      var lo=1e9,hi=-1e9;
      for(var x=padL;x<=W-padR;x+=4){var t=timeAt(x),a=vOut(t),b=vIn(t);if(a<lo)lo=a;if(b<lo)lo=b;if(a>hi)hi=a;if(b>hi)hi=b;}
      var rng=Math.max(hi-lo,1e-3); lo-=rng*0.16; hi+=rng*0.24;
      function Y(v){return lineB-(v-lo)/(hi-lo)*(lineB-plotT);}
      ctx.clearRect(0,0,W,H);

      ctx.fillStyle='rgba(36,86,230,0.035)';ctx.fillRect(nowX,plotT,(W-padR)-nowX,plotB-plotT);

      /* volume bars */
      var nb=Math.max(18,(plotW/18)|0), bw=(plotW/nb)*0.6;
      for(var i=0;i<nb;i++){ var bx0=padL+(i+0.5)*(plotW/nb), tt=timeAt(bx0);
        var hv=Math.max(0.08,vol(tt))*volH; var fut=bx0>nowX;
        ctx.fillStyle=fut?'rgba(36,86,230,0.07)':'rgba(36,86,230,0.12)';
        ctx.fillRect(bx0-bw/2, plotB-hv, bw, hv); }

      ctx.font='9px ui-monospace,monospace';ctx.textAlign='right';ctx.textBaseline='middle';
      for(var g=0;g<=4;g++){ var vy=lo+(hi-lo)*g/4, y=Y(vy);
        ctx.strokeStyle='rgba(14,35,80,'+(g===0?0.14:0.06)+')';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(W-padR,y);ctx.stroke();
        ctx.strokeStyle='rgba(14,35,80,0.22)';ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(padL-4,y);ctx.stroke();
        ctx.fillStyle='rgba(124,135,155,0.95)';ctx.fillText(fmtUSD(usd(vy)),padL-9,y); }

      ctx.textAlign='center';ctx.textBaseline='top';
      var stepM=WINDOW>=12?4:2;
      for(var m=WINDOW;m>=0;m-=stepM){ var xx=xAt(T-m);
        ctx.strokeStyle='rgba(14,35,80,0.05)';ctx.beginPath();ctx.moveTo(xx,plotT);ctx.lineTo(xx,plotB);ctx.stroke();
        ctx.fillStyle='rgba(124,135,155,0.85)';ctx.fillText(m===0?'NOW':('-'+m+'mo'),xx,plotB+8); }
      var foreMo=Math.floor((W-padR-nowX)/pxT);
      for(var f=stepM;f<=foreMo;f+=stepM){ var xf=xAt(T+f);
        ctx.strokeStyle='rgba(36,86,230,0.06)';ctx.beginPath();ctx.moveTo(xf,plotT);ctx.lineTo(xf,plotB);ctx.stroke();
        ctx.fillStyle='rgba(36,86,230,0.5)';ctx.fillText('+'+f+'mo',xf,plotB+8); }

      var goalV=lo+(hi-lo)*0.90, gy=Y(goalV);
      ctx.save();ctx.setLineDash([5,5]);ctx.strokeStyle='rgba(36,86,230,0.4)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(padL,gy);ctx.lineTo(W-padR,gy);ctx.stroke();ctx.restore();
      ctx.font='8px ui-monospace,monospace';ctx.textAlign='left';ctx.textBaseline='bottom';
      ctx.fillStyle='rgba(36,86,230,0.7)';ctx.fillText('◇ TARGET '+fmtUSD(usd(goalV)), padL+4, gy-3);

      function drawSeries(fn,rgb){
        ctx.beginPath();ctx.moveTo(padL,Y(fn(timeAt(padL))));
        for(var x=padL;x<=nowX;x+=3) ctx.lineTo(x,Y(fn(timeAt(x))));
        ctx.lineTo(nowX,lineB);ctx.lineTo(padL,lineB);ctx.closePath();
        var gd=ctx.createLinearGradient(0,plotT,0,lineB);
        gd.addColorStop(0,'rgba('+rgb+',0.22)');gd.addColorStop(1,'rgba('+rgb+',0)');
        ctx.fillStyle=gd;ctx.fill();
        ctx.beginPath();ctx.moveTo(padL,Y(fn(timeAt(padL))));
        for(var x=padL;x<=nowX;x+=3) ctx.lineTo(x,Y(fn(timeAt(x))));
        ctx.shadowColor='rgba('+rgb+',0.5)';ctx.shadowBlur=9;
        ctx.strokeStyle='rgb('+rgb+')';ctx.lineWidth=2.4;ctx.lineJoin='round';ctx.stroke();ctx.shadowBlur=0;
        /* forecast confidence cone */
        ctx.beginPath();ctx.moveTo(nowX,Y(fn(T)));
        for(var x=nowX;x<=W-padR;x+=4){var t=timeAt(x),bd=0.012+(t-T)*0.028;ctx.lineTo(x,Y(fn(t)*(1+bd)));}
        for(var x=W-padR;x>=nowX;x-=4){var t=timeAt(x),bd=0.012+(t-T)*0.028;ctx.lineTo(x,Y(fn(t)*(1-bd)));}
        ctx.closePath();ctx.fillStyle='rgba('+rgb+',0.09)';ctx.fill();
        ctx.save();ctx.setLineDash([5,5]);
        ctx.beginPath();ctx.moveTo(nowX,Y(fn(T)));
        for(var x=nowX;x<=W-padR;x+=3) ctx.lineTo(x,Y(fn(timeAt(x))));
        ctx.strokeStyle='rgba('+rgb+',0.55)';ctx.lineWidth=2;ctx.stroke();ctx.restore();
        var fx=W-padR, fy=Y(fn(timeAt(fx)));
        ctx.fillStyle='#fff';ctx.strokeStyle='rgba('+rgb+',0.6)';ctx.lineWidth=1.4;
        ctx.beginPath();ctx.arc(fx,fy,3,0,7);ctx.fill();ctx.stroke();
        var ny=Y(fn(T)), pulse=0.5+0.5*Math.sin(T*6);
        ctx.strokeStyle='rgba('+rgb+','+(0.45*(1-pulse*0.5)).toFixed(2)+')';ctx.lineWidth=1.4;
        ctx.beginPath();ctx.arc(nowX,ny,4+pulse*4,0,7);ctx.stroke();
        ctx.shadowColor='rgb('+rgb+')';ctx.shadowBlur=11;
        ctx.fillStyle='rgb('+rgb+')';ctx.beginPath();ctx.arc(nowX,ny,3.4,0,7);ctx.fill();ctx.shadowBlur=0;
        ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(nowX,ny,1.4,0,7);ctx.fill();
        var txt=fmtUSD(usd(fn(T)));
        ctx.font='bold 10px ui-monospace,monospace';ctx.textBaseline='middle';ctx.textAlign='left';
        var tw=ctx.measureText(txt).width, bw2=tw+13, bh=17, bx=nowX+9, by=ny-bh/2;
        if(bx+bw2>W-2) bx=nowX-bw2-9;
        ctx.fillStyle='rgba(255,255,255,0.94)';rr(bx,by,bw2,bh,5);ctx.fill();
        ctx.strokeStyle='rgb('+rgb+')';ctx.lineWidth=1.2;rr(bx,by,bw2,bh,5);ctx.stroke();
        ctx.fillStyle='rgb('+rgb+')';ctx.beginPath();ctx.arc(bx+6,by+bh/2,2,0,7);ctx.fill();
        ctx.fillText(txt,bx+11,by+bh/2+0.5);
        return ny;
      }
      var nyOut=showOut?drawSeries(vOut,BLUE):null, nyIn=showIn?drawSeries(vIn,CYAN):null;

      ctx.save();ctx.setLineDash([3,4]);ctx.strokeStyle='rgba(14,35,80,0.28)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(nowX,plotT-2);ctx.lineTo(nowX,plotB);ctx.stroke();ctx.restore();
      ctx.font='8px ui-monospace,monospace';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillStyle='rgba(255,255,255,0.95)';rr(nowX-17,plotT-14,34,13,3);ctx.fill();
      ctx.strokeStyle='rgba(14,35,80,0.18)';ctx.lineWidth=1;rr(nowX-17,plotT-14,34,13,3);ctx.stroke();
      ctx.fillStyle='rgba(14,35,80,0.7)';ctx.fillText('NOW',nowX,plotT-7);

      if(!reduce && (showOut||showIn)){ sparkAcc+=dt; if(sparkAcc>120){sparkAcc=0;
        var pick=showOut&&(!showIn||Math.random()>0.5), py=pick?nyOut:nyIn;
        if(py!=null){ sparks.push({x:nowX,y:py,t:0,col:pick?BLUE:CYAN,vx:(Math.random()-0.2)*8}); if(sparks.length>16)sparks.shift(); } } }
      for(var s=sparks.length-1;s>=0;s--){var sp=sparks[s]; if(!reduce)sp.t+=dt/900; if(sp.t>=1){sparks.splice(s,1);continue;}
        var a=(1-sp.t)*0.8; ctx.fillStyle='rgba('+sp.col+','+a.toFixed(2)+')';
        ctx.beginPath();ctx.arc(sp.x+sp.vx*sp.t, sp.y-sp.t*26, 1.6*(1-sp.t)+0.4,0,7);ctx.fill(); }

      /* hover crosshair + tooltip */
      if(hoverX!=null && hoverX>=padL && hoverX<=W-padR && (showOut||showIn)){
        var hx=hoverX, ht=timeAt(hx), oa=vOut(ht), ib=vIn(ht), oy=Y(oa), iy=Y(ib);
        ctx.save();ctx.setLineDash([2,3]);ctx.strokeStyle='rgba(14,35,80,0.35)';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(hx,plotT);ctx.lineTo(hx,lineB);ctx.stroke();ctx.restore();
        var dots=[]; if(showOut)dots.push([oy,BLUE]); if(showIn)dots.push([iy,CYAN]);
        dots.forEach(function(p){ ctx.fillStyle='#fff';ctx.strokeStyle='rgb('+p[1]+')';ctx.lineWidth=1.6;
          ctx.beginPath();ctx.arc(hx,p[0],3.4,0,7);ctx.fill();ctx.stroke(); });
        var futTxt=ht>T?' (proj)':'';
        var moTxt=(ht>=T?'+':'-')+Math.abs(ht-T).toFixed(1)+'mo'+futTxt;
        var L=[['◷ '+moTxt,0]], tot=0;
        if(showOut){L.push(['OUT  '+fmtUSD(usd(oa)),1]);tot+=oa;}
        if(showIn){L.push(['IN   '+fmtUSD(usd(ib)),2]);tot+=ib;}
        L.push(['TOTAL '+fmtUSD(usd(tot)),3]);
        ctx.font='10px ui-monospace,monospace'; var tw2=0; L.forEach(function(s){tw2=Math.max(tw2,ctx.measureText(s[0]).width);});
        var bw3=tw2+18, bh3=L.length*14+10, bx3=hx+12, by3=plotT+4;
        if(bx3+bw3>W-4) bx3=hx-bw3-12;
        ctx.fillStyle='rgba(255,255,255,0.97)';rr(bx3,by3,bw3,bh3,7);ctx.fill();
        ctx.strokeStyle='rgba(14,35,80,0.16)';ctx.lineWidth=1;rr(bx3,by3,bw3,bh3,7);ctx.stroke();
        ctx.fillStyle='rgba(36,86,230,0.8)';ctx.fillRect(bx3,by3,3,bh3);
        ctx.textAlign='left';ctx.textBaseline='middle';
        L.forEach(function(s,i){ var ty=s[1]; ctx.fillStyle=ty===0?'rgba(124,135,155,0.95)':(ty===1?'rgb('+BLUE+')':(ty===2?'rgb('+CYAN+')':'rgba(14,35,80,0.9)'));
          ctx.font=(ty===0?'9px':'bold 10px')+' ui-monospace,monospace'; ctx.fillText(s[0],bx3+10,by3+12+i*14); });
      }

      uiAcc+=dt; if(uiAcc>180){ uiAcc=0;
        var pipe=usd(vOut(T)+vIn(T)); if(elM)elM.textContent=fmtUSD(pipe);
        var prev=usd(vOut(T-1)+vIn(T-1)), gg=((pipe-prev)/Math.max(prev,1))*100;
        if(elD)elD.textContent='▲ +'+Math.max(gg,0).toFixed(1)+'% MoM';
        var d=T-20;
        if(kM)kM.textContent=Math.round(1284+d*8.5).toLocaleString();
        if(kS)kS.textContent=Math.round(962+d*5.5).toLocaleString();
        if(kU)kU.textContent=Math.round(548+d*3.5).toLocaleString();
        if(kR)kR.textContent='$'+((48600+d*820)/1000).toFixed(1)+'K';
      }
      if(!reduce) requestAnimationFrame(frame);
    }
    if(reduce){frame(performance.now());} else {requestAnimationFrame(frame);}
  })();
