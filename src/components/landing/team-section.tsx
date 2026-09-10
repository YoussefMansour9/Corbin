import Image from 'next/image';
import { MapPin, Video } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  location: string;
  imageId: string;
  /** Short bio supplied by Corbin. Rendered only when present. */
  bio?: string;
  /** Intro video in /public/videos. Rendered only when present. */
  videoUrl?: string;
}

/**
 * Add `bio` and `videoUrl` to a member as Corbin supplies them. The card
 * layout below already reserves space for both, so no markup changes are
 * needed when content lands.
 */
const teamMembers: TeamMember[] = [
  { name: 'Mendel Magalnic', role: 'Co-Founder', location: 'Miami, Florida', imageId: 'team-member-1' },
  { name: 'Ephraim Deutsch', role: 'Co-Founder', location: 'Lakewood, New Jersey', imageId: 'team-member-2' },
  { name: 'Salma Wael', role: 'Director Of Operations', location: 'Cairo, Egypt', imageId: 'team-member-3' },
  { name: 'Nour ElTahan', role: 'Director Of Operations', location: 'Alexandria, Egypt', imageId: 'team-member-4' },
  { name: 'Carl Orale', role: 'CTO', location: 'Manila, Philippines', imageId: 'team-member-5' },
  { name: 'Dei Saligumba', role: 'HR Manager', location: 'Antique, Philippines', imageId: 'team-member-6' },
  { name: 'Kirk Fernandez', role: 'General Manager', location: 'Antique, Philippines', imageId: 'team-member-7' },
  { name: 'Dov Kenner', role: 'Head Of Sales', location: 'Monsey, New York', imageId: 'team-member-8' },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Meet Our Team</h1>
          <p className="mt-4 text-lg text-muted-foreground">The leadership behind our success.</p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.imageId);

            return (
              <Card
                key={member.name}
                className="group flex h-full flex-col rounded-2xl border-primary/15 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex flex-1 flex-col items-center p-6">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background shadow-lg ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/50">
                    {memberImage && (
                      <Image
                        src={memberImage.imageUrl}
                        alt={`Portrait of ${member.name}`}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        quality={85}
                        data-ai-hint={memberImage.imageHint}
                      />
                    )}
                  </div>

                  <h2 className="mt-4 text-lg font-bold">{member.name}</h2>
                  <p className="font-medium text-primary">{member.role}</p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {member.location}
                  </p>

                  {member.bio && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  )}

                  {member.videoUrl && (
                    <div className="mt-4 w-full overflow-hidden rounded-xl border">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        src={member.videoUrl}
                        className="aspect-video w-full bg-muted object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border-2 border-dashed bg-muted/40 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Video className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-lg font-bold">Team Intro Videos Coming Soon</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We are recording short introductions from each member of the leadership team. In the meantime,
            book a consultation and meet us directly.
          </p>
        </div>
      </div>
    </section>
  );
}
