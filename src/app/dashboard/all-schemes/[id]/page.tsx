
'use client';

import { schemes } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, FileText, Globe, Info, Phone } from 'lucide-react';
import Link from 'next/link';
import { formatIndianCurrency } from '@/lib/utils';
import type { Scheme } from '@/lib/types';

// Helper function to render a list item if the value exists
const renderListItem = (label: string, value: string | string[] | number | undefined | null) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }
  const displayValue = Array.isArray(value) ? value.join(', ') : value;
  return <li><strong>{label}:</strong> {displayValue}</li>;
};

export default function SchemeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const scheme = schemes.find((s) => s.schemeId === id);

  if (!scheme) {
    notFound();
  }

  const {
    eligibilityCriteria: criteria,
    documentsRequired,
    benefitAmount
  } = scheme as Scheme;


  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" asChild>
          <Link href="/dashboard/all-schemes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Schemes
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-3xl mb-2">{scheme.schemeName}</CardTitle>
              <CardDescription>{scheme.description}</CardDescription>
               {benefitAmount > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-semibold text-card-foreground">Key Benefit</p>
                    <p className="text-3xl font-bold text-primary">{formatIndianCurrency(benefitAmount)}</p>
                </div>
               )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Eligibility Criteria</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {renderListItem('Age Range', `${criteria.ageRange.minimumAge} - ${criteria.ageRange.maximumAge} years`)}
              {renderListItem('Annual Income Limit', `Below ${formatIndianCurrency(criteria.incomeLimit)}`)}
              {renderListItem('Required Social Category', criteria.socialCategoryRequired)}
              {renderListItem('Gender', criteria.genderSpecific)}
              {renderListItem('Required Employment Status', criteria.employmentStatus)}
              {renderListItem('Housing Status', criteria.housingStatus)}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />Documents Required</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {documentsRequired.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Info className="mr-2 h-5 w-5 text-primary" />Application Process</h2>
            <p className="text-muted-foreground">{scheme.applicationProcess}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Phone className="mr-2 h-5 w-5 text-primary" />Support</h2>
            <p className="text-muted-foreground">For any questions, you can call the AP Government's general helpline.</p>
            <p className="text-2xl font-bold mt-2">1902</p>
          </section>
        </CardContent>
         <CardFooter className="justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 mt-4 md:mt-0">
              <a href={scheme.applicablePortal} target="_blank" rel="noopener noreferrer">
                I'm interested <Globe className="ml-2 h-4 w-4" />
              </a>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
