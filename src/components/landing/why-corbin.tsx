import { Layers, LifeBuoy, PiggyBank, UserCheck } from 'lucide-react';

/**
 * Section 6. This replaces the old problems-versus-solutions table, which
 * ran twelve items and repeated claims already made elsewhere on the page.
 * The guide asks for each benefit to be said once.
 */
const reasons = [
  {
    icon: UserCheck,
    title: 'Vetted Talent',
    description: 'Every candidate is skill-tested, interviewed and background-checked before you meet them.',
  },
  {
    icon: LifeBuoy,
    title: 'Managed Support',
    description: 'We handle recruiting, payroll, HR administration and local compliance.',
  },
  {
    icon: Layers,
    title: 'Flexible Teams',
    description: 'Start with one person, add more as you grow, part-time or full-time.',
  },
  {
    icon: PiggyBank,
    title: 'Lower Overhead',
    description: 'No office space, equipment or benefits to carry for each new hire.',
  },
];

export function WhyCorbin() {
  return (
    <section id="why-corbin" className="border-y bg-muted/40 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Corbin</h2>
        </div>

        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <reason.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
