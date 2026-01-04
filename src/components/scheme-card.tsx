import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scheme } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

// A simple function to extract a monetary value from the benefits string.
// This is a basic implementation and might need to be more robust.
const getBenefitAmount = (benefits: string): string | null => {
    const match = benefits.match(/₹[0-9,]+/);
    return match ? match[0] : null;
}


export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const benefitAmount = getBenefitAmount(scheme.benefits);
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle className="text-lg">{scheme.name}</CardTitle>
          <p className="text-xs text-muted-foreground">ID: {scheme.id}</p>
        </CardHeader>
        <CardContent>
          <CardDescription>{scheme.description}</CardDescription>
           {benefitAmount && (
            <div className="mt-4">
                <p className="text-sm font-semibold text-card-foreground">Benefit Amount</p>
                <p className="text-2xl font-bold text-primary">{benefitAmount}</p>
            </div>
           )}
        </CardContent>
      </div>
      <CardFooter>
        <Button variant="link" asChild className="w-full justify-end text-accent-foreground hover:text-accent-foreground/80 p-0">
          <a href={scheme.applyLink}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
