'use client';

import { SchemeCard } from '@/components/scheme-card';
import { Input } from '@/components/ui/input';
import { schemes } from '@/lib/data';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';

const categories = [
  'All',
  'Farmer',
  'Women',
  'Student',
  'Employment',
  'Pension',
  'Housing',
  'Health',
  'Utility',
  'Driver',
  'Fisherman',
];

export default function AllSchemesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesCategory =
        selectedCategory === 'All' || scheme.category === selectedCategory;

      const matchesSearch =
        !searchQuery ||
        scheme.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Schemes ({schemes.length})</h1>
          <p className="text-muted-foreground">
            Browse, filter, and search government welfare schemes.
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schemes by name or keyword..."
            className="pl-8 w-full md:w-[320px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-1 pb-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            className="cursor-pointer px-3 py-1.5 text-xs transition-all hover:bg-primary/20"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {filteredSchemes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.schemeId} scheme={scheme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-lg border border-dashed bg-card/50">
          <p className="text-muted-foreground">No schemes found matching your search and category filter.</p>
        </div>
      )}
    </div>
  );
}
