import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const homePath = new URL('../dist/index.html', import.meta.url);
const privacyPath = new URL('../dist/privacy/index.html', import.meta.url);
const home = readFileSync(homePath, 'utf8');

test('homepage has the primary service sections and enquiry destination', () => {
  for (const id of ['services', 'about', 'standards', 'contact']) {
    assert.match(home, new RegExp(`id="${id}"`), `missing #${id} section`);
  }
  assert.match(home, /href="#contact"/);
  assert.match(home, /<h1\b/);
});

test('homepage keeps unconfigured contact and form details honest', () => {
  assert.match(home, /LOLER Inspections/);
  assert.match(home, /online enquiries are not yet available/i);
  assert.match(home, /<fieldset[^>]*disabled/i);
  assert.match(home, /name="name"/);
  assert.match(home, /name="email"/);
  assert.match(home, /name="message"/);
  assert.doesNotMatch(home, /href=["']tel:|01234\s*567890|summit inspection services/i);
  assert.doesNotMatch(home, /href=["']mailto:[^"']*placeholder/i);
  assert.doesNotMatch(home, /api\.staticforms\.dev\/submit/);
});

test('privacy page is static and clearly marked as an incomplete draft', () => {
  assert.ok(existsSync(privacyPath), 'privacy page should be prerendered');
  const privacy = readFileSync(privacyPath, 'utf8');
  assert.match(privacy, /draft.*not approved for production/i);
  assert.match(privacy, /retention/i);
});

test('a provider redirect has a local acknowledgement route without inventing delivery setup', () => {
  const thanksPath = new URL('../dist/enquiry-received/index.html', import.meta.url);
  assert.ok(existsSync(thanksPath), 'thank-you route should be available when form is configured');
  const thanks = readFileSync(thanksPath, 'utf8');
  assert.match(thanks, /Thank you/i);
  assert.match(thanks, /href="\/"/);
  assert.doesNotMatch(home, /<link rel="canonical"/);
});
