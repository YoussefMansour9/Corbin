import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blurPlaceholders } from '@/lib/blur-placeholders';

/**
 * Home page teaser only. The full origin story lives on /about
 * in <AboutStory />, which is far too long for the landing page.
 */
export function AboutSection() {
  return (
    <section id="about" className="bg-card py-16 md:py-24">
      <div className="container">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              We Built Our Own Team This Way First
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Corbin Staffing wasn't created from a theory about outsourcing. It came from our own
                experience building and scaling our founders' e-commerce business.
              </p>
              <p>
                What started as a three-person team working out of one person's home in the Philippines grew
                into a team of more than 80 people working from a newly renovated office. We built our own
                team this way. Now we help other businesses do the same.
              </p>
            </div>

            <Button asChild size="lg" variant="outline" className="mt-8 h-12 px-8 text-base">
              <Link href="/about">
                Read Our Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/about.jpg"
              alt=""
              aria-hidden="true"
              width={600}
              height={400}
              sizes="(max-width: 1024px) 100vw, 600px"
              placeholder="blur"
              blurDataURL={blurPlaceholders.about}
              className="h-full w-full object-cover"
              loading="lazy"
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
