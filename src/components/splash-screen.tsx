
'use client';

import { AppLogo } from '@/components/app-logo';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background animate-fade-in">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop')",
        }}
      ></div>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <AppLogo />
        </div>
        <p className="text-lg font-medium text-foreground">
          Loading your next adventure...
        </p>
      </div>
    </div>
  );
}
