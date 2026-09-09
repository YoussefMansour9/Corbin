import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoleCard } from "@/lib/vertical-page-data";

interface VerticalRolesProps {
  headline: string;
  cards: RoleCard[];
  closingLine: string;
}

export function VerticalRoles({ headline, cards, closingLine }: VerticalRolesProps) {
  return (
    <section id="roles" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
          {headline}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {cards.map((role, index) => (
            <Card key={index} className="flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                {role.tools && (
                  <Badge variant="secondary" className="w-fit mt-2">
                    {role.tools}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {role.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center italic text-muted-foreground mt-8 text-lg">
          {closingLine}
        </p>
      </div>
    </section>
  );
}
