import { GraduationCap, User, Headset } from 'lucide-react';

const steps = [
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: 'Tell Us',
    number: '1',
    description: 'Share the role, schedule, skills, and software you need.',
  },
  {
    icon: <User className="w-8 h-8 text-primary" />,
    title: 'Meet Candidates',
    number: '2',
    description:
      'We recruit, screen, and record interviews for your review. Choose the best candidates and hire right away, or run your own interview if you prefer.',
  },
  {
    icon: <Headset className="w-8 h-8 text-primary" />,
    title: 'Choose Your Hire',
    number: '3',
    description: 'Interview your favorites and select the right fit.',
  },
];

/** `asPageHeading` promotes the section title to <h1> on the standalone /how-it-works page. */
export function HowItWorksSection({ asPageHeading = false }: { asPageHeading?: boolean }) {
  const Heading = asPageHeading ? 'h1' : 'h2';
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <Heading className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps from telling us what you need to your new hire starting.
          </p>
          <div className="mt-4 mx-auto h-1.5 w-24 bg-primary rounded-full" />
        </div>
        <div className="relative grid max-w-5xl mx-auto md:grid-cols-3 gap-8 md:gap-16 justify-items-center">
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="absolute -top-8 md:-top-12 text-8xl md:text-9xl font-extrabold text-gray-100 dark:text-gray-800 select-none z-0">
                {step.number}
              </div>
              <div className="relative z-10 bg-primary text-primary-foreground w-full max-w-xs h-28 flex items-center justify-center rounded-2xl shadow-lg">
                <h3 className="text-3xl font-bold">{step.title}</h3>
              </div>
              <div className="relative z-20 mt-[-2rem] bg-background p-4 rounded-full shadow-md border-4 border-background">
                {step.icon}
              </div>
              <p className="mt-4 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
