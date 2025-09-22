
import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex flex-col items-center gap-4">
        <Logo className="h-32 w-32" />
        <div className="text-center">
            <span className="text-4xl font-bold tracking-widest text-white font-sans uppercase">
                Trip Mate
            </span>
            <p className="text-sm tracking-widest text-cyan-200/80 font-sans uppercase">Make Your Trip Memorable</p>
        </div>
    </div>
  );
}
