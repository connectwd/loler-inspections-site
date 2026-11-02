# Compact Mobile Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the always-visible narrow-screen nav with an accessible inline disclosure while keeping the Enquire CTA visible and dimensionally aligned with the toggle.

**Architecture:** Keep the existing desktop nav and Astro page structure. Add a native button and controlled inline panel to the homepage, toggle the panel with a small Astro client script, and use the existing CSS tokens and 620px breakpoint. Verify built markup with Node tests and interaction/layout in the existing Playwright responsive check.

**Tech Stack:** Astro 7, HTML, CSS, browser-native JavaScript, Node `node:test`, Python Playwright.

---

## File map

- `src/pages/index.astro` — menu button, controlled nav panel, compact client-side disclosure behavior.
- `src/styles/global.css` — mobile header layout, equal control sizing/alignment, panel links, hidden/expanded states; preserve desktop appearance.
- `tests/site.test.mjs` — built HTML assertions for the nav toggle, panel relationship, labels and existing anchor destinations.
- `tests/responsive-check.py` — viewport, interaction, accessibility-state, keyboard and no-overflow checks.

## Task 1: Add failing built-markup tests

**Files:** Modify `tests/site.test.mjs`.

- [ ] Add a test for the menu button and its relationships:

```js
test('homepage exposes a labelled mobile navigation toggle', () => {
	assert.match(home, /<button[^>]*aria-controls="primary-navigation"[^>]*aria-expanded="false"[^>]*>Menu<\/button>/);
	assert.match(home, /<nav[^>]*id="primary-navigation"[^>]*aria-label="Primary navigation"/);
	assert.match(home, /<a class="button button-small header-cta" href="#contact">Enquire<\/a>/);
});
```

- [ ] Keep the built navigation links checked by the existing section-target assertion and confirm all four expected `href` values are preserved.
- [ ] Run `npm run build && npm test`; verify the new assertions fail on the current markup while unrelated tests pass.
- [ ] Commit only `tests/site.test.mjs` with `test: define mobile navigation markup`.

## Task 2: Implement semantic mobile disclosure

**Files:** Modify `src/pages/index.astro`.

- [ ] Reorder header children in the DOM to brand, Enquire link, menu button, then one `nav.primary-nav` with its existing `aria-label`, `site.navigation` links, and `id="primary-navigation"`. Set desktop CSS order so nav remains visually between brand and CTA. This makes Tab from the toggle enter the expanded links.
- [ ] Add this native button beside the existing Enquire link; leave the nav in ordinary visible HTML so desktop navigation works without JavaScript:

```astro
<button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false">
	Menu
</button>
```

- [ ] Add an Astro client script that reveals the toggle only after event handlers are registered, toggles `is-menu-open` and `aria-expanded`, and leaves the nav available if JavaScript does not run. Only intercept links while the mobile disclosure is open; preserve native desktop anchor behavior. For mobile same-page nav links, retain the hash navigation, close the disclosure, and focus the destination's labelled heading so focus does not fall to `body` when the panel closes. No focus trap or Escape handler is needed for this inline disclosure.

```astro
<script>
	const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
	const header = document.querySelector<HTMLElement>('.header-inner');
	const navigation = document.querySelector<HTMLElement>('#primary-navigation');

	if (menuToggle && header && navigation) {
		menuToggle.addEventListener('click', () => {
			const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', String(!isExpanded));
			header.classList.toggle('is-menu-open', !isExpanded);
		});

		navigation.addEventListener('click', (event) => {
			if (event.target instanceof Element && event.target.closest('a')) {
				menuToggle.setAttribute('aria-expanded', 'false');
				header.classList.remove('is-menu-open');
			}
		});
	}
</script>
```
- [ ] Run `npm run build && npm test`; the added markup assertions should pass. Commit only `src/pages/index.astro` with `feat: add accessible mobile nav disclosure`.

## Task 3: Style the compact header and panel

**Files:** Modify `src/styles/global.css`.

- [ ] Hide the toggle by default so desktop remains unchanged. On desktop, set `.primary-nav { order: 2; }` and `.header-cta { order: 3; }`. At `max-width: 620px`, hide the nav by default, display the toggle, and place the brand, CTA, and toggle on one aligned row. Use `.header-inner.is-menu-open .primary-nav { display: flex; }` to reveal the mobile panel.
- [ ] Set CTA and toggle to the same 44px minimum height and center alignment. Use existing spacing, color, radius, typography, and focus styles; ensure neither action shrinks below its label at 320px.
- [ ] When expanded, make the nav a full-width header row below the controls. Style its links as full-width rows with at least 44px touch height and clear separators. Use `flex-wrap: wrap` on `.header-inner` and set the nav to `order: 3; width: 100%` at the mobile breakpoint.
- [ ] Preserve the existing desktop nav and current breakpoint behavior above 620px. Do not add a floating overlay or animation requirement.
- [ ] Run `npm run build && npm test`; inspect computed CTA/toggle heights at 320px and 390px. Commit only `src/styles/global.css` with `style: align mobile nav controls`.

## Task 4: Verify interaction and responsive behavior

**Files:** Modify `tests/responsive-check.py`.

- [ ] At 320px and 390px, assert the CTA and menu toggle are visible, their bounding-box heights match and are at least 44px, and the menu panel is initially hidden with `aria-expanded=false`.
- [ ] Activate the toggle by role; assert the panel becomes visible, `aria-expanded=true`, and all four links are available. Activate `Services`; assert the URL hash becomes `#services`, the panel closes, and `aria-expanded=false`.
- [ ] Test keyboard access: focus the CTA and press Tab to reach the menu button; press Enter to open, Tab to the first nav link, and verify focus styling remains visible. After activating a link, assert the corresponding heading receives focus and the panel closes.
- [ ] Retain existing no-overflow checks and run them at 320px, 390px, 620px, 621px, 768px, and 1440px. At widths above 620px, assert the desktop nav is visible and mobile toggle hidden; select a desktop anchor and confirm its hash updates without mobile focus management.
- [ ] Run `npm run build && npm test`, then run `python3 tests/responsive-check.py` against the local dev server at `http://127.0.0.1:4321/`. Confirm no browser errors and review mobile/desktop screenshots. If the Python Playwright environment is unavailable, perform the same interactions and viewport checks in a browser and report the script limitation.
- [ ] Commit only the responsive test changes with `test: cover mobile nav interaction and sizing`.

## Scope and safeguards

Do not change the business copy, nav destinations, desktop visual design, CTA destination, or unrelated existing edits in `src/pages/index.astro` and `package-lock.json`. Do not add dependencies. Respect the approved design at `docs/specs/2026-11-01-mobile-navigation-design.md`.
