# Mobile Navigation Design

## Purpose and audience
Provide a compact, usable navigation for visitors on phones and narrow screens, while keeping the primary enquiry action continuously available.

## Design direction
Retain the existing industrial-services visual language: clean white header, navy actions, muted blue-grey links, restrained gold accent, and the site's existing type and spacing tokens. The mobile menu should feel like a natural extension of the current header rather than a new visual system.

## Selected approach
At the existing mobile breakpoint (`max-width: 620px`), replace the always-visible horizontal links with a native menu button. Keep the existing “Enquire” CTA visible beside it. Both controls must have identical minimum height, align on the same vertical centerline, and use a deliberate, consistent gap. Keep the brand on the same header row when space permits.

Activating the menu button reveals a full-width inline panel directly beneath the header. The panel contains the four existing navigation links as full-width rows with generous tap targets. It pushes page content down instead of overlaying or obscuring it. Selecting a link closes the panel and follows its existing in-page anchor. Desktop navigation remains unchanged.

## Interaction and accessibility
- Use a real `<button>` for the menu toggle and retain `<a>` elements for navigation.
- Give the toggle a visible label (“Menu”) and expose state with `aria-expanded` and `aria-controls`.
- Preserve visible keyboard focus and logical tab order. The menu must work with keyboard and touch.
- When a link is chosen, close the panel without unexpectedly moving focus beyond normal anchor navigation.
- Do not require Escape handling or focus trapping: this is an inline disclosure, not a dialog or modal.
- Respect the existing reduced-motion preference. Any expansion animation must be brief and optional; no animation is also acceptable.

## Responsive and visual requirements
- Apply the collapsed menu at the existing 620px breakpoint; preserve current desktop navigation above it.
- The CTA and toggle have matching rendered dimensions (at least 44px tall), matching vertical alignment, and a consistent gap.
- The expanded links remain legible and usable at 320px-wide viewports.
- Keep existing color, radius, typography, and focus tokens; avoid introducing a second mobile-only design language.

## State coverage
- Initial mobile state: menu closed; CTA visible.
- Expanded state: links displayed in the inline panel; CTA remains visible.
- Link selection: panel closes and anchor navigation occurs.
- Keyboard focus: toggle and links have visible focus indicators.
- Desktop state: current inline navigation remains as-is.
- Reduced-motion state: no required animation.

## Validation
Verify at 320px, 390px, 620px, 768px, and desktop width. Confirm no horizontal overflow, matched CTA/toggle height and alignment, correct `aria-expanded` updates, link activation closes the panel, keyboard operation and focus visibility, and no browser console errors. Extend the existing responsive browser check to cover these behaviors.

## Scope
Only the homepage primary navigation and responsive styles/scripts are in scope. No desktop redesign, routes, copy changes, sticky header, overlay, or extra mobile CTA is included.
