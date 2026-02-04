import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';

const teamMembers = [
  { name: 'Mendel Magalnic', role: 'Co-Founder', location: 'Miami, Florida', imageId: 'team-member-1' },
  { name: 'Ephraim Deutsch', role: 'Co-Founder', location: 'Lakewood, New Jersey', imageId: 'team-member-2' },
  { name: 'Salma Wael', role: 'Director Of Operations', location: 'Cairo, Egypt', imageId: 'team-member-3' },
  { name: 'Nour ElTahan', role: 'Director Of Operations', location: 'Alexandria, Egypt', imageId: 'team-member-4' },
  { name: 'Carl Orale', role: 'CTO', location: 'Manila, Philippines', imageId: 'team-member-5' },
  { name: 'Dei Saligumba', role: 'HR Manager', location: 'Antique, Phillipines', imageId: 'team-member-6' },
  { name: 'Kirk Fernandez', role: 'General Manager', location: 'Antique, Phillipines', imageId: 'team-member-7' },
  { name: 'Dov Kenner', role: 'Head Of Sales', location: 'Monsey, New York', imageId: 'team-member-8' },
];

export function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">The leadership behind our success.</p>
          <div className="mt-4 mx-auto h-1.5 w-24 bg-primary rounded-full" />
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.imageId);
            return (
              <div key={member.name} className="flex flex-col items-center text-center group">
                 <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-primary">
                    {memberImage && (
                        <Image
                        src={memberImage.imageUrl}
                        alt={`Portrait of ${member.name}`}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        quality={85}
                        data-ai-hint={memberImage.imageHint}
                        />
                    )}
                </div>
                <div className="flex flex-col flex-grow mt-4 w-full">
                    <div>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-primary font-medium">{member.role}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1 text-muted-foreground mt-auto">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{member.location}</span>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
