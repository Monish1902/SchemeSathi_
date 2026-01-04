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

export default function ApplicationsPage() {
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
                  <TableCell className="font-medium">{app.schemeName}</TableCell>
                  <TableCell className="text-muted-foreground">{app.id}</TableCell>
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
                      className={app.status === 'Approved' ? 'bg-green-500/20 text-green-700' : ''}
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
    </div>
  );
}
