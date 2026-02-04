import {
  Briefcase,
  Cog,
  ShieldCheck,
  Star,
  Users,
  Code,
  Check,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: 'Standard',
    price: '7',
    priceId: 'standard',
    priceSuffix: '/hour',
    description:
      'Reliable team members prepared to support daily operations, helping maintain efficiency, consistency, and smooth workflows.',
    features: [
      'Rate: Starting at $7/hour per employee for teams of 3 or more.',
      'For fewer than 3 employees, the rate is $8/hour per employee.',
    ],
  },
  {
    name: 'Professional',
    price: '9',
    priceId: 'professional',
    priceSuffix: '/hour',
    description:
      'Skilled employees with relevant experience who can work independently, solve problems, and contribute directly to operational success.',
    features: ['Rate: Starting at $9/hour'],
  },
  {
    name: 'Executive',
    price: '11',
    priceId: 'executive',
    priceSuffix: '/hour',
    description:
      'Senior professionals with proven leadership experience, strategic oversight capabilities, and a track record of driving results. Ideal for high-impact roles requiring decision-making authority and minimal supervision.',
    features: ['Rate: Starting at $11/hour'],
  },
];

const specialTiers = [
  {
    name: 'Sales & Customer Service',
    price: '$7/Hour',
    description:
      'Professional team members with fluent, clear, & neutral English, focused on building trust and ensuring client satisfaction.',
  },
  {
    name: 'Software Developer',
    price: 'Starting at $20/Hour',
    description:
      'Skilled professionals specializing in designing, building, and maintaining software solutions. Experienced in coding, debugging, and collaborating on projects to deliver high-quality, reliable applications. Ideal for companies needing technical expertise to support digital operations or custom development initiatives.',
  },
  {
    name: 'Custom / Enterprise',
    price: 'Flexible Pricing',
    description:
      'Tailored staffing solutions for larger teams or complex projects. Flexible pricing designed to meet your organization’s unique scale, needs, and operational goals.',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Clear and Flexible Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a variety of plans to fit your specific needs, from
            operational support to executive leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.priceId}
              className="flex flex-col rounded-2xl border-primary/20 shadow-lg"
            >
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
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
                        <Check className="h-5 w-5 text-primary" />
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

        <div className="mx-auto mt-20 max-w-5xl">
          <h3 className="text-center text-2xl font-bold tracking-tight">
            Specialized Roles & Enterprise Solutions
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {specialTiers.map((tier) => (
              <Card key={tier.name} className="bg-card rounded-2xl flex flex-col">
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {tier.price}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/book-a-consult">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
