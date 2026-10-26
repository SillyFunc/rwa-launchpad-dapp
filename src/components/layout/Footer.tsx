import footerBg from '@/assets/footer-bg.webp'
import logo from '@/assets/logo.png'
import facebookIcon from '@/assets/social/facebook.svg'
import instagramIcon from '@/assets/social/instagram.svg'
import telegramIcon from '@/assets/social/telegram.svg'
import xIcon from '@/assets/social/x.svg'
import youtubeIcon from '@/assets/social/youtube.svg'

const socials = [
  { name: 'X', icon: xIcon },
  { name: 'Telegram', icon: telegramIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'Facebook', icon: facebookIcon },
]

const linkGroups = [
  { title: '項目', links: ['鑄造', 'RWA', '邀請'] },
  { title: '關於我們', links: ['官網', '幫助中心', '白皮書'] },
  { title: '公司', links: ['關於我們', '文章', '聯系我們'] },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-4xl border-t border-white/16 pt-8 pb-11">
      <img
        src={footerBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -top-30.25 left-[calc(50%-720.5px)] h-165.5 w-298 max-w-none opacity-8"
      />

      <div className="relative">
        <div className="relative mx-auto h-10.5 w-33.5 overflow-hidden">
          <img src={logo} alt="Whotel" className="absolute -top-3.5 -left-2 w-36.75 max-w-none" />
        </div>

        <div className="mt-3.5 flex justify-center gap-4">
          {socials.map(({ name, icon }) => (
            <a key={name} aria-label={name} className="group relative flex size-8 items-center justify-center rounded-xl">
              <span className="absolute inset-0 rounded-xl bg-linear-[102.78deg] from-[#eb5a0d] to-[#f59c0b] opacity-0 group-hover:opacity-100" />
              <img src={icon} alt="" className="relative opacity-60" />
            </a>
          ))}
        </div>

        <div className="mx-4 mt-5.75 h-px bg-linear-to-r from-[rgba(54,98,254,0)] via-[#00e5ff] via-[51.923%] to-[rgba(54,98,254,0)] opacity-40" />

        <nav className="mx-auto mt-10 flex w-67.5 justify-between">
          {linkGroups.map(({ title, links }) => (
            <div key={title} className="flex flex-col items-center">
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4.5 flex flex-col items-center gap-3.75 text-xs">
                {links.map((link) => (
                  <li key={link}>
                    <a className="opacity-80">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs">
          ©2026 Whotel. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
