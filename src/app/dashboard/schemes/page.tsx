
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { schemes } from '@/lib/data';
import { Lightbulb, ArrowRight, FileText } from 'lucide-react';
import { SchemeCard } from '@/components/scheme-card';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserProfile } from '@/lib/user-profile-service';
import type { FormSchemaType } from '@/components/eligibility-form';

export default function MySchemesPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [profile, setProfile] = useState<FormSchemaType | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user && firestore) {
        const userProfile = await getUserProfile(firestore, user.uid);
        setProfile(userProfile);
      }
    }
    fetchProfile();
  }, [user, firestore]);
  
  const recommendedSchemes = useMemo(() => {
    if (!profile) {
      return [];
    }

    let additionalSchemes: string[] = [];

    // Occupation-based schemes
    if (profile.occupation) {
      switch (profile.occupation) {
        case 'farmer':
          additionalSchemes.push('Annadata Sukhibhava Scheme', 'Rythu Bharosa Scheme');
          break;
        case 'student':
          additionalSchemes.push('Dokka Seethamma Midday Meal Scheme (PM POSHAN)', 'AP Skill Development Schemes (APSSDC & PMKVY)', 'Thalliki Vandanam Scheme', 'Jagananna Vidya Deevena');
          break;
        case 'driver':
            additionalSchemes.push('YSR Vahana Mitra Scheme (Auto Driver Sevalo)');
            break;
        case 'unemployed':
            additionalSchemes.push('AP Skill Development Schemes (APSSDC & PMKVY)');
            break;
        default:
          break;
      }
    }
    
    // Gender-based schemes
    if (profile.gender === 'female') {
        additionalSchemes.push('Aadabidda Nidhi Scheme', 'YSR Cheyutha Scheme');
    }

    // Combined Gender and Category schemes
    if (profile.gender === 'female' && (profile.category === 'BC' || profile.category === 'General')) {
        additionalSchemes.push('YSR Kapu Nestham');
    }

    // Always include the universal health scheme
    const universalSchemes = ['Dr. NTR Vaidya Seva Scheme'];

    const allRecommendedSchemeNames = Array.from(new Set([
      ...additionalSchemes,
      ...universalSchemes,
    ]));

    return schemes.filter(scheme =>
      allRecommendedSchemeNames.includes(scheme.schemeName)
    );
  }, [profile]);


  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-2">
        <Card className='hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
          <Link href="/dashboard/schemes">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eligible Schemes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recommendedSchemes.length}</div>
              <p className="text-xs text-muted-foreground">Based on your profile. Click to view.</p>
            </CardContent>
          </Link>
        </Card>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Eligible Schemes</h1>
        <p className="text-muted-foreground">
          A list of government schemes you may be eligible for based on your profile.
        </p>
      </div>
        {recommendedSchemes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedSchemes.map((scheme) => (
                <SchemeCard key={scheme.schemeId} scheme={scheme} />
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
                        <Link href="/dashboard/eligibility">
                            Go to My Profile <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
