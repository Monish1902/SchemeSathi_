
'use client';

import { SchemeCard } from '@/components/scheme-card';
import { Input } from '@/components/ui/input';
import { schemes } from '@/lib/data';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function AllSchemesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = useMemo(() => {
    if (!searchQuery) {
      return schemes;
    }
    return schemes.filter(
      (scheme) =>
        scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Schemes</h1>
          <p className="text-muted-foreground">
            Browse and search all available government schemes.
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or keyword..."
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredSchemes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No schemes found matching your search.</p>
        </div>
      )}
    </div>
  );
}
