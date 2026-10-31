# LOLER Inspection Website --- MVP Build Specification

> **Source of truth (draft, 31 October 2026):** This document is the
> authoritative MVP build specification. It consolidates the initial
> brief and decisions confirmed during the planning interview. Update
> this file when scope or decisions change; implementation and README
> content must follow it. The supplied homepage mockup is a visual
> reference only; its sample brand, copy, contact details, service
> claims, and embedded photography are not approved content or assets.

## Confirmed decisions and unresolved items

### Confirmed

- Display name: **LOLER Inspections**.
- Business description: small, independent, family-owned; qualified.
    The facts are client-confirmed; exact public wording for qualifications
    is still awaiting approval.
- The business is based in Wakefield and serves customers nationwide
    across the UK. Do not publish a street address.
- The client confirms positive CFTS and SafeContractor status and
    permission to use their logos. Obtain approved public wording and
    authorised logo files before publication. Do not imply government
    licensing or that membership alone proves competence.
- The business provides inspections/thorough examinations only. Do not
    advertise repairs, servicing, installation, or unrelated work.
- The supplied logo artwork is available in the workspace. Use the
    client-provided artwork; do not invent Summit branding or a new logo.
- StaticForms is preferred, but no account or site key is available.
    Keep the form explicitly unconfigured until setup and end-to-end
    testing are complete.
- Intended domain: `loler-inspections.com`; purchase is in progress.
    Treat it as unconfirmed and do not publish it as the canonical URL
    until the client confirms ownership and production configuration.
- Placeholders are expected and must be easy to replace in one central
    content file, with an explicit launch checklist in the README.
- The inspected workspace currently contains this specification and
    supplied logo/mockup PNG assets, but no application code. Start the
    Astro project from this state and preserve the supplied assets.

### Outstanding client or launch inputs

- Confirm the company's exact inspection scope and which listed
    equipment categories it accepts.
- Approve exact public copy for qualification, CFTS, SafeContractor,
    service scope, and final hero wording.
- Supply the enquiry email and configure the StaticForms account,
    destination, and site key; verify provider terms, privacy, retention,
    plan limits, and cost before use.
- Complete and approve the privacy notice using verified data-flow,
    lawful-basis, retention, and contact details.
- Confirm domain purchase, DNS, and production canonical URL.
- Confirm which supplied logo variant is preferred and provide approved
    CFTS/SafeContractor logo assets if they are to appear.
- Confirm whether a licensed stock image direction is acceptable; no
    company photography is currently available.
- Provide any legal registration details or SEO preferences that should
    appear. These are optional unless the client wants them published.

These are launch blockers, not blockers to building a static MVP with
clearly marked placeholders.

## Instructions to the implementation model

Act as a senior frontend engineer. Build the smallest production-quality
MVP that satisfies this specification. Implement the site in the
repository rather than returning a plan or illustrative snippets.

Priorities, in order:

1.  Correctness, accessibility, and trustworthiness.
2.  Simple structure that is easy for a developer to maintain.
3.  Excellent real-world performance and Lighthouse results.
4.  Clear, approachable design for non-technical business customers.
5.  Minimal cost and operational overhead.

Do not add features, dependencies, abstractions, animations, or
JavaScript without a concrete requirement. Do not build a CMS, database,
authentication system, or backend. Do not invent or embellish company
details, qualifications, memberships, testimonials, service claims, or
legal statements. Confirmed facts whose exact wording is pending must
remain unpublished or use approved neutral wording. Where information is
missing, use clearly marked
placeholders in the central content configuration and document what the
client must supply before launch.

If a repository already exists, inspect it first and preserve useful
existing work. If it is empty, initialise the project. Complete the
implementation, run the available checks/build, fix errors, and provide
a concise summary of what was built, how to run it, and what must be
configured before launch.

## 1. Project summary

Build a simple, single-page informational website for a small,
independent, family-owned UK company that provides LOLER thorough
examinations/inspections of lifting equipment.

The site's main purposes are to:

-   Establish a credible online presence.
-   Explain the company and its inspection service in plain English.
-   Make it easy for potential customers to submit an enquiry.
-   Support basic organic search visibility.
-   Provide a foundation for adding a small blog later without
    rebuilding the site.

The intended audience includes a broad range of customers, especially
office and administrative staff who may not be technical specialists.
Keep the wording accessible and reassuring while using accurate LOLER
terminology where appropriate.

