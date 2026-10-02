const fs = require('fs');

const src = fs.readFileSync('data/models.ts', 'utf8');

// Simpler, more reliable parser: split the source by `{\n` boundaries of entries,
// then extract id/name/description from each block.
//
// Actually: we know each entry is `{ ... },` separated by newlines. We can match
// the entry block with a regex that balances one level of braces.

const entries = [];

// Walk char-by-char with a balanced-brace scan that also handles strings.
let i = 0;
let totalLen = src.length;
let debugCount = 0;
while (i < totalLen) {
  // Find the next `{` at column 6 (the entries are indented 6 spaces)
  // but the file also has `{` at column 2 (MODELS, the nested category/sub obj).
  // We'll just look for the pattern `\n        {` (8 spaces) which only matches
  // individual model entries.
  const start = src.indexOf('\n      {', i);
  if (start < 0) break;
  const bodyStart = start + 1; // skip the leading \n
  // Find matching `}`
  let depth = 0;
  let inStr = false;
  let esc = false;
  let j = bodyStart;
  for (; j < totalLen; j++) {
    const c = src[j];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === "'") inStr = false;
    } else {
      if (c === "'") inStr = true;
      else if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) break;
      }
    }
  }
  if (depth !== 0) break;
  const block = src.slice(bodyStart, j + 1);
  const idMatch = block.match(/id:\s*'([^']+)'/);
  const nameMatch = block.match(/name:\s*'((?:\\'|[^'])*)'/);
  const descMatch = block.match(/description:\s*'((?:\\'|[^'])*)'/);
  if (idMatch && nameMatch && descMatch) {
    const un = (s) => s.replace(/\\'/g, "'").replace(/\\n/g, '\n');
    entries.push({
      id: idMatch[1],
      name: un(nameMatch[1]),
      description: un(descMatch[1]),
    });
  }
  i = j + 1;
  debugCount++;
}

console.log('scanned blocks:', debugCount, 'parsed:', entries.length);
if (entries.length > 0) {
  console.log('first:', entries[0].id, '|', entries[0].name);
  console.log('last:', entries[entries.length - 1].id, '|', entries[entries.length - 1].name);
}

const modelsObj = {};
for (const e of entries) {
  modelsObj[e.id] = { name: e.name, description: e.description };
}

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('messages/zh.json', 'utf8'));

en.models = modelsObj;
zh.models = JSON.parse(JSON.stringify(modelsObj));

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync('messages/zh.json', JSON.stringify(zh, null, 2) + '\n');
console.log('wrote en.json + zh.json');
