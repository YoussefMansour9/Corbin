export interface NavLink {
  href: string;
  label: string;
}

export interface NavItem extends NavLink {
  /** Optional flyout rendered on hover/focus in the desktop header. */
  children?: NavLink[];
  /** A single highlighted link pinned to the bottom of the flyout. */
  featured?: NavLink & { description: string };
}

/**
 * Primary navigation. The revamp guide cuts this to the pages prospects
 * actually use, so Results, Meet Corbin Talent and Locations moved to the
 * footer. Our Team stays: Corbin sells people, so leadership visibility is
 * part of the pitch.
 */
export const mainNav: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '/industries',
    label: 'Industries',
    children: [
      { href: '/industries/home-services', label: 'Home Services' },
      { href: '/industries/back-office', label: 'Back Office' },
      { href: '/industries/real-estate', label: 'Real Estate' },
      { href: '/industries/customer-service', label: 'Customer Service' },
      { href: '/industries/it-managed-services', label: 'IT & Managed Services' },
      { href: '/industries/design-engineering', label: 'Design & Engineering' },
      { href: '/industries/professional-services', label: 'Professional Services' },
      { href: '/industries/insurance', label: 'Insurance' },
      { href: '/industries/restaurants', label: 'Restaurants' },
    ],
    featured: {
      href: '/after-hours',
      label: 'Call Coverage',
      description: 'Dedicated after-hours and inbound call coverage from $7/hour.',
    },
  },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/team', label: 'Our Team' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Us' },
];

/** Rendered as the header call to action, and last in the mobile sheet. */
export const primaryCta: NavLink = {
  href: '/book-a-consult',
  label: 'Book a Consultation',
};

/** Footer columns, exactly as grouped in the revamp guide. */
export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/team', label: 'Our Team' },
      { href: '/locations', label: 'Locations' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { href: '/industries', label: 'Industries' },
      { href: '/after-hours', label: 'Call Coverage' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { href: '/results', label: 'Results' },
      { href: '/meet-corbin-talent', label: 'Meet Corbin Talent' },
      { href: '/security', label: 'Security & Compliance' },
    ],
  },
  {
    heading: 'Get Started',
    links: [
      { href: '/book-a-consult', label: 'Book a Consultation' },
      { href: '/contact', label: 'Ready to Hire' },
      { href: 'mailto:info@corbinstaffing.com', label: 'Email Us' },
    ],
  },
];

/** Secondary destinations surfaced in the mobile sheet below the main list. */
export const secondaryNav: NavLink[] = [
  { href: '/after-hours', label: 'Call Coverage' },
  { href: '/results', label: 'Results' },
  { href: '/meet-corbin-talent', label: 'Meet Corbin Talent' },
  { href: '/locations', label: 'Locations' },
  { href: '/security', label: 'Security & Compliance' },
];
