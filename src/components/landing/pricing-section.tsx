import Link from 'next/link';
import { Check, Clock, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: 'Call Coverage',
    subtitle: 'After-Hours & Inbound Calls',
    price: '7',
    priceId: 'call-coverage',
    priceSuffix: '/hour',
    description: 'Dedicated team members for after-hours and inbound call coverage.',
    features: [
      'After-hours call answering',
      'Inbound calls',
      'Message taking',
      'Call routing',
      'Appointment requests',
    ],
    popular: false,
  },
  {
    name: 'Standard VA',
    subtitle: 'Administrative & Operational Support',
    price: '8',
    priceId: 'standard-va',
    priceSuffix: '/hour',
    description:
      'A dedicated team member to handle administrative, customer service, and operational tasks.',
    features: [
      'Administrative support',
      'Customer service',
      'CRM management',
      'Scheduling & email management',
      'Data entry & more',
    ],
    popular: true,
  },
  {
    name: 'Specialized Talent',
    subtitle: 'Skilled & Technical Roles',
    price: '11',
    priceId: 'specialized-talent',
    priceSuffix: '/hour',
    description:
      'Experienced professionals for roles requiring specialized skills or industry knowledge.',
    features: [
      'Technical & industry-specific roles',
      'Advanced administrative support',
      'Design, engineering & IT support',
      'Accounting & bookkeeping',
      'Leadership roles',
    ],
    popular: false,
  },
];

const guarantees = [
  { icon: Users, title: 'Flexible Team Sizes', description: 'Part-time or full-time.' },
  { icon: Clock, title: 'Save on Overhead', description: 'No office space or benefits.' },
  { icon: ShieldCheck, title: 'Vetted Talent', description: 'We recruit and screen for you.' },
  { icon: TrendingUp, title: 'Scalable Solutions', description: 'Add team members as you grow.' },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">Pricing</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Build Your Team for Less
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Skilled remote team members. Flexible plans to fit your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.priceId}
              className={`flex flex-col rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                tier.popular ? 'border-primary border-2 relative' : 'border-primary/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {tier.subtitle}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between p-6 pt-0">
                <div>
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold">${tier.price}</span>
                    <span className="text-muted-foreground">
                      {tier.priceSuffix}
                    </span>
                  </div>
                   <p className="mb-6 text-muted-foreground">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" size="lg">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <ul className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-bold">{item.title}</span>
                <span className="block text-sm text-muted-foreground">{item.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
