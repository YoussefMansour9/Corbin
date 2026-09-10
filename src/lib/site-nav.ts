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
 * Primary navigation, in the order specified by the Corbin content guide.
 * Single source of truth for the header, the mobile sheet and the footer.
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
      { href: '/industries/design-engineering', label: 'Design & Engineering' },
      { href: '/industries/customer-service', label: 'Customer Service' },
      { href: '/industries/it-managed-services', label: 'IT & Managed Services' },
      { href: '/industries/professional-services', label: 'Professional Services' },
      { href: '/industries/insurance', label: 'Insurance' },
      { href: '/industries/restaurants', label: 'Restaurants' },
    ],
    featured: {
      href: '/after-hours',
      label: 'After-Hours Call Coverage',
      description: 'Dedicated coverage for every call that lands outside office hours.',
    },
  },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/team', label: 'Our Team' },
  { href: '/results', label: 'Results' },
  { href: '/about', label: 'About' },
  { href: '/meet-corbin-talent', label: 'Meet Corbin Talent' },
  { href: '/locations', label: 'Locations' },
];

/** Rendered as the header call to action, and last in the mobile sheet. */
export const primaryCta: NavLink = {
  href: '/book-a-consult',
  label: 'Book a Consultation',
};

/** Secondary destinations that live in the footer and the mobile sheet. */
export const secondaryNav: NavLink[] = [
  { href: '/after-hours', label: 'After-Hours Call Coverage' },
  { href: '/security', label: 'Security & Compliance' },
  { href: '/contact', label: 'Ready to Hire' },
];
