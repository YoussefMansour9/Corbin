import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { industries } from '@/lib/industries-data';
import { IndustryIcon } from '@/components/industries/industry-icon';

export function IndustriesPreview() {
  return (
    <section id="industries" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Industries We Staff</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We recruit for the roles your business actually runs on. Pick your industry to see the positions
            we fill most often.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IndustryIcon name={industry.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-bold">
                    {industry.name}
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {industry.blurb}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
            <Link href="/industries">See All Industries</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
