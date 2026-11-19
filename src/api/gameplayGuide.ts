import { get } from './client.ts'

/** 富文本字段为根节点 `<article>` 的 HTML 片段 */
export interface GameplayGuide {
  contentZhHant: string
  contentEn: string
  /** 格式 `YYYY-MM-DD HH:mm:ss`（GMT+8） */
  updateTime: string | null
}

export function getGameplayGuide(signal?: AbortSignal) {
  return get<GameplayGuide | null>('deposit/gameplayGuide', undefined, signal)
}
