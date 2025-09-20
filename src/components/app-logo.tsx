import { Plane } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Plane className="h-8 w-8 text-primary" />
      <span className="text-3xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        Trip Mate
      </span>
    </div>
  );
}
