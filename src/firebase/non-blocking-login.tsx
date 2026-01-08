'use client';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

/** Initiate Google sign-in with a popup (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  
  // The promise is handled to check the email domain.
  signInWithPopup(authInstance, provider)
    .then((result) => {
      const user = result.user;
      // Check if the user's email ends with @gmail.com
      if (user && user.email && !user.email.endsWith('@gmail.com')) {
        // If not a gmail.com address, sign the user out immediately.
        authInstance.signOut();
        // Inform the user why they were not allowed in.
        toast({
          variant: 'destructive',
          title: 'Sign-In Failed',
          description: 'Only personal @gmail.com accounts are allowed. Please try again with a different account.',
          duration: 9000,
        });
      }
      // If it is a @gmail.com account, the onAuthStateChanged listener will handle the redirect as usual.
    })
    .catch((error) => {
      // Gracefully handle common user-cancellation errors without logging them.
      // These errors occur when the user closes the popup before completing sign-in.
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        return;
      }
      // For other errors (network issues, etc.), log them for debugging.
      console.error("Google Sign-In Error:", error);
    });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
