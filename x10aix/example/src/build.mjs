import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const webMode=process.argv.includes('--web');
const {anatomyFigure,motion}=await import(webMode?'./figure-web.mjs':'./figure-video.mjs');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,s)=>fs.writeFileSync(path.join(root,p),s);
for(const dir of ['film-einfach','film-anatomy'])fs.mkdirSync(path.join(root,dir),{recursive:true});
fs.copyFileSync(path.join(root,'../node_modules/gsap/dist/gsap.min.js'),path.join(root,'assets/gsap.min.js'));
const patterns=JSON.parse(read('assets/Pixelmotive.json')).patterns;
const pixel=(name,x,y,size,color)=>`<g fill="${color}">${patterns[name].flatMap((r,j)=>[...r].map((v,i)=>v==='1'?`<rect x="${x+i*size}" y="${y+j*size}" width="${size}" height="${size}"/>`:'')).join('')}</g>`;
const phases=[
 ['01','EINGANG','Dokument eingegangen.','Die Prüfung startet.'],
 ['02','VOLLSTÄNDIGKEIT','Stopp: Projekt fehlt.','Eine Pflichtangabe ist leer.'],
 ['03','KORREKTUR','Angabe ergänzen.','Die Pflichtangaben sind jetzt da.'],
 ['04','FACHLICHE PRÜFUNG','Vollständig ≠ freigegeben.','Ein Mensch prüft den Inhalt.'],
 ['05','FREIGABE','Der Mensch gibt frei.','Erst jetzt geht es weiter.']
];
const simple=`<svg class="simple-svg" viewBox="0 0 1000 560" role="img" aria-label="Ein Dokument stoppt bei einer fehlenden Pflichtangabe. Nach Ergänzung wartet es auf fachliche Prüfung und menschliche Freigabe.">
 <path d="M95 330H910" stroke="#5f5244" stroke-width="8"/>
 <path d="m900 315 16 15-16 15" fill="none" stroke="#a89968" stroke-width="8"/>
 <g fill="#231d18" stroke="#5f5244" stroke-width="3"><rect x="65" y="385" width="240" height="88"/><rect x="380" y="385" width="240" height="88"/><rect x="695" y="385" width="240" height="88"/></g>
 <g fill="#d4c5a9" font-size="30" text-anchor="middle"><text x="185" y="440">Eingang</text><text x="500" y="440">Prüfung</text><text x="815" y="440">Freigabe</text></g>
 <g id="simple-check"><path d="M374 295V112H618V295" fill="none" stroke="#00bcd4" stroke-width="10"/><rect x="442" y="90" width="110" height="52" fill="#231d18" stroke="#a89968" stroke-width="4"/>${pixel('gear',478,101,4,'#00bcd4')}</g>
 <g id="simple-person">${pixel('person',764,92,9,'#d4c5a9')}</g>
 <g id="simple-gate"><rect x="737" y="284" width="18" height="70" fill="#a89968"/><rect x="735" y="273" width="128" height="17" fill="#e8a030"/></g>
 <g id="simple-doc"><rect x="414" y="182" width="164" height="128" fill="#d4c5a9" stroke="#e8d4a0" stroke-width="4"/><path d="M436 209H524M436 231H552M436 275H530" stroke="#5f5244" stroke-width="8"/><g id="simple-missing"><rect x="432" y="244" width="120" height="18" fill="#e8a030"/><path d="M444 253H540" stroke="#2a2420" stroke-width="3" stroke-dasharray="5 5"/></g><g id="simple-filled"><rect x="432" y="244" width="120" height="18" fill="#00bcd4"/><path d="M441 253H520" stroke="#1a1612" stroke-width="5"/></g></g>
 <path id="simple-scan" d="M407 198H586" stroke="#00bcd4" stroke-width="5"/>
 <g id="simple-approved"><rect x="855" y="174" width="66" height="66" fill="#00bcd4"/><path d="m869 205 12 12 26-28" stroke="#1a1612" stroke-width="7" fill="none"/></g>
</svg>`;
const anatomy=anatomyFigure();
// Solid outlines are not connectors between DOM nodes. Keep text/layout audits active.
anatomy.svg=anatomy.svg.replaceAll('class="iso-line iso-edge"','data-layout-ignore="true" class="iso-line iso-edge"');
write('src/teileliste.json',JSON.stringify(anatomy.parts,null,2));
const style=read('src/style.css')+'\n'+read('src/web-ci.css')+'\n'+read('src/ci-volltest.css');
const css=read('../../kit/iso.css').split('@keyframes iso-flow')[0];
function content(variant){return `<div class="frame-bg"></div><header class="masthead"><span class="brand">x10aix</span><span class="edition">DOKUMENTATION → ENTSCHEIDUNG</span></header>
 <div class="intro"><div class="eyebrow">DOKUMENTPRÜFUNG</div><h1>Prüfen. Dann freigeben.</h1></div>
 <div class="workarea"><section class="machine-panel"><div class="panel-top"><span>${variant==='anatomy'?'ANATOMY':'ABLAUF'}</span><span>FIKTIVES BEISPIEL</span></div><div class="illustration iso">${variant==='anatomy'?anatomy.svg:simple}</div><div class="machine-caption"><span class="key"><i class="amber"></i>Freigabe / Aufmerksamkeit</span><span class="key"><i class="cyan"></i>Automatische Prüfung</span></div></section>
 <aside class="readout"><span class="readout-tab" aria-hidden="true">PRÜFSTATUS</span><div class="phase-stack">${phases.map((p,i)=>`<div class="phase" id="phase-${i}"><div class="phase-number">${p[0]}<span>/05</span></div><div class="phase-label">${p[1]}</div><h2>${p[2]}</h2><p>${p[3]}</p></div>`).join('')}</div><div class="rule"><span>KLARE GRENZE</span><p>Vollständigkeit ist keine fachliche Freigabe.</p></div></aside></div>
 <footer><span>AUTOMATISCH PRÜFEN. BEWUSST ENTSCHEIDEN.</span><span>SIMULIERTER ABLAUF · 15 SEK.</span></footer><div class="progress"><div id="progress-fill"></div></div>`;}
