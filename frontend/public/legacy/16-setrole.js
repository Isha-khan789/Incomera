/* ===== LOGIN / ACCOUNT MODAL ===== */
  (function(){
    var btn=document.getElementById('loginBtn'), modal=document.getElementById('lmodal');
    if(!btn||!modal) return;
    var submit=document.getElementById('lSubmit'),
        pass=document.getElementById('lPass'),
        err=document.getElementById('lErr'),
        tabs=document.getElementById('lTabs'),
        title=document.getElementById('lTitle'),
        sub=document.getElementById('lSub'),
        hint=document.getElementById('lHint'),
        email=document.getElementById('lEmail');

    var ROLE={
      operator:{
        title:'Operator sign-in',
        sub:'For the operator running client engines day to day.',
        mail:'you@incomera.com',
        hint:'Opens the console — pipeline, campaigns, reporting and the engines you own.',
        cta:'Sign in to console'
      },
      team:{
        title:'Team sign-in',
        sub:'For everyone else in the workspace.',
        mail:'name@incomera.com',
        hint:'Opens the workspace — members, permissions, channels and settings your role allows.',
        cta:'Sign in to workspace'
      }
    };
    var role='operator';
    function setRole(r){
      role=r;
      var c=ROLE[r];
      tabs.classList.toggle('is-op',r==='team');
      [].forEach.call(tabs.querySelectorAll('.ltabs__b'),function(b){
        var on=b.getAttribute('data-role')===r;
        b.classList.toggle('on',on);
        b.setAttribute('aria-selected',on?'true':'false');
      });
      title.textContent=c.title;
      sub.textContent=c.sub;
      hint.textContent=c.hint;
      email.placeholder=c.mail;
      submit.textContent=c.cta;
      err.classList.remove('on'); pass.classList.remove('bad');
    }
    [].forEach.call(tabs.querySelectorAll('.ltabs__b'),function(b){
      b.addEventListener('click',function(){ setRole(b.getAttribute('data-role')); });
    });

    function open(){
      err.classList.remove('on'); pass.classList.remove('bad');
      submit.disabled=false; submit.textContent=ROLE[role].cta;
      modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden'; document.body.classList.add('modal-open');
    }
    function close(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; document.body.classList.remove('modal-open'); submit.disabled=false; submit.textContent=ROLE[role].cta; }
    btn.addEventListener('click',open);
    pass.addEventListener('input',function(){ err.classList.remove('on'); pass.classList.remove('bad'); });
    pass.addEventListener('keydown',function(e){ if(e.key==='Enter') submit.click(); });

    function showErr(msg){
      err.textContent=msg; err.classList.add('on'); pass.classList.add('bad');
      submit.disabled=false; submit.textContent=ROLE[role].cta;
    }
    email.addEventListener('input',function(){ err.classList.remove('on'); pass.classList.remove('bad'); });
    email.addEventListener('keydown',function(e){ if(e.key==='Enter') submit.click(); });

    var API='http://localhost:5001'; /* change to your deployed backend URL later */

    submit.addEventListener('click',function(){
      var em=email.value.trim().toLowerCase(), pw=pass.value;
      if(!em||!pw){ showErr('Enter your email and password.'); return; }
      submit.disabled=true; submit.textContent='Signing in…';

      fetch(API+'/api/auth/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:em,password:pw,role:role})
      })
      .then(function(r){ return r.json().then(function(d){ return {ok:r.ok,d:d}; }); })
      .then(function(res){
        if(!res.ok){
          pass.value='';
          showErr(res.d.message||'Invalid email or password. Try again.');
          pass.focus();
          return;
        }
        try{ sessionStorage.setItem('incomera_token',res.d.token); }catch(e){}
        submit.textContent='Success ✓';
        setTimeout(function(){
          submit.disabled=false; submit.textContent=ROLE[role].cta;
          close(); pass.value=''; email.value='';
          if(window.openAdminPortal) window.openAdminPortal(true);
        },600);
      })
      .catch(function(){
        showErr('Cannot reach the server. Check that the backend is running.');
      });
    });
    [].forEach.call(modal.querySelectorAll('[data-lclose]'),function(el){ el.addEventListener('click',close); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal.classList.contains('open')) close(); });
  })();