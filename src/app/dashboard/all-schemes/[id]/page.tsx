'use client';

import { schemes } from '@/lib/data';
import { notFound } from 'next/navigation';
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

export default function SchemeDetailPage({ params: { id } }: { params: { id: string } }) {
  const scheme = schemes.find((s) => s.id === id);

  if (!scheme) {
    notFound();
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
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                    Apply Now <Globe className="ml-2 h-4 w-4" />
                </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
            <section>
                <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Check className="mr-2 h-5 w-5 text-primary"/>Eligibility Criteria</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {scheme.eligibilityCriteria.map((criterion, index) => (
                        <li key={index}>{criterion}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><FileText className="mr-2 h-5 w-5 text-primary"/>Documents Required</h2>
                 <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {scheme.documentsRequired.map((doc, index) => (
                        <li key={index}>{doc}</li>
                    ))}
                </ul>
            </section>
             <section>
                <h2 className="text-xl font-semibold tracking-tight mb-4 flex items-center"><Send className="mr-2 h-5 w-5 text-primary"/>How to Apply</h2>
                <p className="text-muted-foreground whitespace-pre-line">{scheme.applicationProcess}</p>
            </section>
        </CardContent>
      </Card>
    </div>
  );
}
