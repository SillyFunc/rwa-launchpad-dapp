import footerBg from '@/assets/home/bg-gold-bottom.webp'
import logo from '@/assets/logo.png'
import facebookIcon from '@/assets/social/facebook.svg'
import instagramIcon from '@/assets/social/instagram.svg'
import telegramIcon from '@/assets/social/telegram.svg'
import xIcon from '@/assets/social/x.svg'
import youtubeIcon from '@/assets/social/youtube.svg'
import { m } from '@/paraglide/messages.js'

const socials = [
  { name: 'X', icon: xIcon },
  { name: 'Telegram', icon: telegramIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Facebook', icon: facebookIcon },
]

const linkGroups = [
  {
    id: 'projects',
    title: m.footer_projects,
    links: [
      { id: 'mint', label: m.footer_mint },
      { id: 'rwa', label: m.footer_rwa },
      { id: 'invite', label: m.footer_invite },
    ],
  },
  {
    id: 'about',
    title: m.footer_about,
    links: [
      { id: 'website', label: m.footer_website },
      { id: 'help', label: m.footer_help },
      { id: 'whitepaper', label: m.footer_whitepaper },
    ],
  },
  {
    id: 'company',
    title: m.footer_company,
    links: [
      { id: 'about', label: m.footer_about },
      { id: 'articles', label: m.footer_articles },
      { id: 'contact', label: m.footer_contact },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-4xl border-t border-[#484B51] bg-[#070808] pt-8 pb-11">
      <img
        src={footerBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full object-cover object-center opacity-20"
      />

      <div className="relative">
        <div className="relative mx-auto h-10.5 w-33.5 overflow-hidden">
          <img
            src={logo}
            alt="Whotel"
            className="absolute -top-3.5 -left-2 w-36.75 max-w-none"
          />
        </div>

        <div className="mt-3.5 flex justify-center gap-4">
          {socials.map(({ name, icon }) => (
            <a
              key={name}
              aria-label={name}
              className="group relative flex size-8 items-center justify-center rounded-xl"
            >
              <span className="absolute inset-0 rounded-xl bg-linear-[102.78deg] from-[#eb5a0d] to-[#f59c0b] opacity-0 group-hover:opacity-100" />
              <img src={icon} alt="" className="relative opacity-60" />
            </a>
          ))}
        </div>

        <div className="mx-4 mt-5.75 h-px bg-linear-to-r from-[rgba(54,98,254,0)] via-[#00e5ff] via-[51.923%] to-[rgba(54,98,254,0)] opacity-40" />

        <nav className="mx-auto mt-10 flex w-67.5 justify-between">
          {linkGroups.map((group) => (
            <div key={group.id} className="flex flex-col items-center">
              <h3 className="text-sm font-semibold">{group.title()}</h3>
              <ul className="mt-4.5 flex flex-col items-center gap-3.75 text-xs">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <a className="opacity-80">{link.label()}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs">
          {m.footer_copyright()}
        </div>
      </div>
    </footer>
  )
}
