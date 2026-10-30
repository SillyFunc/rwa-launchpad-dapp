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
  label: string
  icon: string
  to?: string
}

type SidebarSocialLink = {
  label: string
  icon: string
  href?: string
}

export const sidebarNavigationGroups: SidebarNavigationItem[][] = [
  [
    { label: 'Home', icon: homeIcon, to: '/' },
    { label: 'Product List', icon: productsIcon },
    { label: 'Settle in', icon: onboardingIcon, to: '/onboarding' },
    { label: 'Launch', icon: launchIcon },
    { label: 'Console', icon: consoleIcon },
  ],
  [
    { label: 'Gameplay details', icon: gameplayIcon },
    { label: 'Announcement', icon: announcementIcon },
  ],
]

export const sidebarSocialLinks: SidebarSocialLink[] = [
  { label: 'X', icon: xIcon },
  { label: 'Telegram', icon: telegramIcon },
  { label: 'Email', icon: emailIcon },
]
