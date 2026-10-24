/* Smoke-test initialization and sample-template rendering on every standalone page. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const Handlebars = require('../js/lib/handlebars.js');
const root = path.resolve(__dirname, '..');
const runtime = fs.readFileSync(path.join(root, 'js/preview.js'), 'utf8');
const files = fs.readdirSync(root).filter(file => file.endsWith('.html') && !file.startsWith('._') && file !== 'pages.html');
for (const file of files) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const elements = new Map();
    const element = () => ({ style: {}, textContent: '', innerHTML: '', isConnected: false, append() {}, addEventListener() {} });
    for (const match of html.matchAll(/\bid="([^"]+)"/g)) elements.set(match[1], element());
    for (const match of html.matchAll(/<script\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/script>/g)) elements.get(match[1]).textContent = match[2];
    const body = element();
    body.dataset = { page: html.match(/data-page="([^"]+)"/)[1], root: './' };
    const document = { body, createElement: element, getElementById: id => elements.get(id), querySelector: () => null, querySelectorAll: () => [] };
    const jquery = () => ({ off() { return this; }, on() { return this; } });
    vm.runInNewContext(runtime, { document, $: jquery, Handlebars: Handlebars.create(), location: {}, alert() {}, window: {} }, { filename: file });
    if (elements.has('dataDetail') && elements.has('data-template')) {
        assert.ok(elements.get('dataDetail').innerHTML.includes('샘플'), `${file}: sample did not render`);
        assert.ok(!elements.get('dataDetail').innerHTML.includes('{{'), `${file}: unresolved template`);
    }
    if (elements.has('calDateView')) assert.ok(elements.get('calDateView').innerHTML.includes('data-day="31"'), `${file}: missing calendar days`);
}
console.log(`PASS: ${files.length} page initializations, board samples and reservation calendars`);
