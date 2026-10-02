document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  (function(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
  })();

  /* ===== in-page anchors: land below the sticky nav, and stay there =====
     The hero canvas sets its own height after first paint, which shifts
     everything below it. A plain #hash jump lands, then the page moves out
     from under the visitor. So scroll with a measured offset, then re-check
     once layout has settled. */
  (function(){
    var nav=document.querySelector('header.nav');
    function offset(){ return (nav?nav.getBoundingClientRect().height:62)+14; }
    function target(hash){
      if(!hash||hash==='#'||hash.length<2) return null;
      try{ return document.querySelector(hash); }catch(e){ return null; }
    }
    function goTo(el,smooth){
      var y=window.pageYOffset+el.getBoundingClientRect().top-offset();
      window.scrollTo({top:Math.max(0,y),behavior:smooth?'smooth':'auto'});
    }
    document.addEventListener('click',function(e){
      var a=e.target.closest?e.target.closest('a[href^="#"]'):null;
      if(!a) return;
      if(a.hasAttribute('data-careers-open')) return;   /* opens an overlay instead */
      var el=target(a.getAttribute('href'));
      if(!el) return;
      e.preventDefault();
      goTo(el,true);
      if(history.replaceState) history.replaceState(null,'',a.getAttribute('href'));
      /* the hero band can resize after the scroll starts — correct for it */
      var n=0,fix=setInterval(function(){
        if(++n>8){ clearInterval(fix); return; }
        var d=el.getBoundingClientRect().top-offset();
        if(Math.abs(d)>4) goTo(el,false);
      },90);
      setTimeout(function(){ clearInterval(fix); },900);
    },false);
    /* a hash typed straight into the address bar needs the same offset */
    window.addEventListener('load',function(){
      var el=target(location.hash);
      if(el) setTimeout(function(){ goTo(el,false); },60);
    });
  })();


  /* ============ HERO — AI PIPELINE, ONE SEQUENCE ============ */
  

      /* the one sequence */
      /* rail behind the stages, one segment per row */
      (function(){
        /* upright already has its own arrows between the nodes */
        if(l.vert) return;
        for(var r=0;r<ROWS;r++){
          var first=r*COLS, last=Math.min(first+COLS,SEQ.length)-1;
          if(last<=first) continue;
          var a=seqPos(l,first), b=seqPos(l,last);
          var y=a.y+l.rowH*0.38;
          var g=ctx.createLinearGradient(a.x+l.cw/2,0,b.x+l.cw/2,0);
          g.addColorStop(0,'rgba(36,86,230,.30)');
          g.addColorStop(0.55,'rgba(124,92,245,.30)');
          g.addColorStop(1,'rgba(31,169,113,.30)');
          ctx.save(); ctx.strokeStyle=g; ctx.lineWidth=2; ctx.lineCap='round';
          ctx.setLineDash([5,6]); ctx.lineDashOffset=-spin*26;
          ctx.beginPath(); ctx.moveTo(a.x+l.cw/2,y); ctx.lineTo(b.x+l.cw/2,y); ctx.stroke();
          ctx.restore();
        }
      })();

      SEQ.forEach(function(st,i){
        var p=seqPos(l,i), cxm=p.x+l.cw/2, ty=p.y+l.rowH*0.38;
        var tz=l.vert?l.tz:Math.min(46,l.rowH*0.40);
        if(!l.vert){
          /* the halo punches the rail out from behind a tile; stacked one on
             top of the other they would swallow the rail whole */
          ctx.save();
          ctx.fillStyle='rgba(255,255,255,.95)';
          ctx.beginPath(); ctx.arc(cxm,ty,tz*0.78,0,6.2832); ctx.fill();
          ctx.restore();
        }
        ctx.save();
        ctx.shadowColor='rgba(14,35,80,'+(l.vert?'.18':'.16')+')';
        ctx.shadowBlur=14; ctx.shadowOffsetY=5;
        tile(cxm,ty,tz,st.c,st.ic);
        ctx.restore();
        if(l.vert){
          sans(clip(st.t,l.colW,12.5),l.ex,ty+l.cap,12.5,INK);
          return;
        }
        var ts=Math.max(10.5,Math.min(13,l.cw*0.115));
        sans(clip(st.t,l.cw-8,ts),cxm,ty+tz*0.5+20,ts,INK);
      });

      /* packets */
      pk.forEach(function(p){
        var q,col;
        if(p.leg===0){
          if(l.vert){
            q=elbowPos(l.fcx[p.si],l.fout,l.ex+(p.si?8:-8),l.ey-l.er-9,p.t,0);
          } else {
            q=bez(l.pad+l.sw*(l.wide?1:0.5)+5,l.sy[p.si]+l.sh/2,l.ex-l.er-3,ey,p.t);
          }
          col=SRC[p.si].c;
        } else if(p.leg===1){
          var a=p.t*11, rad=l.er*0.7*(1-p.t);
          q={x:l.ex+Math.cos(a)*rad,y:ey+Math.sin(a)*rad*0.6}; col='#3B6BF5';
        } else if(p.leg===2){
          var f=seqPos(l,0), t=p.t;
          var ox=l.vert?l.ex:(l.ex+l.er+3), oy=l.vert?(ey+l.er+34):ey;
          var ty2=l.vert?(f.y+l.rowH*0.38-l.tz*0.5-3):(f.y+l.rowH*0.38);
          q={x:ox+((f.x+l.cw/2)-ox)*t, y:oy+(ty2-oy)*t};
          col=SEQ[0].c;
        } else {
          var k=p.leg-3, A=seqPos(l,k), B=seqPos(l,k+1);
          var ay=A.y+l.rowH*0.38, by=B.y+l.rowH*0.38;
          if(l.vert){ ay+=l.cap+13; by-=l.tz*0.5+3; }   /* travel the arrow only */
          q={x:(A.x+l.cw/2)+((B.x+l.cw/2)-(A.x+l.cw/2))*p.t, y:ay+(by-ay)*p.t};
          col=SEQ[k+1].c;
        }
        ctx.save(); ctx.globalAlpha=p.leg===1?(0.4+Math.abs(Math.sin(p.t*14))*0.6):0.95;
        ctx.shadowColor=col; ctx.shadowBlur=8; ctx.fillStyle=col;
        ctx.beginPath(); ctx.arc(q.x,q.y,2.6,0,6.2832); ctx.fill(); ctx.restore();
      });


      notes.forEach(function(c){
        ctx.save(); ctx.globalAlpha=Math.max(0,1-c.t);
        ctx.font='600 11.5px ui-monospace,"SF Mono",Menlo,monospace';
        ctx.textAlign='right'; ctx.textBaseline='middle';
        ctx.shadowColor='rgba(255,255,255,.95)'; ctx.shadowBlur=7;
        ctx.fillStyle=GREEN; ctx.fillText('+'+money(c.v),c.x,c.y0-c.t*22);
        ctx.restore();
      });
    }

    /* ---- loop ---- */
    var last=performance.now(), running=false, spawnT=0;
    function frame(now){
      if(!running) return;
      var dt=Math.min((now-last)/1000,0.05); last=now;
      var l=L();

      for(var i=pk.length-1;i>=0;i--){
        var p=pk[i];
        p.t+= p.leg===1 ? dt/0.42 : p.sp*dt;
        if(p.t>=1){
          p.t=0;
          if(p.leg===0){ SRC[p.si].n++; p.leg=1; }
          else if(p.leg===1){
            if(Math.random()<0.34){ p.leg=2; p.sp=0.95; }
            else { pk.splice(i,1); continue; }
          }
          else if(p.leg===2){ SEQ[0].n++; p.leg=3; p.sp=0.95+Math.random()*0.3; }
          else {
            var k=p.leg-3;
            SEQ[k+1].n++;
            if(k+1===SEQ.length-1){
              var v=180+((Math.random()*520)|0);
              income+=v;
              notes.push({x:noteX||(W-l.pad-118),y0:l.py+10,t:0,v:v});
              pk.splice(i,1); continue;
            }
            if(Math.random()<0.74){ p.leg++; p.sp=0.95+Math.random()*0.3; }
            else { pk.splice(i,1); continue; }
          }
        }
      }
      for(var c=notes.length-1;c>=0;c--){ notes[c].t+=dt*0.7; if(notes[c].t>=1) notes.splice(c,1); }

      if(now-spawnT>520 && pk.length<18){
        spawnT=now;
        var r=Math.random();
        pk.push({si:Math.random()<0.68?0:1,leg:0,t:0,sp:0.6+Math.random()*0.3});
      }
      shown+=(income-shown)*Math.min(dt*3,1);
      if(stage && Math.abs(stage.clientWidth-CSSW)>1) resize();
      draw(dt);
      requestAnimationFrame(frame);
    }

    resize();
    for(var s0=0;s0<6;s0++){
      pk.push({si:Math.random()<0.68?0:1,leg:0,t:Math.random(),sp:0.6+Math.random()*0.3});
    }
    if(reduce){ draw(0); return; }
    draw(0);
    /* --- keep the fit correct on resize, zoom, rotation and DPR changes --- */
    var rt, lastW=0, lastDPR=0;
    function refit(force){
      var w=(stage&&stage.clientWidth)||0,
          d=Math.min(window.devicePixelRatio||1,2.5);
      if(!force && Math.abs(w-lastW)<1 && Math.abs(d-lastDPR)<0.001) return;
      lastW=w; lastDPR=d;
      resize(); draw(0);
    }
    function refitSoon(){ clearTimeout(rt); rt=setTimeout(function(){ refit(true); },120); }

    window.addEventListener('resize',refitSoon);
    window.addEventListener('orientationchange',refitSoon);

    /* browser zoom changes devicePixelRatio without always firing resize */
    (function dprWatch(){
      if(!window.matchMedia) return;
      var mq=window.matchMedia('(resolution: '+(window.devicePixelRatio||1)+'dppx)');
      var on=function(){ refit(true); dprWatch(); };
      if(mq.addEventListener) mq.addEventListener('change',on,{once:true});
      else if(mq.addListener) mq.addListener(on);
    })();

    /* container can change width without the window doing so */
    if(window.ResizeObserver && stage){
      try{ new ResizeObserver(function(){ refit(false); }).observe(stage); }catch(e){}
    }
    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(function(){ refit(true); }).catch(function(){});
    }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(en){
        en.forEach(function(x){
          if(x.isIntersecting){ if(!running){ running=true; last=performance.now(); resize(); requestAnimationFrame(frame); } }
          else running=false;
        });
      },{threshold:0.05}).observe(board);
    } else { running=true; requestAnimationFrame(frame); }
  })();
