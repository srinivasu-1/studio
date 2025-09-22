import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Logo className="h-10 w-10" />
      <span className="text-3xl font-bold font-headline text-foreground">
        Trip Mate
      </span>
    </div>
  );
}
