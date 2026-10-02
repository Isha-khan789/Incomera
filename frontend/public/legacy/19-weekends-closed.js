/* ===== BOOKING PAGE — everything on one page ===== */
  (function(){
    var modal=document.getElementById('bkModal');
    if(!modal) return;
    var $=function(id){ return document.getElementById(id); };

    var ZONES=[
      ['Pacific Time — Los Angeles',-7],['Mountain Time — Denver',-6],['Central Time — Chicago',-5],
      ['Eastern Time — New York',-4],['Brazil — São Paulo',-3],['UTC',0],['UK — London',1],
      ['Central Europe — Berlin, Paris',2],['Türkiye — Istanbul',3],['Gulf — Dubai',4],
      ['Pakistan, Maldives Time',5],['India — Mumbai, Delhi',5.5],['Singapore, Hong Kong',8],
      ['Japan — Tokyo',9],['Australia — Sydney',10]
    ].map(function(z){ return {k:z[0],o:z[1]}; });

    var HOST=5, START=9, END=18, LEN=30;
    var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var DAYL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var tzSel=$('bkTz'), curTz=10, view=new Date(), curDate=null, curSlot=null, curLoc='Google Meet';
    view.setDate(1); view.setHours(0,0,0,0);

    ZONES.forEach(function(z,i){
      var o=document.createElement('option');
      o.value=i; o.textContent=z.k; tzSel.appendChild(o);
    });
    (function guess(){
      var off=-new Date().getTimezoneOffset()/60, best=10, gap=99;
      ZONES.forEach(function(z,i){ var d=Math.abs(z.o-off); if(d<gap){gap=d;best=i;} });
      curTz=best; tzSel.value=best;
    })();
    function zone(){ return ZONES[curTz]||ZONES[10]; }

    function key(d){ return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate(); }
    function openDay(d){
      var wd=d.getDay();
      if(wd===0||wd===6) return false;                      /* weekends closed */
      var t=new Date(); t.setHours(0,0,0,0);
      if(d.getTime()<=t.getTime()) return false;            /* today and past closed */
      if((d.getDate()*7+d.getMonth())%11===0) return false; /* the odd fully booked day */
      return true;
    }
    function slotsFor(d){
      if(!d||!openDay(d)) return [];
      var out=[], stepH=LEN/60;
      for(var h=START;h+stepH<=END;h+=stepH){
        var seed=(d.getDate()*13+Math.round(h*10))%9;
        out.push({h:h,taken:(seed===0||seed===5)});
      }
      return out;
    }
    function shift(h){ var v=h-HOST+zone().o; return ((v%24)+24)%24; }
    function fmtH(h){
      var hh=Math.floor(h), mm=Math.round((h-hh)*60);
      var ap=hh>=12?'pm':'am', d=hh%12||12;
      return d+':'+String(mm).padStart(2,'0')+ap;
    }
    function nowInZone(){
      var d=new Date(), utc=d.getTime()+d.getTimezoneOffset()*60000;
      var z=new Date(utc+zone().o*3600000), hh=z.getHours();
      return (hh%12||12)+':'+String(z.getMinutes()).padStart(2,'0')+(hh>=12?'pm':'am');
    }
    function longDate(d){
      return DAYL[d.getDay()]+', '+MON[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
    }
    function firstOpenDay(){
      var d=new Date(); d.setHours(0,0,0,0);
      for(var i=1;i<=60;i++){
        var t=new Date(d.getFullYear(),d.getMonth(),d.getDate()+i);
        if(openDay(t)&&slotsFor(t).some(function(s){ return !s.taken; })) return t;
      }
      return null;
    }

    /* ---------------- header chips + footer summary ---------------- */
    function paintState(){
      var z=$('bkChipZone'), w=$('bkChipWhen'), l=$('bkChipLoc');
      z.querySelector('span').textContent=zone().k.split(' — ')[0];
      z.classList.add('is-set');
      if(curDate&&curSlot){
        w.querySelector('span').textContent=fmtH(shift(curSlot.h))+' · '+
          MON[curDate.getMonth()].slice(0,3)+' '+curDate.getDate();
        w.classList.add('is-set');
      }else{
        w.querySelector('span').textContent=curDate
          ? MON[curDate.getMonth()].slice(0,3)+' '+curDate.getDate()
          : 'Pick a time';
        w.classList.remove('is-set');
      }
      l.querySelector('span').textContent=curLoc;

      var sum=$('bkSum');
      if(curDate&&curSlot){
        sum.innerHTML='<b>'+fmtH(shift(curSlot.h))+' — '+longDate(curDate)+'</b> · '+
          LEN+' min · '+curLoc;
      }else if(curDate){
        sum.textContent='Now pick a time on '+DAYL[curDate.getDay()]+'.';
      }else{
        sum.textContent='Pick a date and a time to continue.';
      }
      $('bkGo').disabled=!(curDate&&curSlot);
    }

    /* ---------------- calendar ---------------- */
    function renderCal(){
      $('bkMon').textContent=MON[view.getMonth()]+' '+view.getFullYear();
      var first=new Date(view.getFullYear(),view.getMonth(),1);
      var lead=(first.getDay()+6)%7;                        /* Monday-first */
      var days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
      var box=$('bkDays'); box.innerHTML='';
      var i,b;
      for(i=0;i<lead;i++){
        b=document.createElement('button');
        b.className='bk__d empty'; b.type='button'; b.disabled=true; box.appendChild(b);
      }
      for(i=1;i<=days;i++){
        var d=new Date(view.getFullYear(),view.getMonth(),i);
        var ok=openDay(d);
        b=document.createElement('button');
        b.type='button';
        b.className='bk__d'+((curDate&&key(curDate)===key(d))?' on':'');
        b.textContent=i;
        b.disabled=!ok;
        if(ok) (function(dd){ b.addEventListener('click',function(){ pickDate(dd); }); })(d);
        box.appendChild(b);
      }
      var now=new Date(); now.setDate(1); now.setHours(0,0,0,0);
      $('bkPrev').disabled=(view.getFullYear()===now.getFullYear()&&view.getMonth()===now.getMonth());
      tzSel.options[curTz].textContent=zone().k+' ('+nowInZone()+')';
    }

    function pickDate(d){
      curDate=d; curSlot=null;
      renderCal();
      renderSlots();
      paintState();
    }

    /* ---------------- slots ---------------- */
    function renderSlots(){
      var box=$('bkSlots');
      if(!curDate){
        $('bkSlotDay').textContent='No date chosen';
        $('bkSlotSub').textContent='Pick a day on the calendar.';
        box.innerHTML='';
        return;
      }
      $('bkSlotDay').textContent=DAYL[curDate.getDay()]+', '+MON[curDate.getMonth()].slice(0,3)+' '+curDate.getDate();
      $('bkSlotSub').textContent=LEN+' min · '+zone().k.split(' — ')[0];
      var list=slotsFor(curDate);
      box.innerHTML='';
      if(!list.length){
        box.innerHTML='<p class="bk__none" style="grid-column:1/-1">Nothing free that day. Try another date.</p>';
        return;
      }
      list.forEach(function(s){
        var b=document.createElement('button');
        b.type='button';
        b.className='bk__s'+(s.taken?' gone':'')+((curSlot&&curSlot.h===s.h)?' on':'');
        b.textContent=fmtH(shift(s.h));
        if(!s.taken) b.addEventListener('click',function(){
          curSlot=s;
          [].forEach.call(box.children,function(x){ x.classList.remove('on'); });
          b.classList.add('on');
          $('bkErr').classList.remove('on');
          paintState();
        });
        box.appendChild(b);
      });
    }

    $('bkPrev').addEventListener('click',function(){ view.setMonth(view.getMonth()-1); renderCal(); });
    $('bkNext').addEventListener('click',function(){ view.setMonth(view.getMonth()+1); renderCal(); });
    tzSel.addEventListener('change',function(){
      curTz=+tzSel.value; curSlot=null;
      renderCal(); renderSlots(); paintState();
    });

    /* ---------------- location ---------------- */
    [].forEach.call($('bkLoc').children,function(b){
      b.addEventListener('click',function(){
        [].forEach.call($('bkLoc').children,function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        curLoc=b.dataset.loc;
        var isPh=(curLoc==='Phone call');
        $('bkPhLbl').textContent=isPh?'Phone number *':'Phone number';
        $('bkPhone').placeholder=isPh?'+92 300 0000000':'+92 300 0000000 (optional)';
        paintState();
      });
    });

    /* ---------------- confirm ---------------- */
    $('bkGo').addEventListener('click',function(){
      var nm=$('bkName').value.trim(), em=$('bkEmail').value.trim(), co=$('bkCo').value.trim();
      var ph=$('bkPhone').value.trim(), err=$('bkErr');
      if(!curDate||!curSlot){
        err.textContent='Pick a date and a time first.'; err.classList.add('on'); return;
      }
      if(nm.length<2 || !/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(em)){
        err.textContent='Please add your name and a valid email.'; err.classList.add('on');
        $('bkName').focus(); return;
      }
      if(curLoc==='Phone call' && ph.replace(/[^0-9]/g,'').length<7){
        err.textContent='Please add a phone number we can call.'; err.classList.add('on');
        $('bkPhone').focus(); return;
      }
      err.classList.remove('on');

      var utc=Date.UTC(curDate.getFullYear(),curDate.getMonth(),curDate.getDate(),0,0,0)
              + (curSlot.h-HOST)*3600000;
      var ref='MTG-'+String(Date.now()).slice(-5);
      try{
        if(typeof window.incomeraMeeting==='function'){
          ref=window.incomeraMeeting({
            name:nm, company:co||'Not given', email:em, at:utc, mins:LEN,
            topic:$('bkTopic').value+' · '+curLoc+(ph?' · '+ph:'')+
              ($('bkNotes').value.trim()?' — '+$('bkNotes').value.trim():''),
            source:'Website · booking'
          })||ref;
        }
      }catch(e){}

      $('bkDoneWhen').textContent=fmtH(shift(curSlot.h))+' — '+longDate(curDate);
      $('bkDoneZone').textContent=LEN+' minutes · '+zone().k;
      $('bkDoneLoc').textContent=curLoc;
      $('bkDoneLocSub').textContent=(curLoc==='Phone call')
        ? 'We call you on '+ph
        : 'Joining link arrives with the invite';
      $('bkDoneWho').textContent=nm+(co?' · '+co:'');
      $('bkDoneTopic').textContent=em+(ph?' · '+ph:'')+' · '+$('bkTopic').value;
      $('bkDoneRef').textContent='Reference '+ref;
      modal.classList.add('done');
    });

    /* ---------- shut every other page / popup before booking opens ---------- */
    function closeEverythingElse(){
      var byOpen='.dmodal,.pmodal,.lmodal,.amodal,.crw,.adw,.jd__wrap,.ad__dw,#crmFrameWrap,.chatw';
      [].forEach.call(document.querySelectorAll(byOpen),function(el){
        el.classList.remove('open','expanded');
        if(el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden','true');
      });
      [].forEach.call(document.querySelectorAll('.rvw,.aem,.evm'),function(el){
        el.classList.remove('on');
        if(el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden','true');
      });
      var crm=document.getElementById('crmRoot');
      if(crm) crm.classList.remove('show');
      [].forEach.call(document.querySelectorAll('.scrim'),function(el){ el.classList.remove('on','open','show'); });
      var cp=document.getElementById('chatPanel');
      if(cp) cp.setAttribute('aria-hidden','true');
      var cb=document.getElementById('chatBtn');
      if(cb) cb.setAttribute('aria-expanded','false');
      [].forEach.call(document.querySelectorAll('video,audio'),function(m){
        try{ if(!m.paused) m.pause(); }catch(e){}
      });
    }

    /* ---------------- open / close ---------------- */
    function open(){
      closeEverythingElse();
      curLoc='Google Meet'; curSlot=null;
      $('bkPhLbl').textContent='Phone number';
      $('bkPhone').placeholder='+92 300 0000000 (optional)';
      [].forEach.call($('bkLoc').children,function(x,i){ x.classList.toggle('on',i===0); });
      $('bkErr').classList.remove('on');
      modal.classList.remove('done');

      curDate=firstOpenDay();                     /* land on the first free day */
      view=curDate?new Date(curDate.getFullYear(),curDate.getMonth(),1):new Date();
      view.setDate(1); view.setHours(0,0,0,0);

      modal.classList.add('on');
      modal.setAttribute('aria-hidden','false');
      document.body.classList.add('modal-open');
      document.body.style.overflow='hidden';
      renderCal(); renderSlots(); paintState();
    }
    function close(){
      modal.classList.remove('on','done');
      modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('modal-open');
      document.body.style.overflow='';
      ['bkName','bkCo','bkEmail','bkPhone','bkNotes'].forEach(function(id){
        var e=$(id); if(e) e.value='';
      });
      $('bkErr').classList.remove('on');
    }
    window.incomeraBookOpen=open;

    [].forEach.call(modal.querySelectorAll('[data-bk-close]'),function(b){ b.addEventListener('click',close); });
    $('bkDoneBtn').addEventListener('click',close);
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&modal.classList.contains('on')) close();
    });
    document.addEventListener('click',function(e){
      var t=e.target.closest&&e.target.closest('.js-book-open');
      if(t){ e.preventDefault(); open(); }
    });

    renderCal(); renderSlots(); paintState();
  })();
