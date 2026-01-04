import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scheme } from '@/lib/types';
import { ArrowRight, Briefcase, IndianRupee, School } from 'lucide-react';

const categoryIcons = {
  Education: <School className="h-4 w-4" />,
  Health: <Briefcase className="h-4 w-4" />,
  Finance: <IndianRupee className="h-4 w-4" />,
  Housing: <Briefcase className="h-4 w-4" />,
  Employment: <Briefcase className="h-4 w-4" />,
};

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{scheme.name}</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-2">
            {categoryIcons[scheme.category]}
            {scheme.category}
          </Badge>
        </div>
        <CardDescription className="pt-2">{scheme.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="mb-2 font-semibold text-sm">Key Benefits:</h4>
        <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <a href={scheme.applyLink}>
            Learn More & Apply <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
