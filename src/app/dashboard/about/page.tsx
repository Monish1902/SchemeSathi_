
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/firebase';
import { ArrowRight, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const { user } = useUser();
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to SchemeSathi, {user?.displayName?.split(' ')[0] || 'User'}!</h1>
            <p className="mt-2 text-lg text-muted-foreground">
            Your trusted companion for navigating and accessing government schemes in India.
            </p>
        </div>

      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            SchemeSathi was created to simplify the complex world of government welfare programs. Millions of eligible citizens miss out on valuable benefits simply because they are unaware of the schemes available to them or find the application process too complicated. Our mission is to bridge this information gap using the power of AI, making it easier than ever for you to find and apply for the schemes you deserve.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Target className="h-8 w-8" />
                </div>
                <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm">
                    Our intelligent AI analyzes your profile to provide personalized scheme recommendations, ensuring you only see what's relevant to you.
                </p>
            </CardContent>
        </Card>
        <Card className="text-center">
            <CardHeader>
                 <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Zap className="h-8 w-8" />
                </div>
                <CardTitle>Simplified Process</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm">
                    We break down complex eligibility criteria and application steps into simple, easy-to-understand language.
                </p>
            </CardContent>
        </Card>
         <Card className="text-center">
            <CardHeader>
                 <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Users className="h-8 w-8" />
                </div>
                <CardTitle>Empowering Citizens</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-sm">
                    By providing access to information, we empower you to improve your life and secure your future with the right government support.
                </p>
            </CardContent>
        </Card>
      </div>

       <div className="text-center">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/dashboard/schemes">
                    Find My Schemes Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>

    </div>
  );
}
