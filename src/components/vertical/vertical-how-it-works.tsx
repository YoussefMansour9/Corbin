import { HowItWorksStep } from "@/lib/vertical-page-data";
import React from "react";

interface VerticalHowItWorksProps {
  headline: string;
  steps: HowItWorksStep[];
}

export function VerticalHowItWorks({ headline, steps }: VerticalHowItWorksProps) {
  return (
    <section id="how-it-works-vertical" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-16">
          {headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="absolute -top-10 md:-top-14 text-8xl md:text-9xl font-extrabold text-primary/10 select-none z-0">
                {step.number}
              </div>
              <div className="relative z-10 bg-primary text-primary-foreground w-full max-w-xs h-32 flex items-center justify-center rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold">{step.title}</h3>
              </div>
              <div className="relative z-20 mt-8">
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
