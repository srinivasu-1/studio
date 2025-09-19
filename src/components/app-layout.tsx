'use client';
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
import React from 'react';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();

  React.useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sidebar_state='))
      ?.split('=')[1];
    if (cookieValue) {
      setOpen(cookieValue === 'true');
    }
  }, []);

  if (pathname === '/login') {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <AppLogo />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold font-headline hidden sm:block">Trip Mate</h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
