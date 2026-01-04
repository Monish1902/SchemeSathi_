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
import { EligibilityForm } from '@/components/eligibility-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MySchemesPage() {
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

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
          <EligibilityForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
