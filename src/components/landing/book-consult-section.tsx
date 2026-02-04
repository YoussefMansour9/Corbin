import { BookConsultForm } from '@/components/landing/book-consult-form';

export function BookConsultSection() {
  return (
    <section id="book-consult" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Book a Consult</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                Fill out the form below and we’ll be in touch to schedule your consultation.
                </p>
            </div>
            <BookConsultForm />
        </div>
      </div>
    </section>
  );
}
