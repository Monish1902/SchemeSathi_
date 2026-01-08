
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scheme } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/utils';
import { ArrowRight, Briefcase, FileText, GraduationCap, Handshake, Heart, House, Leaf, PersonStanding, PiggyBank, Tractor, User, Users, Wallet, Fish } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

// A simple function to get the icon for a category.
const getCategoryIcon = (category: string): React.ReactNode => {
  const categoryIcons: { [key: string]: React.ReactNode } = {
    Women: <User className="h-4 w-4" />,
    Farmer: <Tractor className="h-4 w-4" />,
    Driver: <PersonStanding className="h-4 w-4" />,
    Student: <GraduationCap className="h-4 w-4" />,
    Health: <Heart className="h-4 w-4" />,
    Housing: <House className="h-4 w-4" />,
    General: <Handshake className="h-4 w-4" />,
    Employment: <Briefcase className="h-4 w-4" />,
    Fisherman: <Fish className="h-4 w-4" />,
  };
  return categoryIcons[category] || <PiggyBank className="h-4 w-4" />;
}

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const { benefitAmount, eligibilityCriteria, documentsRequired } = scheme;

  return (
    <Card className="flex h-full flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-snug">{scheme.schemeName}</CardTitle>
          <Badge variant="secondary" className="flex items-center shrink-0">
            {getCategoryIcon(scheme.category)}
            <span className="ml-2">{scheme.category}</span>
          </Badge>
        </div>
        <CardDescription className="text-xs pt-1">{scheme.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {benefitAmount > 0 && (
          <div className="bg-primary/10 p-3 rounded-lg text-center">
              <p className="text-sm font-semibold text-primary/80">Key Benefit</p>
              <p className="text-2xl font-bold text-primary">{formatIndianCurrency(benefitAmount)}</p>
          </div>
        )}
        <Separator />
        <div className="space-y-3 text-sm">
            <h4 className="font-semibold text-card-foreground">Key Eligibility</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                {eligibilityCriteria.ageRange && <li>Age: {eligibilityCriteria.ageRange.minimumAge}-{eligibilityCriteria.ageRange.maximumAge} years</li>}
                {eligibilityCriteria.incomeLimit > 0 && <li>Max Income: {formatIndianCurrency(eligibilityCriteria.incomeLimit)}/year</li>}
            </ul>
             <h4 className="font-semibold text-card-foreground pt-2">Documents Needed</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                {documentsRequired.slice(0, 2).map((doc, index) => (
                    <li key={index}>{doc}</li>
                ))}
                {documentsRequired.length > 2 && <li>And more...</li>}
            </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full justify-center group">
          <Link href={`/dashboard/all-schemes/${scheme.schemeId}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
