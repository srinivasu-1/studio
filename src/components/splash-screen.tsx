
'use client';

import { AppLogo } from '@/components/app-logo';

export function SplashScreen() {
  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001f3f] animate-fade-in"
        style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
        }}
    >
        <div className="flex flex-col items-center gap-4">
            <AppLogo />
        </div>
    </div>
  );
}
