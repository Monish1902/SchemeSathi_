'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { ShieldAlert, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Listens for globally emitted 'permission-error' events and renders
 * a helpful banner rather than crashing the component tree.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleError = (incomingError: FirestorePermissionError) => {
      console.warn('Firestore Permission Error caught:', incomingError);
      setError(incomingError);
      setDismissed(false);
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (!error || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md rounded-lg border border-destructive/50 bg-background p-4 text-foreground shadow-xl backdrop-blur-md dark:bg-zinc-900/95">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-sm text-destructive">Firestore Permission Denied</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your Firebase project <code className="font-mono font-bold text-foreground">schemesathigdg</code> denied access to <span className="font-mono text-xs">{error.context?.path || 'collection'}</span> ({error.context?.operation || 'access'}).
          </p>
          <div className="pt-2 flex items-center gap-2">
            <a
              href="https://console.firebase.google.com/project/schemesathigdg/firestore/rules"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              Update Rules in Console <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setDismissed(true)}
            >
              Dismiss
            </Button>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
