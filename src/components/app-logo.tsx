
import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex items-center gap-4">
        <Logo className="h-12 w-12" />
        <div>
            <h1 className="text-xl font-bold tracking-wider text-foreground dark:text-white" style={{fontFamily: "'Lora', serif"}}>
                TRIP MATE
            </h1>
            <p className="text-xs tracking-widest text-[#80D0D9] font-sans">
                MAKE YOUR TRIP MEMORABLE
            </p>
        </div>
    </div>
  );
}
