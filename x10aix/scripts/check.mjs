import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const expected=JSON.parse(fs.readFileSync(path.join(root,'x10aix/kit-sha256.json'),'utf8'));
const actual=Object.fromEntries(walk(path.join(root,'kit')).map(p=>[path.relative(root,p).replaceAll('\\','/'),crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
assert.deepEqual(actual,expected,'kit/ differs from the pinned upstream');
for(const mode of ['video','web']){
 const {anatomyFigure,motion}=await import(`../example/src/figure-${mode}.mjs`);
 const f=anatomyFigure();assert(f.parts.length>0);assert(f.svg.includes('anatomy-document'));assert(f.svg.includes('anatomy-gate'));
 const ids=[...f.svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'duplicate SVG IDs');
 assert(motion.gateOpen.every(Number.isFinite));
 console.log(`${mode}: ${f.parts.length} solids, IDs unique, geometry generated`);
}
assert(fs.readFileSync(path.join(root,'SKILL.md'),'utf8').includes('name: x10aix-anatomy'));
console.log(`PASS: ${Object.keys(actual).length} upstream kit files unchanged`);
