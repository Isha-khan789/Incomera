(function(){
  var wrap,frame,loaded=false;
  function ensure(){ wrap=document.getElementById("crmFrameWrap"); frame=document.getElementById("crmFrame"); }
  window.openCRM=function(){
    ensure();
    if(!loaded){ var tpl=document.getElementById("crmDoc"); frame.srcdoc=tpl.textContent.split("@@ENDSCRIPT@@").join("<\/script>"); loaded=true; }
    try{ var lm=document.getElementById("lmodal"); if(lm){ lm.classList.remove("open"); lm.setAttribute("aria-hidden","true"); } }catch(e){}
    document.body.style.overflow="hidden"; wrap.classList.add("open");
  };
  window.closeCRM=function(){ ensure(); wrap.classList.remove("open"); document.body.style.overflow=""; };
  window.addEventListener("message",function(e){ if(e.data==="incomera-exit") window.closeCRM(); });
})();
