import { Globe } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 text-lg font-bold text-primary-foreground bg-primary rounded-md px-3 py-1 font-headline">
      <Globe className="h-6 w-6" />
      <span>RoamWise</span>
    </div>
  );
}