The company serves customers nationwide across the UK and is based in
Wakefield, England. Describe Wakefield only as the general business
location; do not publish a street address or imply that service is
limited to Wakefield.

The client prefers a clean, uncluttered single page. The preferred
layout reference is the supplied [homepage mockup](Summit%20LOLER%20Inspection%20Services%20Homepage.png): a slim white header, prominent
image-led split hero, restrained horizontal section layouts, a simple
credentials/about band, and a compact contact/footer area. Follow its
composition and spacing, not its Summit name, phone number, text,
specific claims, or imagery. The brand direction is white, dark navy,
and restrained blue/gold accents. The client supplied logo artwork, but
no company photography is available; suitable locally stored and
licensed stock imagery may be used.

## 2. Decisions already made

Use these defaults unless the repository provides a strong reason not
to:

-   **Framework:** Astro, using static output.
-   **Rendering:** Pre-render the site to static HTML.
-   **Styling:** One small custom CSS file; no CSS framework.
-   **JavaScript:** None by default. Add only if essential to a
    specified requirement.
-   **Content editing:** Keep business copy, contact details, navigation
    labels, image paths, and similar editable values in one clearly
    named central content/configuration file.
-   **Initial scope:** One page with anchor-linked sections.
-   **Future blog:** Keep the project structure compatible with adding
    an Astro content collection and Markdown articles later, but do not
    build the blog now.
-   **Forms:** Use StaticForms or another explicitly configured
    static-form provider. Prefer StaticForms if its current terms and
    pricing remain suitable.
-   **Hosting:** Target low-cost or free static hosting, such as
    Cloudflare Pages, without coupling the code unnecessarily to one
    host.
-   **Data:** No application database.
-   **Maps:** Prefer a lightweight static map image or a link to an
    external map. Do not embed a live map with third-party JavaScript by
    default.
-   **Fonts:** Prefer system fonts. Avoid external font requests unless
    there is a clear reason.
-   **Icons:** Use simple inline SVG or CSS where needed. Do not add a
    large icon library.
-   **Content management:** No CMS initially. The site should be
    straightforward for a developer to update and redeploy.

Do not replace Astro with React, Next.js, or another framework without a
compelling technical reason. This is a small content-focused static
site, not a web application.

## 3. Design direction

Create a professional, restrained industrial-services website. It should
feel established and trustworthy without looking like a large corporate
template.

### Preferred layout reference

Use the supplied [homepage mockup](Summit%20LOLER%20Inspection%20Services%20Homepage.png)
as the preferred layout target. At desktop widths, aim for:

1. A slim white header with the supplied logo at left, short navigation,
    and a clear enquiry action. Do not copy the mockup's phone number.
2. A wide, image-led hero with headline and concise copy on one side and
    relevant lifting-equipment photography on the other (or as a
    background with a readable text panel). Keep the CTA prominent.
3. A services section with concise text/list content and one supporting
    image, without turning every item into a card.
4. A calm, lightly tinted about/standards section with short copy and
    approved credential information.
5. A compact contact area and restrained footer with privacy link.

At narrow widths, stack content in a logical reading order, retain a
clear enquiry CTA, and keep navigation usable without JavaScript.
Translate the mockup's structure rather than copying its exact pixels.
Its business name, phone number, email, service categories, legal or
compliance claims, and photographic content are illustrative only and
must not be reused as factual content or assets. The screenshot's
embedded photography may only be reused if its source and commercial
licence are independently verified; otherwise use a separate licensed,
locally stored image.

### Visual characteristics

-   White or near-white page background.
-   Dark navy for headings, navigation, footer, and important controls.
-   Restrained gold/yellow for small highlights, separators, or CTA
    details.
-   Generous but controlled spacing.
-   Clear typography and obvious visual hierarchy.
-   One strong, relevant image in the hero or near the top.
-   Simple horizontal navigation that collapses naturally on small
    screens without requiring JavaScript if possible.
-   Clear section boundaries, but avoid a stack of visually different
    cards.
-   A prominent, accessible "Make an Enquiry" CTA.
-   A simple footer with the business name, contact email, and relevant
    legal links/placeholders.

### Avoid

-   Dense layouts or long blocks of marketing copy.
-   Large card grids, excessive bordered boxes, or decorative section
    backgrounds.
