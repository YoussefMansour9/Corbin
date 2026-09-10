import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndustryIcon } from '@/components/industries/industry-icon';
import type { Industry } from '@/lib/industries-data';

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card className="group flex h-full flex-col rounded-2xl border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <CardHeader className="p-6 pb-4">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <IndustryIcon name={industry.icon} className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold">{industry.name}</CardTitle>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{industry.blurb}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6 pt-0">
        <div className="flex-1 rounded-xl bg-muted/60 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Popular Roles</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {industry.popularRoles.map((role) => (
              <li
                key={role}
                className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/industries/${industry.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Explore {industry.name}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
