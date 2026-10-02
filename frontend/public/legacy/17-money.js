/* ===== PAYMENT / PACKAGES MODAL ===== */
  (function(){
    var btn=document.getElementById('payBtn'), modal=document.getElementById('pmodal');
    if(!btn||!modal) return;
    var plans=modal.querySelectorAll('.plan'),
        totalEl=document.getElementById('payTotal'), go=document.getElementById('payGo'),
        planName=document.getElementById('payPlanName'), planDesc=document.getElementById('payPlanDesc'),
        planPrice=document.getElementById('payPlanPrice');
    function money(n){ return '$'+n.toLocaleString(); }
    function selected(){ return modal.querySelector('.plan.sel'); }
    function recompute(){
      var p=selected(), base=p?parseFloat(p.dataset.price):0, cad=p?p.dataset.cad:'mo';
      totalEl.innerHTML=money(base)+'<span>'+(cad==='once'?'one-time':'/mo')+'</span>';
      var none=(base===0);
      go.disabled=none;
      go.textContent=none?'Select a package':'Continue to payment';
      if(p){
        planName.textContent=p.dataset.name;
        planDesc.textContent=p.dataset.desc||'';
        planPrice.textContent=money(base)+(cad==='once'?' one-time':'/mo');
      } else {
        planName.textContent='No package selected';
        planDesc.textContent='Pick an outcome on the left';
        planPrice.textContent='—';
      }
    }
    [].forEach.call(plans,function(p){ p.addEventListener('click',function(){
      var was=p.classList.contains('sel');
      [].forEach.call(plans,function(x){ x.classList.remove('sel'); });
      if(!was) p.classList.add('sel');
      recompute();
    });});
    function open(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; document.body.classList.add('modal-open'); recompute(); }
    function close(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; document.body.classList.remove('modal-open'); go.disabled=false; go.textContent='Continue to payment'; }
    btn.addEventListener('click',open);
    go.addEventListener('click',function(){
      var p=selected(); go.disabled=true; go.textContent='Redirecting to checkout…';
      setTimeout(function(){ go.textContent='Secure checkout ready ✓'; setTimeout(close,800); },800);
    });
    [].forEach.call(modal.querySelectorAll('[data-pclose]'),function(el){ el.addEventListener('click',close); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal.classList.contains('open')) close(); });
  })();
