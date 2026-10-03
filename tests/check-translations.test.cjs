const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
function validate(mutate) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'webai-translations-'));
  try {
    for (const folder of ['messages', 'app', 'components', 'data']) {
      fs.cpSync(path.join(root, folder), path.join(dir, folder), { recursive: true });
    }
    for (const locale of ['en', 'zh']) {
      const file = path.join(dir, 'messages', `${locale}.json`);
      const messages = JSON.parse(fs.readFileSync(file, 'utf8'));
      mutate(messages, locale);
      fs.writeFileSync(file, JSON.stringify(messages));
    }
    return spawnSync(process.execPath, [path.join(root, 'scripts/check-translations.cjs')], {
      cwd: dir, encoding: 'utf8', timeout: 10000,
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test('the current catalogs pass validation', () => {
  const result = validate(() => {});
  assert.equal(result.status, 0, result.stderr);
});

for (const [namespace, key] of [
  ['categories', 'text'],
  ['categories', 'textDesc'],
  ['subcategories', 'chat'],
  ['frameworks', 'transformersjs'],
  ['licenses', 'mit'],
  ['models', 'bert-base-ner'],
  ['applications', 'items'],
]) {
  test(`missing dynamic ${namespace}.${key} fails even in both languages`, () => {
    const result = validate((messages) => { delete messages[namespace][key]; });
    assert.equal(result.status, 1, result.stderr);
    assert.ok(result.stderr.includes(`${namespace}.${key}`));
  });
}

test('dotted keys fail validation', () => {
  const result = validate((messages) => { messages.models['invalid.key'] = { name: 'Invalid' }; });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /invalid key/);
});

test('different translation value types fail validation', () => {
  const result = validate((messages, locale) => {
    if (locale === 'zh') messages.home.title = { nested: '标题' };
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /key\/type mismatch at home.title/);
});
