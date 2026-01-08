
'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ClientOnlyUserNav } from '@/components/client-only-user-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore } from '@/firebase';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { getUserProfile } from '@/lib/user-profile-service';

const navItems = [
  { href: '/dashboard/schemes', label: 'My Schemes' },
  { href: '/dashboard/all-schemes', label: 'All Schemes' },
  { href: '/dashboard/eligibility', label: 'My Profile' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [isProfileChecked, setIsProfileChecked] = useState(false);

  useEffect(() => {
    // Wait until the user's authentication status is resolved.
    if (isUserLoading) {
      return;
    }

    // If there is no user, redirect to the login page.
    if (!user) {
      router.replace('/login');
      return;
    }

    // If we have a user, check their profile, but only once.
    let profileCheckCompleted = false;
    const checkProfile = async () => {
      if (profileCheckCompleted) return;
      if (firestore && user) {
        const profile = await getUserProfile(firestore, user.uid);
        // If no profile exists and they aren't on the eligibility page, redirect them.
        if (!profile && pathname !== '/dashboard/eligibility') {
          router.replace('/dashboard/eligibility');
        }
      }
      // Mark the profile check as complete to unlock the UI.
      setIsProfileChecked(true);
      profileCheckCompleted = true;
    };

    checkProfile();

  }, [user, isUserLoading, router, firestore, pathname]);

  // Show the loader until both auth and profile checks are done.
  if (isUserLoading || !isProfileChecked) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }
  
  // If user is not loading, but somehow no user object and profile check is done, it implies redirect is happening
  if (!user) {
     return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
          <Link
            href="/dashboard/about"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1.5 rounded-md transition-all duration-300 text-base',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-4 text-lg font-medium">
              <Link
                href="/dashboard/about"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <Logo />
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md transition-all duration-300',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial" />
          <ModeToggle />
          <ClientOnlyUserNav />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
