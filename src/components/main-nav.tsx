
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
  useSidebar,
} from '@/components/ui/sidebar';
import { useTranslation } from '@/hooks/use-translation';

const links = [
  {
    href: '/',
    labelKey: 'nav.home',
    icon: Home,
  },
  {
    href: '/trips',
    labelKey: 'nav.trips',
    icon: Heart,
  },
  {
    href: '/capture',
    labelKey: 'nav.capture',
    icon: Camera,
  },
  {
    href: '/navigation',
    labelKey: 'nav.navigation',
    icon: Map,
  },
  {
    href: '/transport',
    labelKey: 'nav.transport',
    icon: Bus,
  },
  {
    href: '/guides',
    labelKey: 'nav.guides',
    icon: BookOpen,
  },
  {
    href: '/safety',
    labelKey: 'nav.safety',
    icon: Shield,
  },
  {
    href: '/share',
    labelKey: 'nav.share',
    icon: Share2,
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} passHref onClick={handleLinkClick}>
            <SidebarMenuButton
              asChild
              isActive={pathname === link.href}
              tooltip={t(link.labelKey)}
              size="lg"
              className="font-medium"
            >
              <div>
                <link.icon className="h-5 w-5" />
                <span>{t(link.labelKey)}</span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
