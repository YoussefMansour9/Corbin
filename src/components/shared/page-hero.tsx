import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  body?: string;
  meta?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  headline,
  subheadline,
  body,
  meta,
  primaryCta,
  secondaryCta,
  className,
  children,
}: PageHeroProps) {
  return (
    <section className={cn('border-b bg-gradient-to-b from-muted/60 to-background py-16 md:py-24', className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{headline}</h1>
          {subheadline && (
            <p className="mt-5 text-xl font-semibold text-foreground/90 sm:text-2xl">{subheadline}</p>
          )}
          {body && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{body}</p>}
          {meta && (
            <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 rounded-full border bg-background px-5 py-2 text-sm font-semibold text-foreground/80 shadow-sm">
              {meta}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              {primaryCta && (
                <Button asChild size="lg" className="h-12 px-8 text-base">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
