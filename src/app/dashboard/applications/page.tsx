'use client';

import { useMemo } from 'react';
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
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { Application } from '@/lib/types';


export default function ApplicationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const applicationsQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'applicationStatuses'));
  }, [firestore, user]);

  const { data: applications, isLoading, error } = useCollection<Application>(applicationsQuery);

  const sortedApplications = useMemo(() => {
    if (!applications) return [];
    // Sort by applicationDate in descending order
    return [...applications].sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
  }, [applications]);

  const renderContent = () => {
    if (isLoading) {
        return (
             <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
        );
    }

    if (error) {
        return (
             <Alert variant="destructive" className="mt-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error Fetching Applications</AlertTitle>
              <AlertDescription>
                There was a problem loading your application data. Please try again later.
              </AlertDescription>
            </Alert>
        );
    }
    
    if (!applications || applications.length === 0) {
        return <p className="text-muted-foreground text-center py-12">You haven't applied for any schemes yet.</p>
    }

    return (
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
              {sortedApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.schemeName}</TableCell>
                  <TableCell className="text-muted-foreground">{app.id}</TableCell>
                  <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        app.status === 'Approved'
                          ? 'default'
                          : app.status === 'Rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={app.status === 'Approved' ? 'bg-green-500/20 text-green-700' : ''}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    );
  }

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">Here is a list of all your submitted applications.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
          <CardDescription>
            A complete history of your scheme applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
         {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
