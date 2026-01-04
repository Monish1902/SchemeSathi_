'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { schemes } from '@/lib/data';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { SchemeCard } from '@/components/scheme-card';
import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MySchemesPage() {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<RecommendSchemesOutput | null>(null);

  useEffect(() => {
    try {
      const savedRecs = localStorage.getItem('schemeRecommendations');
      if (savedRecs) {
        setRecommendations(JSON.parse(savedRecs));
      }
    } catch (error) {
      console.error("Could not load recommendations from localStorage", error);
    }
  }, []);
  
  const recommendedSchemes = recommendations
    ? schemes.filter(scheme => 
        recommendations.some(rec => rec.schemeName === scheme.name)
      )
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Recommended Schemes</h1>
        <p className="text-muted-foreground">
          A list of government schemes recommended for you based on your profile.
        </p>
      </div>
        {recommendedSchemes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
            </div>
        ) : (
            <Card className="flex flex-col items-center justify-center text-center p-12">
                <CardHeader>
                    <div className="mx-auto bg-secondary p-3 rounded-full">
                        <Lightbulb className="h-8 w-8 text-muted-foreground" />
                    </div>
                  <CardTitle>No Recommendations Yet</CardTitle>
                  <CardDescription>
                    Complete your profile to get personalized scheme recommendations from our AI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/dashboard/profile">
                            Go to My Profile <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
