
'use client';

import { AppLogo } from '@/components/app-logo';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-fade-in">
        <div className="flex flex-col items-center gap-4">
            <AppLogo />
        </div>
    </div>
  );
}
