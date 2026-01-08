
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
import type { Application } from '@/lib/types';
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query } from 'firebase/firestore';


export default function MySchemesPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [recommendations, setRecommendations] = useState<RecommendSchemesOutput | null>(null);
  const [profile, setProfile] = useState<FormSchemaType | null>(null);

  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'applicationStatuses'));
  }, [firestore, user]);

  const { data: applications, isLoading: isLoadingApplications } = useCollection<Application>(applicationsQuery);

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

    // 1. Get scheme names from AI recommendations
    const aiRecommendedSchemeNames = recommendations
      ? recommendations.map(rec => rec.schemeName)
      : [];
    
    // 2. Rule-based eligibility check
    const ruleBasedSchemes = schemes.filter(scheme => {
        // Always include universal health scheme
        if (scheme.id === 'dr-ntr-vaidya-seva') {
            return true;
        }

        // Aadabidda Nidhi Scheme
        if (scheme.id === 'aadabidda-nidhi') {
            if (profile.gender === 'female' && profile.age >= 18 && profile.age <= 59) {
                return true;
            }
        }
        
        // Annadata Sukhibhava Scheme
        if (scheme.id === 'annadata-sukhibhava') {
             if (profile.occupation === 'farmer' && profile.landHolding && !profile.landHolding.startsWith('>')) {
                return true;
            }
        }

        // YSR Vahana Mitra
        if (scheme.id === 'ysr-vahana-mitra') {
            if (profile.occupation === 'driver') {
                return true;
            }
        }

        // Thalliki Vandanam Scheme
        if (scheme.id === 'thalliki-vandanam') {
             if (profile.occupation === 'housewife' || (profile.gender === 'female' && profile.familySize > 1)) {
                 return true;
             }
        }

        // INDIRAMMA Housing Scheme
        if (scheme.id === 'indiramma-housing') {
            if (profile.houseType === 'rented' || profile.houseType === 'none') {
                return true;
            }
        }

        // AP Skill Development
        if (scheme.id === 'ap-skill-development') {
            if (profile.occupation === 'unemployed' || profile.occupation === 'student' && profile.age >= 18 && profile.age <= 35) {
                return true;
            }
        }
        
        // YSR Cheyutha
        if (scheme.id === 'ysr-cheyutha') {
            if (profile.gender === 'female' && profile.age >= 45 && profile.age <= 60 && ['SC', 'ST', 'BC', 'Minority'].includes(profile.category)) {
                return true;
            }
        }

        // Rythu Bharosa
        if (scheme.id === 'rythu-bharosa') {
            if (profile.occupation === 'farmer') {
                return true;
            }
        }

        // YSR Kapu Nestham
        if (scheme.id === 'ysr-kapu-nestham') {
             if (profile.gender === 'female' && profile.age >= 45 && profile.age <= 60 && profile.category === 'General') { // Assuming Kapu falls under general for this logic
                return true;
            }
        }

        // NTR Bharosa Pension Scheme
        if (scheme.id === 'ntr-bharosa-pension') {
            if (profile.age >= 60) {
                return true;
            }
        }

        return false;
    }).map(s => s.name);


    // 3. Combine and deduplicate scheme names
    const allRecommendedSchemeNames = Array.from(new Set([
      ...ruleBasedSchemes, 
      ...aiRecommendedSchemeNames,
    ]));

    // 4. Filter the main schemes list to get the final scheme objects
    return schemes.filter(scheme =>
      allRecommendedSchemeNames.includes(scheme.name)
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
