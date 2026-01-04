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
} from 'lucide-react';
import { SchemeCard } from '@/components/scheme-card';
import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';

export default function Dashboard() {
  const { user } = useUser();
  const popularSchemes = schemes.slice(0, 3);
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eligible Schemes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendations?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">Click to view</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Applied Schemes
            </CardTitle>
            <GanttChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">Click to view</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Schemes
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedSchemesCount}</div>
            <p className="text-xs text-muted-foreground">Click to view</p>
          </CardContent>
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Popular Schemes
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>
    </div>
  );
}
