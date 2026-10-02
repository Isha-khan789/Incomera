/* ===== 30-DAY BUILD — phases run live ===== */
  (function(){
    var board=document.getElementById('stpBoard'); if(!board) return;
    var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items=board.querySelectorAll('.stp__i');
    var PH=[{s:1,e:5},{s:6,e:18},{s:19,e:25},{s:26,e:30}];
    var day=1;

    function draw(){
      [].forEach.call(items,function(el,i){
        var p=PH[i], len=p.e-p.s+1;
        var fill=Math.max(0,Math.min(1,(day-p.s+1)/len))*100;
        var done=day>p.e, on=day>=p.s && day<=p.e;
        el.style.setProperty('--p',fill+'%');
        el.classList.toggle('done',done);
        el.classList.toggle('on',on);
        var s=el.querySelector('.stp__s');
        if(s) s.textContent = done ? 'Complete' : on ? 'In progress' : 'Queued';
      });
    }

    if(reduce){ day=30; draw(); return; }
    draw();

    var timer=null;
    function run(){ if(!timer) timer=setInterval(function(){
      day++; if(day>34) day=1; draw();
    },380); }
    function stop(){ clearInterval(timer); timer=null; }

    if('IntersectionObserver' in window){
      new IntersectionObserver(function(en){
        en.forEach(function(e){ e.isIntersecting ? run() : stop(); });
      },{threshold:.3}).observe(board);
    } else { run(); }
  })();
