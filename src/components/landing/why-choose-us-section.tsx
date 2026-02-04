export function WhyChooseUsSection() {
    const commonProblems = [
      {
        title: 'No Vetting or Quality Control',
        description: 'You’re responsible for interviews, skill testing, and background checks — and mistakes cost time and money.',
      },
      {
        title: 'High Turnover Risk',
        description: 'Freelancers can disappear, quit suddenly, or take on other clients — leaving your business exposed.',
      },
      {
        title: 'No Backup Support',
        description: 'If your VA leaves, you start over from scratch.',
      },
      {
        title: 'Hidden Management Costs',
        description: 'Training, onboarding, equipment, payroll, and oversight all fall on you.',
      },
      {
        title: 'Inconsistent Performance',
        description: 'No accountability system. No performance tracking. No structured support.',
      },
      {
        title: 'Security & Data Risk',
        description: 'Many freelancers lack proper security training, NDAs, and data handling procedures.',
      },
    ];

    const corbinSolutions = [
       {
        title: 'Pre-Vetted Talent',
        description: 'We don’t send random applicants. Every candidate is skill-tested, interviewed, and background-checked so you get reliable professionals from day one.',
      },
      {
        title: 'Faster Hiring',
        description: 'Skip weeks or months of searching, interviewing, and trial-and-error. We match you with qualified staff quickly.',
      },
      {
        title: 'Scalable Teams',
        description: 'Need to grow fast? Add more staff without restarting the hiring process.',
      },
      {
        title: 'Managed Payroll & Compliance',
        description: 'We handle payroll, HR administration, and local compliance and regulations — so you can focus on your business.',
      },
      {
        title: 'Proven Offshore Office Experience',
        description: 'Our team was built by founders who successfully scaled large overseas teams, we know what works.',
      },
      {
        title: 'Guaranteed Replacements',
        description: 'If someone isn’t the right fit, we replace them at no extra cost. No downtime. No stress.',
      },
    ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Corbin Staffing?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The difference between hiring freelancers and partnering with us is clear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          <div className="space-y-6 rounded-xl border-2 border-destructive/20 p-8 bg-card shadow-md">
            <h3 className="text-2xl font-bold text-destructive">Common Problems</h3>
            <ul className="space-y-6">
              {commonProblems.map((problem) => (
                <li key={problem.title} className="flex gap-4 items-start">
                  <span className="text-2xl pt-1">❌</span>
                  <div>
                    <h4 className="font-semibold">{problem.title}</h4>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 rounded-xl border-2 border-primary/20 p-8 bg-card shadow-md">
            <h3 className="text-2xl font-bold text-primary">Corbin Staffing Solutions</h3>
            <ul className="space-y-6">
              {corbinSolutions.map((solution) => (
                <li key={solution.title} className="flex gap-4 items-start">
                  <span className="text-2xl pt-1">✔</span>
                  <div>
                    <h4 className="font-semibold">{solution.title}</h4>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
