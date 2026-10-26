
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/firebase';
import { initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { Chrome, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useState } from 'react';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function LoginForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignIn = () => {
    initiateGoogleSignIn(auth);
  };
  
  async function onSubmit(values: FormSchemaType) {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // onAuthStateChanged in layout will handle redirect
    } catch (error: any) {
      let title = 'Login Failed';
      let description = 'An unexpected error occurred. Please try again.';

      if (error.code === 'auth/operation-not-allowed' || error.message?.includes('operation-not-allowed')) {
        title = 'Email/Password Sign-In Disabled';
        description =
          'Email/Password provider is not enabled in your Firebase console. Please go to Firebase Console > Authentication > Sign-in method and enable Email/Password.';
        setAuthError(description);
      } else if (error.code === AuthErrorCodes.USER_DELETED || error.code === AuthErrorCodes.INVALID_CREDENTIAL || error.code === 'auth/invalid-credential') {
        description = 'Invalid email or password. Please check your credentials and try again.';
      } else if (error.code === 'auth/network-request-failed') {
        description = 'Network error. Please check your internet connection.';
      } else if (error.message) {
        description = error.message;
      }

      toast({
        variant: 'destructive',
        title,
        description,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in to your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {authError && (
          <Alert variant="destructive" className="border-red-500/50 bg-destructive/10 text-destructive dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold text-sm">Action Required in Firebase Console</AlertTitle>
            <AlertDescription className="text-xs space-y-2 mt-1">
              <p>{authError}</p>
              <div className="pt-1">
                <a
                  href="https://console.firebase.google.com/project/schemesathigdg/authentication/providers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline hover:opacity-80"
                >
                  Enable Email/Password in Console <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
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
