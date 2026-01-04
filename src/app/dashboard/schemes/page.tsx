'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
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
import { applications } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecommendSchemesOutput } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MySchemesPage() {
  // TODO: Replace with actual recommendations based on saved eligibility
  const [recommendations, setRecommendations] = useState<RecommendSchemesOutput | null>([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Schemes</h1>
        <p className="text-muted-foreground">
          A dashboard of your applied and recommended government schemes.
        </p>
      </div>

      <Tabs defaultValue="applied">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="applied">Applied Schemes</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Schemes</TabsTrigger>
        </TabsList>
        <TabsContent value="applied">
          <Card>
            <CardHeader>
              <CardTitle>Application History</CardTitle>
              <CardDescription>
                A complete history of your scheme applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme Name</TableHead>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {app.schemeName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {app.id}
                      </TableCell>
                      <TableCell>{app.dateApplied}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            app.status === 'Approved'
                              ? 'default'
                              : app.status === 'Rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className={
                            app.status === 'Approved'
                              ? 'bg-green-500/20 text-green-700'
                              : ''
                          }
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recommended">
          {recommendations && recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{rec.schemeName}</CardTitle>
                        <CardDescription className="pt-4">
                          <Badge variant="secondary" className="mb-2">
                            Eligibility Match
                          </Badge>
                          <p className="text-card-foreground">
                            {rec.reasoning}
                          </p>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center text-center p-12">
              <CardHeader>
                <CardTitle>No Recommendations Yet</CardTitle>
                <CardDescription>
                  Complete your eligibility profile to get personalized scheme
                  recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/dashboard/profile">
                    Go to My Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
