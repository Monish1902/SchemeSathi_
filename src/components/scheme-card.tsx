
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scheme } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/utils';
import { ArrowRight, Briefcase, GraduationCap, Heart, House, Leaf, PiggyBank, User, Handshake, Tractor, PersonStanding, Fish } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';

// A simple function to get the icon for a category.
const getCategoryIcon = (category: string): React.ReactNode => {
  const categoryIcons: { [key: string]: React.ReactNode } = {
    Women: <User className="h-4 w-4 mr-2" />,
    Farmer: <Tractor className="h-4 w-4 mr-2" />,
    Driver: <PersonStanding className="h-4 w-4 mr-2" />,
    Student: <GraduationCap className="h-4 w-4 mr-2" />,
    Health: <Heart className="h-4 w-4 mr-2" />,
    Housing: <House className="h-4 w-4 mr-2" />,
    General: <Handshake className="h-4 w-4 mr-2" />,
    Employment: <Briefcase className="h-4 w-4 mr-2" />,
    Fisherman: <Fish className="h-4 w-4 mr-2" />,
  };
  return categoryIcons[category] || null;
}


export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const benefitAmount = scheme.benefitAmount;
  return (
    <Card className="flex h-full flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{scheme.schemeName}</CardTitle>
            <Badge variant="secondary" className="flex items-center shrink-0">
              {getCategoryIcon(scheme.category)}
              {scheme.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground pt-1">ID: {scheme.schemeId}</p>
        </CardHeader>
        <CardContent>
          <CardDescription>{scheme.description}</CardDescription>
           {benefitAmount > 0 && (
            <div className="mt-4">
                <p className="text-sm font-semibold text-card-foreground">Key Benefit</p>
                <p className="text-2xl font-bold text-primary">{formatIndianCurrency(benefitAmount)}</p>
            </div>
           )}
        </CardContent>
      </div>
      <CardFooter>
        <Button variant="link" asChild className="w-full justify-end text-primary p-0 group">
          <Link href={`/dashboard/all-schemes/${scheme.schemeId}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
