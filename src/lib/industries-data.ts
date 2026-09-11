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
  /** One-line hero subhead on the industry page. */
  heroLine: string;
  /** Short task labels for the index card, scannable in a couple of seconds. */
  cardTasks: string[];
  popularRoles: string[];
  commonTasks: string[];
  commonSoftware: string[];
  subIndustries?: SubIndustry[];
}

export const industries: Industry[] = [
  {
    slug: 'home-services',
    name: 'Home Services',
    icon: 'Home',
    blurb:
      'Remote staff for roofing, HVAC, plumbing, electrical and construction businesses that cannot afford to miss a call.',
    heroLine:
      'Keep your phones answered, leads moving, and office organized, without adding high local overhead.',
    cardTasks: [
      'Calls',
      'Dispatch',
      'Scheduling',
      'Lead follow-up',
      'Admin',
    ],
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
    commonTasks: [
      'Answer calls',
      'Schedule jobs',
      'Update CRM',
      'Follow up leads',
      'Confirm appointments',
      'Admin support',
    ],
    commonSoftware: [
      'ServiceTitan',
      'Jobber',
      'Housecall Pro',
      'JobNimbus',
      'AccuLynx',
      'Google Workspace',
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
    heroLine:
      'Keep invoicing, records, and daily admin moving without adding headcount locally.',
    cardTasks: [
      'Admin',
      'Data entry',
      'Billing',
      'Bookkeeping',
      'Operations',
    ],
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
    commonTasks: [
      'Data entry',
      'Invoice processing',
      'Expense tracking',
      'Document management',
      'Payroll support',
      'Reporting',
    ],
    commonSoftware: [
      'QuickBooks',
      'Xero',
      'Bill.com',
      'Microsoft Excel',
      'Google Workspace',
      'Dropbox',
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    blurb:
      'Leasing, transaction and property management support for brokerages, investors and property managers.',
    heroLine:
      'Keep listings, leases, and transactions moving while your agents stay in the field.',
    cardTasks: [
      'Leasing',
      'Property management',
      'Transactions',
      'Lead follow-up',
    ],
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
    commonTasks: [
      'Follow up leads',
      'Coordinate showings',
      'Prepare listings',
      'Track transactions',
      'Tenant communication',
      'Update CRM',
    ],
    commonSoftware: [
      'AppFolio',
      'Buildium',
      'Yardi',
      'Follow Up Boss',
      'kvCORE',
      'DocuSign',
    ],
  },
  {
    slug: 'customer-service',
    name: 'Customer Service',
    icon: 'Headset',
    blurb:
      'Phone, chat and email support professionals who represent your brand across U.S. and after-hours schedules.',
    heroLine:
      'Answer every call, email, and chat with people trained on your product and your tone.',
    cardTasks: [
      'Inbound calls',
      'Email',
      'Chat',
      'Scheduling',
      'Support',
    ],
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
    commonTasks: [
      'Answer inbound calls',
      'Respond to email',
      'Handle live chat',
      'Schedule appointments',
      'Log tickets',
      'Follow up with customers',
    ],
    commonSoftware: [
      'Zendesk',
      'Freshdesk',
      'Intercom',
      'HubSpot',
      'Gorgias',
      'Slack',
    ],
  },
  {
    slug: 'it-managed-services',
    name: 'IT & Managed Services',
    icon: 'ServerCog',
    blurb:
      'Service desk and technical support staff who work your ticketing queue and escalation procedures.',
    heroLine:
      'Cover your service desk and ticket queue with staff trained on your escalation rules.',
    cardTasks: [
      'Help desk',
      'Technical support',
      'Ticketing',
      'IT coordination',
    ],
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
    commonTasks: [
      'Triage tickets',
      'First-line support',
      'Escalate issues',
      'Account provisioning',
      'Document resolutions',
      'Monitor alerts',
    ],
    commonSoftware: [
      'ConnectWise',
      'Autotask',
      'Freshservice',
      'Jira Service Management',
      'NinjaOne',
      'Microsoft 365',
    ],
  },
  {
    slug: 'design-engineering',
    name: 'Design & Engineering',
    icon: 'DraftingCompass',
    blurb:
      'Drafting and project coordination talent experienced in AutoCAD, Revit and document control workflows.',
    heroLine:
      'Add drafting and project coordination capacity without expanding your studio.',
    cardTasks: [
      'CAD',
      'Revit',
      'Drafting',
      'Estimating',
      'Project support',
    ],
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
    commonTasks: [
      'Produce drawings',
      'Model in BIM',
      'Prepare submittals',
      'Take-offs and estimates',
      'Document control',
      'Project coordination',
    ],
    commonSoftware: [
      'AutoCAD',
      'Revit',
      'SketchUp',
      'Bluebeam',
      'Procore',
      'Navisworks',
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    icon: 'Briefcase',
    blurb:
      'Client intake, executive support and research talent for firms that bill for their time.',
    heroLine:
      'Give your billable team back the hours they lose to intake, scheduling, and admin.',
    cardTasks: [
      'Executive support',
      'Intake',
      'Research',
      'Billing',
      'CRM',
    ],
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
    commonTasks: [
      'Client intake',
      'Calendar management',
      'Research and summaries',
      'Prepare invoices',
      'Maintain CRM',
      'Client follow-up',
    ],
    commonSoftware: [
      'Clio',
      'HubSpot',
      'Salesforce',
      'Microsoft 365',
      'Calendly',
      'DocuSign',
    ],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    icon: 'ShieldCheck',
    blurb:
      'Policy administration, claims support and renewal follow-up for agencies and carriers.',
    heroLine:
      'Keep policies, renewals, and claims support moving through your agency.',
    cardTasks: [
      'Customer support',
      'Policy admin',
      'Claims support',
      'Renewals',
    ],
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
    commonTasks: [
      'Process policy changes',
      'Prepare quotes',
      'Support claims',
      'Chase renewals',
      'Update records',
      'Follow up leads',
    ],
    commonSoftware: [
      'Applied Epic',
      'AMS360',
      'EZLynx',
      'HawkSoft',
      'Salesforce',
      'Microsoft 365',
    ],
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    icon: 'UtensilsCrossed',
    blurb:
      'Reservation, catering and customer feedback support that takes admin work off your managers.',
    heroLine:
      'Take reservations, catering enquiries, and admin off your managers.',
    cardTasks: [
      'Reservations',
      'Catering',
      'Customer support',
      'Admin',
    ],
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
    commonTasks: [
      'Take reservations',
      'Handle catering enquiries',
      'Answer customer questions',
      'Manage online orders',
      'Respond to reviews',
      'Vendor coordination',
    ],
    commonSoftware: [
      'OpenTable',
      'Toast',
      'Resy',
      'Square',
      'DoorDash',
      'Google Workspace',
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
