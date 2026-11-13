import { m } from '@/paraglide/messages.js'

export interface ProjectOverviewContent {
  description: string
  items: readonly string[]
}

const emptyItems = ['', '', '', ''] as const

export function ProjectOverviewPanel({
  title,
  emptyDescription,
  content,
}: {
  title: string
  emptyDescription: string
  content?: ProjectOverviewContent
}) {
  const items = content?.items.length ? content.items : emptyItems

  return (
    <div className="space-y-3">
      <div className="min-h-36 rounded-3xl border border-[#F0E510]/40 bg-linear-to-br from-[#4A5F73]/24 to-[#24313F]/24 p-4">
        <h3 className="text-base leading-5 font-bold text-white">{title}</h3>
        <p className="mt-2 text-xs leading-tight wrap-break-word whitespace-pre-line text-white/60">
          {content?.description.trim() || emptyDescription}
        </p>
      </div>
      <ol className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="min-h-38 min-w-0 rounded-3xl border border-[#FCD438]/40 bg-linear-to-br from-[#212018] to-[#212121] px-3 py-4"
          >
            <span
              aria-hidden
              className="inline-block bg-linear-to-r from-[#FEFE00] to-[#CF4F00] bg-clip-text pr-1 text-xl leading-6 font-medium text-transparent italic"
            >
              #{index + 1}
            </span>
            <p className="mt-3 text-xs leading-tight wrap-break-word whitespace-pre-line text-white/60">
              {item.trim() || m.project_overview_item_empty()}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
