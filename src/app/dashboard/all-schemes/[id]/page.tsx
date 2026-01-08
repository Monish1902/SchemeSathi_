
'use client';

import { schemes } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, FileText, Globe, Send } from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore } from '@/firebase';
import { saveApplicationStatus } from '@/lib/application-service';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label }from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { formatIndianCurrency } from '@/lib/utils';

const getBenefitAmount = (benefits: string): number | null => {
    const match = benefits.match(/₹?([0-9,]+)/);
    if (!match) return null;
    const amount = parseInt(match[1].replace(/,/g, ''), 10);
    return isNaN(amount) ? null : amount;
}

export default function SchemeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const scheme = schemes.find((s) => s.id === id);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [hasApplied, setHasApplied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!scheme) {
    notFound();
  }

  const benefitAmount = getBenefitAmount(scheme.benefits);

  const handleSaveStatus = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Not signed in',
        description: 'You must be signed in to save your application status.',
      });
      return;
    }

    if (!hasApplied) {
        toast({
            variant: 'destructive',
            title: 'Confirmation needed',
            description: 'Please check the box to confirm you have applied.',
        });
        return;
    }

    setIsSaving(true);
    try {
        await saveApplicationStatus(firestore, user.uid, scheme.id, scheme.name);
        toast({
            title: 'Status Saved!',
            description: `Your application for ${scheme.name} has been marked as 'Submitted'.`,
        });
    } catch (error) {
        console.error('Error saving application status:', error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem saving your application status.',
        });
    } finally {
        setIsSaving(false);
    }
  }

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
              <CardTitle className="text-3xl mb-2">{scheme.name}</CardTitle>
              <CardDescription>{scheme.description}</CardDescription>
               {benefitAmount !== null && (
                <div className="mt-4">
                    <p className="text-sm font-semibold text-card-foreground">Key Benefit</p>
                    <p className="text-3xl font-bold text-primary">{formatIndianCurrency(benefitAmount)}</p>
                </div>
               )}
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 mt-4 md:mt-0">
              <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                Know More <Globe className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Check className="mr-2 h-5 w-5 text-primary" />Eligibility Criteria</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {scheme.eligibilityCriteria.map((criterion, index) => (
                <li key={index}>{criterion}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />Documents Required</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {scheme.documentsRequired.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Send className="mr-2 h-5 w-5 text-primary" />How to Apply</h2>
            <p className="text-muted-foreground whitespace-pre-line">{scheme.applicationProcess}</p>
          </section>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Track Your Application</CardTitle>
            <CardDescription>
                After you have completed the application on the scheme's official website, confirm it here to track its status.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={hasApplied} onCheckedChange={(checked) => setHasApplied(!!checked)} />
                <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I confirm that I have successfully submitted my application for this scheme.
                </Label>
            </div>
             <Button onClick={handleSaveStatus} disabled={isSaving || !hasApplied}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Application Status'
              )}
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
