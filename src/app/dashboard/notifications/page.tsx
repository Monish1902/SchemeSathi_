import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with the latest news and alerts.</p>
      </div>
      <Card className="flex flex-col items-center justify-center text-center p-12">
        <CardHeader>
            <div className="mx-auto bg-secondary p-3 rounded-full">
                <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
          <CardTitle>No New Notifications</CardTitle>
          <CardDescription>
            You're all caught up! We'll let you know when there's something new.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
