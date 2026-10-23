import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../example');
const dest=path.join(root,'film-overlay');fs.mkdirSync(dest,{recursive:true});
fs.cpSync(path.join(root,'film-anatomy/assets'),path.join(dest,'assets'),{recursive:true});
let html=fs.readFileSync(path.join(root,'film-anatomy/index.html'),'utf8');
const css=`<style>html,body,#root{background:transparent!important}.frame-bg,.masthead,.intro,.readout,footer,.progress,.panel-top,.machine-caption{display:none!important}#root{padding:0!important;gap:0!important;display:block!important}.workarea{margin:0!important;display:block!important;width:100%;height:100%!important}.machine-panel{position:absolute;inset:0;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;display:flex;align-items:center;justify-content:center}.film .illustration{padding:0!important;width:1760px;height:986px!important;flex:none!important;max-height:none!important}.illustration>svg{width:100%!important;height:100%!important;max-height:none!important}</style>`;
fs.writeFileSync(path.join(dest,'index.html'),html.replace('</head>',css+'</head>'));
fs.writeFileSync(path.join(dest,'index.motion.json'),JSON.stringify({duration:15,assertions:[{kind:'staysInFrame',selector:'.anatomy-machine'}]},null,2));
console.log('Created transparent composition: example/film-overlay');
