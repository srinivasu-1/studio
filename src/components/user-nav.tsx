import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function UserNav() {
  // For now, we will assume the user is not logged in.
  // In a real app, you would have some state management to check for an authenticated user.
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2" />
            Login
          </Link>
        </Button>
      </div>
    );
  }

  // This part of the component will be hidden for now
  // but can be used once authentication is implemented.
  return (
    <div className="flex items-center gap-4">
        <ThemeToggle />
    </div>
  );
}
