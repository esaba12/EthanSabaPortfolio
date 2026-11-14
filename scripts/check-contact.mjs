import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(fs.readFileSync(new URL('../src/app/lib/contact.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const message = { name: 'Test', email: 'test@example.com', subject: 'Test subject', message: 'Test message' };

async function check(name, response, expected, payload = message) {
  let calls = 0;
  let cleared = false;
  let expire;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    AbortController,
    setTimeout(callback, delay) { assert.equal(delay, 20000); expire = callback; return 1; },
    clearTimeout() { cleared = true; },
    async fetch(url, options) {
      calls++;
      assert.equal(url, 'https://formspree.io/f/xeoleqao');
      assert.equal(options.method, 'POST');
      assert.equal(options.headers.Accept, 'application/json');
      assert.deepEqual(JSON.parse(options.body), message);
      if (response === 'offline') throw new Error('Offline');
      if (response === 'timeout') {
        expire();
        assert.equal(options.signal.aborted, true);
        throw new Error('Aborted');
      }
      return response;
    },
  });
  const result = await exports.submitContact(payload);
  assert.equal(result.ok, expected);
  if (!expected) assert.equal(typeof result.message, 'string');
  assert.equal(calls, name === 'blank input' ? 0 : 1);
  if (calls) assert.equal(cleared, true);
  if (name === 'rate limit') assert.match(result.message, /Wait a little/);
  console.log(`PASS ${name}`);
}

await check('success', { ok: true, status: 200 }, true);
await check('validation rejection', { ok: false, status: 422 }, false);
await check('server error', { ok: false, status: 500 }, false);
await check('rate limit', { ok: false, status: 429 }, false);
await check('network failure', 'offline', false);
await check('timeout', 'timeout', false);
await check('blank input', null, false, { ...message, message: '   ' });