-   Carousels, sliders, video backgrounds, parallax, scroll effects, or
    animation.
-   Fake counters, unsupported claims, fabricated testimonials, or
    generic AI-sounding filler.
-   Stock photos that imply the company owns equipment, has staff, or
    performs specific work that has not been confirmed.
-   Unnecessary third-party scripts, tracking pixels, cookie tools, and
    embedded widgets.
-   Excessive componentisation for a one-page site.

Use responsive layouts for mobile, tablet, and desktop. Ensure the main
enquiry action remains easy to find on small screens.

## 4. Page structure

Implement one page with the following sections. Use semantic HTML and
sensible anchor IDs.

### 4.1 Header

-   Use the client-supplied logo artwork in the workspace; make it easy
    to replace from a central image path setting. Use the display name
    **LOLER Inspections** for accessible text/brand fallback.
-   Short navigation links to Services, About, Standards, and Contact.
-   A prominent "Make an Enquiry" link/button.
-   Do not display a phone number.
-   Ensure the navigation remains usable at narrow viewport widths.
-   Do not use the mockup's Summit logo or brand name.

### 4.2 Hero

Purpose: communicate the service, audience benefit, and next step
immediately.

Provisional headline: **"National LOLER Inspection Specialists"**

This is a provisional headline and should be kept editable in the
central content configuration.

Include: - A short, plain-English description of the company's
lifting-equipment inspection service. - One primary CTA, "Make an
Enquiry", linking to the contact section. - One relevant
industrial/lifting-equipment photograph. - No unsupported guarantees,
turnaround times, client names, or claims about expertise beyond those
confirmed by the client.

The image must have meaningful alt text if it conveys useful
information; decorative images should have empty alt text. Do not use a
generic alt attribute such as "image".

### 4.3 Services

Explain in plain English that the company provides LOLER inspections /
thorough examinations only. Keep the section scannable and concise.

The client supplied this non-exhaustive list as examples of equipment
that may be subject to LOLER: passenger lifts, goods lifts, service
lifts, platform lifts, dumbwaiters, mobile cranes, tower cranes, gantry
cranes, patient hoists, vehicle-mounted cranes (HIABs), forklifts,
telehandlers, tail lifts, vehicle lifts, and dock levellers. Store the
examples in the central content file and label them as general examples
of equipment that may be subject to LOLER—not as a promise that the
company inspects every category. The exact company inspection scope is
unconfirmed and must be confirmed before a category is presented as an
available service. The list is not exhaustive.

Do not describe servicing, repairs, installation, certification outside
the company's actual remit, or other services: the company has stated
that it provides inspections only.

Avoid implying that every item of lifting equipment is subject to the
same examination requirements. Keep technical statements accurate and
proportionate.

### 4.4 About

Describe the company as small, independent, and family-owned. The client
has confirmed these facts.

Communicate: - Nationwide UK service coverage. - A direct, approachable
service. - The company's focus on lifting-equipment inspections.

Do not mention a number of years in business or years of experience. Do
not invent staff biographies, customer counts, project values, or
customer logos.

### 4.5 Standards and credentials

Create a concise section that explains the company works in relation to
the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER).

The client has confirmed qualified status and positive CFTS and
SafeContractor status, and permits use of those logos. Exact public
wording is still pending approval; do not invent it. Keep each claim
individually editable, and only display approved wording and supplied
authorised logo assets. Do not imply a membership is a government
licence or that membership alone proves every aspect of competence.
Link to official information about LOLER where useful, preferably the
UK legislation page: <https://www.legislation.gov.uk/uksi/1998/2307/contents>.
Keep the section editable so approved credential details can be changed
without altering layout code.

### 4.6 Contact and enquiry form

The main conversion is a submitted enquiry form. Do not show a phone
number, including in the header, page body, footer, or structured data.

Include: - A short invitation to enquire. - The company email address as
a mailto link once supplied and confirmed; do not render a fake address
as a working link. - An enquiry form with only useful fields,
such as: - Name (required). - Company (optional). - Email address
(required). - Equipment/service enquiry (required, multi-line text). -
Optional consent/privacy acknowledgement only if the client's final
process genuinely requires one. - Appropriate labels, required-state
indicators, and accessible error/validation behaviour. - A clear submit
button. - A success state and an understandable failure state. Do not
falsely tell the user an enquiry has been sent when the provider reports
an error. - Basic spam protection supported by the chosen form provider,
without making the form difficult to use.

