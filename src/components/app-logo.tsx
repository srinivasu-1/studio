import { Logo } from '@/components/icons/logo';

export function AppLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
        <Logo className="h-28 w-28" />
        <div className='text-center'>
            <span className="text-5xl font-bold tracking-widest text-white">
                TRIP MATE
            </span>
            <p className='mt-2 text-lg font-medium tracking-wider text-blue-200'>MAKE YOUR TRIP MEMORABLE</p>
        </div>
    </div>
  );
}
