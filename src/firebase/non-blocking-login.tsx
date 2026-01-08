
'use client';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

/** Initiate Google sign-in with a popup (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(authInstance, provider)
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
