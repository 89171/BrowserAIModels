const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');

const errors = [];
const catalogs = ['en', 'zh'].map((locale) => [
  locale, JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8')),
]);
function check(key, file) {
  for (const [locale, messages] of catalogs) {
    const value = key.split('.').reduce((node, part) => node?.[part], messages);
    if (value === undefined) errors.push(`${file}: missing ${locale}:${key}`);
  }
}
function validateKeys(value, prefix, locale) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (key.includes('.')) errors.push(`${locale}: invalid key ${prefix}${key}`);
    validateKeys(child, `${prefix}${key}.`, locale);
  }
}
for (const [locale, messages] of catalogs) validateKeys(messages, '', locale);

// Compare all nested keys and value types, including entries inside arrays.
function structure(value, prefix = '', result = new Map()) {
  const kind = Array.isArray(value) ? 'array' : typeof value;
  if (prefix) result.set(prefix, kind);
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      structure(child, prefix ? `${prefix}.${key}` : key, result);
    }
  }
  return result;
}
const baseline = structure(catalogs[0][1]);
for (const [locale, messages] of catalogs.slice(1)) {
  const current = structure(messages);
  for (const key of new Set([...baseline.keys(), ...current.keys()])) {
    if (baseline.get(key) !== current.get(key)) {
      errors.push(`${locale}: key/type mismatch at ${key}`);
    }
  }
}

// These repository modules contain data only; type imports disappear on transpile.
function loadData(file) {
  const exports = {};
  const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  vm.runInNewContext(outputText, { exports }, { filename: file, timeout: 1000 });
  return exports;
}
const { TAXONOMY } = loadData('data/taxonomy.ts');
const { MODELS } = loadData('data/models.ts');
for (const category of TAXONOMY) {
  check(`categories.${category.slug}`, 'data/taxonomy.ts');
  check(`categories.${category.slug}Desc`, 'data/taxonomy.ts');
  for (const subcategory of category.subcategories) {
    check(`subcategories.${subcategory.slug}`, 'data/taxonomy.ts');
    check(`subcategories.${subcategory.slug}Desc`, 'data/taxonomy.ts');
  }
}
for (const subcategories of Object.values(MODELS)) {
  for (const models of Object.values(subcategories)) {
    for (const model of models) {
      for (const key of [model.nameKey, model.descriptionKey].filter(Boolean)) check(key, 'data/models.ts');
      check(`frameworks.${model.framework}`, 'data/models.ts');
      for (const license of [model.codeLicense, model.weightLicense, model.reportedLicense].filter(Boolean)) check(`licenses.${license}`, 'data/models.ts');
      check(`catalog.${model.kind}`, 'data/models.ts');
      check(`catalog.${model.browserEvidence.status}`, 'data/models.ts');
      for (const task of model.tasks) check(`subcategories.${task}`, 'data/models.ts');
    }
  }
}

// Orphan model blocks are invisible in the UI, so they rot unnoticed: every
// models.<id> block must be referenced by an entry's nameKey/descriptionKey.
const referenced = new Set(
  Object.values(MODELS)
    .flatMap((subcategories) => Object.values(subcategories).flat())
    .flatMap((model) => [model.nameKey, model.descriptionKey])
    .filter(Boolean)
    .map((key) => key.split('.')[1]),
);
for (const [locale, messages] of catalogs) {
  for (const id of Object.keys(messages.models ?? {})) {
    if (!referenced.has(id)) errors.push(`${locale}: unused models.${id}`);
  }
}

const { APPLICATIONS } = loadData('data/applications.ts');
for (const app of APPLICATIONS) {
  for (const field of ['title', 'input', 'pipeline', 'output', 'limits', 'example', 'checks']) {
    check(`applications.items.${app.id}.${field}`, 'data/applications.ts');
  }
}

function scan(file) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const namespaces = new Map();
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const init = ts.isAwaitExpression(node.initializer) ? node.initializer.expression : node.initializer;
      if (ts.isCallExpression(init) && ['getTranslations', 'useTranslations'].includes(init.expression.getText(source))) {
        const arg = init.arguments[0];
        const namespace = arg && ts.isObjectLiteralExpression(arg)
          ? arg.properties.find((p) => p.name?.getText(source) === 'namespace')?.initializer
          : arg;
        if (!namespace || ts.isStringLiteral(namespace)) namespaces.set(node.name.text, namespace?.text || '');
      }
    }
    if (ts.isPropertyAssignment(node) && ['nameKey', 'descriptionKey'].includes(node.name.getText(source)) && ts.isStringLiteral(node.initializer)) {
      check(node.initializer.text, file);
    }
    if (ts.isCallExpression(node)) {
      const callee = ts.isPropertyAccessExpression(node.expression) ? node.expression.expression : node.expression;
      const namespace = namespaces.get(callee.getText(source));
      if (namespace !== undefined && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
        check([namespace, node.arguments[0].text].filter(Boolean).join('.'), file);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.tsx?$/.test(file)) scan(file);
  }
}
for (const directory of ['app', 'components', 'data']) walk(directory);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Translation structures, static references and catalog references are valid in en and zh.');
}
