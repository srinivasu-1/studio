
import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
        <Logo className="h-24 w-24" />
        <div className="text-center">
            <span className="text-3xl font-bold tracking-tight text-foreground">
                Trip Mate
            </span>
            <p className="text-sm text-muted-foreground">Make Your Trip Memorable</p>
        </div>
    </div>
  );
}
