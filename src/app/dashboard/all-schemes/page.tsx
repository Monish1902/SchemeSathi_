'use client';

import { SchemeCard } from '@/components/scheme-card';
import { schemes } from '@/lib/data';

export default function AllSchemesPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">All Schemes</h1>
        <p className="text-muted-foreground">Browse all available government schemes.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}
