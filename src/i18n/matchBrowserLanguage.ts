const traditionalChineseRegions = new Set(['TW', 'HK', 'MO'])

export type AppLocale = 'en' | 'zh-Hant'

function normalizeTag(tag: string) {
  return tag.trim().replaceAll('_', '-')
}

function isTraditionalChinese(tag: string) {
  try {
    const locale = new Intl.Locale(tag)
    if (locale.language !== 'zh' || locale.script === 'Hans') return false
    if (locale.script === 'Hant') return true
    return (
      locale.region !== undefined &&
      traditionalChineseRegions.has(locale.region)
    )
  } catch {
    return false
  }
}

function matchTag(tag: string): AppLocale | undefined {
  const normalized = normalizeTag(tag)
  if (!normalized) return undefined

  const lower = normalized.toLowerCase()
  if (lower === 'en') return 'en'
  if (lower === 'zh-hant') return 'zh-Hant'
  if (isTraditionalChinese(normalized)) return 'zh-Hant'

  const base = lower.split('-')[0]
  if (base === 'en') return 'en'
  return undefined
}

export function matchBrowserLanguage(
  languages: readonly string[],
): AppLocale | undefined {
  for (const language of languages) {
    const matched = matchTag(language)
    if (matched) return matched
  }
  return undefined
}
