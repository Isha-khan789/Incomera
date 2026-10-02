/* ===== LIVE MOTION FLOWCHARTS ===== */
  (function(){
    var charts=[].slice.call(document.querySelectorAll('.flowchart'));
    if(!charts.length) return;
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    charts.forEach(function(fc,idx){
      fc._nodes=[].slice.call(fc.querySelectorAll('.fn'));
      fc._prog=fc.querySelector('.flowchart__prog');
      fc._token=fc.querySelector('.ftoken');
      fc._p=idx*0.45;            /* stagger the two motions */
      fc._speed=0.17+idx*0.015;  /* slightly different pace */
    });
    if(reduce){
      charts.forEach(function(fc){
        fc._nodes.forEach(function(n){n.classList.add('on');});
        if(fc._prog) fc._prog.style.width='calc(100% - 14px)';
        if(fc._token) fc._token.style.opacity='0';
      });
      return;
    }
    var last=performance.now();
    function tick(now){
      var dt=Math.min(now-last,50); last=now;
      for(var c=0;c<charts.length;c++){
        var fc=charts[c];
        fc._p += dt/1000*fc._speed;
        if(fc._p>=1.16) fc._p-=1.16;         /* loop with a short complete-hold */
        var p=Math.min(fc._p,1);
        var trackW=Math.max(fc.clientWidth-14,1);
        var x=7+trackW*p;
        if(fc._token){ fc._token.style.left=x+'px'; fc._token.style.opacity=(fc._p>1?'0':'1'); }
        if(fc._prog) fc._prog.style.width=(trackW*p)+'px';
        var n=fc._nodes.length;
        for(var i=0;i<n;i++){
          var frac=n>1?i/(n-1):0;
          fc._nodes[i].classList.toggle('on', p>=frac-0.004);
          fc._nodes[i].classList.toggle('pulse', p>=frac-0.015 && p<=frac+0.11);
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();
