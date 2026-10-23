// x10aix Figure: a document checking bed with a manually released exit gate.
// Geometry uses the unmodified Anatomy SVG kit (MIT; see vendor/anatomy/LICENSE).
// This is a fictional explanatory mechanism, not a model of a real customer process.
import * as k from '../../../kit/iso-kit.mjs';

const BASE = { x: -270, y: -82, w: 540, d: 164, r: 14 };
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
    return `<g class="${accent}" data-part="${name}">${k.solidSvg(k.slabOf(plan,z,h,P,1,2),{tone,inner:extra})}</g>`;
  };
  const box=(name,x,y,w,d,z,h,tone='mid')=>part(name,{x,y,w,d,r:/scanner-head|gate-blade|manual-control-base/.test(name)?5:0},z,h,tone);
  const quad=(name,x,y,z)=>box(name,x-2,y-2,4,4,z,1.1,'hi');
  const line=(a,b,z,tone='lo',free=false)=>k.lineSvg(k.lineOnTop(a,b,z,P),{tone,free});
  const group=(id,body,cls='')=>`<g id="${id}" class="${cls}">${body}</g>`;
  const layers=[];

  const face=(pts,fill,stroke='#5f5244',width=1.5)=>`<path d="${k.pathOf(pts.map(p=>k.iso(p,P)),true)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
  const top=(pts,z,fill,stroke='#5f5244',width=1.5)=>face(pts.map(p=>[...p,z]),fill,stroke,width);
  const pixelFace=(x,y,z,pattern,color,unit=3)=>pattern.map((row,j)=>[...row].map((v,i)=>v==='1'?face([[x+i*unit,y,z-j*unit],[x+(i+1)*unit,y,z-j*unit],[x+(i+1)*unit,y,z-(j+1)*unit],[x+i*unit,y,z-(j+1)*unit]],color,'none',0):'').join('')).join('');
  // Compact insert: four functional assemblies, no screws, feet, vents or rails.
  layers.push(part('base-deck',BASE,-6,24,'mid'));
  // Inset transport lane and clipped armor corners: a readable adventure prop.
  layers.push(top([[-248,-46],[-232,-60],[232,-60],[248,-44],[248,44],[232,60],[-232,60],[-248,44]],18.1,'#100d0b','#5f5244',2.2));
  // Two large docking marks, not a field of technical microdetail.
  for(const x of [-224,216]) layers.push(top([[x,-32],[x+8,-24],[x+8,24],[x,32],[x,18],[x+3,12],[x+3,-12],[x,-18]],18.3,'#a89968','none',0));
  // Front armor band and three square power indicators.
  layers.push(face([[-230,82,2],[216,82,2],[230,82,12],[-244,82,12]],'#100d0b','#4f4336',1.5));
  for(let i=0;i<3;i++) layers.push(face([[-226+i*14,82.2,5],[-218+i*14,82.2,5],[-218+i*14,82.2,10],[-226+i*14,82.2,10]],i===0?'#00bcd4':'#5f5244','none',0));
  const trace=(id,pts,color)=>`<g style="color:${color}" class="deck-circuit"><path class="trace-rest" d="${k.onTop(pts,18.2,P)}"/><path id="${id}" class="trace-signal" pathLength="100" d="${k.onTop(pts,18.2,P)}"/></g>`;
  layers.push(trace('scanner-signal',[[-248,-64],[-72,-64],[-56,-80],[-24,-80],[-16,-72]],'#00bcd4'));
  layers.push(trace('release-signal',[[176,72],[128,72],[112,56],[104,56]],'#e8a030'));
  layers.push(box('scanner-column',-28,-76,36,24,18,78,'hi'));
  layers.push(box('scanner-head',-48,-82,76,54,90,36,'hi'));
  layers.push(group('anatomy-scan',box('scanner-lens',-34,-31,48,3,90,3,'hi'),'machine-cyan'));
  // Recessed front monitor, chunky bezel and a tiny deterministic status glyph.
  layers.push(face([[-38,-27.8,98],[18,-27.8,98],[18,-27.8,120],[-38,-27.8,120]],'#100d0b','#7dd3e8',2));
  layers.push(group('retro-display-scan',pixelFace(-32,-27.6,116,['111111111111','100000000001','101111110001','100000000001','111111111111'],'#00bcd4',3)));
  layers.push(group('retro-display-hold',pixelFace(-29,-27.5,116,['110011001100','110011001100','110011001100','000000000000','110011001100'],'#e8a030',3)));
  layers.push(group('retro-display-go',pixelFace(-28,-27.4,116,['000000001100','000000110000','110011000000','001100000000','000000000000'],'#00bcd4',3)));
  layers.push(box('gate-back-upright',96,-68,22,16,18,145,'mid'));
  let doc=box('document-sheet',-64,-44,128,88,25,2,'hi');
  doc+=line([-48,-26],[36,-26],27.2,'mid',true);
  doc+=line([-48,-8],[36,-8],27.2,'mid',true);
  doc+=group('anatomy-missing',box('required-field-outline',-48,12,80,14,27.2,.2,'hi'),'machine-amber');
  doc+=group('anatomy-filled',box('required-field-value',-48,12,80,14,27.2,.2,'hi'),'machine-cyan');
  doc+=group('anatomy-approved',`<path class="approval-check" d="${k.onTop([[28,8],[38,18],[55,-4]],28,P)}"/>`);
  layers.push(group('anatomy-document',doc,'machine-paper'));
  layers.push(`<path id="anatomy-scan-line" class="scan-line" d="${k.onTop([[0,-40],[0,40]],28,P)}"/>`);
  let gate=box('gate-blade',99,-52,16,104,24,30,'hi');
  // Contrasting central lock inset on the approaching face of the blade.
  gate+=face([[98.8,-32,32],[98.8,32,32],[98.8,40,39],[98.8,32,47],[98.8,-32,47],[98.8,-40,39]],'#231d18','#e8d4a0',1.5);
  gate+=face([[98.6,-5,34],[98.6,5,34],[98.6,5,44],[98.6,-5,44]],'#e8a030','none',0);
  layers.push(group('anatomy-gate',gate));
  layers.push(box('gate-front-upright',96,52,22,16,18,145,'mid'));
  layers.push(box('manual-control-base',144,54,64,26,18,12,'mid'));
  layers.push(group('anatomy-button',box('manual-release-button',156,59,36,16,30,7,'hi'),'machine-amber'));

  const css=`
  .anatomy-machine{--anatomy-paper:#231d18;--anatomy-face:#231d18;--anatomy-top:#231d18;--anatomy-shade-0:#0a0807;--anatomy-shade-1:#100d0b;--anatomy-shade-2:#14110e;--anatomy-shade-3:#231d18;--anatomy-hi:#c4b59a;--anatomy-mid:#5f5244;--anatomy-lo:#5f5244;--anatomy-faint:#2a231c;--anatomy-lit:#e8d4a0;--anatomy-weight:2px}
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
