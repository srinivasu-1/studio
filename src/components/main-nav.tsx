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
  Camera,
  Share2,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/trips',
    label: 'My Trips',
    icon: Heart,
  },
  {
    href: '/capture',
    label: 'Capture',
    icon: Camera,
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
  {
    href: '/share',
    label: 'Share App',
    icon: Share2,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              tooltip={link.label}
              size="lg"
              className="font-medium"
            >
              <div>
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
