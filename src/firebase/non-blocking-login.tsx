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