Until StaticForms is configured and tested, the form must be visibly
marked as unavailable/unconfigured and must not present a working-looking
submit action. Explain briefly that online enquiries are not yet enabled
and provide only the confirmed contact route, if one is available. Do
not invent a success message or silently substitute a `mailto:` form.

Do not add unnecessary fields, file uploads, a phone field, or a complex
multi-step flow unless the client later requests them.

### 4.7 Location/map

Show that the business is based in Wakefield, England, and serves
customers nationwide across the UK. The general location wording is
confirmed. Do not publish a street address. A map is optional; it is not
required to meet this requirement and must not imply a Wakefield-only
service area.

Prefer a static map image with an appropriate accessible description
and/or a link to open a map. Do not include an API key or add a live map
embed unless there is a clear need. Do not publish a private residential
address or a non-customer-facing address without explicit client
approval.

### 4.8 Footer

Include: - Company display name **LOLER Inspections**. - Company email
placeholder until supplied. - Link to privacy notice. - Copyright line
with a sensible dynamic year if it
can be done without unnecessary client-side JavaScript (a build-time
year is fine). - Any company registration details only if supplied and
relevant.

Do not invent a registered address, company number, VAT number, or legal
status.

## 5. Content and configuration architecture

Make routine content edits easy without scattering text through the page
template.

Create a central content file, for example `src/content/site.ts`,
containing: - Company name (`LOLER Inspections`) and approved tagline. -
Contact email (clearly marked placeholder until supplied). - Navigation
labels if useful. - Hero headline, description, CTA label. - Service
section heading, description, illustrative LOLER equipment examples,
and the company's actual service categories only after confirmation. -
About copy. - Standards/credentials facts, publication status, approved
wording, logo paths, and official links. - Contact copy and safe form
configuration/status values. - Location label and optional map image/link.
- Footer text. - Logo and image paths, meaningful alt text, and asset
licensing references. - SEO title, meta description, and canonical URL
configuration. Use explicit TODO/status values for unconfirmed content
so replacements are easy to find and cannot be mistaken for verified
production data.

Use typed data where helpful, but do not build a generic content
management framework. Keep the structure easy to understand.

Do not put secrets, private tokens, passwords, or provider credentials
in the public content configuration. If the form provider requires a
client-side key, follow its current documentation and avoid committing
sensitive configuration to a public repository.

### Implementation conventions, commands, and boundaries

- Keep the implementation Astro static output with semantic `.astro`
    pages and one small custom stylesheet. Do not add a framework or
    client-side hydration for static content.
- Keep business-facing values in `src/content/site.ts`; page templates
    should render that data rather than duplicate copy. Use short,
    descriptive names and straightforward typed objects/arrays. Avoid
    generic CMS-like abstractions.
- Expected project commands: `npm install`, `npm run dev`,
    `npm run build`, and `npm run preview`. Add `npm run check` only if
    configured as part of the project; document its exact behavior.
- Verification: a clean install and production build; review generated
    static output; inspect at 320px, common mobile/tablet, and desktop
    widths; keyboard-test navigation and form controls; check heading
    order, labels, focus visibility, contrast, image alt text, no phone
    number, no accidental placeholder contact link, and no broken
    internal anchors. Run Lighthouse on a local/deployed build if
    available and report only measured results.
- **Always:** preserve factual accuracy; keep placeholders obvious and
    centralised; use semantic HTML; protect private addresses and secrets;
    document asset licences; verify production output.
- **Ask first:** add dependencies, add scripts/third-party services,
    publish a new business/credential claim, change service scope, display
    a physical address, or add tracking/cookies.
- **Never:** invent contact details, phone numbers, accreditation
    wording, inspection categories, testimonials, legal facts, or
    addresses; claim a form works without an end-to-end test; reuse the
    mockup's factual copy or unlicensed imagery; commit secrets.

Add a `README.md` that explains: 1. How to install dependencies and run
locally. 2. How to build and preview the static site. 3. Where to edit
business copy and contact details. 4. Where to replace images and the
logo. 5. How to configure and test the enquiry form. 6. How to deploy.
7. What remains a client-confirmation task before launch. 8. How a
future Markdown blog could be added without implementing it now.

