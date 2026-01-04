'use client';

import { useEffect, useState } from 'react';
import { UserNav } from './user-nav';

export function ClientOnlyUserNav() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <UserNav /> : null;
}
