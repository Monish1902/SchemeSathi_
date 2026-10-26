'use client';

import {
  collection,
  addDoc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { UserApplication } from '@/lib/types';

/**
 * Creates a user's application status in userApplications with localStorage fallback.
 */
export async function saveApplicationStatus(
  db: Firestore,
  userId: string,
  schemeId: string,
  schemeName: string,
): Promise<UserApplication> {
  const applicationRef = collection(db, 'userApplications');
  const dateNow = new Date().toISOString();
  const appId = `APP-${Date.now().toString().slice(-6)}`;

  const localApp: UserApplication = {
    applicationId: appId,
    userId: userId,
    schemeId: schemeId,
    schemeName: schemeName,
    applicationDate: dateNow,
    applicationStatus: 'Submitted',
    lastStatusUpdateDate: dateNow,
  };

  // Always save to localStorage so the application record is never lost
  if (typeof window !== 'undefined') {
    try {
      const existingKey = `schemesathi_applications_${userId}`;
      const existing = JSON.parse(localStorage.getItem(existingKey) || '[]');
      existing.unshift(localApp);
      localStorage.setItem(existingKey, JSON.stringify(existing));
    } catch {
      // ignore
    }
  }

  try {
    const docRef = await addDoc(applicationRef, {
      ...localApp,
      lastStatusUpdateDate: serverTimestamp(),
    });
    return {
      ...localApp,
      applicationId: docRef.id,
    };
  } catch (error: any) {
    console.warn('Firestore application save error, saved locally:', error);
    // If saved to localStorage, return localApp
    if (typeof window !== 'undefined' && localStorage.getItem(`schemesathi_applications_${userId}`)) {
      return localApp;
    }
    const permissionError = new FirestorePermissionError({
      path: applicationRef.path,
      operation: 'create',
      requestResourceData: localApp,
    });
    errorEmitter.emit('permission-error', permissionError);
    return localApp;
  }
}

/**
 * Returns locally stored applications for a user as fallback.
 */
export function getLocalApplications(userId: string): UserApplication[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`schemesathi_applications_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
