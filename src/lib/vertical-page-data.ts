export interface PainPoint {
  icon: string; // lucide icon name
  stat: string;
  title: string;
  description: string;
}

export interface RoleCard {
  title: string;
  tools?: string;
  description: string;
}

export interface CostRow {
  label: string;
  local: string;
  corbin: string;
  localIsNegative?: boolean;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FormDropdownOption {
  value: string;
  label: string;
}

export interface VerticalPageData {
  slug: string;

  // Hero
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    backgroundImageAlt: string;
  };

  // Problem
  problem: {
    headline: string;
    body: string;
    painPoints: PainPoint[];
  };

  // Roles
  roles: {
    headline: string;
    cards: RoleCard[];
    closingLine: string;
  };

  // Cost Comparison
  costComparison: {
    headline: string;
    rows: CostRow[];
    localColumnHeader: string;
    corbinColumnHeader: string;
    closingLine: string;
  };

  // How It Works
  howItWorks: {
    headline: string;
    steps: HowItWorksStep[];
  };

  // FAQ
  faq: {
    headline: string;
    items: FAQItem[];
  };

  // Form
  form: {
    headline: string;
    submitText: string;
    dropdownOptions: FormDropdownOption[];
  };

  // SEO
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    ogImageUrl: string;
  };
}

// ---------------------------------------------------------------------------
// Roofing Vertical: Texas Roofing Conference 2026
// ---------------------------------------------------------------------------

