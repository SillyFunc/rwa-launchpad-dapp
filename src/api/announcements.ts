import { get } from './client.ts'
import type { PageParams, PageResult } from './types.ts'

export interface AnnouncementSummary {
  id: number
  titleZhHant: string
  titleEn: string
  publisher: string
  /** 格式 `YYYY-MM-DD HH:mm:ss`（GMT+8） */
  publishTime: string
}

/** 正文为服务端原样返回的富文本 HTML，渲染前必须净化 */
export interface AnnouncementDetail extends AnnouncementSummary {
  contentZhHant: string
  contentEn: string
}

/** `pageSize` 上限 50 */
export function listAnnouncements(params: PageParams, signal?: AbortSignal) {
  return get<PageResult<AnnouncementSummary>>(
    'deposit/platformAnnouncement/page',
    params,
    signal,
  )
}

export function getAnnouncementDetail(id: number, signal?: AbortSignal) {
  return get<AnnouncementDetail>(
    'deposit/platformAnnouncement/detail',
    { id },
    signal,
  )
}
