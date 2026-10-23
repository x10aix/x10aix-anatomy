// x10aix Figure: a document checking bed with a manually released exit gate.
// Geometry uses the unmodified Anatomy SVG kit (MIT; see vendor/anatomy/LICENSE).
// This is a fictional explanatory mechanism, not a model of a real customer process.
import * as k from '../../../kit/iso-kit.mjs';

const BASE = { x: -270, y: -82, w: 540, d: 164, r: 10 };
const P = k.fitProjection([...k.boxCorners(BASE, -26, 18), [100,-60,170], [100,60,170]],1000,560,{pad:42,azimuth:65,elevation:32});
const offset = (v) => {const a=k.iso(v,P), b=k.iso([0,0,0],P);return a.map((n,i)=>+(n-b[i]).toFixed(3));};
export const motion = {
  documentStart: offset([-180,0,0]),
  documentCheck: [0,0],
  documentEnd: offset([180,0,0]),
  gateOpen: offset([0,0,96]),
  buttonPressed: offset([0,0,-3]),
};

export function anatomyFigure() {
  const parts=[];
  const part=(name,plan,z,h,tone='mid',extra='')=>{
    parts.push({name,plan,z,h});
    const accent=/scanner-(head|column)/.test(name)?' housing-cyan':/gate-(blade|top-link|.*-cap)|manual-control-base/.test(name)?' housing-amber':'';
    return `<g class="${accent}" data-part="${name}">${k.solidSvg(k.slabOf(plan,z,h,P,1,.6),{tone,inner:extra})}</g>`;
  };
  const box=(name,x,y,w,d,z,h,tone='mid')=>part(name,{x,y,w,d,r:/scanner-head|gate-blade|manual-control-base/.test(name)?4:0},z,h,tone);
  const quad=(name,x,y,z)=>box(name,x-2,y-2,4,4,z,1.1,'hi');
  const line=(a,b,z,tone='lo',free=false)=>k.lineSvg(k.lineOnTop(a,b,z,P),{tone,free});
  const group=(id,body,cls='')=>`<g id="${id}" class="${cls}">${body}</g>`;
  const layers=[];

  // The parts list follows a physical assembly: feet, deck, trays, rails,
  // scanner, gate, control, and the document. No disconnected decoration.
  layers.push(`<path class="machine-shadow" d="${k.haloOf(BASE,-26,12,P)}"/>`);
  const feet=[[-244,-63],[230,-63],[-244,48],[230,48]].sort((a,b)=>k.depthOf([...a,0],P)-k.depthOf([...b,0],P));
  feet.forEach(([x,y],i)=>{
    layers.push(box(`foot-${i+1}`,x,y,24,24,-26,16,'lo'));
    layers.push(box(`foot-pad-${i+1}`,x-2,y-2,28,28,-28,2,'lo'));
  });
  layers.push(part('base-deck',BASE,-10,22,'mid'));
  layers.push(k.lineSvg(k.planOutline(k.insetPlan(BASE,6),12,P,1),{tone:'lo'}));
  [[-258,-70],[258,-70],[-258,70],[258,70]].forEach(([x,y],i)=>layers.push(quad(`deck-fastener-${i+1}`,x,y,12)));

  // CI traces on the actual deck: scanner supply and manual gate control.
  // Projected 8-unit grid / 45-degree routes, attached to physical components.
  const trace=(id,pts,color)=>{
    const d=k.onTop(pts,12.3,P), endpoints=[pts[0],pts.at(-1)].map(p=>k.iso([...p,12.3],P));
    return `<g class="deck-circuit" style="color:${color}"><path d="${d}" class="trace-rest"/>${endpoints.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3"/>`).join('')}<path id="${id}" d="${d}" pathLength="100" class="trace-signal"/></g>`;
  };
  layers.push(trace('scanner-signal',[[-248,-72],[-200,-72],[-192,-80],[-48,-80],[-40,-72],[-24,-72]],'#00bcd4'));
  layers.push(trace('release-signal',[[160,72],[128,72],[120,64],[104,64]],'#e8a030'));
  layers.push(trace('scanner-return',[[-16,-72],[-8,-80],[64,-80],[80,-64],[104,-64]],'#7dd3e8'));

  // Tray beds and rear stops are all flush with the document plane at z=26.
  layers.push(box('input-tray-bed',-253,-54,116,108,12,12,'hi'));
  layers.push(box('input-tray-back',-258,-59,126,5,12,18,'mid'));
  layers.push(box('input-end-stop',-258,-54,5,108,12,18,'mid'));
  layers.push(box('output-tray-bed',137,-54,116,108,12,12,'hi'));
  layers.push(box('output-tray-back',132,-59,126,5,12,18,'mid'));
  layers.push(box('output-end-stop',253,-54,5,108,12,18,'mid'));
  layers.push(box('inspection-bed',-137,-54,274,108,12,12,'mid'));
  layers.push(box('rear-guide-rail',-252,-52,504,4,24,4,'hi'));
  // Six actual low gliding strips support the carrier, not ornamental ticks.
  [-208,-125,-42,41,124,207].forEach((x,i)=>layers.push(box(`glide-strip-${i+1}`,x,-47,5,94,24,.9,'lo')));
  // Scanner stands behind the document, keeping its readable face unobscured.
  layers.push(box('scanner-foot',-30,-77,48,21,12,6,'lo'));
  layers.push(box('scanner-column',-20,-72,20,12,18,72,'mid'));
  layers.push(box('scanner-head',-27,-72,34,42,90,12,'hi'));
  layers.push(box('scanner-lens-seat',-23,-40,26,12,85,5,'lo'));
  layers.push(group('anatomy-scan',box('scanner-lens',-19,-39,18,8,84,1,'hi'),'machine-cyan'));
  [-14,-6].forEach((x,i)=>layers.push(quad(`scanner-mount-${i+1}`,x,-67,18)));

  // Gate uprights bracket the transport lane. The horizontal blade is lifted
  // after a separate manual-release step; correctness alone never opens it.
  for(const [y,label] of [[-72,'back'],[58,'front']]){
    layers.push(box(`gate-${label}-shoe`,91,y,28,14,12,8,'lo'));
    layers.push(box(`gate-${label}-upright`,99,y+3,12,8,20,145,'mid'));
    layers.push(box(`gate-${label}-guide`,95,y+2,20,10,33,9,'hi'));
    layers.push(box(`gate-${label}-cap`,97,y+1,16,12,165,4,'hi'));
    layers.push(quad(`gate-${label}-fastener`,105,y+7,20));
  }
  layers.push(box('gate-top-link',99,-61,12,122,153,8,'mid'));

  // Document at inspection position, moved by a deterministic external timeline.
  let doc=box('document-sheet',-56,-39,112,78,25,1.6,'hi');
  doc+=box('document-header',-46,-29,56,5,26.6,.12,'lo');
  doc+=line([-46,-15],[42,-15],26.8,'mid',true);
  doc+=line([-46,-3],[42,-3],26.8,'mid',true);
  doc+=line([-46,9],[-6,9],26.8,'mid',true);
  doc+=group('anatomy-missing',box('required-field-outline',-46,18,76,11,26.65,.12,'hi'),'machine-amber');
  doc+=group('anatomy-filled',box('required-field-value',-42,21,60,5,26.9,.12,'hi'),'machine-cyan');
  const check=k.onTop([[28,12],[34,18],[46,3]],27,P);
  doc+=group('anatomy-approved',`<path class="approval-check" d="${check}"/>`);
  layers.push(group('anatomy-document',doc,'machine-paper'));

  // The scanning line is a flat optical strip, no WebGL or physical obstruction.
  const scanPath=k.onTop([[0,-38],[0,38]],27.2,P);
  layers.push(`<path id="anatomy-scan-line" class="scan-line" d="${scanPath}"/>`);

  // Blade is drawn after the moving document; in its closed pose it ends below
  // the sheet and prevents travel. On release it lifts clear by 96 world units.
  let gate=box('gate-blade',99,-58,12,116,24,26,'hi');
  gate+=box('gate-blade-inlay',98.7,-43,.3,86,32,9,'mid');
  layers.push(group('anatomy-gate',gate));
  layers.push(box('front-guide-rail',-252,48,504,4,24,4,'hi'));
  layers.push(box('input-tray-front',-253,54,116,5,12,18,'mid'));
  layers.push(box('output-tray-front',137,54,116,5,12,18,'mid'));
  [-230,-155,-80,-5,70,145,220].forEach((x,i)=>layers.push(quad(`front-rail-fastener-${i+1}`,x,50,28)));

  // Human release control is spatially separate from the automatic scanner.
  layers.push(box('manual-control-base',140,60,54,20,12,7,'mid'));
  layers.push(box('manual-control-bezel',147,63,25,14,19,4,'hi'));
  layers.push(group('anatomy-button',box('manual-release-button',150,65,19,10,23,5,'hi'),'machine-amber'));
  layers.push(box('manual-control-lamp-seat',179,64,9,11,19,4,'lo'));
  layers.push(`<g id="anatomy-control-lamp" class="machine-cyan">${box('manual-control-lamp',181,66,5,7,23,.8,'hi')}</g>`);
  // Three slots are panel vents, closed silhouettes with no dangling lines.
  for(let i=0;i<3;i++) layers.push(box(`control-vent-${i+1}`,200+i*12,63,6,12,12,.4,'lo'));

  const css=`
  .anatomy-machine{--anatomy-paper:#231d18;--anatomy-face:#231d18;--anatomy-top:#231d18;--anatomy-shade-0:#0a0807;--anatomy-shade-1:#100d0b;--anatomy-shade-2:#14110e;--anatomy-shade-3:#231d18;--anatomy-hi:#a89968;--anatomy-mid:#a89968;--anatomy-lo:#5f5244;--anatomy-faint:#2a231c;--anatomy-lit:#e8d4a0;--anatomy-weight:1.25px}
  .anatomy-machine .iso-fill{fill:var(--anatomy-paper);stroke:none}
  .anatomy-machine .iso-top{fill:var(--anatomy-top);stroke:none}
  .anatomy-machine .iso-shade{stroke:none}
  .anatomy-machine .iso-shade[data-shade="0"]{fill:var(--anatomy-shade-0)}
  .anatomy-machine .iso-shade[data-shade="1"]{fill:var(--anatomy-shade-1)}
  .anatomy-machine .iso-shade[data-shade="2"]{fill:var(--anatomy-shade-2)}
  .anatomy-machine .iso-shade[data-shade="3"]{fill:var(--anatomy-shade-3)}
  .anatomy-machine .iso-line{fill:none;stroke:var(--anatomy-lo);stroke-width:var(--anatomy-weight);stroke-linejoin:miter}
  .anatomy-machine .iso-line[data-tone="hi"]{stroke:var(--anatomy-hi)}
  .anatomy-machine .iso-line[data-tone="mid"]{stroke:var(--anatomy-mid)}
  .anatomy-machine .iso-line[data-tone="faint"]{stroke:var(--anatomy-faint)}
  .anatomy-machine .machine-paper{--anatomy-paper:#d4c5a9;--anatomy-top:#e8d4a0;--anatomy-shade-0:#a89968;--anatomy-shade-1:#a89968;--anatomy-shade-2:#c4b59a;--anatomy-shade-3:#d4c5a9;--anatomy-hi:#e8d4a0;--anatomy-mid:#5f5244;--anatomy-lo:#5f5244;--anatomy-faint:#a89968}
  .anatomy-machine .machine-cyan{--anatomy-top:#00bcd4;--anatomy-paper:#00bcd4;--anatomy-hi:#7dd3e8;--anatomy-mid:#00bcd4;--anatomy-lo:#00bcd4;--anatomy-shade-0:#00bcd4;--anatomy-shade-1:#00bcd4;--anatomy-shade-2:#00bcd4;--anatomy-shade-3:#00bcd4}
  .anatomy-machine .machine-amber{--anatomy-top:#e8a030;--anatomy-paper:#e8a030;--anatomy-hi:#e8a030;--anatomy-mid:#e8a030;--anatomy-lo:#e8a030;--anatomy-shade-0:#e8a030;--anatomy-shade-1:#e8a030;--anatomy-shade-2:#e8a030;--anatomy-shade-3:#e8a030}
  .anatomy-machine .housing-cyan{--anatomy-top:#177782;--anatomy-paper:#16464b;--anatomy-shade-0:#102d31;--anatomy-shade-1:#124047;--anatomy-shade-2:#165b64;--anatomy-shade-3:#177782;--anatomy-hi:#7dd3e8;--anatomy-mid:#00bcd4;--anatomy-lo:#177782}
  .anatomy-machine .housing-amber{--anatomy-top:#a86b22;--anatomy-paper:#68431d;--anatomy-shade-0:#382718;--anatomy-shade-1:#553a1e;--anatomy-shade-2:#81531e;--anatomy-shade-3:#a86b22;--anatomy-hi:#e8a030;--anatomy-mid:#e8a030;--anatomy-lo:#a86b22}
  .deck-circuit path{fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round}.deck-circuit circle{fill:#14110e;stroke:currentColor;stroke-width:1.2}.trace-rest{opacity:.55}.deck-circuit .trace-signal{stroke-width:3;stroke-dasharray:12 100;stroke-dashoffset:12;opacity:0}
  .anatomy-machine .machine-shadow{fill:#0a0807;opacity:.65;filter:none}
  .anatomy-machine .approval-check{fill:none;stroke:#00bcd4;stroke-width:5;stroke-linecap:square;stroke-linejoin:miter}
  .anatomy-machine .scan-line{fill:none;stroke:#00bcd4;stroke-width:4;opacity:.8}
  `;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" class="iso anatomy-machine" viewBox="0 0 1000 560" role="img" aria-label="Eine Dokument-Prüfvorrichtung. Der Prüfsensor erkennt ein fehlendes Feld. Erst nach Korrektur und menschlicher Freigabe öffnet die Schranke."><style>${css}</style>${layers.join('')}</svg>`;
  return {svg,parts};
}
