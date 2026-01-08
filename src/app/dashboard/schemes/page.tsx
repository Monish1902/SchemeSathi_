
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { schemes } from '@/lib/data';
import { Lightbulb, ArrowRight, FileText, GanttChart } from 'lucide-react';
import { SchemeCard } from '@/components/scheme-card';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { useEffect, useState, useMemo } from 'react';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserProfile } from '@/lib/user-profile-service';
import type { FormSchemaType } from '@/components/eligibility-form';
import type { UserApplication } from '@/lib/types';
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query, where } from 'firebase/firestore';


export default function MySchemesPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [recommendations, setRecommendations] = useState<RecommendSchemesOutput | null>(null);
  const [profile, setProfile] = useState<FormSchemaType | null>(null);

  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'userApplications'), where('userId', '==', user.uid));
  }, [firestore, user]);

  const { data: applications, isLoading: isLoadingApplications } = useCollection<UserApplication>(applicationsQuery);

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
  
  const recommendedSchemes = useMemo(() => {
    if (!profile) {
      return [];
    }

    const aiRecommendedSchemeNames = recommendations
      ? recommendations.map(rec => rec.schemeName)
      : [];
    
    // This logic is now simplified as the full eligibility engine would be backend-driven
    // For now, we will rely on AI recommendations stored in localStorage
    const allRecommendedSchemeNames = Array.from(new Set([
      ...aiRecommendedSchemeNames,
    ]));

    return schemes.filter(scheme =>
      allRecommendedSchemeNames.includes(scheme.schemeName)
    );
  }, [profile, recommendations]);


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
        <Card className='hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
          <Link href="/dashboard/applications">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applied Schemes
              </CardTitle>
              <GanttChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoadingApplications ? '...' : (applications?.length ?? 0)}</div>
              <p className="text-xs text-muted-foreground">Click to view status</p>
            </CardContent>
          </Link>
        </Card>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Eligible Schemes</h1>
        <p className="text-muted-foreground">
          A list of government schemes you may be eligible for based on your profile and AI recommendations.
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
