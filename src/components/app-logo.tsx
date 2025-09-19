import { Globe } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold text-primary font-headline">
      <Globe className="h-6 w-6" />
      <span>Trip Mate</span>
    </div>
  );
}