## 6. Form integration

Use StaticForms as the preferred first option, subject to checking its
current documentation, privacy terms, limits, and pricing during
implementation.

The integration should: - Use the provider's documented HTML form
submission method. - Avoid unnecessary client-side JavaScript. - Have an
explicit success/failure path consistent with the provider's actual
behaviour. - Use the provider's supported spam-prevention features. - Be
testable using a real test submission before launch. - Avoid hardcoding
a fake API key or pretending the form works before it is configured.

If a real API key or destination email is not available in the
development environment: - Implement the correct integration structure
using a clearly marked placeholder. - Document exactly what needs to be
supplied/configured. - Do not silently replace the form with a `mailto:`
link. - Do not claim form delivery is production-ready until it has been
tested end-to-end.

Check the current StaticForms plan limits and feature availability
rather than assuming old pricing remains valid. Basic email delivery
should be the MVP. Google Sheets logging is a possible future
enhancement, not part of the initial acceptance criteria.

Important privacy detail: the selected form provider may store submitted
enquiries in its dashboard as well as sending email notifications. The
privacy notice must accurately describe the actual data flow,
recipient(s), service provider, retention, and contact details once
confirmed. Do not claim that submissions are sent only by email if they
are also stored by the provider.

## 7. Privacy and legal content

Create a simple privacy notice page or clearly isolated privacy-notice
placeholder that can be completed before launch. Do not fabricate legal
details.

The draft placeholder should be useful rather than generic: clearly mark
it as **draft—not approved for production**, explain that final details
are pending, and provide labelled fields for the business/controller
contact, information collected, purpose, recipients/processors (including
StaticForms if activated), storage/retention, lawful basis, rights
contact, and actual cookies or third-party tools. Do not insert guessed
answers or claim that submissions are email-only. If the live site is
made public before approval, make the form's unavailable status clear and
do not represent the placeholder as a completed privacy notice.

The final notice should be checked and approved by the client and should
accurately cover: - What information the form collects. - Why the
information is collected. - How enquiries are used and who receives
them. - The form provider and any other processors involved. - Whether
and how long the provider stores submissions. - The appropriate lawful
basis and how to contact the business about data rights. - Any
analytics, cookies, or other third-party tools actually used.

Do not add analytics or tracking by default. If analytics or third-party
embeds are later added, assess the applicable UK privacy/cookie
requirements and update the notice/consent implementation as
appropriate. Do not add a cookie banner merely for appearance.

Do not present a generic generated privacy notice as legally reviewed
advice. Mark missing facts clearly and document that the client must
approve the final text before launch.

## 8. SEO

Implement sensible technical and on-page SEO without promising rankings.

Required: - Unique, descriptive page title. - Useful meta description. -
Correct canonical URL placeholder or configuration. - One clear primary
H1. - Logical heading hierarchy. - Semantic landmarks (`header`, `nav`,
`main`, `section`, `footer`). - Descriptive link text. - Image alt text
that reflects the actual image and purpose. - Responsive layout and
readable content on mobile. - Open Graph metadata with appropriate
fallbacks. - Favicon. - `robots.txt` and sitemap if appropriate for the
chosen Astro setup. - Correct production site URL configured when the
domain is known. - No accidental `noindex` on production. - No keyword
stuffing, hidden text, or fabricated local-business details.

Do not invent reviews, ratings, structured business data, opening hours,
exact addresses, or service claims. Add structured data only if the
underlying facts are supplied and verified.

After deployment, document the remaining steps for: - Google Search
Console verification and sitemap submission. - Google Business Profile
setup/ownership or review. - Confirming the business's service-area
settings and whether a public address should be displayed.

The client should own the domain and Google Business Profile. The
developer can be granted appropriate access. If the business does not
receive customers at its address, check Google's service-area business
rules before exposing a street address.

## 9. Performance and Lighthouse

Performance is a core requirement, not a later optimisation task.

Aim for excellent real-world Lighthouse results, especially Performance,
Accessibility, Best Practices, and SEO, but do not guarantee a perfect
score across every device or run.

