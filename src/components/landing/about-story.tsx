import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ClosingCta } from '@/components/shared/closing-cta';

/**
 * The revamp guide asks for a short About page. Corbin's own origin story is
 * kept in full because it is specific and it is the proof, but the page around
 * it is stripped back: three proof points, the office, the story, the mission.
 */
const proofPoints = [
  { value: 'In office', label: 'for most roles, not scattered freelancers' },
  { value: '3', label: 'people when we started, in a private home' },
  { value: '$7', label: 'per hour to start with Corbin' },
];

const story = [
  'Before starting Corbin, founders Mendel and Ephraim built and operated an e-commerce business that needed a reliable way to grow without continuously adding expensive local overhead. They began working with virtual assistants in the Philippines to support inventory purchasing, pricing, fulfillment, operations, data research, and many of the day-to-day tasks required to keep the business moving.',
  'What started as a three-person team working out of one person’s home in the Philippines grew into a team of more than 80 people working from a newly renovated office.',
  'Along the way, Mendel and Ephraim saw firsthand what the right overseas team could do for a growing company. They were able to expand their operation, build dedicated teams across different functions, extend coverage across different hours of the day, and significantly reduce the cost of building the same workforce locally.',
  'But they also learned something equally important: great overseas staffing is about much more than finding affordable talent.',
];

const retention = [
  'Paid time off',
  'A professional office environment',
  'Refreshments and workplace amenities',
  'A positive team culture',
];

export function AboutStory() {
  return (
    <>
      {/* Opening: the guide's short statement, plus the three proof points. */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">About Us</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built From Real Outsourcing Experience
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-foreground/90">
              Corbin was created by entrepreneurs who built and managed overseas teams inside their own
              businesses. We built Corbin to give growing companies a simpler way to access vetted,
              dedicated remote talent without the overhead of traditional hiring.
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <li key={point.label} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <p className="text-4xl font-extrabold text-primary">{point.value}</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">{point.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The office. */}
      <section className="border-y bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border shadow-lg">
              <Image
                src="/images/about.jpg"
                alt=""
                aria-hidden="true"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 576px"
                quality={85}
                className="aspect-video w-full bg-muted object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                {story.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retention, stated once, as a short list rather than four cards. */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <blockquote className="rounded-2xl border-l-4 border-primary bg-muted/50 p-8">
              <p className="text-xl font-semibold leading-relaxed">
                Keeping great people requires creating an environment where employees feel valued,
                supported, and excited to stay.
              </p>
            </blockquote>

            <p className="mt-8 leading-relaxed text-muted-foreground">
              Today, Corbin focuses on building long term teams, not simply filling seats. We invest in
              our employees so they stay, which is what creates consistency for our clients.
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {retention.map((item) => (
                <li
                  key={item}
                  className="rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t bg-muted/40 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold leading-relaxed tracking-tight sm:text-3xl">
              Help other business owners scale with talented, dependable overseas teams without the cost
              and complexity of building every position locally.
            </p>
            <p className="mt-8 inline-flex items-center gap-2 text-lg font-semibold text-primary">
              We built our own team this way. Now we help other businesses do the same.
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
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
