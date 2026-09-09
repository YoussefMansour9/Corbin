import { Card, CardContent } from "@/components/ui/card";
import { PhoneOff, FileWarning, DollarSign } from "lucide-react";
import { PainPoint } from "@/lib/vertical-page-data";
import React from "react";

interface VerticalProblemProps {
  headline: string;
  body: string;
  painPoints: PainPoint[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  PhoneOff,
  FileWarning,
  DollarSign,
};

export function VerticalProblem({ headline, body, painPoints }: VerticalProblemProps) {
  return (
    <section id="problem" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
          {headline}
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-muted-foreground mt-4">
          {body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {painPoints.map((point, index) => {
            const Icon = iconMap[point.icon];
            return (
              <Card key={index} className="p-6 text-center border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {Icon && <Icon className="h-8 w-8 text-primary mx-auto" />}
                  <div className="text-4xl md:text-5xl font-extrabold text-primary mt-4">
                    {point.stat}
                  </div>
                  <h3 className="text-xl font-semibold mt-2 text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
