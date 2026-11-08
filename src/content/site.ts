import heroImage2 from '../assets/elevator.jpg';
import logoImage from '../assets/loler-inspections-logo.jpg';
import ctfs from '../assets/cfts.jpg';
import ukmha from '../assets/UKMHA-logo-small.png';
import safeContractor from '../assets/safecontractor-approved.png';
import dbsCheck from '../assets/enhanced-dbs-check-transparent.png';
import forkLift from '../assets/pexels-caleboquendo-34585143.jpg'

export const site = {
  company: {
    name: 'LOLER Inspections',
    email: 'enquiries.connectedwd@outlook.com',
    emailPlaceholder: 'Enquiry email to be supplied',
    base: 'Wakefield, England',
    serviceArea: 'Serving customers nationwide',
    description: 'A small, independent, family-owned business focused on lifting-equipment inspections.',
  },
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Standards', href: '#standards' },
    { label: 'Contact', href: '#contact' },
  ],
  labels: {
    services: 'Our services',
    about: 'About us',
    standards: 'Standards',
    certifications: 'Certifications',
    contact: 'Get in touch',
    exploreServices: 'Explore our services',
    startConversation: 'Start a conversation',
    stockCaption: 'Forklift',
    requiredFields: 'Fields marked * are required.',
    whatIsLOLER: 'What is a LOLER inspection?',
  },
  hero: {
    eyebrow: 'Lifting-equipment inspections',
    heading: 'LOLER inspections for lifting equipment',
    description: 'Thorough examinations and inspections for lifting equipment. Get in touch to ask about your equipment and confirm whether it is within our inspection scope.',
    action: 'Make an enquiry',
    imageAlt: 'Overhead lifting hooks and chains inside an industrial warehouse. Stock photography; not a company site or inspection.',
  },
  services: {
    heading: 'Thorough examinations, clearly explained',
    description: 'LOLER sets requirements for the thorough examination of lifting equipment. The examination and its interval depend on the equipment and how it is used.',
    examplesLabel: 'Examples of equipment that may be subject to LOLER',
    examplesNote: 'These are general examples, not a confirmed list of equipment inspected by this business. Please ask us to confirm the inspection scope for your equipment.',
    examples: [
      'Passenger, goods, service and platform lifts',
      'Dumbwaiters and patient hoists',
      'Vehicle-mounted cranes (HIABs)',
      'Forklifts and telehandlers',
      'Tail lifts, vehicle lifts and dock levellers',
    ],
    imageAlt: 'Green forklift.',
  },
  about: {
    heading: 'Independent and family-owned',
    paragraphs: [
      'LOLER Inspections is a small, independent, family-owned business focused on lifting-equipment inspections.',
      'Based in Wakefield, we serve customers nationwide across the UK. Contact us to discuss your equipment and confirm whether it is within our inspection scope.',
    ],
  },
  whatIsLOLER: {
    heading: 'What is a LOLER inspection?',
    description: 'LOLER inspections are thorough examinations of lifting equipment. The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) set duties for lifting operations and lifting equipment, including thorough examinations where required.',
    paragraphs: [
      'LOLER inspections are thorough examinations of lifting equipment. The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) set duties for lifting operations and lifting equipment, including thorough examinations where required.',
      'The thorough examination is a visual and physical inspection of the equipment, its components, and its operation. The examination is carried out by a competent person who is trained and experienced in lifting equipment.',
    ]
  },
  standards: {
    heading: 'Working in relation to LOLER',
    description: 'The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) set duties for lifting operations and lifting equipment, including thorough examinations where required.',
    linkLabel: 'Read the Lifting Operations and Lifting Equipment Regulations 1998',
    link: 'https://www.hse.gov.uk/work-equipment-machinery/loler-overview.htm',
    credentials: [
      { name: 'CTFS Certified', logo: ctfs },
      { name: 'SafeContractor Approved', logo: safeContractor },
      { name: 'ukmha Certified', logo: ukmha },
      { name: 'Enhanced BDS Checked', logo: dbsCheck },
    ],
  },
  contact: {
    heading: 'Tell us about your enquiry',
    description: 'Share the type of equipment and what you would like to know. We will confirm whether it falls within our inspection scope.',
    unavailable: 'Online enquiries are not currently available. Please check back later.',
    form: {
      // The StaticForms API key is not committed here. It is supplied at build
      // time via the PUBLIC_STATICFORMS_API_KEY environment variable (set in
      // Cloudflare Pages for production; in .env, gitignored, for local dev).
      enabled: true,
      providerVerified: true,
      privacyApproved: true,
      endpoint: 'https://api.staticforms.dev/submit',
      successUrl: 'http://localhost:4322/enquiry-received/',
    },
  },
  privacy: {
    draftLabel: 'Draft — not approved for production',
    pageTitle: 'Privacy notice draft',
    details: [
      { heading: 'Who is responsible for your information?', text: '[Business controller name and privacy contact details to be confirmed.]' },
      { heading: 'What information may be collected?', text: 'The planned enquiry form asks for your name, email address, optional company name, and enquiry message. The final fields must be confirmed before the form is enabled.' },
      { heading: 'Why is it collected and how is it used?', text: '[Purpose and lawful basis to be confirmed and approved by the business before launch.]' },
      { heading: 'Who receives the information?', text: '[Confirm the business recipients, form provider, and any other processors. StaticForms is not configured; do not submit information through this site yet.]' },
      { heading: 'Where is it stored and for how long?', text: '[Provider data locations, dashboard storage, retention period, and deletion process must be verified against the selected account and stated here.]' },
      { heading: 'Your data rights and contact route', text: '[Business contact details and the appropriate route for privacy-rights requests to be supplied and approved.]' },
      { heading: 'Cookies and other services', text: 'This MVP does not add analytics, advertising pixels, or embedded map services. Review this statement if any third-party tools are added.' },
    ],
  },
  location: {
    heading: 'Based in Wakefield. Serving nationwide.',
    description: 'Wakefield, England is the general business base. Service is available to customers across the UK; no street address is published.',
  },
  footer: {
    copyright: 'All rights reserved.',
    privacyLabel: 'Privacy notice draft',
  },
  assets: {
    logo: logoImage,
    logoAlt: 'LOLER Inspections',
    hero: heroImage2,
    service: forkLift,
  },
  seo: {
    title: 'LOLER Inspections | Lifting Equipment Thorough Examinations | Wakefield, UK',
    description: 'LOLER thorough examinations and lifting-equipment inspections. Based in Wakefield and serving customers nationwide across the UK.',
    candidateDomain: 'https://loler-inspections.com',
    domainVerified: true,
    socialImage: '/images/loler-inspections-logo.jpg',
  },
} as const;
