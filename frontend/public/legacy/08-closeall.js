/* ===== ADMIN TOP BAR — dropdown menus ===== */
  (function(){
    var bar=document.querySelector('.ad__side');
    if(!bar) return;
    function closeAll(except){
      [].forEach.call(bar.querySelectorAll('.ad__grp.open'),function(g){
        if(g!==except) g.classList.remove('open');
      });
    }
    document.addEventListener('click',function(e){
      var t=e.target.closest ? e.target : null;
      if(!t) return;
      var grp=t.closest('.ad__grp');
      if(!grp || !bar.contains(grp)) { closeAll(null); return; }
      if(t.closest('.ad__sub')) { closeAll(null); return; }
      closeAll(grp);
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') closeAll(null);
    });
    bar.addEventListener('focusout',function(e){
      if(!bar.contains(e.relatedTarget)) closeAll(null);
    });
  })();
