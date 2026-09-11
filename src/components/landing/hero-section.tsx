import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blurPlaceholders } from '@/lib/blur-placeholders';


export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative flex min-h-[34rem] w-full items-center py-20 md:min-h-[38rem]">
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
            Dedicated Remote Staff Starting at $7/Hour
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 md:text-xl">
            Pre-vetted professionals for customer support, admin, operations, and specialized roles.
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

        </div>
      </div>
    </section>
  );
}
