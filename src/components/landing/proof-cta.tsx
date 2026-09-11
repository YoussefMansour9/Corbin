import Link from 'next/link';
import { Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Section 7. Client quotes go here as Corbin collects them with permission.
 * Until then the section shows the office instead of inventing social proof.
 */
const testimonials: { quote: string; name: string; role: string; company: string }[] = [];

export function ProofCta() {
  return (
    <section id="proof" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Real People, in a Real Office
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Corbin staff work from our managed offices, not as unknown freelancers from uncontrolled
              locations. That is what makes coverage consistent and accountability possible.
            </p>

            {testimonials.length > 0 ? (
              <ul className="mt-8 space-y-5">
                {testimonials.map((item) => (
                  <li key={item.company} className="rounded-2xl border bg-card p-6 shadow-sm">
                    <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
                    <p className="mt-3 leading-relaxed">{item.quote}</p>
                    <p className="mt-4 text-sm font-semibold">
                      {item.name}
                      <span className="font-normal text-muted-foreground">
                        , {item.role}, {item.company}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '80+', label: 'people on our team' },
                  { value: '$7', label: 'per hour to start' },
                  { value: 'Free', label: 'replacements' },
                ].map((stat) => (
                  <li key={stat.label} className="rounded-xl border bg-card p-4 text-center shadow-sm">
                    <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/book-a-consult">Book a Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="/results">See Results</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border shadow-lg">
            <video
              controls
              playsInline
              preload="metadata"
              src="/videos/location-2.mp4"
              className="aspect-video w-full bg-muted object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
