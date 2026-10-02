/* ===== "who this is for" -> jump to the matching engine ===== */
  (function(){
    [].forEach.call(document.querySelectorAll('[data-eng-jump]'),function(b){
      b.addEventListener('click',function(){
        var k=b.getAttribute('data-eng-jump');
        if(window.setEngine) window.setEngine(k);
        var sec=document.getElementById('packages');
        if(sec) sec.scrollIntoView({behavior:'smooth',block:'start'});
      });
    });
  })();
