import { BadgeCheck, GraduationCap, Globe2, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHero } from '@/components/shared/page-hero';
import { ClosingCta } from '@/components/shared/closing-cta';
import { JsonLd, breadcrumbSchema, graph } from '@/components/seo/json-ld';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Meet Corbin Talent',
  description:
    'Meet the pre-vetted remote professionals you would actually be hiring. Skill-tested, background-checked and trained to work your hours.',
  path: '/meet-corbin-talent',
});

/**
 * Candidate introduction videos.
 * Drop the files in /public/videos and add an entry here to publish them.
 * While this list is empty the page renders an "in production" placeholder.
 */
const talentVideos: { name: string; role: string; location: string; videoUrl: string }[] = [];

const standards = [
  {
    icon: BadgeCheck,
    title: 'Skill Tested Before You See Them',
    description:
      'Every candidate completes skill testing and a structured interview before they are ever presented to a client.',
  },
  {
    icon: GraduationCap,
    title: 'Trained on Your Systems',
    description:
      'Your selected team member learns your software, your call procedures, and your customer-service expectations before they start.',
  },
  {
    icon: Globe2,
    title: 'Working Your Hours',
    description:
      'Talent is onboarded to U.S. business hours, after-hours coverage, or whichever time zone your operation runs on.',
  },
];

export default function MeetCorbinTalentPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Meet Corbin Talent', path: '/meet-corbin-talent' },
          ])
        )}
      />

      <PageHero
        eyebrow="Meet Corbin Talent"
        headline="The People You Would Actually Be Hiring"
        body="Our Team page introduces the leadership behind Corbin. This page is about the talent pool itself, the remote professionals who join your business, learn your systems, and handle your day-to-day work."
        primaryCta={{ href: '/book-a-consult', label: 'Book a Free Consultation' }}
        secondaryCta={{ href: '/team', label: 'Meet Our Leadership' }}
      />

      {/* Candidate videos */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Talent Introductions</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear directly from the professionals in our offices.
            </p>
          </div>

          {talentVideos.length > 0 ? (
            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {talentVideos.map((person) => (
                <Card key={person.name} className="overflow-hidden rounded-2xl shadow-lg">
                  <CardContent className="p-0">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      src={person.videoUrl}
                      className="aspect-video w-full bg-muted object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </CardContent>
                  <CardHeader className="pb-6">
                    <CardTitle className="text-lg font-bold">{person.name}</CardTitle>
                    <p className="text-sm font-medium text-primary">{person.role}</p>
                    <p className="text-sm text-muted-foreground">{person.location}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border-2 border-dashed bg-muted/40 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Video className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold">Talent Videos Coming Soon</h3>
              <p className="mt-3 text-muted-foreground">
                We are finishing a short introduction series with our current talent pool. In the meantime,
                book a consultation and we will walk you through candidate profiles for your specific role.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Standards */}
      <section className="border-y bg-muted/40 py-16 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What Every Corbin Professional Brings
          </h2>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {standards.map((item) => (
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

      <ClosingCta
        headline="See Candidate Profiles for Your Role"
        body="Tell us the position you need filled and we will put together a shortlist of vetted candidates for you to review."
        ctaLabel="Book a Free Consultation"
        secondaryCta={{ href: '/contact', label: 'Ready to Hire' }}
      />
    </>
  );
}
