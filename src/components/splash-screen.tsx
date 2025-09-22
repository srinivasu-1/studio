
'use client';

import { AppLogo } from '@/components/app-logo';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-blue-950 animate-fade-in" style={{backgroundImage: 'radial-gradient(circle, #0c4a6e, #0c3a5e, #0c2a4e), linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1))', backgroundBlendMode: 'multiply'}}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-textile.png')] opacity-10"></div>
        <div className="flex flex-col items-center gap-4 text-white">
            <AppLogo />
        </div>
    </div>
  );
}
