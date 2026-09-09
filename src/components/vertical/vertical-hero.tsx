import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface VerticalHeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  backgroundImageAlt: string;
}

export function VerticalHero({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
  backgroundImageAlt,
}: VerticalHeroProps) {
  return (
    <section id="hero" className="relative flex items-center justify-center h-[85vh] min-h-[500px]">
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
          {headline}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-white/80 mb-8 mx-auto">
          {subheadline}
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full">
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
}
