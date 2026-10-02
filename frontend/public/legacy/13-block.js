/* ===== PACKAGE CARD ACTIONS ===== */
  (function(){
    var pay=document.getElementById('payBtn'), pmodal=document.getElementById('pmodal');
    [].forEach.call(document.querySelectorAll('.js-pkg-start'),function(b){
      b.addEventListener('click',function(){
        var name=b.getAttribute('data-plan');
        if(pmodal&&name){
          [].forEach.call(pmodal.querySelectorAll('.plan'),function(pl){
            pl.classList.toggle('sel', pl.getAttribute('data-name')===name);
          });
        }
        if(pay){ pay.click(); }
        else { location.hash='#packages'; }
      });
    });
  })();
