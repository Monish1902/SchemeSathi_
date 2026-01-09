
'use client';

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter }from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { FormSchemaType } from '@/components/eligibility-form';

/**
 * Creates or updates a user's profile in Firestore.
 *
 * This async function first checks if a document for the user already exists.
 * If it does, it updates the document. If not, it creates a new one.
 * This correctly handles the `accountCreatedAt` timestamp, which should only
 * be set on creation.
 *
 * @param db The Firestore instance.
 * @param userId The UID of the user whose profile is being saved.
 * @param profileData The profile data to save, matching `FormSchemaType`.
 */
export async function saveUserProfile(
  db: Firestore,
  userId: string,
  profileData: FormSchemaType
): Promise<void> {
  const profileRef = doc(db, 'users', userId);

  try {
    const docSnap = await getDoc(profileRef);

    const dataToSave = {
      ...profileData,
      uid: userId,
      fullName: profileData.name, // Ensure fullName is saved
      lastProfileUpdateAt: serverTimestamp(),
      casteCategory: profileData.category,
      housingStatus: profileData.houseType,
      highestQualification: profileData.educationQualification,
      employmentStatus: profileData.occupation,
      hasVehicle: profileData.vehiclesOwned,
    };

    if (docSnap.exists()) {
      // Document exists, so update it.
      // Do not include accountCreatedAt in an update.
      await updateDoc(profileRef, dataToSave);
    } else {
      // Document does not exist, so create it.
      // Include accountCreatedAt for the new document.
      await setDoc(profileRef, {
        ...dataToSave,
        accountCreatedAt: serverTimestamp(),
        accountStatus: 'active',
      });
    }
  } catch (error) {
    // If the operation fails, create a detailed, contextual error.
    const permissionError = new FirestorePermissionError({
      path: profileRef.path,
      operation: 'write',
      requestResourceData: profileData,
    });
    
    // Emit the error for a global handler to catch and re-throw
    errorEmitter.emit('permission-error', permissionError);
    throw error; // Re-throw to be caught by the calling function if needed.
  }
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
  try {
    const docSnap = await getDoc(profileRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Map new fields back to old form schema fields for compatibility
      return {
        name: data.fullName || data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        age: data.age,
        gender: data.gender,
        annualIncome: data.annualFamilyIncome || data.annualIncome,
        familySize: data.familySize,
        location: data.location,
        district: data.district,
        mandal: data.mandal,
        category: data.casteCategory || data.category,
        disability: data.disabilityStatus ? data.disabilityStatus !== 'None' : data.disability,
        occupation: data.employmentStatus || data.occupation,
        landHolding: data.landHolding || '',
        vehiclesOwned: data.hasVehicle || data.vehiclesOwned,
        houseType: data.housingStatus || data.houseType,
        educationQualification: data.highestQualification || data.educationQualification,
      } as FormSchemaType;
    } else {
      // The user does not have a profile saved yet.
      return null;
    }
  } catch(e) {
    console.error("Error fetching user profile:", e);
    // Don't throw permission error here, just fail gracefully
    return null;
  }
}
