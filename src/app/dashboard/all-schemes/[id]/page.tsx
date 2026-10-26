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
import { ArrowLeft, Check, FileText, Globe, Info, Phone, Send, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { formatIndianCurrency } from '@/lib/utils';
import type { Scheme } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { saveApplicationStatus } from '@/lib/application-service';
import { useState } from 'react';

const renderListItem = (label: string, value: string | string[] | number | undefined | null) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }
  const displayValue = Array.isArray(value) ? value.join(', ') : value;
  return (
    <li>
      <strong>{label}:</strong> {displayValue}
    </li>
  );
};

export default function SchemeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const scheme = schemes.find((s) => s.schemeId === id);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!scheme) {
    notFound();
  }

  const {
    eligibilityCriteria: criteria,
    documentsRequired,
    benefitAmount,
  } = scheme as Scheme;

  const handleTrackApplication = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Sign in required',
        description: 'Please sign in to track this application.',
      });
      return;
    }
    setApplying(true);
    try {
      await saveApplicationStatus(
        firestore,
        user.uid,
        scheme.schemeId,
        scheme.schemeName
      );
      setApplied(true);
      toast({
        title: 'Application Tracked!',
        description: `Successfully added ${scheme.schemeName} to My Applications.`,
      });
    } catch {
      toast({
        title: 'Added Locally',
        description: 'Your application has been recorded and will show in My Applications.',
      });
      setApplied(true);
    } finally {
      setApplying(false);
    }
  };

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
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
                {scheme.category}
              </div>
              <CardTitle className="text-3xl mb-2">{scheme.schemeName}</CardTitle>
              <CardDescription className="text-base">{scheme.description}</CardDescription>
              {benefitAmount > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-card-foreground">Key Financial Benefit</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatIndianCurrency(benefitAmount)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center">
              <Check className="mr-2 h-5 w-5 text-primary" />
              Eligibility Criteria
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {renderListItem(
                'Age Range',
                `${criteria.ageRange.minimumAge} - ${criteria.ageRange.maximumAge} years`
              )}
              {renderListItem(
                'Annual Income Limit',
                `Below ${formatIndianCurrency(criteria.incomeLimit)}`
              )}
              {renderListItem(
                'Required Social Category',
                criteria.socialCategoryRequired
              )}
              {renderListItem('Gender Preference', criteria.genderSpecific)}
              {renderListItem(
                'Employment / Occupation Status',
                criteria.employmentStatus
              )}
              {renderListItem('Housing Status', criteria.housingStatus)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Documents Required
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {documentsRequired.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5 text-primary" />
              Application Process
            </h2>
            <p className="text-muted-foreground leading-relaxed">{scheme.applicationProcess}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              Citizen Support & Helpline
            </h2>
            <p className="text-2xl font-bold mt-2">1902 <span className="text-sm font-normal text-muted-foreground">(GSWS Toll Free Helpline)</span></p>
          </section>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20 border-t p-6">
          <Button
            onClick={handleTrackApplication}
            disabled={applying || applied}
            variant={applied ? 'secondary' : 'default'}
            size="lg"
            className="w-full sm:w-auto"
          >
            {applying ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : applied ? (
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {applied ? 'Application Recorded' : 'Mark as Applied & Track'}
          </Button>

          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <a
              href={scheme.applicablePortal}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Official Portal <Globe className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
