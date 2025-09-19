'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Map,
  Bus,
  BookOpen,
  Shield,
  Heart,
  Home,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  {
    href: '/',
    label: 'Recommendations',
    icon: Home,
  },
  {
    href: '/trips',
    label: 'My Trips',
    icon: Heart,
  },
  {
    href: '/navigation',
    label: 'Navigation',
    icon: Map,
  },
  {
    href: '/transport',
    label: 'Transport',
    icon: Bus,
  },
  {
    href: '/guides',
    label: 'Travel Guides',
    icon: BookOpen,
  },
  {
    href: '/safety',
    label: 'Safety Info',
    icon: Shield,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              tooltip={link.label}
            >
              <a>
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
