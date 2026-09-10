export interface SubIndustry {
  slug: string;
  name: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  /** lucide-react icon name, resolved in the industry card component. */
  icon: string;
  blurb: string;
  popularRoles: string[];
  subIndustries?: SubIndustry[];
}

export const industries: Industry[] = [
  {
    slug: 'home-services',
    name: 'Home Services',
    icon: 'Home',
    blurb:
      'Remote staff for roofing, HVAC, plumbing, electrical and construction businesses that cannot afford to miss a call.',
    popularRoles: [
      'Customer Service Representative',
      'After-Hours Call Agent',
      'Appointment Setter',
      'Dispatcher',
      'Lead Follow-Up Specialist',
      'Estimating Assistant',
      'CRM Specialist',
      'Administrative Assistant',
    ],
    subIndustries: [
      {
        slug: 'roofing',
        name: 'Roofing',
        description:
          'Corbin remote staff can help roofing companies capture more leads and keep projects moving without adding expensive in-house overhead. They can answer inbound calls, provide after-hours call coverage, schedule inspections and estimates, follow up with leads, make outbound calls, update CRM records, organize customer information, perform data entry, assist with permit and admin paperwork, and follow up on outstanding estimates.',
      },
      {
        slug: 'hvac',
        name: 'HVAC',
        description:
          'Our remote team can answer customer calls, schedule service appointments, provide after-hours phone coverage, follow up on missed calls and web leads, send appointment reminders, perform outbound customer follow-ups, update your CRM, and handle routine administrative work, allowing technicians and office staff to focus on service and sales.',
      },
      {
        slug: 'plumbing',
        name: 'Plumbing',
        description:
          'Never lose a potential job simply because no one answered the phone. Corbin staff can answer inbound and after-hours calls, collect customer and service information, schedule appointments, follow up with leads, confirm appointments, update CRM systems, make outbound calls, and provide ongoing administrative support.',
      },
      {
        slug: 'electrical',
        name: 'Electricians / Electrical Contractors',
        description:
          'Corbin can provide remote customer service and administrative support for electrical contractors, including answering calls, scheduling estimates and service visits, lead follow-up, appointment confirmation, CRM management, data entry, customer outreach, and back-office support.',
      },
      {
        slug: 'general-contractors',
        name: 'General Contractors & Construction',
        description:
          'Our remote staff can assist contractors with lead intake, estimate scheduling, customer follow-ups, subcontractor and vendor communication, document organization, CRM updates, data entry, project administration, permit-related administrative work, and other repetitive back-office tasks.',
      },
      {
        slug: 'restaurants',
        name: 'Restaurants',
        description:
          "Corbin remote staff can take administrative and customer-service work off restaurant managers' plates. Staff can answer calls, assist with reservation inquiries, respond to customer questions, handle catering and event inquiries, follow up with catering leads, perform data entry, assist with online reviews and customer feedback, manage routine emails, help with vendor and admin coordination, and provide general back-office support.",
      },
    ],
  },
  {
    slug: 'back-office',
    name: 'Back Office',
    icon: 'FileSpreadsheet',
    blurb:
      'Administrative, billing and bookkeeping support that keeps daily operations moving without adding headcount locally.',
    popularRoles: [
      'Administrative Assistant',
      'Executive Assistant',
      'Data Entry Specialist',
      'Billing Assistant',
      'Bookkeeping Assistant',
      'Payroll Assistant',
      'Operations Assistant',
      'Document Processing Specialist',
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    blurb:
      'Leasing, transaction and property management support for brokerages, investors and property managers.',
    popularRoles: [
      'Real Estate Virtual Assistant',
      'Leasing Assistant',
      'Property Management Assistant',
      'Tenant Coordinator',
      'Lead Generation Specialist',
      'Appointment Setter',
      'Transaction Coordinator',
      'CRM Specialist',
    ],
  },
  {
    slug: 'design-engineering',
    name: 'Design & Engineering',
    icon: 'DraftingCompass',
    blurb:
      'Drafting and project coordination talent experienced in AutoCAD, Revit and document control workflows.',
    popularRoles: [
      'CAD Drafter',
      'AutoCAD Specialist',
      'Revit Specialist',
      'Architectural Drafter',
      'Engineering Assistant',
      'Project Coordinator',
      'Estimating Assistant',
      'Document Control Specialist',
    ],
  },
  {
    slug: 'customer-service',
    name: 'Customer Service',
    icon: 'Headset',
    blurb:
      'Phone, chat and email support professionals who represent your brand across U.S. and after-hours schedules.',
    popularRoles: [
      'Customer Service Representative',
      'Inbound Call Agent',
      'After-Hours Call Agent',
      'Live Chat Representative',
      'Email Support Specialist',
      'Appointment Setter',
      'Customer Follow-Up Specialist',
      'Help Desk Representative',
    ],
  },
  {
    slug: 'it-managed-services',
    name: 'IT & Managed Services',
    icon: 'ServerCog',
    blurb:
      'Service desk and technical support staff who work your ticketing queue and escalation procedures.',
    popularRoles: [
      'IT Support Specialist',
      'Help Desk Technician',
      'Technical Support Representative',
      'Service Desk Agent',
      'Ticketing Support Specialist',
      'Systems Administrator',
      'Network Support Assistant',
      'IT Coordinator',
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    icon: 'Briefcase',
    blurb:
      'Client intake, executive support and research talent for firms that bill for their time.',
    popularRoles: [
      'Executive Assistant',
      'Administrative Assistant',
      'Client Intake Specialist',
      'Appointment Setter',
      'Research Assistant',
      'Billing Assistant',
      'CRM Specialist',
      'Client Support Representative',
    ],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    icon: 'ShieldCheck',
    blurb:
      'Policy administration, claims support and renewal follow-up for agencies and carriers.',
    popularRoles: [
      'Insurance Virtual Assistant',
      'Customer Service Representative',
      'Policy Administration Assistant',
      'Claims Support Specialist',
      'Lead Follow-Up Specialist',
      'Appointment Setter',
      'Data Entry Specialist',
      'Renewal Support Assistant',
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    icon: 'UtensilsCrossed',
    blurb:
      'Reservation, catering and customer feedback support that takes admin work off your managers.',
    popularRoles: [
      'Phone & Reservation Agent',
      'Catering Coordinator',
      'Catering Lead Follow-Up Specialist',
      'Customer Service Representative',
      'Administrative Assistant',
      'Online Order Support',
      'Review & Customer Feedback Specialist',
      'Data Entry Specialist',
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
