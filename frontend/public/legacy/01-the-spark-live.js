/* the spark, live: sparks are struck off the letterforms themselves.
   the word is measured, drawn to an offscreen mask, and the mask's
   edge pixels become emission sites. light that stays inside the
   glyphs is pale (it reads against the tide); light that escapes is
   cyan and blue (it has to read against a white page). */
(function(){
  var cv=document.getElementById('hroCv');
  var word=document.querySelector('.hro__inner h1 .hro__lt');
  if(!cv||!word||!cv.getContext) return;
  var vessel=word.parentNode;
  var mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion:reduce)'):null;

  var ctx=cv.getContext('2d');
  var mask=document.createElement('canvas');
  var mx=mask.getContext('2d',{willReadFrequently:true});
  var lay=document.createElement('canvas'), lx=lay.getContext('2d');
  if(!ctx||!mx||!lx) return;

  var W=0,H=0,DPR=1,PADX=0,PADT=0,FS=60,CYCLE=6600;
  var rim=[],crest=[],motes=[],embers=[];
  var raf=0,last=0,ready=false,onScreen=true,hidden=false;
  var ptr={x:-1e4,y:-1e4,heat:0};
  var CY='21,197,222', BL='78,123,255', VI='109,94,245';

  /* ---- measure the glyphs ------------------------------------ */
  function layout(){
    var r=word.getBoundingClientRect();
    if(!r.width||!r.height) return false;
    var cs=getComputedStyle(word);
    FS=parseFloat(cs.fontSize)||60;
    DPR=Math.min(window.devicePixelRatio||1,2);
    PADX=FS*0.24; PADT=FS*0.78;
    W=r.width+PADX*2; H=r.height+PADT+FS*0.26;
    cv.style.left=(-PADX)+'px'; cv.style.top=(-PADT)+'px';
    cv.style.width=W+'px'; cv.style.height=H+'px';
    var pw=Math.max(1,Math.round(W*DPR)), ph=Math.max(1,Math.round(H*DPR));
    cv.width=pw; cv.height=ph; mask.width=pw; mask.height=ph; lay.width=pw; lay.height=ph;

    mx.setTransform(DPR,0,0,DPR,0,0);
    mx.clearRect(0,0,W,H);
    mx.font=(cs.fontStyle||'normal')+' '+(cs.fontWeight||'600')+' '+FS+'px '+cs.fontFamily;
    try{ mx.letterSpacing=cs.letterSpacing; }catch(e){}
    mx.textBaseline='alphabetic';
    var m=mx.measureText('return');
    /* half-leading puts the baseline here; the horizontal squeeze
       absorbs any letter-spacing the canvas could not honour */
    var asc=m.fontBoundingBoxAscent||m.actualBoundingBoxAscent||FS*0.78;
    var dsc=m.fontBoundingBoxDescent||m.actualBoundingBoxDescent||FS*0.22;
    var base=PADT+(r.height-(asc+dsc))/2+asc;
    var sx=m.width>0?(r.width/m.width):1;
    mx.save(); mx.translate(PADX,base); mx.scale(sx,1);
    mx.fillStyle='#fff'; mx.fillText('return',0,0); mx.restore();
    return scan();
  }

  /* ---- find the edges that can throw light ------------------- */
  function scan(){
    rim=[]; crest=[];
    var iw=mask.width, ih=mask.height, d;
    try{ d=mx.getImageData(0,0,iw,ih).data; }catch(e){ return false; }
    var st=Math.max(2,Math.round(1.7*DPR));
    for(var y=st;y<ih-st;y+=st){
      for(var x=st;x<iw-st;x+=st){
        if(d[(y*iw+x)*4+3]<150) continue;
        var u=d[((y-st)*iw+x)*4+3], dn=d[((y+st)*iw+x)*4+3],
            l=d[(y*iw+x-st)*4+3], rt=d[(y*iw+x+st)*4+3];
        if(u<70||dn<70||l<70||rt<70){
          var p=[x/DPR,y/DPR];
          rim.push(p);
          if(u<70) crest.push(p);
        }
      }
    }
    return rim.length>4;
  }

  /* ---- shapes ------------------------------------------------ */
  function glow(c,x,y,r,col,a){
    var g=c.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,'rgba('+col+','+a+')');
    g.addColorStop(0.45,'rgba('+col+','+(a*0.32).toFixed(3)+')');
    g.addColorStop(1,'rgba('+col+',0)');
    c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,6.2832); c.fill();
  }
  function star(c,x,y,r,col,a,rot){
    c.save(); c.translate(x,y); c.rotate(rot);
    c.fillStyle='rgba('+col+','+a+')';
    var w=r*0.24;
    c.beginPath();
    c.moveTo(0,-r); c.quadraticCurveTo(w,-w,r,0);
    c.quadraticCurveTo(w,w,0,r); c.quadraticCurveTo(-w,w,-r,0);
    c.quadraticCurveTo(-w,-w,0,-r);
    c.fill(); c.restore();
  }

  /* ---- population -------------------------------------------- */
  function mote(){
    var p=rim[(Math.random()*rim.length)|0];
    return {x:p[0],y:p[1],vx:(Math.random()-0.5)*0.010*FS,vy:-(0.006+Math.random()*0.012)*FS,
            r:FS*(0.008+Math.random()*0.014),ttl:700+Math.random()*900,age:0,
            rot:Math.random()*3.14};
  }
  function ember(near){
    var p;
    if(near&&crest.length){
      var best=null,bd=1e9;
      for(var i=0;i<crest.length;i+=3){
        var dx=crest[i][0]-ptr.x, dy=crest[i][1]-ptr.y, d2=dx*dx+dy*dy;
        if(d2<bd){bd=d2; best=crest[i];}
      }
      p=best||crest[0];
    } else {
      var src=crest.length?crest:rim;
      p=src[(Math.random()*src.length)|0];
    }
    var warm=Math.random();
    return {x:p[0]+(Math.random()-0.5)*FS*0.05,y:p[1],
            vx:(Math.random()-0.5)*0.028*FS, vy:-(0.05+Math.random()*0.07)*FS,
            r:FS*(0.009+Math.random()*0.017), ttl:900+Math.random()*1100, age:0,
            rot:Math.random()*3.14, spin:(Math.random()-0.5)*0.004,
            col: warm<0.5?CY:(warm<0.86?BL:VI), px:0,py:0};
  }

  /* ---- the pass that stays inside the letters ---------------- */
  function inner(now,dt){
    lx.setTransform(DPR,0,0,DPR,0,0);
    lx.clearRect(0,0,W,H);
    lx.globalCompositeOperation='lighter';

    /* a raking sweep, split into three offset wavelengths so the
       leading and trailing edges fringe like real dispersion */
    var p=(now%CYCLE)/CYCLE, s=(p-0.08)/0.34;
    if(s>0&&s<1){
      var e=s<0.5?2*s*s:1-Math.pow(-2*s+2,2)/2;
      var cx=-W*0.45+e*(W*1.9), bw=W*0.30;
      var fr=[[VI,-bw*0.20,0.42],['255,255,255',0,0.92],[CY,bw*0.20,0.5]];
      for(var i=0;i<3;i++){
        var o=fr[i][1];
        var g=lx.createLinearGradient(cx+o-bw,0,cx+o+bw,H);
        g.addColorStop(0,'rgba('+fr[i][0]+',0)');
        g.addColorStop(0.5,'rgba('+fr[i][0]+','+fr[i][2]+')');
        g.addColorStop(1,'rgba('+fr[i][0]+',0)');
        lx.fillStyle=g; lx.fillRect(0,0,W,H);
      }
    }

    /* the pointer drags a soft highlight across the letters */
    if(ptr.heat>0.01) glow(lx,ptr.x,ptr.y,FS*0.62,'255,255,255',0.30*ptr.heat);

    for(var j=motes.length-1;j>=0;j--){
      var m=motes[j]; m.age+=dt;
      if(m.age>=m.ttl){ motes.splice(j,1); continue; }
      m.x+=m.vx*dt/16; m.y+=m.vy*dt/16;
      var k=m.age/m.ttl, a=Math.sin(k*3.1416);
      glow(lx,m.x,m.y,m.r*3.4,'255,255,255',0.5*a);
      star(lx,m.x,m.y,m.r*2.1,'255,255,255',0.85*a,m.rot);
    }

    /* everything above is cut to the glyph shapes */
    lx.globalCompositeOperation='destination-in';
    lx.setTransform(1,0,0,1,0,0);
    lx.drawImage(mask,0,0);
  }

  /* ---- the pass that escapes --------------------------------- */
  function outer(dt){
    for(var j=embers.length-1;j>=0;j--){
      var e=embers[j]; e.age+=dt;
      if(e.age>=e.ttl){ embers.splice(j,1); continue; }
      e.px=e.x; e.py=e.y;
      e.vy-=0.00022*FS*dt/16;          /* keeps rising, slowly */
      e.vx*=0.985; e.rot+=e.spin*dt;
      e.x+=e.vx*dt/16; e.y+=e.vy*dt/16;
      var k=e.age/e.ttl, a=(1-k)*Math.min(1,k*7);
      ctx.globalAlpha=1;
      ctx.strokeStyle='rgba('+e.col+','+(0.22*a).toFixed(3)+')';
      ctx.lineWidth=e.r*0.7; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(e.px,e.py); ctx.lineTo(e.x,e.y); ctx.stroke();
      glow(ctx,e.x,e.y,e.r*4.2,e.col,0.55*a);
      star(ctx,e.x,e.y,e.r*2.4,e.col,0.9*a,e.rot);
    }
  }

  /* ---- loop --------------------------------------------------- */
  function frame(now){
    raf=requestAnimationFrame(frame);
    var dt=Math.min(48,now-(last||now)); last=now;
    if(!ready||!onScreen||hidden) return;

    ptr.heat=Math.max(0,ptr.heat-dt/900);

    var want=2+Math.round(ptr.heat*4);
    while(motes.length<want) motes.push(mote());
    var rate=0.0018+ptr.heat*0.012;
    if(Math.random()<rate*dt) embers.push(ember(false));
    if(ptr.heat>0.35&&Math.random()<0.010*dt) embers.push(ember(true));
    if(embers.length>90) embers.splice(0,embers.length-90);

    ctx.setTransform(DPR,0,0,DPR,0,0);
    ctx.clearRect(0,0,W,H);
    inner(now,dt);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.drawImage(lay,0,0);
    ctx.setTransform(DPR,0,0,DPR,0,0);
    outer(dt);
  }

  /* ---- wiring -------------------------------------------------- */
  function start(){
    if(mq&&mq.matches){ stop(); return; }
    ready=layout();
    if(!ready) return;
    vessel.classList.add('spk');
    if(!raf){ last=0; raf=requestAnimationFrame(frame); }
  }
  function stop(){
    if(raf){ cancelAnimationFrame(raf); raf=0; }
    ready=false; motes=[]; embers=[];
    vessel.classList.remove('spk');
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,cv.width,cv.height);
  }

  var rt;
  addEventListener('resize',function(){
    clearTimeout(rt);
    rt=setTimeout(function(){ if(!(mq&&mq.matches)){ ready=layout(); } },180);
  },{passive:true});

  var h1=word.closest?word.closest('h1'):null;
  (h1||vessel).addEventListener('pointermove',function(ev){
    if(!ready) return;
    var r=cv.getBoundingClientRect();
    ptr.x=ev.clientX-r.left; ptr.y=ev.clientY-r.top;
    ptr.heat=Math.min(1,ptr.heat+0.12);
  },{passive:true});

  document.addEventListener('visibilitychange',function(){ hidden=document.hidden; });

  if(window.IntersectionObserver){
    new IntersectionObserver(function(en){ onScreen=en[0].isIntersecting; },
      {rootMargin:'120px'}).observe(vessel);
  }
  if(mq){
    var flip=function(){ mq.matches?stop():start(); };
    mq.addEventListener?mq.addEventListener('change',flip):mq.addListener(flip);
  }

  if(document.readyState==='complete') requestAnimationFrame(start);
  else addEventListener('load',function(){ requestAnimationFrame(start); });
})();
