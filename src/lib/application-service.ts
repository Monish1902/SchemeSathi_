
'use client';

import {
  collection,
  addDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter }from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Creates a user's application status in the new userApplications collection.
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
  // Use the new top-level collection
  const applicationRef = collection(db, 'userApplications');
  
  const dataToSave = {
    userId: userId,
    schemeId: schemeId,
    schemeName: schemeName,
    applicationDate: new Date().toISOString(),
    applicationStatus: 'Submitted',
    lastStatusUpdateDate: serverTimestamp(),
  };

  // Use addDoc to create a new application document with a unique ID.
  return addDoc(
    applicationRef,
    dataToSave
  ).catch(error => {
    // If the operation fails, create a detailed, contextual error.
    const permissionError = new FirestorePermissionError({
      path: applicationRef.path, // Path to the collection
      operation: 'create',
      requestResourceData: dataToSave,
    });
    
    // Emit the error for a global handler to catch.
    errorEmitter.emit('permission-error', permissionError);
    // Re-throw the original error to be caught by the calling function's try-catch block
    throw error;
  });
}
