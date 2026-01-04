'use client';
import {
  Auth, // Import Auth type for type hinting
  GoogleAuthProvider,
  signInWithPopup,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';
import { errorEmitter } from './error-emitter';

/** Initiate Google sign-in with a popup (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  // CRITICAL: Call signInWithPopup directly. Do NOT use 'await'.
  signInWithPopup(authInstance, provider).catch((error) => {
      // Although we don't block, we can still catch and handle initial errors
      // such as popup blocked, network issues, etc.
      // Emitting a global error might be a good pattern here if needed.
      console.error("Google Sign-In Error:", error);
      // Example of emitting a custom error event.
      // errorEmitter.emit('auth-error', { source: 'google-signin', error });
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
