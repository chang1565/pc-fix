import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from './check-errors.mjs';
const { problems }=load('data/problems.ts');
const { errorCodes }=load('data/errorCodes.ts');
const { diagnosticWorkflows: workflows }=load('data/diagnosticWorkflows.ts');
const diagnostics=load('data/problemDiagnostics.json');
const redirects=load('data/problemRedirects.json');
for(const [slug,guide] of Object.entries(workflows)){
 assert.ok(problems.some(p=>p.slug===slug),slug);
 assert.ok(guide.branches.length>=2,slug);
 for(const branch of guide.branches)assert.ok(branch.length===2&&branch.every(t=>typeof t==='string'&&t.trim()),slug);
}
const crash=errorCodes.find(e=>e.code==='0xC0000005');
assert.match(JSON.stringify(crash.solutions),/Minidump 폴더에 기록이 없을 수/);
assert.match(JSON.stringify(diagnostics['black-screen-after-update']),/안전 모드/);
assert.match(JSON.stringify(diagnostics['printer-offline']),/Standard TCP\/IP/);
assert.match(JSON.stringify(diagnostics['printer-offline']),/WSD/);
const manifest=JSON.parse(fs.readFileSync('.next/routes-manifest.json'));
const sitemap=fs.readFileSync('.next/server/app/sitemap.xml.body','utf8');
for(const [from,to] of Object.entries(redirects)){
 assert.ok(!problems.some(p=>p.slug===from));
 assert.ok(problems.some(p=>p.slug===to));
 assert.ok(!problems.some(p=>p.relatedSlugs.includes(from)));
 assert.ok(!sitemap.includes(`/problems/${from}<`));
 for(const prefix of ['','/en','/ja','/zh-CN']){
  const r=manifest.redirects.find(r=>r.source===`${prefix}/problems/${from}`);
  assert.equal(r?.destination,`${prefix}/problems/${to}`);
  assert.equal(r.statusCode,308);
 }
}
for(const locale of ['en','ja','zh-CN']){
 const d=load(`data/locales/${locale}.json`);
 const storage=d[workflows['c-drive-full'].branches[1][1]];
 assert.doesNotMatch(storage,/Windows Store|Windowsストア/i);
 const capacity=d[workflows['battery-drains-fast'].branches[1][1]];
 assert.doesNotMatch(capacity,/buffer|バッファ|缓冲/i);
 const conflict=d[workflows['ip-address-conflict'].branches[1][0]];
 assert.doesNotMatch(conflict,/crash|クラッシュ|崩溃/i);
 const freeze=d[workflows['game-freeze'].branches[1][1]];
 assert.doesNotMatch(freeze,/expand.*freeze|扩大范围以冻结/);
}
console.log('PASS: differentiated branch structure, crash/recovery/printer distinctions, terminology regressions and four permanent redirects.');
