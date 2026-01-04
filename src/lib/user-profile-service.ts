'use client';

import {
  doc,
  setDoc,
  getDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter }from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { FormSchemaType } from '@/components/eligibility-form';

/**
 * Creates or updates a user's profile in Firestore.
 *
 * This function performs a non-blocking write operation. It uses `setDoc` with
 * `{ merge: true }` to create a new profile or update an existing one without
 * overwriting the entire document.
 *
 * Error handling is managed by chaining a `.catch()` block. If the write operation
 * fails due to security rules, it constructs a detailed `FirestorePermissionError`
 * containing the operation's context (path, data) and emits it globally.
 * This allows a centralized listener to catch and display the error without
 * crashing the component.
 *
 * @param db The Firestore instance.
 * @param userId The UID of the user whose profile is being saved.
 * @param profileData The profile data to save, matching `FormSchemaType`.
 */
export function saveUserProfile(
  db: Firestore,
  userId: string,
  profileData: FormSchemaType
) {
  // The document now lives at /users/{userId}/profile/main
  // This is to align with the backend.json structure and rules for subcollections
  const profileRef = doc(db, 'users', userId, 'userProfile', 'main');
  
  const dataToSave = {
    ...profileData,
    firebaseUid: userId, // Add firebaseUid to satisfy security rules
    updatedAt: serverTimestamp(),
  };

  // Use setDoc with merge to create or update.
  // The operation is non-blocking (no `await`).
  setDoc(
    profileRef,
    dataToSave,
    { merge: true }
  ).catch(error => {
    // If the operation fails, create a detailed, contextual error.
    const permissionError = new FirestorePermissionError({
      path: profileRef.path,
      operation: 'write',
      requestResourceData: dataToSave,
    });
    
    // Emit the error for a global handler to catch.
    errorEmitter.emit('permission-error', permissionError);
  });
}

/**
 * Fetches a user's profile from Firestore.
 *
 * @param db The Firestore instance.
 * @param userId The UID of the user whose profile is to be fetched.
 * @returns A promise that resolves to the user's profile data if it exists, otherwise null.
 */
export async function getUserProfile(
  db: Firestore,
  userId: string
): Promise<FormSchemaType | null> {
  const profileRef = doc(db, 'users', userId, 'userProfile', 'main');
  const docSnap = await getDoc(profileRef);

  if (docSnap.exists()) {
    // Return the document data, conforming to FormSchemaType.
    return docSnap.data() as FormSchemaType;
  } else {
    // The user does not have a profile saved yet.
    return null;
  }
}
