import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndustryIcon } from '@/components/industries/industry-icon';
import type { Industry } from '@/lib/industries-data';

/**
 * Index card. The guide asks for the page to be scannable in under twenty
 * seconds, so the card shows a short task list rather than the full blurb and
 * all eight role titles. The detail lives on the industry page.
 */
export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card className="group flex h-full flex-col rounded-2xl border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <CardHeader className="p-6 pb-3">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <IndustryIcon name={industry.icon} className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold">{industry.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-6 pt-0">
        <ul className="flex flex-1 flex-wrap gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
          {industry.cardTasks.map((task, index) => (
            <li key={task} className="flex items-center gap-2">
              {index > 0 && <span className="text-primary/40" aria-hidden="true">&middot;</span>}
              <span>{task}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/industries/${industry.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View Roles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
