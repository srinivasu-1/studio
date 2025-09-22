
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut } from '@/app/auth/actions';
import { Skeleton } from './ui/skeleton';

export function UserNav() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
        <Skeleton className="h-10 w-24" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <LanguageToggle />
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

  return (
    <div className="flex items-center gap-4">
      <LanguageToggle />
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
              <AvatarFallback>{user.displayName?.[0] || user.email?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
