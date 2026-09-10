'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface Location {
  title: string;
  videoUrl: string;
  /**
   * Real office photos. Drop files in /public/images/offices and list them
   * here; the gallery below renders automatically once the array is filled.
   */
  photos?: { src: string; alt: string }[];
}

const locations: Location[] = [
  { title: 'Antique, Philippines 1', videoUrl: '/videos/location-1.mp4', photos: [] },
  { title: 'Antique, Philippines 2', videoUrl: '/videos/location-2.mp4', photos: [] },
];

export function LocationsSection() {
  return (
    <section id="locations" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Locations</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Take a virtual tour of our modern and collaborative office spaces.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-primary" />
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {locations.map((location) => (
            <Card key={location.title} className="overflow-hidden rounded-2xl shadow-lg">
              <CardContent className="p-0">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  src={location.videoUrl}
                  className="aspect-video w-full bg-muted object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </CardContent>

              <div className="p-6">
                <h2 className="text-xl font-bold">{location.title}</h2>

                {location.photos && location.photos.length > 0 && (
                  <ul className="mt-4 grid grid-cols-3 gap-3">
                    {location.photos.map((photo) => (
                      <li key={photo.src} className="relative aspect-square overflow-hidden rounded-lg border">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 30vw, 15vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
