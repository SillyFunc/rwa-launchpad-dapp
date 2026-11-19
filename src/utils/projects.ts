import type { RwaProject } from '@/api/projects.ts'
import { getLocale } from '@/i18n/locale.ts'

export const PROJECT_DESCRIPTION_SECTION_ID = 'project-description'

export function getProjectDescription(
  project: Pick<RwaProject, 'zhIntroduction' | 'enIntroduction'>,
) {
  return getLocale() === 'zh-Hant'
    ? project.zhIntroduction?.trim() || project.enIntroduction?.trim()
    : project.enIntroduction?.trim() || project.zhIntroduction?.trim()
}

export function formatTokenSymbol(symbol: string) {
  return symbol.startsWith('$') ? symbol : `$${symbol}`
}
