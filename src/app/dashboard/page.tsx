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
  ArrowRight,
  CheckCircle,
  FileText,
  GanttChart,
  Lightbulb,
} from 'lucide-react';
import { SchemeCard } from '@/components/scheme-card';
import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
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

  const approvedSchemesCount = applications.filter(
    (app) => app.status === 'Approved'
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.displayName?.split(' ')[0] || 'User'}!
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/schemes">
          <Card className='hover:border-primary transition-colors'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eligible Schemes
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recommendations?.length ?? 0}</div>
              <p className="text-xs text-muted-foreground">Based on your profile</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/applications">
          <Card className='hover:border-primary transition-colors'>
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
          </Card>
        </Link>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Schemes
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedSchemesCount}</div>
              <p className="text-xs text-muted-foreground">Ready to avail benefits</p>
            </CardContent>
          </Card>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recommended for You
          </h2>
          <Button variant="outline" asChild>
            <Link href="/dashboard/profile">
                Update Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
                            Go to My Profile
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        )}
      </section>
    </div>
  );
}
