import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { Button, Empty, Loading } from 'tdesign-mobile-react'

import { ApiError } from '@/api/client.ts'
import { getGameplayGuide, type GameplayGuide } from '@/api/gameplayGuide.ts'
import { PageTitle } from '@/components/common/PageTitle.tsx'
import { getLocale } from '@/i18n/locale.ts'
import { m } from '@/paraglide/messages.js'
import { formatDateTime } from '@/utils/format.ts'

function getLocalizedContent(guide: GameplayGuide) {
  const zh = guide.contentZhHant?.trim()
  const en = guide.contentEn?.trim()
  return getLocale() === 'zh-Hant' ? zh || en : en || zh
}

function sanitize(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select'],
    FORBID_ATTR: ['style'],
  })
}

export function GameplayGuidePage() {
  const guide = useQuery({
    queryKey: ['gameplayGuide'],
    queryFn: ({ signal }) => getGameplayGuide(signal),
    select: (data) => {
      const content = data && getLocalizedContent(data)
      return content
        ? { html: sanitize(content), updateTime: data.updateTime }
        : null
    },
  })

  let body
  if (guide.isPending) {
    body = (
      <div role="status" className="flex justify-center py-20">
        <Loading text={m.gameplay_guide_loading()} />
      </div>
    )
  } else if (guide.isError && !guide.data) {
    // 业务错误（code≠0）表示后端未配置或数据缺失，重试无效
    body =
      guide.error instanceof ApiError && guide.error.code !== undefined ? (
        <Empty className="py-20" description={m.gameplay_guide_empty()} />
      ) : (
        <Empty
          className="py-20"
          description={m.gameplay_guide_load_failed()}
          action={
            <Button
              shape="round"
              variant="outline"
              onClick={() => guide.refetch()}
            >
              {m.retry()}
            </Button>
          }
        />
      )
  } else if (!guide.data) {
    body = <Empty className="py-20" description={m.gameplay_guide_empty()} />
  } else {
    const { html, updateTime } = guide.data
    body = (
      <div className="mt-4 rounded-3xl border border-[#F0E510]/40 bg-linear-to-br from-[#4A5F73]/24 to-[#24313F]/24 p-4">
        <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
        {updateTime ? (
          <p className="mt-4 border-t border-white/10 pt-3 text-right text-xs text-[#A0A3A7] tabular-nums">
            {m.gameplay_guide_updated_at({ time: formatDateTime(updateTime) })}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="px-3 py-6">
      <PageTitle title={m.gameplay_guide_title()} />
      {body}
    </div>
  )
}
