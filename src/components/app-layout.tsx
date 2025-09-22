
'use client';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/main-nav';
import { AppLogo } from '@/components/app-logo';
import { UserNav } from '@/components/user-nav';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SplashScreen } from './splash-screen';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    if (cookieValue) {
      setOpen(cookieValue === 'true');
    }
  }, []);
  
  if (isAppLoading) {
    return <SplashScreen />;
  }

  if (pathname === '/login') {
    return <main>{children}</main>;
  }

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/">
            <AppLogo />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div className="hidden sm:block">
              <AppLogo />
            </div>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