export const roofingPageData: VerticalPageData = {
  slug: 'roofing',

  hero: {
    headline: 'Visit us at',
    subheadline:
      'Trained CSRs and appointment setters who work your hours in your CRM. We handle recruiting, payroll, HR, and compliance. If someone isn\u2019t the right fit, we replace them free.',
    ctaText: 'Book a 15-Minute Call',
    ctaLink: '/book-a-consult',
    backgroundImage: '/images/roofing/conference-banner.png',
    backgroundImageAlt:
      '2026 Texas Roofing Conference banner at Gaylord Texan Resort, Grapevine TX',
  },

  problem: {
    headline: 'Your crews aren\u2019t the bottleneck. Your office is.',
    body: 'You\u2019re chasing adjusters at 9\u202Fpm, answering calls from the truck, and watching your best leads go to voicemail during peak season. The field work gets done. It\u2019s everything behind it that\u2019s falling apart.',
    painPoints: [
      {
        icon: 'PhoneOff',
        stat: '$15,000',
        title: 'Missed storm calls',
        description:
          'A hail event generates more calls in 3\u00A0days than 3\u00A0months. Every voicemail is a $15,000 job going to a competitor.',
      },
      {
        icon: 'FileWarning',
        stat: 'Unbilled',
        title: 'Supplements sitting untouched',
        description:
          'Claim follow-ups and documentation pile up with no uninterrupted time. Money already earned, unbilled.',
      },
      {
        icon: 'DollarSign',
        stat: '$50k+',
        title: 'To hire one admin',
        description:
          '$22/hr plus payroll tax, benefits, PTO, equipment, six weeks of training, ~50% turnover within a year.',
      },
    ],
  },

  roles: {
    headline: 'We\u2019ve mapped the roles roofers actually need filled.',
    cards: [
      {
        title: 'Storm-season CSR',
        description:
          'Answer every call within seconds during hail events. No voicemails, no missed revenue.',
      },
      {
        title: 'Appointment setter',
        description:
          'Book inspections and follow up on leads so your sales team stays in the field, not on the phone.',
      },
      {
        title: 'Production / CRM coordinator',
        tools: 'AccuLynx, JobNimbus, Roofr, CompanyCam, Leap',
        description:
          'Keep jobs moving through your pipeline: updating statuses, scheduling crews, tracking materials.',
      },
      {
        title: 'Permits & material ordering',
        description:
          'Pull permits, coordinate with suppliers, and make sure materials arrive before crews do.',
      },
      {
        title: 'AR & collections',
        description:
          'Chase down outstanding invoices and insurance payments so you get paid for the work you\u2019ve already done.',
      },
      {
        title: 'Reviews & referrals',
        description:
          'Follow up with completed jobs to generate 5-star reviews and referral business on autopilot.',
      },
    ],
    closingLine:
      'Don\u2019t see your role? We staff nearly any back-office function. Tell us what\u2019s eating your week.',
  },

  costComparison: {
    headline: 'What this actually costs you today.',
    localColumnHeader: 'Local Office Hire',
    corbinColumnHeader: 'Corbin Staffing',
    rows: [
      {
        label: 'Hourly rate',
        local: '~$22/hr',
        corbin: 'Starting $7/hr',
        localIsNegative: true,
      },
      {
        label: 'Payroll tax & benefits',
        local: 'You pay',
        corbin: 'Included',
        localIsNegative: true,
      },
      {
        label: 'PTO',
        local: 'You absorb',
        corbin: 'Included',
        localIsNegative: true,
      },
      {
        label: 'Recruiting',
        local: '4 to 8 weeks',
        corbin: 'We handle it',
        localIsNegative: true,
      },
      {
        label: 'Equipment',
        local: 'You provide',
        corbin: 'Included',
        localIsNegative: true,
      },
      {
        label: 'If they quit',
        local: 'Start from zero',
        corbin: 'Free replacement',
        localIsNegative: true,
      },
    ],
    closingLine: 'Same seat. Same hours. Roughly a third of the cost.',
  },

  howItWorks: {
    headline: 'How it works',
    steps: [
      {
        number: '1',
        title: 'Tell us the role',
        description:
          'A 15-minute call. You tell us what you need and we start sourcing immediately.',
      },
      {
        number: '2',
        title: 'Review candidates',
        description:
          'On your schedule. We send pre-recorded interviews so you can evaluate without blocking your calendar.',
      },
      {
        number: '3',
        title: 'They start',
        description:
          'Onboarded, trained on your CRM, working your time zone. Full support from day one.',
      },
    ],
  },

  faq: {
    headline: 'Questions roofers ask us',
    items: [
      {
        question: 'How good is their English?',
        answer:
          'Every candidate we place has been screened for fluent, neutral-accent English. We record pre-interviews so you can hear them before making a decision. No surprises.',
      },
      {
        question: 'Where do your people work from?',
        answer:
          'Our staff work from our managed offices in the Philippines and Egypt. Supervised facilities with reliable internet, power backup, and IT support, not someone\u2019s kitchen table.',
      },
      {
        question: 'Can they work U.S. business hours?',
        answer:
          'Yes. Our teams are set up to work any U.S. time zone, including early mornings and evenings if your storm season demands it.',
      },
      {
        question: 'What if someone doesn\u2019t work out?',
        answer:
          'We replace them free. No re-recruiting fees, no gap in coverage. We carry the risk so you don\u2019t.',
      },
      {
        question: 'Who handles payroll, HR, and compliance?',
        answer:
          'We do. Payroll, benefits, local labor law compliance, equipment, all handled by Corbin. You get one simple invoice.',
      },
      {
        question: 'How fast can someone start?',
        answer:
          '7 to 14 business days from our first call to a trained, onboarded team member working in your systems.',
      },
    ],
  },

  form: {
    headline: 'Let\u2019s talk about your office.',
    submitText: 'Send',
    dropdownOptions: [
      { value: 'storm-season-csr', label: 'Storm-season CSR' },
      { value: 'supplement-coordinator', label: 'Supplement coordinator' },
      { value: 'appointment-setter', label: 'Appointment setter' },
      { value: 'crm-production', label: 'CRM & production' },
      { value: 'something-else', label: 'Something else' },
    ],
  },

  seo: {
    title:
      'Roofing Office Staffing for the Texas Roofing Conference 2026',
    description:
      'Trained CSRs, appointment setters, and back-office staff for roofing companies. Starting at $7/hr. We handle recruiting, payroll, HR, and compliance. Free replacement guarantee.',
    canonicalPath: '/roofing',
    ogImageUrl: '/images/roofing/conference-banner.png',
  },
};
