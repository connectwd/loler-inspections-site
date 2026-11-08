# LOLER Inspections website

A small, static Astro website for LOLER Inspections. Business copy and launch settings are centralised in `src/content/site.ts`; the page layout follows the supplied Summit homepage mockup's composition, not its sample identity, contact details, claims, or imagery.

## Run locally

```sh
npm install
npm run dev
```

Astro prints the local preview URL (normally `http://localhost:4321`). Build and preview the static output with:

```sh
npm run build
npm run preview
```

The site is prerendered to `dist/`; it has no app server, database, CMS, analytics, or client-side framework. `npm run test` runs HTML-output acceptance tests.

## Edit business content and assets

- Edit the company name, approved copy, navigation, service examples, contact/form state, location, logo/photo paths, and SEO values in `src/content/site.ts`.
- The supplied wordmark is copied to `public/images/loler-inspections-logo.png`. Replace it and update `site.assets.logo` if you choose the monogram instead. Both original client files remain in the project root.
- Hero and service photos live under `src/assets/` and are optimized/resized during Astro builds. Replace these paths in the route imports and update `public/images/ASSET-LICENCES.md` with the source and licence for each new stock asset.
- The mockup image, `Summit LOLER Inspection Services Homepage.png`, is a composition reference only. Do not copy its Summit brand, sample phone/email, text/claims, or embedded photography as approved content.

## Enquiry form setup

The form fields are visible but disabled by default. An active form is rendered only when `site.contact.form.enabled`, `providerVerified`, `privacyApproved`, a non-empty API key, success URL, confirmed company email, and `site.seo.domainVerified` are all set. Thus adding a provider key alone cannot accidentally enable submissions. There is no fake email address, provider endpoint, or success claim. The actual enquiry email is not supplied yet.

StaticForms currently documents a native HTML `POST` to `https://api.staticforms.dev/submit` with a hidden `apiKey`, and optional absolute `redirectTo`. A successful post returns a `303` redirect to an absolute configured URL; a failure stays on the provider's error response. Once configured and verified, set the relevant enablement flags, provide the real email and deployed `https://<owned-domain>/enquiry-received/` success URL in `src/content/site.ts`, and set the StaticForms account key as the `PUBLIC_STATICFORMS_API_KEY` environment variable (see below). Never add a guessed key or commit it. StaticForms' integration FAQ says the key is public and intended for HTML, while its Terms say to keep API keys confidential; resolve that conflict with the provider/account terms before publishing a key. Use domain restriction if available.

### Environment variables

| Variable | Where to set | Notes |
|---|---|---|
| `PUBLIC_STATICFORMS_API_KEY` | Cloudflare Pages → Settings → Environment variables → Production | StaticForms account key for the enquiry form. For local development, copy `.env.example` to `.env` (gitignored) and set the value there. Without it the form stays unavailable. |

The key is intentionally not stored in `src/content/site.ts`.

Current provider facts checked 31 October 2026: StaticForms advertises Free at 250 submissions per 30 days, Starter at $4/month billed yearly ($48/year), Pro at $7.50/month billed yearly ($90/year), and its free page advertises submission records retained up to one year with only the latest 30 days available in the inbox. The official Privacy Policy, Terms, pricing and security pages contain conflicting or plan-dependent details on storage, CAPTCHA, API-key confidentiality, and quotas/prices. Re-check the actual account/dashboard and provider terms before choosing it. No provider account exists here, so delivery is **not configured or end-to-end tested**.

Before enabling the form, submit a real test from the deployed site; verify the redirect, delivered email, reply-to, dashboard storage, spam handling, provider error page, consent requirements, and deletion/retention settings. Then update the privacy notice to match the real destination, processor, data location, retention, lawful basis, and rights contact. The current `/privacy/` page is prominently labelled a draft, not legal advice or an approved notice.

## Launch checklist

- [ ] Confirm the exact equipment inspection scope. Current categories are general examples of equipment that may be subject to LOLER, not promised company services.
- [ ] Approve the exact public wording for qualification, CFTS, SafeContractor, and any final service/hero copy. Positive statuses/logo permission are confirmed, but wording and credential logo files have not been supplied.
- [ ] Supply and verify the business enquiry email; replace the placeholder in `src/content/site.ts`.
- [ ] Create/configure the StaticForms account, key, destination, spam protection, domain policy and success URL; review its current terms, privacy, retention and pricing; then complete a real submission test.
- [ ] Resolve StaticForms' conflicting public-key guidance and whether a submission-storage acknowledgement/consent is required for the chosen account and data flow.
- [ ] Complete and approve the privacy notice based on the actual form data flow and business contact details.
- [ ] Confirm purchase and DNS for `loler-inspections.com`; only then set `site.seo.domainVerified` to `true` and use the domain as the canonical production URL.
- [ ] After domain ownership is verified, configure the production `site` URL and generate/publish a sitemap before Search Console submission. A production sitemap is intentionally not emitted while the intended host remains unverified.
- [ ] Select the preferred supplied logo variant; provide approved CFTS/SafeContractor logo files if they should be shown.
- [ ] Approve final hero wording and stock-image direction. The supplied Pexels assets are locally stored and their licence/source are in `public/images/ASSET-LICENCES.md`.
- [ ] Add company-registration details or SEO preferences only if supplied and approved.
- [ ] After the domain is secured, configure the production site URL, generate and verify the sitemap, then verify client-owned Search Console and submit that sitemap. Review client-owned Google Business Profile service-area/address settings. No street address is published.

Already confirmed: display name “LOLER Inspections”; small, independent, family-owned business; qualified status; positive CFTS and SafeContractor status with logo permission; Wakefield as general business base; nationwide UK coverage; inspection-only remit; and the supplied wordmark.

## Deploy

For Cloudflare Pages or similar static hosting, use:

- Build command: `npm run build`
- Build output directory: `dist`
- Runtime: no server adapter required

Keep domain/provider accounts in the client's ownership. Do not buy/register domains or services as part of this implementation. Configure the production canonical URL only after the domain is secured; previews should not claim a canonical production host.

## Future blog

A future small blog can use Astro content collections with Markdown posts under `src/content/blog/`, a collection schema in `src/content.config.ts`, and `/blog/` index plus `/blog/[slug]/` routes. This MVP deliberately does not implement a blog, CMS, or Markdown content collection.
