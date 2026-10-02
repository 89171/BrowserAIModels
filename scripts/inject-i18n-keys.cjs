const fs = require('fs');
const path = 'data/models.ts';
let src = fs.readFileSync(path, 'utf8');
const re = /(id:\s*'([^']+)',)/g;
let count = 0;
const out = src.replace(re, (m, full, id) => {
  const idx = src.indexOf(full);
  const after = src.slice(idx + full.length, idx + 400);
  if (after.includes('nameKey:')) return m;
  count++;
  return (
    full +
    "\n        nameKey: 'models." +
    id +
    ".name',\n        descriptionKey: 'models." +
    id +
    ".description',"
  );
});
fs.writeFileSync(path, out);
console.log('injected:', count);
