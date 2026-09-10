import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Clock, RefreshCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blurPlaceholders } from '@/lib/blur-placeholders';

const trustPoints = [
  { icon: BadgeCheck, label: 'Pre-Vetted & Skill Tested', href: '/meet-corbin-talent' },
  { icon: ShieldCheck, label: 'Background Checked', href: '/security' },
  { icon: Clock, label: 'U.S. Hours & After-Hours Coverage', href: '/after-hours' },
  { icon: RefreshCcw, label: 'Free Replacement Guarantee', href: '/results' },
];

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative flex min-h-[42rem] w-full items-center py-20 md:min-h-[46rem]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={blurPlaceholders.hero}
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/45" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Hire Dedicated Remote Staff Starting at $7/Hour
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 md:text-xl">
            Pre-vetted, full-time and part-time professionals without the overhead of traditional hiring.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
              <Link href="/book-a-consult">Book a Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/60 bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-background"
            >
              <Link href="/industries">Explore Industries</Link>
            </Button>
          </div>

          {/* Trust points, directly under the button per the content guide. */}
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li key={point.label}>
                <Link
                  href={point.href}
                  className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/20"
                >
                  <point.icon className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white sm:text-base">{point.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
