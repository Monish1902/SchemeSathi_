
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

export function SignUpForm() {
  const auth = useAuth();
  const { toast } = useToast(); // Import useToast to handle potential error messages

  const handleGoogleSignUp = () => {
    initiateGoogleSignIn(auth);
    // Auth state change will trigger redirect in layout
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Sign up with your Google account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGoogleSignUp} className="w-full" variant="outline">
          <Chrome className="mr-2 h-4 w-4" />
          Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