Requirements: - Static HTML output. - No unnecessary client-side
JavaScript. - Minimal CSS and no large framework. - No third-party
JavaScript by default. - No auto-playing video, carousel, or
animation. - Optimised, correctly sized images. Prefer AVIF or WebP when
supported by the build pipeline. - Avoid layout shift: provide image
dimensions or an appropriate aspect ratio. - Use responsive image sizes
where practical. - Lazy-load below-the-fold images; do not lazy-load the
likely LCP/hero image. - Use appropriate image loading priority for the
hero image. - Avoid external font requests where possible. - Avoid
layout and interaction patterns that require a heavy script. - Keep
contrast, focus indicators, and tap targets accessible. - Test at mobile
and desktop viewports. - Run Lighthouse against the built/deployed
version where possible and report measured results, not guesses.

For Astro, use the image asset pipeline for images under `src/` when it
provides useful optimisation. Files in `public/` are copied as-is, so
compress and size them manually if using that location. Do not add an
image-processing dependency without a clear benefit.

## 10. Accessibility and responsive behaviour

Target WCAG 2.2 AA principles where practical.

At minimum: - Semantic HTML. - Keyboard-accessible navigation and
form. - Visible focus states. - Labels associated with all form
fields. - Errors and status messages communicated clearly. - Sufficient
colour contrast. - No colour-only communication. - Appropriate alt
text. - Correct heading order. - Respect `prefers-reduced-motion` if any
motion is introduced. - Usable at 320 CSS pixels and at common mobile,
tablet, and desktop widths. - Do not hide important information on
mobile. - Ensure the CTA is visually clear without being intrusive.

## 11. Suggested repository structure

Keep the implementation proportionate. A reasonable starting point is:

``` text
src/
  content/
    site.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    privacy.astro
  styles/
    global.css
public/
  images/
  favicon.svg
astro.config.mjs
package.json
README.md
```

Adjust where Astro conventions or the existing repository make another
simple structure more appropriate. Do not create a component for every
paragraph. Keep the page understandable to a developer who will maintain
it later.

Do not implement a blog now. Leave a short README note describing a
future Astro content collection with Markdown posts and a blog
index/detail route.

## 12. Assets and licensing

-   Use a suitable stock image only if its licensing permits the
    intended commercial website use.
-   Prefer one high-quality image over many generic images.
-   Do not claim a stock image depicts the client's own staff, site,
    equipment, or work.
-   Store image assets locally in the repository where licensing
    permits.
-   Record the image source and licence in a small
    `public/images/ASSET-LICENCES.md` or equivalent.
-   Do not hotlink images from stock websites.
-   Client-supplied logo assets currently in the repository root:
    [Elegant Black-and-White Corporate Logo.png](Elegant%20Black-and-White%20Corporate%20Logo.png)
    and [Loler Inspections Monogram Logo.png](Loler%20Inspections%20Monogram%20Logo.png).
    Inspect both variants, preserve transparency if present, and use the
    suitable supplied variant. Keep the chosen path centralised so it
    can be replaced easily. Do not invent Summit branding or a
    permanent logo.
-   The [homepage mockup](Summit%20LOLER%20Inspection%20Services%20Homepage.png)
    is a visual reference only; do not treat it as an approved logo or
    source for final copy/photography.
-   If a stock image is used, store it locally, record the source and
    commercial-use licence in `public/images/ASSET-LICENCES.md`, and do
    not imply it depicts the client, their workers, equipment, sites, or
    work. Do not reuse the mockup's embedded photograph unless its
    original source and commercial rights are verified.

## 13. Deployment and ownership

Prepare the site for static hosting such as Cloudflare Pages, with build
settings documented in the README.

-   Keep the project deployable without a database or server process.
-   Do not require paid infrastructure for the static site itself if a
    free tier is adequate.
-   Document build command and output directory.
-   Use `npm run build` and the Astro static output directory `dist/`;
    document these settings for the selected static host.
-   Keep domain and third-party accounts under the client's ownership
    where possible.
-   Do not register a domain, create accounts, or incur charges without
    explicit authorisation.
-   Document any provider plan limits or costs that need confirming
    before launch.
-   The intended domain is `loler-inspections.com`, currently being
    purchased. Do not set it as the production canonical site URL or
    enable a public launch configuration until ownership and DNS are
    confirmed. Keep the candidate value centralised and clearly marked.
-   Do not commit secrets, private client information, or real form keys
    into source control.

## 14. Explicitly out of scope for MVP

