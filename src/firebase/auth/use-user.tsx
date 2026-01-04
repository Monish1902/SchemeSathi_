'use client';

import { useUser as useFirebaseUserHook } from '@/firebase/provider';

/**
 * @deprecated This hook is deprecated and will be removed in a future version.
 * Please import `useUser` directly from `@/firebase` or `@/firebase/provider`.
 * 
 * This hook is a temporary re-export to maintain backward compatibility.
 * It provides the authenticated user's state, including the user object,
 * loading status, and any authentication errors.
 *
 * @returns {UserHookResult} An object containing `user`, `isUserLoading`, and `userError`.
 */
export const useUser = () => {
  // Directly call and return the result of the new hook.
  // A console warning can be added here to alert developers.
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      "The `useUser` hook from `src/firebase/auth/use-user.tsx` is deprecated. Please import `useUser` from `src/firebase` instead."
    );
  }
  return useFirebaseUserHook();
};
