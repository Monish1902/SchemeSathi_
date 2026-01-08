
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
 * @param db The Firestore instance.
 * @param userId The UID of the user whose profile is being saved.
 * @param profileData The profile data to save, matching `FormSchemaType`.
 */
export function saveUserProfile(
  db: Firestore,
  userId: string,
  profileData: FormSchemaType
) {
  const profileRef = doc(db, 'users', userId);
  
  const dataToSave = {
    ...profileData,
    uid: userId,
    lastProfileUpdateAt: serverTimestamp(),
    // Ensure fields match the new schema, converting where necessary
    casteCategory: profileData.category,
    housingStatus: profileData.houseType,
    highestQualification: profileData.educationQualification,
    employmentStatus: profileData.occupation,
    hasVehicle: profileData.vehiclesOwned,
    // Add account creation timestamp only if it's a new document
    accountCreatedAt: serverTimestamp(),
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
  const profileRef = doc(db, 'users', userId);
  const docSnap = await getDoc(profileRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Map new fields back to old form schema fields for compatibility
    return {
      name: data.fullName || `${data.firstName} ${data.lastName}`,
      age: data.age,
      gender: data.gender,
      annualIncome: data.annualFamilyIncome,
      familySize: data.familySize,
      location: data.location,
      district: data.district,
      mandal: data.mandal,
      category: data.casteCategory,
      disability: data.disabilityStatus !== 'None',
      occupation: data.employmentStatus,
      landHolding: `${data.landHoldingTotal} acres` || '',
      vehiclesOwned: data.hasVehicle,
      houseType: data.housingStatus,
      educationQualification: data.highestQualification,
    } as FormSchemaType;
  } else {
    // The user does not have a profile saved yet.
    return null;
  }
}
