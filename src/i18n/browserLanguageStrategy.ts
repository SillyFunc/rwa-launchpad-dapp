import { defineCustomClientStrategy } from '@/paraglide/runtime.js'
import { matchBrowserLanguage } from './matchBrowserLanguage.ts'

defineCustomClientStrategy('custom-browserLanguage', {
  getLocale: () => {
    if (typeof navigator === 'undefined') return undefined
    return matchBrowserLanguage(navigator.languages)
  },
  setLocale: () => undefined,
})
