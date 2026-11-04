import { m } from '@/paraglide/messages.js'
import homeIcon from '@/assets/navigation/home.svg'
import productsIcon from '@/assets/navigation/products.svg'
import onboardingIcon from '@/assets/navigation/onboarding.svg'
import launchIcon from '@/assets/navigation/launch.svg'
import consoleIcon from '@/assets/navigation/console.svg'
import gameplayIcon from '@/assets/navigation/gameplay.svg'
import announcementIcon from '@/assets/navigation/announcement.svg'
import xIcon from '@/assets/navigation/x.svg'
import telegramIcon from '@/assets/navigation/telegram.svg'
import emailIcon from '@/assets/navigation/email.svg'

export type SidebarNavigationItem = {
  id: string
  label: () => string
  icon: string
  to?: string
}

type SidebarSocialLink = {
  id: string
  label: () => string
  icon: string
  href?: string
}

export const sidebarNavigationGroups: SidebarNavigationItem[][] = [
  [
    { id: 'home', label: m.sidebar_nav_home, icon: homeIcon, to: '/' },
    {
      id: 'products',
      label: m.sidebar_nav_products,
      icon: productsIcon,
      to: '/projectList',
    },
    {
      id: 'onboarding',
      label: m.sidebar_nav_onboarding,
      icon: onboardingIcon,
      to: '/onboarding',
    },
    { id: 'launch', label: m.sidebar_nav_launch, icon: launchIcon, to: '/launch' },
    { id: 'console', label: m.sidebar_nav_console, icon: consoleIcon },
  ],
  [
    { id: 'gameplay', label: m.sidebar_nav_gameplay, icon: gameplayIcon },
    {
      id: 'announcement',
      label: m.sidebar_nav_announcement,
      icon: announcementIcon,
    },
  ],
]

export const sidebarSocialLinks: SidebarSocialLink[] = [
  { id: 'x', label: m.sidebar_social_x, icon: xIcon },
  { id: 'telegram', label: m.sidebar_social_telegram, icon: telegramIcon },
  { id: 'email', label: m.sidebar_social_email, icon: emailIcon },
]
