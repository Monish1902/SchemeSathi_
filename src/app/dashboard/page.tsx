'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { schemes, applications } from '@/lib/data';
import {
  FileText,
  GanttChart,
} from 'lucide-react';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { getUserProfile } from '@/lib/user-profile-service';
import type { FormSchemaType } from '@/components/eligibility-form';


export default function Dashboard() {
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
  }, []);

  useEffect(() => {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.displayName?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-muted-foreground">Here is a quick overview of your profile and schemes.</p>
      </div>

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
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">Click to view status</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
