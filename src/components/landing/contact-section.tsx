import { ContactForm } from '@/components/landing/contact-form';
import { PageHero } from '@/components/shared/page-hero';

export function ContactSection() {
  return (
    <>
      <PageHero
        eyebrow="Ready to Hire"
        headline="Ready to Hire"
        body="Tell us about the role in detail and we will start recruiting candidates built around it. We follow up within 24 hours."
      />

      <section id="contact" className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <ContactForm />

            <div className="mt-12 text-center text-muted-foreground">
              <h2 className="text-lg font-semibold text-foreground">Have Any Questions or Need Help?</h2>
              <p className="mt-2">
                Need help with a job description?{' '}
                <a
                  href="mailto:Info@corbinstaffing.com"
                  className="font-medium text-primary hover:underline"
                >
                  Contact us
                </a>{' '}
                and we'll be happy to assist.
              </p>
              <p className="mt-3 text-sm">
                Just exploring?{' '}
                <a href="/book-a-consult" className="font-medium text-primary hover:underline">
                  Book a free consultation
                </a>{' '}
                instead. It only takes five fields.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
