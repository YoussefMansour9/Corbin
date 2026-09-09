import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { CostRow } from "@/lib/vertical-page-data";
import { cn } from "@/lib/utils";

interface VerticalCostComparisonProps {
  headline: string;
  rows: CostRow[];
  localColumnHeader: string;
  corbinColumnHeader: string;
  closingLine: string;
}

export function VerticalCostComparison({
  headline,
  rows,
  localColumnHeader,
  corbinColumnHeader,
  closingLine,
}: VerticalCostComparisonProps) {
  return (
    <section id="cost-comparison" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          {headline}
        </h2>
        
        {/* Desktop Layout */}
        <div className="hidden md:block rounded-xl border bg-background overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[30%] text-lg font-semibold py-6">Category</TableHead>
                <TableHead className="w-[35%] text-lg font-semibold py-6">{localColumnHeader}</TableHead>
                <TableHead className="w-[35%] text-lg font-semibold py-6 text-primary">{corbinColumnHeader}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-base py-4">{row.label}</TableCell>
                  <TableCell className={cn("text-base py-4", row.localIsNegative ? "text-destructive" : "text-foreground")}>
                    <div className="flex items-center gap-2">
                      {row.localIsNegative ? <X className="h-5 w-5 text-destructive" /> : null}
                      <span className={cn(i === 0 && "text-2xl font-bold")}>{row.local}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-base py-4 text-primary font-semibold bg-primary/5">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span className={cn(i === 0 && "text-2xl font-bold")}>{row.corbin}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          <Card className="border-destructive/20 shadow-sm">
            <CardHeader className="bg-destructive/5 rounded-t-xl pb-4">
              <CardTitle className="text-xl text-center">{localColumnHeader}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {rows.map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-border/50 last:border-0 pb-4 last:pb-0">
                  <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
                  <div className="flex items-center gap-2 text-destructive">
                    {row.localIsNegative && <X className="h-4 w-4" />}
                    <span className={cn(i === 0 ? "text-2xl font-bold" : "text-base font-semibold")}>
                      {row.local}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-sm bg-primary/5">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-xl pb-4">
              <CardTitle className="text-xl text-center">{corbinColumnHeader}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {rows.map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-primary/10 last:border-0 pb-4 last:pb-0">
                  <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Check className="h-4 w-4" />
                    <span className={cn(i === 0 ? "text-2xl font-bold" : "text-base")}>
                      {row.corbin}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-xl font-semibold mt-12 text-foreground">
          {closingLine}
        </p>
      </div>
    </section>
  );
}
