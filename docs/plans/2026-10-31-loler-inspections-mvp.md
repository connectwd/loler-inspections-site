# LOLER Inspections MVP Implementation Plan

> **For agentic workers:** Implement task by task in this isolated worktree; follow executing-plans, TDD, and incremental-implementation. The approved requirements live in `loler-website-mvp-build-spec.md`.

**Goal:** Build a responsive static Astro information site for LOLER Inspections, using the supplied homepage mockup for layout only and preserving all unresolved details as obvious, easy-to-replace placeholders.

**Architecture:** Astro prerenders the home and privacy pages to static HTML. A single `src/content/site.ts` centralizes business copy, asset paths, SEO values, and form-enabled state. One stylesheet provides the full responsive design; no client-side framework or custom JavaScript is needed. The form remains unavailable until verified StaticForms settings and destination are supplied.

**Tech Stack:** Astro, TypeScript content data, native HTML/CSS, Node built-in test runner, Python Playwright for viewport/browser checks.

---

## Files and responsibilities

- `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`: Astro static project and reproducible npm commands.
- `src/content/site.ts`: editable company facts, provisional copy, contact/SEO placeholders, service examples, image metadata, and disabled form state.
- `src/layouts/BaseLayout.astro`: document metadata, landmarks, global stylesheet, canonical only when production domain is verified.
- `src/pages/index.astro`, `src/pages/privacy.astro`: homepage and explicitly incomplete privacy draft.
- `src/styles/global.css`: design tokens and responsive styles.
- `src/assets/`: locally stored, licensed Pexels photos and client-supplied logo artwork.
- `public/favicon.svg`, `public/robots.txt`, `public/images/ASSET-LICENCES.md`: technical SEO and asset provenance.
- `tests/site.test.mjs`, `tests/responsive-check.py`: built HTML assertions and browser viewport checks.
- `README.md`: setup, editing, deployment, provider caveat, future blog note, and launch checklist.

## Tasks

### Task 1 — Initialize the Astro shell

Create a minimal npm project with local Astro dependency, `dev`, `build`, `preview`, and `test` scripts; set Astro `output: 'static'`, leave `site` unset until the domain is owned, add strict TypeScript config, and create a minimal route shell. Run `npm install` and `npm run build`; expected: static output in `dist/` with no server adapter.

### Task 2 — Write acceptance tests first

Add `tests/site.test.mjs` using `node:test` and assertions against `dist/index.html` and `dist/privacy/index.html`. Cover required sections, one H1, internal anchor targets, expected business display name, visibly inactive form, privacy-draft notice, no `tel:` link or fake mailto, no remote runtime scripts, and canonical omission while the domain is unconfirmed. Run `npm test` before page implementation and confirm the intended missing-content assertions fail; then keep this test suite green after each page slice.

### Task 3 — Add approved local assets

Use the supplied LOLER Inspections logo. Download two relevant Pexels images locally: photo IDs 29224587 (warehouse overhead hooks) and 29224567 (yellow hook/pulley close-up). Use Astro’s local image pipeline for optimized responsive output. Record contributor, source URLs, retrieval date, and Pexels commercial-use licence in `public/images/ASSET-LICENCES.md`; identify all stock imagery as illustrative, not the company’s work.

### Task 4 — Implement home and privacy pages

Build the narrow white header, image-led split hero, concise services section, lightly tinted about/standards region, enquiry/contact area, and compact footer in the mockup’s order and density. Use the confirmed brand/location facts; keep pending service scope and credential wording unpublished. Render an explicit not-yet-accepting-enquiries state instead of an active-looking form. Build the privacy page as a clearly labelled draft with fields for missing controller, purpose, recipients, retention, lawful basis, rights contact, and tools.

### Task 5 — SEO, README, and launch configuration

Add title/description, Open Graph fallbacks, favicon, robots.txt, and sitemap only if useful without inventing production URLs. Document that `loler-inspections.com` is not yet owned. README must cover local install, development/build/preview, edit locations, asset replacement, StaticForms setup/test, Cloudflare Pages (`npm run build`, `dist/`), future Markdown blog, and every launch confirmation.

### Task 6 — Verify and review

Run `npm run build` and `npm test`. Start `npm run dev`, use Python Playwright at 320px, 390px, 768px, and 1440px; assert no horizontal overflow, inspect keyboard/focus behavior and browser console, and save screenshots for visual review. Confirm the page has no phone number, remote tracking/script request, broken image, unlicensed asset, or false form-success claim. Report measured Lighthouse scores only if actually measured.

## Provider research note

StaticForms currently documents `POST https://api.staticforms.dev/submit`, a hidden form `apiKey`, optional absolute `redirectTo`, a honeypot, a Free quota of 250 submissions per 30 days, and submission storage up to one year with only the most recent 30 days shown in the Free inbox. Its public privacy, terms, pricing, and security pages contain conflicting or plan-dependent statements about storage, CAPTCHA, API-key confidentiality, and monthly versus annual prices. Do not activate the form or claim a final privacy data flow until the client creates an account and verifies the current dashboard terms, destination, storage, and test submission.

## Verification commands

- `npm install`
- `npm run build`
- `npm test`
- `source ~/.local/opencode-venv/bin/activate && python3 tests/responsive-check.py` (if the provided Playwright environment is available)
