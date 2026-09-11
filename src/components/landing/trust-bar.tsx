import { BadgeCheck, Clock, RefreshCcw, ShieldCheck } from 'lucide-react';

/** Section 2 of the home page: four claims, stated once, never repeated. */
const points = [
  { icon: BadgeCheck, label: 'Pre-Vetted & Skill Tested' },
  { icon: ShieldCheck, label: 'Background Checked' },
  { icon: Clock, label: 'U.S. Hours' },
  { icon: RefreshCcw, label: 'Free Replacements' },
];

export function TrustBar() {
  return (
    <section aria-label="Why clients trust Corbin" className="border-y bg-muted/40">
      <div className="container py-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <li key={point.label} className="flex items-center justify-center gap-2.5 text-center">
              <point.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold sm:text-base">{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
