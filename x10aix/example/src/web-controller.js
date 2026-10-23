(function(){
 const tl=window.demoTimeline, starts=[0,2.5,5.5,8.5,11.5], stable=[0,3,6.5,9,14];
 const calm=matchMedia('(prefers-reduced-motion: reduce)');
 const embedded=new URLSearchParams(location.search).has('embed');
 if(embedded)document.body.classList.add('embedded');
 const play=document.getElementById('play'),scrub=document.getElementById('scrub'),time=document.getElementById('time');
 const labels=['Dokument eingegangen.','Stopp: Projekt fehlt.','Angabe ergänzt.','Ein Mensch prüft den Inhalt.','Der Mensch hat freigegeben.'];
 function update(){const t=tl.time();scrub.value=t;time.value=t.toFixed(1).replace('.',',')+' / 15 s';play.textContent=tl.paused()?'Abspielen':'Pause';const phase=Math.max(0,starts.findLastIndex(s=>t>=s));document.querySelectorAll('.phase').forEach((el,i)=>el.setAttribute('aria-hidden',String(i!==phase)));document.querySelectorAll('[data-phase]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.phase===phase)));}
 function seek(t,announce=false){tl.pause();tl.seek(Math.min(15,Math.max(0,t)),false);if(announce)document.getElementById('live-state').textContent=labels[Math.max(0,starts.findLastIndex(s=>t>=s))];update();}
 function toggle(){if(!tl.paused())tl.pause();else if(calm.matches){const p=Math.max(0,starts.findLastIndex(s=>tl.time()>=s));seek(stable[(p+1)%5],true);}else{if(tl.time()>=14.99)tl.seek(0,false);tl.play();}update();}
 tl.eventCallback('onUpdate',update);tl.eventCallback('onComplete',()=>{tl.pause();update();});
 play.addEventListener('click',toggle);document.getElementById('restart').addEventListener('click',()=>seek(0,true));scrub.addEventListener('input',()=>seek(+scrub.value));
 document.querySelectorAll('[data-phase]').forEach(b=>b.addEventListener('click',()=>seek(stable[+b.dataset.phase],true)));
 document.getElementById('calm-note').hidden=!calm.matches;calm.addEventListener('change',()=>{if(calm.matches)seek(tl.time());document.getElementById('calm-note').hidden=!calm.matches;});
 new IntersectionObserver(entries=>{if(!entries[entries.length-1].isIntersecting)tl.pause();update();},{threshold:0}).observe(document.getElementById('root'));
 document.addEventListener('visibilitychange',()=>{if(document.hidden){tl.pause();update();}});
 window.demo={seek,play:()=>{if(!calm.matches)tl.play();update();},pause:()=>{tl.pause();update();},time:()=>tl.time(),isPlaying:()=>!tl.paused()};
 update();
})();
