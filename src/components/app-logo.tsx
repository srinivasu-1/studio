
import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex flex-col items-center text-center">
        <Logo className="h-24 w-24" />
        <div className="mt-2">
            <h1 className="text-3xl font-bold tracking-wider text-white" style={{fontFamily: "'Lora', serif"}}>
                TRIP MATE
            </h1>
            <p className="text-sm tracking-widest text-[#80D0D9] font-sans">
                MAKE YOUR TRIP MEMORABLE
            </p>
        </div>
    </div>
  );
}
