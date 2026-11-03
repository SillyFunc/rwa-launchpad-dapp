import { getLocale, locales, setLocale } from '@/i18n/locale.ts'
import { m } from '@/paraglide/messages.js'

const languageName = {
  en: m.language_name_en,
  'zh-Hant': m.language_name_zh_hant,
} satisfies Record<(typeof locales)[number], () => string>

export function LanguageSwitcher() {
  const locale = getLocale()

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-xs text-white/80">
        {m.language_current({ language: languageName[locale]() })}
      </p>
      <div
        role="group"
        aria-label={m.language_switcher_label()}
        className="flex h-10 w-full rounded-full bg-slate-700 p-1 text-sm"
      >
        {locales.map((option) => {
          const selected = option === locale
          return (
            <button
              key={option}
              type="button"
              lang={option}
              aria-pressed={selected}
              onClick={() => setLocale(option)}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
                selected
                  ? 'bg-linear-to-r from-yellow-400 to-amber-400 font-medium text-[#090E11]'
                  : 'text-white'
              }`}
            >
              {languageName[option]()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
