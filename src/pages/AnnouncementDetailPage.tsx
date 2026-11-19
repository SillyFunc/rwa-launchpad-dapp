import { skipToken, useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router'
import { Button, Empty, Loading } from 'tdesign-mobile-react'

import { getAnnouncementDetail } from '@/api/announcements.ts'
import { ApiError } from '@/api/client.ts'
import { PageTitle } from '@/components/common/PageTitle.tsx'
import { m } from '@/paraglide/messages.js'
import { formatDateTime } from '@/utils/format.ts'
import { pickLocalized, sanitizeRichText } from '@/utils/richText.ts'

export function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>()
  const announcementId = Number(id)
  const isValidId = Number.isSafeInteger(announcementId) && announcementId > 0
  const announcement = useQuery({
    queryKey: ['announcementDetail', announcementId],
    queryFn: isValidId
      ? ({ signal }) => getAnnouncementDetail(announcementId, signal)
      : skipToken,
    select: (data) => {
      if (!data) return null
      const title = pickLocalized(data.titleZhHant, data.titleEn) ?? ''
      const content = pickLocalized(data.contentZhHant, data.contentEn)
      return {
        title,
        html: content ? sanitizeRichText(content, title) : '',
        publisher: data.publisher,
        publishTime: data.publishTime,
      }
    },
  })

  if (!isValidId) return <Navigate to="/announcementList" replace />

  let body
  if (announcement.isPending) {
    body = (
      <div role="status" className="flex justify-center py-20">
        <Loading text={m.announcement_detail_loading()} />
      </div>
    )
  } else if (announcement.isError && !announcement.data) {
    // 业务错误（code≠0）表示公告不存在、已下线或未到发布时间，重试无效
    body =
      announcement.error instanceof ApiError &&
      announcement.error.code !== undefined ? (
        <Empty
          className="py-20"
          description={m.announcement_detail_not_found()}
        />
      ) : (
        <Empty
          className="py-20"
          description={m.announcement_detail_load_failed()}
          action={
            <Button
              shape="round"
              variant="outline"
              onClick={() => announcement.refetch()}
            >
              {m.retry()}
            </Button>
          }
        />
      )
  } else if (!announcement.data) {
    body = (
      <Empty
        className="py-20"
        description={m.announcement_detail_not_found()}
      />
    )
  } else {
    const { title, html, publisher, publishTime } = announcement.data
    body = (
      <article className="mt-4 rounded-3xl border border-[#F0E510]/40 bg-linear-to-br from-[#4A5F73]/24 to-[#24313F]/24 p-4">
        <header className="border-b border-white/10 pb-3">
          <h2 className="text-xl leading-snug font-bold wrap-break-word text-[#FCD438]">
            {title || '--'}
          </h2>
          <p className="mt-2 flex min-w-0 items-center gap-2 text-xs text-[#A0A3A7]">
            <span className="min-w-0 truncate">{publisher}</span>
            <span
              aria-hidden
              className="size-0.5 shrink-0 rounded-full bg-current"
            />
            <time dateTime={publishTime} className="shrink-0 tabular-nums">
              {formatDateTime(publishTime)}
            </time>
          </p>
        </header>
        <div
          className="rich-text mt-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    )
  }

  return (
    <div className="px-3 py-6">
      <PageTitle title={m.announcement_title()} />
      {body}
    </div>
  )
}
