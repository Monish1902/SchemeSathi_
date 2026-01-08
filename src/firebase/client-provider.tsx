'use client';

import React, { useMemo, type ReactNode, useState, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [isClient, setIsClient] = useState(false);

  // This effect runs only on the client, after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const firebaseServices = useMemo(() => {
    // Initialize Firebase only on the client side.
    if (isClient) {
      return initializeFirebase();
    }
    return null;
  }, [isClient]);

  // Don't render the provider until Firebase is initialized on the client
  if (!firebaseServices) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
