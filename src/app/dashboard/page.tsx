import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { applications, schemes } from '@/lib/data';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { SchemeCard } from '@/components/scheme-card';

export default function Dashboard() {
  const recommendedSchemes = schemes.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to SchemeSathi</h1>
          <p className="text-muted-foreground">Your personalized guide to government schemes.</p>
        </div>
        <Button asChild className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/dashboard/eligibility">
            <PlusCircle className="mr-2 h-4 w-4" />
            Check Eligibility Now
          </Link>
        </Button>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Button variant="link" asChild>
            <Link href="/dashboard/schemes">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendedSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>
    </div>
  );
}
