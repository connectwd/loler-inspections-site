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

test('homepage exposes a labelled mobile navigation toggle without moving the enquiry CTA', () => {
  const menuToggle = home.match(/<button\b(?=[^>]*class="menu-toggle")(?=[^>]*aria-controls="primary-navigation")(?=[^>]*aria-expanded="false")[^>]*>Menu<\/button>/);
  assert.ok(menuToggle, 'menu toggle should be labelled and control the primary navigation');

  const navigation = home.match(/<nav\b(?=[^>]*id="primary-navigation")(?=[^>]*aria-label="Primary navigation")[^>]*>([\s\S]*?)<\/nav>/);
  assert.ok(navigation, 'primary navigation should have the expected id and label');
  assert.doesNotMatch(navigation[1], /header-cta|Make an enquiry/);
  const headerCta = home.match(/<a\b(?=[^>]*\bheader-cta\b)(?=[^>]*href="#contact")[^>]*>Make an enquiry<\/a>/);
  assert.ok(headerCta, 'enquiry CTA should remain outside the controlled navigation');

  for (const href of ['#services', '#about', '#standards', '#contact']) {
    assert.match(navigation[1], new RegExp(`href="${href}"`), `missing navigation destination ${href}`);
  }
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

const equipmentDirPath = new URL('../dist/equipment/index.html', import.meta.url);
const liftingBeamsPath = new URL('../dist/equipment/lifting-beams/index.html', import.meta.url);
const sitemapIndexPath = new URL('../dist/sitemap-index.xml', import.meta.url);

test('equipment directory is prerendered and links to every published guide', () => {
  assert.ok(existsSync(equipmentDirPath), 'equipment directory should be prerendered');
  const directory = readFileSync(equipmentDirPath, 'utf8');
  assert.match(directory, /<h1[^>]*id="equipment-directory-title"/, 'directory should have a labelled heading');
  assert.match(directory, /href="\/equipment\/lifting-beams\/"/, 'directory should link to the lifting beams guide');
  assert.match(directory, /LOLER inspections of lifting beams/);
  assert.match(directory, /A lifting beam is a below-the-hook lifting device/);
});

test('equipment guide page has unique metadata, one H1 and semantic structure', () => {
  assert.ok(existsSync(liftingBeamsPath), 'lifting beams guide should be prerendered');
  const page = readFileSync(liftingBeamsPath, 'utf8');
  assert.match(page, /<title>LOLER inspections of lifting beams<\/title>/);
  assert.match(
    page,
    /<meta name="description" content="Understand what lifting beams are[^"]*"/,
    'guide should have a unique description'
  );
  assert.match(
    page,
    /<link rel="canonical" href="https:\/\/loler-inspections.com\/equipment\/lifting-beams\/"\s*\/?>/,
    'guide should have a verified canonical URL'
  );
  const h1Count = (page.match(/<h1\b/g) ?? []).length;
  assert.strictEqual(h1Count, 1, 'guide should have exactly one H1');
  assert.match(page, /<h1[^>]*id="equipment-title"[^>]*>LOLER inspections of lifting beams<\/h1>/);
  assert.match(page, /<article[^>]*class="equipment-article"/, 'guide should use a semantic article');
  assert.match(page, /<nav[^>]*aria-label="Breadcrumb"/, 'guide should include a breadcrumb navigation');
  assert.match(page, /Do not assume one inspection interval applies to every lifting beam/);
});

test('equipment directory is linked from the homepage', () => {
  assert.match(home, /href="\/equipment\/"/, 'homepage should link to the equipment directory');
});

test('equipment pages are included in the sitemap', () => {
  assert.ok(existsSync(sitemapIndexPath), 'sitemap index should be generated');
  const sitemap = readFileSync(sitemapIndexPath, 'utf8');
  assert.match(sitemap, /sitemap-/, 'sitemap index should reference sitemap files');
});

test('equipment guide scope language distinguishes general information from confirmed services', () => {
  assert.ok(existsSync(liftingBeamsPath), 'lifting beams guide should be prerendered');
  const page = readFileSync(liftingBeamsPath, 'utf8');
  assert.match(page, /general educational information/i);
  const pageText = page.replace(/<[^>]*>/g, '');
  assert.match(pageText, /does not confirm that LOLER Inspections inspects lifting beams/,
    'guide must not imply an unconfirmed service offering');
  assert.match(
    page,
    /https:\/\/www\.hse\.gov\.uk\/work-equipment-machinery\/loler-overview\.htm/,
    'guide should cite HSE guidance'
  );
});
