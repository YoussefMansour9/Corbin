import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface VerticalHeroProps {
  headline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  backgroundImageAlt: string;
}

export function VerticalHero({
  headline,
  ctaText,
  ctaLink,
  backgroundImage,
  backgroundImageAlt,
}: VerticalHeroProps) {
  return (
    <section id="hero" className="border-b bg-[#f5efe2]">
      <div className="container flex flex-col items-center py-10 md:py-14">
        {/* Lead-in only. The banner itself carries the conference name,
            the city and the venue, so repeating them here duplicated it. */}
        <p className="text-center text-2xl font-extrabold uppercase tracking-[0.2em] text-[#8f1c24] sm:text-3xl md:text-4xl">
          {headline}
        </p>

        {/* The banner is 1920x500 (3.84:1). It used to sit in an 85vh box
            under object-cover, which cropped 666px off each side and threw
            away most of the artwork. Held at its own ratio it stays whole. */}
        <div className="mt-8 w-full max-w-6xl overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            width={1920}
            height={500}
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="h-auto w-full"
          />
        </div>

        <Button
          asChild
          size="lg"
          className="mt-8 rounded-full bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
}
