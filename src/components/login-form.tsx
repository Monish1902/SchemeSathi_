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
import { Chrome } from 'lucide-react';

export function LoginForm() {
  const auth = useAuth();

  const handleGoogleSignIn = () => {
    initiateGoogleSignIn(auth);
  };


  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to SchemeSathi</CardTitle>
        <CardDescription>
          Sign in to discover personalized government schemes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGoogleSignIn} className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
          By signing in, you agree to our Terms of Service.
        </p>
      </CardFooter>
    </Card>
  );
}
