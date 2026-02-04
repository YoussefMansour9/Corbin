'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

const locations = [
  { title: 'Antique, Philippines 1', videoUrl: '/videos/location-1.mp4' },
  { title: 'Antique, Philippines 2', videoUrl: '/videos/location-2.mp4' },
];

export function LocationsSection() {
  return (
    <section id="locations" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Locations</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Take a virtual tour of our modern and collaborative office spaces.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {locations.map((location) => (
            <Card key={location.title} className="overflow-hidden rounded-lg shadow-lg group">
              <CardContent className="p-0 relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover:bg-black/10 transition-all pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="h-8 w-8 text-gray-900 ml-1" />
                  </div>
                </div>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  src={location.videoUrl}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-6 pointer-events-none">
                  <h3 className="text-2xl font-semibold text-white">{location.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
