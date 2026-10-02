/* ===== BUSINESS AUDIT MODAL ===== */
  (function(){
    var btn=document.getElementById('auditBtn'), modal=document.getElementById('amodal');
    if(!modal) return;
    var openBtns=document.querySelectorAll('#auditBtn, .js-audit-open');
    var opts=modal.querySelectorAll('.aopt'), go=document.getElementById('auditGo'),
        email=document.getElementById('auditEmail'), doneBtn=document.getElementById('auditCloseDone');
    function open(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; document.body.classList.add('modal-open'); }
    function close(){
      modal.classList.remove('open','sent'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow='';
      document.body.classList.remove('modal-open'); go.disabled=false; go.textContent='Send my proposal';
      ['auditName','auditCompany','auditEmail','auditNotes','auditPhone'].forEach(function(id){
        var el=document.getElementById(id); if(el) el.value='';
      });
      var ph=document.getElementById('auditPhone'); if(ph) ph.style.borderColor='';
      [].forEach.call(modal.querySelectorAll('.aopt.on'),function(o){ o.classList.remove('on'); });
    }
    [].forEach.call(openBtns,function(b){ b.addEventListener('click',open); });
    [].forEach.call(opts,function(o){ o.addEventListener('click',function(){ o.classList.toggle('on'); }); });
    go.addEventListener('click',function(){
      var val=(email.value||'').trim();
      if(!val || !/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(val)){
        email.focus(); email.style.borderColor='var(--rev)'; return;
      }
      email.style.borderColor='';

      var phEl=document.getElementById('auditPhone'),
          dlEl=document.getElementById('auditDial'),
          raw=(phEl&&phEl.value||'').trim(),
          digits=raw.replace(/[^0-9]/g,'');
      if(raw && digits.length<7){ phEl.focus(); phEl.style.borderColor='var(--rev)'; return; }
      if(phEl) phEl.style.borderColor='';
      var phone=raw?((dlEl?dlEl.value:'')+' '+raw):'';
      go.disabled=true; go.textContent='Sending…';

      /* hand the submission to the admin panel */
      try{
        var want=[];
        [].forEach.call(modal.querySelectorAll('.aopt.on'),function(o){ want.push(o.getAttribute('data-val')); });
        var nm=document.getElementById('auditName'),
            cp=document.getElementById('auditCompany'),
            nt=document.getElementById('auditNotes');
        if(typeof window.incomeraAudit==='function'){
          window.incomeraAudit({
            name:nm?nm.value:'', company:cp?cp.value:'', email:val,
            phone:phone,
            want:want, notes:nt?nt.value:'', source:'Website · proposal form'
          });
        }
      }catch(err){}

      setTimeout(function(){ modal.classList.add('sent'); },700);
    });
    doneBtn.addEventListener('click',close);
    [].forEach.call(modal.querySelectorAll('[data-aclose]'),function(el){ el.addEventListener('click',close); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal.classList.contains('open')) close(); });
  })();
