import { Empty } from 'tdesign-mobile-react'
import { PageTitle } from '@/components/common/PageTitle.tsx'
import { m } from '@/paraglide/messages.js'

// 资产发行尚未开放，暂无接口，固定展示空态
export function ConsolePage() {
  return (
    <div className="px-3 py-6">
      <PageTitle title={m.console_title()} />
      <Empty className="py-20" description={m.console_empty()} />
    </div>
  )
}
