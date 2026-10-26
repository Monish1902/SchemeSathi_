
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
import { useMemoFirebase } from '@/firebase/provider';
import { collection, query, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { UserApplication } from '@/lib/types';
import { getLocalApplications } from '@/lib/application-service';

export default function ApplicationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'userApplications'), where('userId', '==', user.uid));
  }, [firestore, user]);

  const { data: applications, isLoading, error } = useCollection<UserApplication>(applicationsQuery);

  const sortedApplications = useMemo(() => {
    const list: UserApplication[] = applications && applications.length > 0 
      ? [...applications] 
      : (user ? getLocalApplications(user.uid) : []);
    
    return list.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
  }, [applications, user]);

  const renderContent = () => {
    if (isLoading && sortedApplications.length === 0) {
        return (
             <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
        );
    }

    if (sortedApplications.length === 0) {
        return <p className="text-muted-foreground text-center py-12">You haven't applied for any schemes yet.</p>;
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
                <TableRow key={app.applicationId}>
                  <TableCell className="font-medium">{app.schemeName}</TableCell>
                  <TableCell className="text-muted-foreground">{app.applicationId}</TableCell>
                  <TableCell>{new Date(app.applicationDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        app.applicationStatus === 'Approved'
                          ? 'default'
                          : app.applicationStatus === 'Rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={app.applicationStatus === 'Approved' ? 'bg-green-500/20 text-green-700' : ''}
                    >
                      {app.applicationStatus}
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
