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
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserProfile } from '@/lib/user-profile-service';
import type { FormSchemaType } from '@/components/eligibility-form';

export default function MySchemesPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [recommendations, setRecommendations] = useState<RecommendSchemesOutput | null>(null);
  const [profile, setProfile] = useState<FormSchemaType | null>(null);

  useEffect(() => {
    try {
      const savedRecs = localStorage.getItem('schemeRecommendations');
      if (savedRecs) {
        setRecommendations(JSON.parse(savedRecs));
      }
    } catch (error) {
      console.error("Could not load recommendations from localStorage", error);
    }

    async function fetchProfile() {
      if (user && firestore) {
        const userProfile = await getUserProfile(firestore, user.uid);
        setProfile(userProfile);
      }
    }
    fetchProfile();
  }, [user, firestore]);
  
  // Start with the two static schemes
  const staticRecommendedSchemeNames = [
    'Dr. NTR Vaidya Seva Scheme',
    'INDIRAMMA Housing Scheme'
  ];

  // Get scheme names from AI recommendations
  const aiRecommendedSchemeNames = recommendations
    ? recommendations.map(rec => rec.schemeName)
    : [];

  // Get scheme names based on occupation
  const occupationSchemeNames: string[] = [];
  if (profile?.occupation) {
    switch (profile.occupation) {
      case 'farmer':
        occupationSchemeNames.push('Annadata Sukhibhava Scheme', 'Rythu Bharosa Scheme');
        break;
      case 'student':
        occupationSchemeNames.push(
          'Dokka Seethamma Midday Meal Scheme (PM POSHAN)',
          'AP Skill Development Schemes (APSSDC & PMKVY)',
          'Thalliki Vandanam Scheme'
        );
        break;
      case 'driver':
        occupationSchemeNames.push('YSR Vahana Mitra Scheme (Auto Driver Sevalo)');
        break;
      case 'unemployed':
        occupationSchemeNames.push('AP Skill Development Schemes (APSSDC & PMKVY)');
        break;
    }
  }

  // Combine and deduplicate scheme names
  const allRecommendedSchemeNames = Array.from(new Set([
    ...staticRecommendedSchemeNames, 
    ...aiRecommendedSchemeNames,
    ...occupationSchemeNames,
  ]));

  // Filter the main schemes list to get the scheme objects
  const recommendedSchemes = schemes.filter(scheme =>
    allRecommendedSchemeNames.includes(scheme.name)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Eligible Schemes</h1>
        <p className="text-muted-foreground">
          A list of government schemes you may be eligible for based on your profile and AI recommendations.
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
                    Complete your profile to get personalized scheme recommendations.
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
