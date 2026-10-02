/* ===== CLIENT REVIEWS ===== */
  (function(){
    var wrap=document.getElementById('rvwWrap');
    if(!wrap) return;
    var $=function(id){ return document.getElementById(id); };

    var FILMS=[
      { id:'fs', who:'Jay White', role:'Founder, Focal Software',
        summary:'Focal Software booked 100 meetings through Incomera.', av:'FS', orient:'portrait',
        src:'assets/demo-video.mp4',
        poster:'assets/demo-poster.jpg',
        dur:22.2,
        facts:[['100','meetings booked']],
        lines:[] },
      { id:'nw', who:'Dana Whitlock', role:'VP Sales, Northwind',
        summary:'Northwind was generating demand and letting it go cold \u2014 three hundred leads a month against replies that landed the next day. Dana covers the switch to answers in seconds, in Northwind\u2019s own voice, and the jump from thirty-one meetings a month to a hundred and six with no extra headcount.', av:'NW', orient:'landscape',
        facts:[['8s','median first reply'],['106','meetings a month'],['$71','cost per meeting']],
        lines:[
          'We were paying to generate demand and then letting it go cold.',
          'Three hundred leads a month, and reps replying the next day.',
          'Now it answers in seconds, at any hour, and it sounds like us.',
          'Thirty-one meetings a month became a hundred and six.',
          'And we did not hire a single extra person to do it.'
        ]},
      { id:'lp', who:'Marcus Ede', role:'Founder, Lumenpay',
        summary:'Twelve hundred free accounts and nobody ever asked them to pay. Marcus covers being told to skip outbound \u2014 the bigger invoice \u2014 and moving the upgrade ask onto real usage rather than a day count, taking trial-to-paid from four percent to twenty-six.', av:'LP', orient:'portrait',
        facts:[['26%','trial to paid'],['63%','payments recovered'],['17d','fee paid back']],
        lines:[
          'Twelve hundred free accounts and nobody ever asked them to pay.',
          'They told us to skip outbound, which was the bigger invoice for them.',
          'The upgrade ask fires on real usage, not on a day count.',
          'Four percent became twenty-six, and it paid for itself in seventeen days.'
        ]},
      { id:'vl', who:'Priya Raman', role:'COO, Vaultline',
        summary:'Thin pipeline and customers drifting off by month four. Priya covers why both halves had to be fixed at once, the move from eighteen meetings a month to seventy-four, retention going from fifty-eight to eighty-nine percent, and how little of her team\u2019s time it took.', av:'VL', orient:'landscape',
        facts:[['74','meetings a month'],['89%','month-4 retention'],['$118k','revenue per rep']],
        lines:[
          'Pipeline was thin and the customers we won drifted off by month four.',
          'We needed both halves fixed, not one, and they said so too.',
          'Eighteen meetings a month is now seventy-four.',
          'Retention went from fifty-eight percent to eighty-nine.',
          'The part I did not expect was how little of our time it took.'
        ]},
      { id:'ov', who:'Tom Beckley', role:'CEO, Orbit Labs',
        summary:'Tom had bought this promise twice before and been handed an empty tool. He covers what was different \u2014 somebody built it and then showed the team how it worked \u2014 and owning it outright on day thirty-one with nothing left to renew.', av:'OV', orient:'portrait',
        facts:[['30d','to live'],['0','new hires'],['1','fee, billed once']],
        lines:[
          'I have bought this promise twice before and been handed an empty tool.',
          'This time somebody built it and then showed us how it worked.',
          'On day thirty-one it was ours, running, with nothing to renew.',
          'Our team edits the copy themselves now. That is what made it worth it.'
        ]}
    ];

    var cur=0, playing=false, tick=null, at=0, SEC=9;   /* seconds a caption stays up */

    function renderList(){
      /* the segment row: one per film. The live one carries the progress
         fill and takes the seek clicks; the others jump straight to a film. */
      var seg=$('rvwSeg');
      if(seg){
        seg.innerHTML=FILMS.map(function(f,i){
          var on=(i===cur);
          return '<button class="rvw__sg'+(on?' on':(i<cur?' done':''))+'" type="button" '+
            (on?'id="rvwSeek"':'data-rvw-pick="'+i+'"')+
            ' title="'+f.who+' \u2014 '+f.role+'" aria-label="'+f.who+'">'+
            '<span class="rvw__sgf"'+(on?' id="rvwBar"':'')+'></span></button>';
        }).join('');
      }
      /* the rail: who else is here, one tap away */
      var list=$('rvwList');
      if(list){
        list.innerHTML=FILMS.map(function(f,i){
          var th=f.poster
            ? '<span class="rvw__th rvw__th--img" style="background-image:url('+f.poster+')">'
            : '<span class="rvw__th"><b>'+f.av+'</b>';
          return '<button class="rvw__i'+(i===cur?' on':'')+'" type="button" data-rvw-pick="'+i+'" '+
            'aria-label="Play '+f.who+'">'+
            th+'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>'+
            '<span class="rvw__tx"><b>'+f.who+'</b><span>'+f.role+'</span></span>'+
            '<em>'+fmt(f.dur||f.lines.length*SEC)+'</em></button>';
        }).join('');
        var on=list.querySelector('.rvw__i.on');
        if(on&&on.scrollIntoView){
          try{ on.scrollIntoView({block:'nearest',inline:'nearest'}); }catch(e){}
        }
      }
      var c=$('rvwCount');
      if(c) c.textContent=String(cur+1).padStart(2,'0')+' / '+String(FILMS.length).padStart(2,'0');
    }
    function load(i){
      stop();
      cur=i;
      var f=FILMS[i];
      /* the box takes the shape of the film: portrait films get a tall stage,
         landscape films the wide one */
      var portrait = (f.orient||'landscape')==='portrait';
      wrap.classList.toggle('portrait', portrait);
      wrap.classList.toggle('landscape', !portrait);
      var st=$('rvwPlayer'); if(st) st.classList.toggle('muted',muted);
      /* segments first: the progress fill lives inside the live one, so it
         has to exist before anything tries to set it */
      renderList();
      $('rvwAv').textContent=f.av;
      $('rvwWho').textContent=f.who;
      $('rvwRole').textContent=f.role;
      $('rvwCap').textContent='';
      var q=$('rvwQuote');
      if(q){
        q.textContent=f.summary||'';
        q.style.display=f.summary?'':'none';
      }
      var fx=$('rvwFacts');
      if(fx){
        var ff=f.facts||[];
        fx.innerHTML=ff.map(function(k){
          return '<div class="rvw__f"><b>'+k[0]+'</b><span>'+k[1]+'</span></div>';
        }).join('');
        fx.style.display=ff.length?'':'none';
      }
      var bar=$('rvwBar'); if(bar) bar.style.width='0%';
      /* reviews with a file behind them show real footage; the rest keep captions */
      var vid=$('rvwVid'), stage=$('rvwPlayer');
      if(vid&&stage){
        if(f.src){
          vid.src=f.src;
          vid.muted=muted;
          if(f.poster) vid.poster=f.poster;
          if(vid.readyState>0){ try{ vid.currentTime=0; }catch(err){} }
          stage.classList.add('has-video');
        }else{
          vid.pause(); vid.removeAttribute('src'); vid.removeAttribute('poster'); vid.load();
          stage.classList.remove('has-video');
        }
      }
      $('rvwTime').textContent='0:00';
    }
    function fmt(s){
      var m=Math.floor(s/60), q=Math.floor(s%60);
      return m+':'+String(q).padStart(2,'0');
    }
    /* the overlay steps out of the way after a few still seconds of playback */
    var idleT=null;
    function wake(){
      var p=$('rvwPlayer'); if(!p) return;
      p.classList.remove('hushed');
      clearTimeout(idleT);
      if(playing) idleT=setTimeout(function(){ if(playing) p.classList.add('hushed'); },2600);
    }
    function seek(ev){
      var bar=$('rvwSeek'); if(!bar) return;
      var r=bar.getBoundingClientRect();
      var p=Math.min(1,Math.max(0,(ev.clientX-r.left)/r.width));
      var f=FILMS[cur], v=$('rvwVid');
      if(f.src&&v&&v.duration){
        v.currentTime=p*v.duration;
        $('rvwBar').style.width=(p*100)+'%';
        $('rvwTime').textContent=fmt(v.currentTime);
        return;
      }
      var total=f.lines.length*SEC;
      at=p*total;
      $('rvwBar').style.width=(p*100)+'%';
      $('rvwTime').textContent=fmt(at);
      if(playing&&f.lines.length){
        $('rvwCap').textContent=f.lines[Math.min(f.lines.length-1,Math.floor(at/SEC))];
      }
    }

    /* browsers refuse to start a film with sound unless the click that asked
       for it is still in hand. If they refuse, we start it silent rather than
       showing a dead frame, and hand the sound back as a button. */
    var muted=false;
    function setMute(on){
      muted=!!on;
      var v=$('rvwVid'), p=$('rvwPlayer');
      if(v) v.muted=muted;
      if(p) p.classList.toggle('muted',muted);
    }
    function play(){
      var f=FILMS[cur];
      playing=true; at=0;
      $('rvwPlayer').classList.add('playing');
      wake();
      clearInterval(tick);
      var vid=$('rvwVid');
      if(f.src&&vid){                       /* the file drives the clock itself */
        if(vid.readyState>0){ try{ vid.currentTime=0; }catch(err){} }
        vid.muted=muted;
        var pr=vid.play();
        if(pr&&pr.catch) pr.catch(function(){
          setMute(true);
          var quiet=vid.play();
          if(quiet&&quiet.catch) quiet.catch(function(){ stop(); });
        });
        return;
      }
      var total=f.lines.length*SEC;
      tick=setInterval(function(){
        at+=0.1;
        if(at>=total){ stop(); return; }
        var idx=Math.min(f.lines.length-1,Math.floor(at/SEC));
        $('rvwCap').textContent=f.lines[idx];
        $('rvwBar').style.width=(at/total*100)+'%';
        $('rvwTime').textContent=fmt(at);
      },100);
    }
    function stop(){
      playing=false;
      clearInterval(tick); tick=null;
      var v=$('rvwVid'); if(v&&!v.paused) v.pause();
      var p=$('rvwPlayer'); if(p){ p.classList.remove('playing'); p.classList.remove('hushed'); }
      clearTimeout(idleT);
    }
    function open(){
      wrap.classList.add('on');
      wrap.setAttribute('aria-hidden','false');
      /* belt and braces: the panel shows even if the class rule is overridden */
      wrap.style.display='flex';
      wrap.style.zIndex='2147483000';
      document.body.style.overflow='hidden';
      document.body.classList.add('modal-open');
      load(0);
      /* start straight away — if the browser blocks it, play() falls back
         to the paused frame with its play button */
      play();
    }
    function close(){
      stop();
      wrap.classList.remove('on');
      wrap.setAttribute('aria-hidden','true');
      wrap.style.display='';
      wrap.style.zIndex='';
      document.body.style.overflow='';
      document.body.classList.remove('modal-open');
    }
    window.incomeraReviews=open;

    function bindTriggers(){
      var list=document.querySelectorAll('.js-reviews-open');
      for(var i=0;i<list.length;i++){
        if(list[i].getAttribute('data-rvw-bound')) continue;
        list[i].setAttribute('data-rvw-bound','1');
        list[i].addEventListener('click',function(ev){ ev.preventDefault(); ev.stopPropagation(); open(); });
      }
    }
    (function(){
      var v=$('rvwVid');
      if(!v) return;
      v.addEventListener('timeupdate',function(){
        if(!playing||!v.duration) return;
        $('rvwBar').style.width=(v.currentTime/v.duration*100)+'%';
        $('rvwTime').textContent=fmt(v.currentTime);
      });
      v.addEventListener('ended',function(){ stop(); });
    })();

    bindTriggers();
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bindTriggers);
    window.addEventListener('load',bindTriggers);

    document.addEventListener('click',function(e){
      var t=e.target;
      if(t.closest&&t.closest('.js-reviews-open')){ e.preventDefault(); open(); return; }
      if(!wrap.classList.contains('on')) return;
      if(t.closest&&t.closest('[data-rvw-close]')){ close(); return; }
      var pick=t.closest&&t.closest('[data-rvw-pick]');
      if(pick){
        /* a visitor choosing a film means they want to watch it */
        load(+pick.getAttribute('data-rvw-pick'));
        play();
        return;
      }
      if(t.closest&&t.closest('[data-rvw-prev]')){
        var wasPlayingP=playing;
        load((cur-1+FILMS.length)%FILMS.length);
        if(wasPlayingP) play();
        return;
      }
      if(t.closest&&t.closest('[data-rvw-next]')){
        var wasPlaying=playing;
        load((cur+1)%FILMS.length);
        if(wasPlaying) play();
        return;
      }
      if(t.closest&&t.closest('[data-rvw-mute]')){
        setMute(!muted);
        if(!muted&&$('rvwVid')&&$('rvwVid').paused&&playing){ $('rvwVid').play(); }
        return;
      }
      if(t.closest&&t.closest('#rvwSeek')){ seek(e); return; }
      if(t.closest&&t.closest('#rvwPlayer')){ playing?stop():play(); return; }
    });
    wrap.addEventListener('mousemove',wake);
    wrap.addEventListener('touchstart',wake,{passive:true});

    document.addEventListener('keydown',function(e){
      if(!wrap.classList.contains('on')) return;
      if(e.key==='Escape'){ close(); return; }
      if(e.key===' '||e.key==='Spacebar'){ e.preventDefault(); playing?stop():play(); return; }
      if(e.key==='ArrowRight'){ var wp=playing; load((cur+1)%FILMS.length); if(wp) play(); return; }
      if(e.key==='ArrowLeft'){ var wq=playing; load((cur-1+FILMS.length)%FILMS.length); if(wq) play(); }
    });
    renderList();
  })();
