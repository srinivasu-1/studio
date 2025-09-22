import { Plane } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Plane className="h-8 w-8 text-primary" />
      <span className="text-3xl font-bold font-headline text-foreground">
        Trip Mate
      </span>
    </div>
  );
}
