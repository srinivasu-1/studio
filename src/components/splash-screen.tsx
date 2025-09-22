
'use client';

import { AppLogo } from '@/components/app-logo';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-950 animate-fade-in" style={{backgroundColor: '#1a202c'}}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')] opacity-5"></div>
        <div className="flex flex-col items-center gap-4 text-white">
            <AppLogo />
        </div>
    </div>
  );
}
