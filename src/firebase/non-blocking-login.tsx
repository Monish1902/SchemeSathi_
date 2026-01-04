'use client';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

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


/**
 * Signs a user in with email and password.
 * This is an async function and should be awaited. The calling component
 * is responsible for handling loading states and errors.
 */
export async function signInWithEmail(auth: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}


/**
 * Creates a new user account with email and password, and sets their display name.
 * This is an async function and should be awaited.
 */
export async function signUpWithEmail(auth: Auth, email: string, password: string, displayName: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}
