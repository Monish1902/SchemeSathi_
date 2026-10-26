
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

    return schemes.filter((scheme) => {
      const { eligibilityCriteria: crit } = scheme;
      if (!crit) return true;

      // 1. Universal Schemes (e.g., Healthcare)
      if (scheme.category === 'Health') {
        if (crit.incomeLimit && profile.annualIncome && profile.annualIncome > crit.incomeLimit) {
          return false;
        }
        return true;
      }

      // 2. Age check
      if (profile.age && crit.ageRange) {
        if (profile.age < crit.ageRange.minimumAge || profile.age > crit.ageRange.maximumAge) {
          return false;
        }
      }

      // 3. Gender check
      if (crit.genderSpecific && crit.genderSpecific !== 'all') {
        if (profile.gender && profile.gender.toLowerCase() !== crit.genderSpecific.toLowerCase()) {
          return false;
        }
      }

      // 4. Disability requirement
      if (crit.disabilityRequired) {
        if (!profile.disability) {
          return false;
        }
      }

      // 5. Social Category requirement
      if (crit.socialCategoryRequired && crit.socialCategoryRequired.length > 0) {
        if (profile.category && !crit.socialCategoryRequired.includes(profile.category)) {
          return false;
        }
      }

      // 6. Annual Income limit
      if (crit.incomeLimit && profile.annualIncome) {
        if (profile.annualIncome > crit.incomeLimit) {
          return false;
        }
      }

      // 7. Housing Status requirement
      if (crit.housingStatus && crit.housingStatus.length > 0) {
        if (profile.houseType && !crit.housingStatus.includes(profile.houseType)) {
          return false;
        }
      }

      // 8. Occupation / Employment Status requirement
      if (crit.employmentStatus && crit.employmentStatus.length > 0) {
        if (profile.occupation && !crit.employmentStatus.includes(profile.occupation)) {
          return false;
        }
      }

      return true;
    });
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
