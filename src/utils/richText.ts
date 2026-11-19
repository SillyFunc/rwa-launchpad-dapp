import DOMPurify from 'dompurify'

import { getLocale } from '@/i18n/locale.ts'

const SANITIZE_CONFIG = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select'],
  FORBID_ATTR: ['style'],
}

/** 按当前语言取双语字段，当前语言为空时回退到另一语言 */
export function pickLocalized(
  zhHant: string | null | undefined,
  en: string | null | undefined,
) {
  const zh = zhHant?.trim()
  const english = en?.trim()
  return getLocale() === 'zh-Hant' ? zh || english : english || zh
}

/**
 * 净化后端富文本 HTML。传入 `duplicateTitle` 时，若正文开头的 `<h1>` 与其相同则移除，
 * 避免页面标题与正文标题重复展示。
 */
export function sanitizeRichText(html: string, duplicateTitle?: string) {
  const fragment = DOMPurify.sanitize(html, {
    ...SANITIZE_CONFIG,
    RETURN_DOM_FRAGMENT: true,
  })
  const root = fragment.firstElementChild
  const heading = root?.tagName === 'ARTICLE' ? root.firstElementChild : root
  if (
    duplicateTitle &&
    heading?.tagName === 'H1' &&
    heading.textContent?.trim() === duplicateTitle.trim()
  ) {
    heading.remove()
  }
  const container = document.createElement('div')
  container.append(fragment)
  return container.innerHTML
}