function timeline(variant){return `
 gsap.set('#phase-0',{opacity:1});gsap.set('#phase-1,#phase-2,#phase-3,#phase-4',{opacity:0});
 gsap.set('#${variant==='anatomy'?'anatomy':'simple'}-filled,#${variant==='anatomy'?'anatomy':'simple'}-approved,#${variant==='anatomy'?'anatomy':'simple'}-scan',{opacity:0});
 gsap.set('#${variant==='anatomy'?'anatomy':'simple'}-missing',{opacity:1});
 ${variant==='anatomy'?"gsap.set('#anatomy-scan-line',{opacity:0});":''}
 const tl=gsap.timeline({paused:true});
 tl.fromTo('#progress-fill',{scaleX:0},{scaleX:1,duration:15,ease:'none'},0);
 const starts=[0,2.5,5.5,8.5,11.5];
 for(let i=0;i<5;i++){if(i>0)tl.set('#phase-'+i,{opacity:1},starts[i]);if(i<4)tl.set('#phase-'+i,{opacity:0},starts[i+1]);}
 ${variant==='anatomy'?`
 const positions=${JSON.stringify(motion)};
 if(document.querySelector('#retro-display-hold')){gsap.set('#retro-display-hold,#retro-display-go',{opacity:0});
 tl.set('#retro-display-scan',{opacity:0},2.5).set('#retro-display-hold',{opacity:1},2.5);
 tl.set('#retro-display-hold',{opacity:0},5.5).set('#retro-display-scan',{opacity:1},5.5);
 tl.set('#retro-display-scan',{opacity:0},8.5).set('#retro-display-hold',{opacity:1},8.5);
 tl.set('#retro-display-hold',{opacity:0},11.5).set('#retro-display-go',{opacity:1},11.5);}
 for(const [id,start,duration] of [['scanner-signal',1.5,.7],['scanner-signal',5.5,.7],['release-signal',11.5,.4]]){
   tl.fromTo('#'+id,{opacity:0,strokeDashoffset:12},{opacity:1,strokeDashoffset:-100,duration,ease:'none'},start).set('#'+id,{opacity:0},start+duration);
 }

 const tr=v=>'translate('+v[0]+' '+v[1]+')';
 tl.fromTo('#anatomy-document',{attr:{transform:tr(positions.documentStart)}},{attr:{transform:tr(positions.documentCheck)},duration:1.2,ease:'power2.inOut'},0.7);
 tl.to('#anatomy-document',{attr:{transform:tr(positions.documentEnd)},duration:1.35,ease:'power2.inOut'},12.2);
 tl.fromTo('#anatomy-gate',{attr:{transform:'translate(0 0)'}},{attr:{transform:tr(positions.gateOpen)},duration:.55,ease:'power2.inOut'},11.6);
 tl.fromTo('#anatomy-button',{opacity:1},{opacity:.4,duration:.18,yoyo:true,repeat:1},11.5);
 tl.set('#anatomy-filled',{opacity:1},5.5);
 tl.set('#anatomy-missing',{opacity:0},5.5);
 tl.set('#anatomy-approved',{opacity:1},11.5);
 tl.set('#anatomy-scan,#anatomy-scan-line',{opacity:1},1.9).set('#anatomy-scan,#anatomy-scan-line',{opacity:0},2.5).set('#anatomy-scan,#anatomy-scan-line',{opacity:1},5.5).set('#anatomy-scan,#anatomy-scan-line',{opacity:0},8.5);
 `:`
 tl.fromTo('#simple-doc',{attr:{transform:'translate(-315 0)'}},{attr:{transform:'translate(0 0)'},duration:1.2,ease:'power2.inOut'},.7);
 tl.to('#simple-doc',{attr:{transform:'translate(335 0)'},duration:1.35,ease:'power2.inOut'},12.2);
 tl.fromTo('#simple-gate',{attr:{transform:'translate(0 0)'}},{attr:{transform:'translate(0 -110)'},duration:.55,ease:'power2.inOut'},11.6);
 tl.set('#simple-filled',{opacity:1},5.5);
 tl.set('#simple-missing',{opacity:0},5.5);
 tl.set('#simple-approved',{opacity:1},11.5);
 tl.set('#simple-scan',{opacity:1},1.9).to('#simple-scan',{attr:{transform:'translate(0 90)'},duration:.55,ease:'none'},1.9).set('#simple-scan',{opacity:0},2.5).set('#simple-scan',{opacity:1,attr:{transform:'translate(0 0)'}},5.5).to('#simple-scan',{attr:{transform:'translate(0 90)'},duration:.7,ease:'none'},5.5).set('#simple-scan',{opacity:0},6.3);
 `}
 ${`
 // Chrome can reuse stale antialiasing caches for the complex SVG after reverse seeking.
 // Invalidate paint synchronously after GSAP render, also when callbacks are suppressed.
 // This changes no time/model state and cannot paint an intermediate hidden frame.
 const nativeRender=tl.render;
 tl.render=function(...args){const result=nativeRender.apply(this,args);const svg=document.querySelector('.illustration > svg');svg.style.visibility='hidden';void svg.getBoundingClientRect();svg.style.visibility='visible';return result;};
 `}
 window.__timelines=window.__timelines||{};window.__timelines.main=tl;
 window.demoTimeline=tl;tl.seek(0,false);window.demoReady=true;
 `;}
