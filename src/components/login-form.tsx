
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { Chrome } from 'lucide-react';
import Link from 'next/link';

export function LoginForm() {
  const auth = useAuth();
  const { toast } = useToast(); // Import useToast to handle potential error messages

  const handleGoogleSignIn = () => {
    initiateGoogleSignIn(auth);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in with your Google account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
