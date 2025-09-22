
import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex items-center gap-4">
        <Logo className="h-14 w-14" />
        <span className="text-2xl font-bold tracking-tight text-foreground">
            Trip Mate
        </span>
    </div>
  );
}
