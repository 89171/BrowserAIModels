const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/language-switch.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText, { exports: exportsObject, URL });
const { languageSwitchUrl } = exportsObject;
const locales = ['en', 'zh'];

test('language switching preserves origin, nested path, query and section', () => {
  const source = 'http://localhost:3000/zh/applications?q=a%20b#document-qa';
  const target = 'http://localhost:3000/en/applications?q=a%20b#document-qa';
  assert.equal(languageSwitchUrl(source, 'en', locales), target);
  assert.equal(languageSwitchUrl(target, 'zh', locales), source);
});

test('language switching handles home, unprefixed paths and unsupported locales', () => {
  assert.equal(languageSwitchUrl('http://localhost:3000/en', 'zh', locales), 'http://localhost:3000/zh');
  assert.equal(languageSwitchUrl('http://localhost:3000/applications', 'zh', locales), 'http://localhost:3000/zh/applications');
  assert.equal(languageSwitchUrl('http://localhost:3000/en', 'fr', locales), 'http://localhost:3000/en');
});
