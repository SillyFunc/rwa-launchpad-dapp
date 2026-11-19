import { useQuery } from '@tanstack/react-query'
import { Button, Empty, Loading } from 'tdesign-mobile-react'

import { ApiError } from '@/api/client.ts'
import { getGameplayGuide } from '@/api/gameplayGuide.ts'
import { PageTitle } from '@/components/common/PageTitle.tsx'
import { m } from '@/paraglide/messages.js'
import { formatDateTime } from '@/utils/format.ts'
import { pickLocalized, sanitizeRichText } from '@/utils/richText.ts'

export function GameplayGuidePage() {
  const guide = useQuery({
    queryKey: ['gameplayGuide'],
    queryFn: ({ signal }) => getGameplayGuide(signal),
    select: (data) => {
      const content = data && pickLocalized(data.contentZhHant, data.contentEn)
      return content
        ? { html: sanitizeRichText(content), updateTime: data.updateTime }
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
