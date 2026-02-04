import { Briefcase, Headset, Megaphone, Calculator, Cog } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const serviceCategories = [
  {
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    title: 'Administrative Support',
    services: [
      'Virtual Assistants',
      'Data Entry',
      'CRM Management',
      'Email & Calendar Management',
      'Document Processing',
    ],
  },
  {
    icon: <Headset className="h-8 w-8 text-accent" />,
    title: 'Customer Support',
    services: [
      'Customer Service Representatives',
      'Live Chat Support',
      'Email Support',
      'Phone Support (US & global hours)',
    ],
  },
  {
    icon: <Megaphone className="h-8 w-8 text-accent" />,
    title: 'Sales & Marketing',
    services: [
        'Lead Generation',
        'Cold Calling / Appointment Setting',
        'CRM Follow-ups',
        'Social Media Management',
        'Email Marketing Assistants',
    ],
  },
  {
    icon: <Calculator className="h-8 w-8 text-accent" />,
    title: 'Accounting & Finance',
    services: [
        'Bookkeepers',
        'Accounts Payable / Receivable',
        'Invoicing',
        'Payroll Support',
    ],
  },
  {
    icon: <Cog className="h-8 w-8 text-accent" />,
    title: 'Technical Support',
    services: [
        'IT Helpdesk',
        'Web Support',
        'QA Testing',
        'E-commerce Support'
    ],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide a wide range of staffing solutions to meet your business needs.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {serviceCategories.map((category, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                            <div className="flex items-center gap-4">
                                {category.icon}
                                {category.title}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pl-16">
                            <ul className="list-disc space-y-2">
                                {category.services.map((service, sIndex) => (
                                    <li key={sIndex} className="text-muted-foreground">{service}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </div>
    </section>
  );
}
