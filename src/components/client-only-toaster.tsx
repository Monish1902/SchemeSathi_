
'use client';

import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';

export function ClientOnlyToaster() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render the Toaster only on the client side after mounting
  return isClient ? <Toaster /> : null;
}
