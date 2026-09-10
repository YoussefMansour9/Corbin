import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ClosingCtaProps {
  headline: string;
  body?: string;
  ctaLabel: string;
  ctaHref?: string;
  secondaryCta?: { href: string; label: string };
}

export function ClosingCta({
  headline,
  body,
  ctaLabel,
  ctaHref = '/book-a-consult',
  secondaryCta,
}: ClosingCtaProps) {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{headline}</h2>
          {body && <p className="mt-5 text-lg leading-relaxed text-primary-foreground/90">{body}</p>}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-primary-foreground/40 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
