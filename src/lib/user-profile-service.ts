'use client';

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { FormSchemaType } from '@/components/eligibility-form';

function mapDataToFormSchema(data: any): FormSchemaType {
  return {
    name: data.fullName || data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'User',
    age: Number(data.age) || 18,
    gender: data.gender || 'male',
    annualIncome: Number(data.annualFamilyIncome ?? data.annualIncome) || 0,
    familySize: Number(data.familySize) || 1,
    location: data.location || 'Rural',
    district: data.district || '',
    mandal: data.mandal || '',
    category: data.casteCategory || data.category || 'General',
    disability: Boolean(data.disabilityStatus ? data.disabilityStatus !== 'None' : data.disability),
    occupation: data.employmentStatus || data.occupation || 'farmer',
    landHolding: String(data.landHolding || ''),
    vehiclesOwned: Boolean(data.hasVehicle ?? data.vehiclesOwned),
    houseType: data.housingStatus || data.houseType || 'rented',
    educationQualification: data.highestQualification || data.educationQualification || '1-10',
  } as FormSchemaType;
}

/**
 * Creates or updates a user's profile in Firestore with automatic localStorage fallback
 * so that users are never blocked even if Firebase security rules are pending.
 */
export async function saveUserProfile(
  db: Firestore,
  userId: string,
  profileData: FormSchemaType
): Promise<void> {
  const profileRef = doc(db, 'users', userId);

  const dataToSave = {
    ...profileData,
    uid: userId,
    fullName: profileData.name,
    lastProfileUpdateAt: new Date().toISOString(),
    casteCategory: profileData.category,
    housingStatus: profileData.houseType,
    highestQualification: profileData.educationQualification,
    employmentStatus: profileData.occupation,
    hasVehicle: profileData.vehiclesOwned,
  };

  // Always store in localStorage as seamless fallback
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`schemesathi_profile_${userId}`, JSON.stringify(dataToSave));
    } catch {
      // ignore
    }
  }

  try {
    const docSnap = await getDoc(profileRef);

    if (docSnap.exists()) {
      await updateDoc(profileRef, {
        ...dataToSave,
        lastProfileUpdateAt: serverTimestamp(),
      });
    } else {
      await setDoc(profileRef, {
        ...dataToSave,
        accountCreatedAt: serverTimestamp(),
        lastProfileUpdateAt: serverTimestamp(),
        accountStatus: 'active',
      });
    }
  } catch (error: any) {
    console.warn('Firestore write returned permission error. Saved to local storage fallback:', error);
    // If local storage successfully cached the profile, do not crash the user experience
    if (typeof window !== 'undefined' && localStorage.getItem(`schemesathi_profile_${userId}`)) {
      return;
    }
    const permissionError = new FirestorePermissionError({
      path: profileRef.path,
      operation: 'write',
      requestResourceData: profileData,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw error;
  }
}

/**
 * Fetches a user's profile from Firestore, with fallback to local storage.
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
      return mapDataToFormSchema(data);
    }
  } catch (e) {
    console.warn('Could not fetch user profile from Firestore, checking localStorage:', e);
  }

  // Fallback to localStorage if Firestore failed or returned permission-denied
  if (typeof window !== 'undefined') {
    try {
      const localData = localStorage.getItem(`schemesathi_profile_${userId}`);
      if (localData) {
        const parsed = JSON.parse(localData);
        return mapDataToFormSchema(parsed);
      }
    } catch {
      // ignore
    }
  }

  return null;
}
