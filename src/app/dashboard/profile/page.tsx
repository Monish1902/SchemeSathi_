
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is now deprecated and redirects to the eligibility page.
export default function ProfilePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/eligibility');
    }, [router]);
  
    return null; // Render nothing while redirecting
}
