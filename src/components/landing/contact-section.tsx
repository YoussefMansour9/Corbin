import { ContactForm } from '@/components/landing/contact-form';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hiring Form</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                Fill out the form below and we’ll be in touch within 24 hours to help you find your next great hire.
                </p>
            </div>
            <ContactForm />
            <div className="mt-12 text-center text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Have Any Questions or Need Help?</h3>
                <p className="mt-2">
                Need help with a job description? <a href="mailto:Info@corbinstaffing.com" className="text-primary font-medium hover:underline">Contact Us</a> and we'll be happy to assist.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
