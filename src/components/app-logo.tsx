
import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex items-center gap-4">
        <Logo className="h-12 w-12" />
        <span className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Trip Mate
        </span>
    </div>
  );
}
