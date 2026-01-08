import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Scheme } from '@/lib/types';
import { formatIndianCurrency } from '@/lib/utils';
import { ArrowRight, Briefcase, GraduationCap, Heart, House, Leaf, PiggyBank, User, Handshake, Tractor, PersonStanding, Fish } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';

// A simple function to extract a monetary value from the benefits string.
// This is a basic implementation and might need to be more robust.
const getBenefitAmount = (benefits: string): number | null => {
    const match = benefits.match(/₹?([0-9,]+)/);
    if (!match) return null;
    const amount = parseInt(match[1].replace(/,/g, ''), 10);
    return isNaN(amount) ? null : amount;
}

const categoryIcons: { [key in Scheme['category']]: React.ReactNode } = {
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

const getCategoryIcon = (category: Scheme['category']) => {
  return categoryIcons[category] || null;
}


export function SchemeCard({ scheme }: { scheme: Scheme }) {
  const benefitAmount = getBenefitAmount(scheme.benefits);
  return (
    <Card className="flex h-full flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{scheme.name}</CardTitle>
            <Badge variant="secondary" className="flex items-center shrink-0">
              {getCategoryIcon(scheme.category)}
              {scheme.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground pt-1">ID: {scheme.id}</p>
        </CardHeader>
        <CardContent>
          <CardDescription>{scheme.description}</CardDescription>
           {benefitAmount !== null && (
            <div className="mt-4">
                <p className="text-sm font-semibold text-card-foreground">Key Benefit</p>
                <p className="text-2xl font-bold text-primary">{formatIndianCurrency(benefitAmount)}</p>
            </div>
           )}
        </CardContent>
      </div>
      <CardFooter>
        <Button variant="link" asChild className="w-full justify-end text-primary p-0 group">
          <Link href={`/dashboard/all-schemes/${scheme.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
