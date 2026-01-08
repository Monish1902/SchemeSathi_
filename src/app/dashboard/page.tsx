
'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.displayName?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-muted-foreground">
          Here is a quick overview of your profile and schemes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              View Your Schemes
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See a list of schemes you may be eligible for based on your
              profile.
            </p>
          </div>
          <Button asChild className="mt-4 w-fit bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/dashboard/schemes">
              Go to My Schemes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col justify-between rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight">
              Track Your Applications
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check the status of all your submitted scheme applications.
            </p>
          </div>
          <Button asChild className="mt-4 w-fit bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/dashboard/applications">
              Go to My Applications <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
