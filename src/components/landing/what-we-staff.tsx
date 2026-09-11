import Link from 'next/link';
import { ArrowRight, Headset, Laptop, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Section 3 of the home page. The guide's core ask is that the difference
 * between the $7 caller and the $8 VA is obvious at a glance, so each tier
 * gets one sentence and four concrete duties, nothing more.
 */
const options = [
  {
    icon: Headset,
    name: 'Call Coverage',
    price: '7',
    summary: 'After-hours and inbound call support.',
    duties: ['After-hours calls', 'Inbound calls', 'Message taking', 'Call routing'],
    href: '/after-hours',
    linkLabel: 'See call coverage',
  },
  {
    icon: Laptop,
    name: 'Standard VA',
    price: '8',
    summary: 'Your everyday remote team member.',
    duties: ['Admin support', 'Customer service', 'CRM & scheduling', 'Data entry & more'],
    href: '/pricing',
    linkLabel: 'See pricing',
    popular: true,
  },
  {
    icon: LineChart,
    name: 'Specialized Talent',
    price: '11+',
    summary: 'Advanced or technical professionals.',
    duties: ['IT & technical', 'CAD / engineering', 'Accounting', 'Senior roles'],
    href: '/industries',
    linkLabel: 'Browse industries',
  },
];

export function WhatWeStaff() {
  return (
    <section id="what-we-staff" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What We Staff</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three ways to add people to your team. Pick the level of support you need.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {options.map((option) => (
            <Card
              key={option.name}
              className={`relative flex h-full flex-col rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                option.popular ? 'border-2 border-primary' : 'border-primary/15'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <option.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl font-bold">{option.name}</CardTitle>
                <p className="pt-1">
                  <span className="text-3xl font-extrabold">${option.price}</span>
                  <span className="text-muted-foreground">/hr</span>
                </p>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="text-muted-foreground">{option.summary}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {option.duties.map((duty) => (
                    <li key={duty} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span className="text-muted-foreground">{duty}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={option.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  {option.linkLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link href="/book-a-consult">Book a Free Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