for(const variant of ['einfach','anatomy']){
 const isAnatomy=variant==='anatomy';
 for(const web of [false,true]){
  const prefix=web?'assets/':'assets/';
  const controls=`<section class="controls" aria-label="Animation steuern"><button id="play">Abspielen</button><button id="restart">Neustart</button><label for="scrub">Zeit</label><input id="scrub" type="range" min="0" max="15" step=".05" value="0" aria-label="Zeitpunkt der Animation"/><output id="time">0,0 / 15 s</output><div class="steps">${phases.map((p,i)=>`<button data-phase="${i}">${p[0]} ${['Eingang','Stopp','Ergänzen','Prüfen','Freigabe'][i]}</button>`).join('')}</div><p class="control-note">Simulation: Die Vorführung zeigt auch die menschliche Prüfung und Freigabe. Sie ersetzt sie nicht.</p><p id="calm-note" hidden>Reduzierte Bewegung aktiv. Wähle die Schritte einzeln aus.</p><p class="sr" id="live-state" aria-live="polite"></p></section>`;
  const html=`<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Dokumentprüfung · ${isAnatomy?'Anatomy':'Einfach'} · x10aix</title><script src="${prefix}gsap.min.js"></script><style>@font-face{font-family:VT323;src:url('${prefix}vt323.woff2') format('woff2');font-display:block}${css}\n${style}</style></head><body class="${web?'web':'film'}"><main id="root" data-composition-id="main" data-start="0" data-duration="15" data-width="1920" data-height="1080">${content(variant)}</main>${web?controls:''}<script>${timeline(variant)}</script>${web?'<script src="src/web-controller.js"></script>':''}</body></html>`;
  if(web)write(`web-${variant}.html`,html);else{
   const dir=`film-${variant}`;write(`${dir}/index.html`,html);fs.mkdirSync(path.join(root,dir,'assets'),{recursive:true});
   for(const asset of ['gsap.min.js','vt323.woff2','OFL-VT323.txt','inter400.woff2','inter700.woff2','circuit-still.png'])fs.copyFileSync(path.join(root,'assets',asset),path.join(root,dir,'assets',asset));
   write(`${dir}/index.motion.json`,JSON.stringify({duration:15,assertions:[{kind:'appearsBy',selector:'.brand',bySec:0.1},{kind:'staysInFrame',selector:'.machine-panel'},{kind:'keepsMoving',withinSelector:'#root',maxStaticSec:3.5}]},null,2));
   fs.copyFileSync(path.join(root,'BRIEF.md'),path.join(root,dir,'BRIEF.md'));
  }
 }
}
console.log('Built two web previews and two deterministic 15-second HyperFrames compositions.');
