'use client';

import {
  doc,
  setDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter }from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Creates or updates a user's application status in Firestore.
 *
 * This function saves the record that a user has applied for a scheme.
 * It uses the scheme ID as the document ID to prevent duplicate entries
 * for the same scheme.
 *
 * @param db The Firestore instance.
 * @param userId The UID of the user.
 * @param schemeId The ID of the scheme being applied for.
 * @param schemeName The name of the scheme.
 */
export function saveApplicationStatus(
  db: Firestore,
  userId: string,
  schemeId: string,
  schemeName: string,
) {
  // Use the schemeId as the document ID to prevent duplicates.
  const applicationRef = doc(db, 'users', userId, 'applicationStatuses', schemeId);
  
  const dataToSave = {
    userId: userId,
    schemeId: schemeId,
    schemeName: schemeName,
    applicationDate: new Date().toISOString(),
    status: 'Submitted',
    lastUpdated: serverTimestamp(),
  };

  // Use setDoc to create or overwrite the application status.
  return setDoc(
    applicationRef,
    dataToSave
  ).catch(error => {
    // If the operation fails, create a detailed, contextual error.
    const permissionError = new FirestorePermissionError({
      path: applicationRef.path,
      operation: 'write',
      requestResourceData: dataToSave,
    });
    
    // Emit the error for a global handler to catch.
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the original error to be caught by the calling function's try-catch block
    throw error;
  });
}
