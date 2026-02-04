import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about');

  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Corbin Staffing</h2>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              Corbin Staffing is a global outsourcing company. We recruit, train, and support highly skilled
              professionals in our offices, ensuring they deliver the same level of productivity and reliability as
              U.S.-based employees.
            </p>
            <p>
              Our mission is to provide motivated, high-quality talent while helping businesses significantly
              reduce operating costs.
            </p>
            <p>
              With a flexible and tailored approach, we source and vet professionals for nearly any industry,
              allowing our clients to scale efficiently and with confidence.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                loading="lazy"
                quality={85}
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
