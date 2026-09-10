import Image from 'next/image';
import { ArrowRight, Building2, Coffee, HeartHandshake, Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClosingCta } from '@/components/shared/closing-cta';
import { blurPlaceholders } from '@/lib/blur-placeholders';

const originStory = [
  'Before starting Corbin, founders Mendel and Ephraim built and operated an e-commerce business that needed a reliable way to grow without continuously adding expensive local overhead. They began working with virtual assistants in the Philippines to support inventory purchasing, pricing, fulfillment, operations, data research, and many of the day-to-day tasks required to keep the business moving.',
];

const whatTheyLearned = [
  'Along the way, Mendel and Ephraim saw firsthand what the right overseas team could do for a growing company. They were able to expand their operation, build dedicated teams across different functions, extend coverage across different hours of the day, and significantly reduce the cost of building the same workforce locally.',
  'But they also learned something equally important: great overseas staffing is about much more than finding affordable talent.',
];

const investments = [
  { icon: Plane, title: 'Paid Time Off', description: 'Real time away from work, because people who can rest are people who stay.' },
  { icon: Building2, title: 'A Professional Office', description: 'A newly renovated workplace built for focused work, not a kitchen table.' },
  { icon: Coffee, title: 'Refreshments & Amenities', description: 'The everyday things that make an office somewhere people want to be.' },
  { icon: HeartHandshake, title: 'A Positive Team Culture', description: 'Designed to improve retention and create consistency for our clients.' },
];

export function AboutStory() {
  return (
    <>
      {/* Opening. No hero band here: stacking a centred hero above a centred
          section read as two competing intros, so the story starts straight
          away and the page's h1 leads into it. */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                We Built Our Own Team This Way First
              </h1>
              <p className="mt-6 text-xl font-medium leading-relaxed text-foreground/90">
                Corbin Staffing wasn't created from a theory about outsourcing. It came from our own
                experience building and scaling our founders' e-commerce business.
              </p>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted-foreground">
                {originStory.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl">
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
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Then and now */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three People in a Living Room to Eighty in an Office
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What started as a three-person team working out of one person's home in the Philippines grew
              into a team of more than 80 people working from a newly renovated office.
            </p>
          </div>

          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-stretch gap-4 md:flex-row md:items-center">
            <div className="flex-1 rounded-2xl border-2 border-border bg-card p-8 text-center shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Where we began</p>
              <p className="mt-4 text-6xl font-extrabold">3</p>
              <p className="mt-2 font-medium text-muted-foreground">
                people, working out of one person's home
              </p>
            </div>

            <ArrowRight
              className="mx-auto h-7 w-7 shrink-0 rotate-90 text-primary md:rotate-0"
              aria-hidden="true"
            />

            <div className="flex-1 rounded-2xl border-2 border-primary bg-card p-8 text-center shadow-lg">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Where we are now</p>
              <p className="mt-4 text-6xl font-extrabold text-primary">80+</p>
              <p className="mt-2 font-medium text-muted-foreground">
                people, in a newly renovated office
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What they learned */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">What We Learned</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {whatTheyLearned.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-10 rounded-2xl border-l-4 border-primary bg-muted/50 p-8">
              <p className="text-xl font-semibold leading-relaxed">
                Keeping great people requires creating an environment where employees feel valued, supported,
                and excited to stay.
              </p>
              <footer className="mt-4 text-muted-foreground">
                That philosophy became a core part of Corbin Staffing.
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* How we invest in our team */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              We Build Long Term Teams, Not Filled Seats
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Today, Corbin focuses on building long term teams, not simply filling seats. We invest in our
              employees so they stay, which is what creates consistency for our clients.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {investments.map((item) => (
              <Card
                key={item.title}
                className="flex h-full flex-col rounded-2xl border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-bold leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              After experiencing the impact overseas staffing had on their own company, Mendel and Ephraim
              created Corbin Staffing with a simple mission:
            </p>

            <p className="mt-8 text-2xl font-bold leading-relaxed tracking-tight sm:text-3xl">
              Help other business owners scale with talented, dependable overseas teams without the cost and
              complexity of building every position locally.
            </p>

            <div className="mx-auto mt-10 h-1.5 w-24 rounded-full bg-primary" />

            <p className="mt-10 text-xl font-semibold">
              We built our own team this way. Now we help other businesses do the same.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        headline="Build Your Team the Same Way"
        body="Tell us the role you are trying to fill and we will show you what a dedicated overseas team looks like for your business."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/team', label: 'Meet Our Team' }}
      />
    </>
  );
}