Do not implement these unless explicitly requested later: - Blog, CMS,
or browser-based content editing. - Google Sheets integration or CRM. -
Analytics and advertising pixels. - User accounts or authentication. -
Database or custom backend. - Phone number or click-to-call. - Live map
embeds. - Testimonials until the client supplies approved content. -
Online booking or payment. - Service/repair offerings. - Multiple pages
for individual services. - Complex animations, interactive widgets, or
advanced form workflows. - Automated deployment pipelines unless one
already exists or can be added simply without expanding scope.

## 15. Client launch checklist

Create this checklist in `README.md`. These details are not blockers to
building the MVP with placeholders, but must be resolved before the
relevant content or functionality is treated as production-ready:

- [ ] Confirm the exact equipment categories and inspection scope the
    company accepts; until then, present the supplied list only as general
    LOLER examples.
- [ ] Approve the final public wording for the company's qualification,
    CFTS status, and SafeContractor status. Status and logo permission are
    client-confirmed; exact text and logo files remain to be supplied.
- [ ] Supply and verify the enquiry email address.
- [ ] Create/configure the StaticForms account, site key, destination,
    spam controls, and success/failure destinations. Check current provider
    terms, privacy, retention, plan limits, and cost. Complete a real
    end-to-end test before enabling submissions.
- [ ] Complete and approve the privacy notice after confirming the
    provider data flow, recipients/processors, retention, lawful basis,
    rights contact, and actual cookies/tools. The draft must not be
    represented as legal advice or a final notice.
- [ ] Confirm purchase of `loler-inspections.com`, DNS, and the final
    canonical URL before production SEO/deployment configuration.
- [ ] Select the preferred supplied logo variant and provide authorised
    CFTS/SafeContractor logo files if credential logos are to be displayed.
- [ ] Approve the final hero headline/description and any stock photo
    direction. Confirm commercial-use licensing for selected imagery.
- [ ] Supply any company-registration details or SEO search preferences
    the client wants shown; omit them if not supplied.
- [ ] Before launch, review Search Console ownership/sitemap submission
    and Google Business Profile ownership/service-area settings. Confirm
    whether any public address is appropriate; do not expose one by
    default.

Already confirmed: display name “LOLER Inspections”; small,
independent, family-owned business; qualified status (exact public
wording pending); positive CFTS and SafeContractor status and permission
to use logos (exact public wording/files pending); Wakefield as general
business base; nationwide UK service; inspections only; and the supplied
logo artwork. The intended domain is being purchased, not yet confirmed
as owned.

## 16. Acceptance criteria

The MVP is complete when:

1.  The Astro project installs and builds successfully.
2.  The homepage renders as static HTML.
3.  The page contains the agreed sections and a clear enquiry CTA.
4.  The design is clean, uncluttered, responsive, and follows the
    supplied mockup's layout composition with the agreed navy, white,
    and restrained accent direction.
5.  No phone number, unapproved claim, invented testimonial, or
    fabricated company detail is shown. Do not copy the mockup's Summit
    identity, phone number, sample email, unsupported service/credential
    copy, or embedded photography without independent verification.
6.  Business copy and common settings are editable from one central
    content file.
7.  The enquiry form is integrated with a real provider configuration or
    is clearly marked as awaiting configuration; it must not falsely
    claim to work.
8.  The privacy notice identifies missing client-specific facts and does
    not make inaccurate claims about data handling.
9.  SEO metadata and core technical SEO are present; the unpurchased
    domain is not treated as a production canonical URL.
10. Accessibility basics are implemented.
11. Images are appropriately licensed, locally stored, compressed,
    sized, and documented.
12. There are no unnecessary JavaScript libraries, external scripts,
    analytics, or live map embeds.
13. The README explains development, editing, deployment, form
    configuration, and outstanding client confirmations.
14. The production build passes without errors or avoidable warnings.
15. The implementation model reports any decisions made, commands/tests
    run, known limitations, and the exact launch blockers.

## 17. Final implementation response

After completing the work, return a concise report with: - What was
implemented. - Key files and where content is edited. - Commands used
and whether the build passed. - Lighthouse results if actually
measured. - Form-provider configuration status and how to test it. - Any
known accessibility, SEO, or deployment limitations. - A prioritised
list of client details required before launch.

Do not claim something was tested, deployed, submitted, delivered, or
measured unless it actually was.
