import { useInfiniteQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button, Empty, List, Loading } from 'tdesign-mobile-react'

import {
  listAnnouncements,
  type AnnouncementSummary,
} from '@/api/announcements.ts'
import { PageTitle } from '@/components/common/PageTitle.tsx'
import { m } from '@/paraglide/messages.js'
import { formatDateTime } from '@/utils/format.ts'
import { pickLocalized } from '@/utils/richText.ts'

const PAGE_SIZE = 10

export function AnnouncementListPage() {
  const announcements = useInfiniteQuery({
    queryKey: ['announcements'],
    queryFn: ({ pageParam, signal }) =>
      listAnnouncements({ pageNo: pageParam, pageSize: PAGE_SIZE }, signal),
    initialPageParam: 1,
    // 后端 number 从 0 开始，pageNo 从 1 开始
    getNextPageParam: (page) => (page.last ? undefined : page.number + 2),
  })
  const items = announcements.data?.pages.flatMap((page) => page.content) ?? []

  let body
  if (announcements.isError && items.length === 0) {
    body = (
      <Empty
        className="py-20"
        description={m.announcement_list_load_failed()}
        action={
          <Button
            shape="round"
            variant="outline"
            onClick={() => announcements.refetch()}
          >
            {m.retry()}
          </Button>
        }
      />
    )
  } else if (announcements.isSuccess && items.length === 0) {
    body = <Empty className="py-20" description={m.announcement_list_empty()} />
  } else {
    const loadMore = () => {
      if (announcements.hasNextPage && !announcements.isFetchingNextPage) {
        announcements.fetchNextPage()
      }
    }
    body = (
      <List
        className="mt-4"
        footer={
          announcements.isFetching ? (
            <div role="status" className="flex justify-center pt-4">
              <Loading text={m.announcement_list_loading()} />
            </div>
          ) : announcements.hasNextPage ? (
            <div className="flex justify-center pt-4">
              <Button variant="text" onClick={loadMore}>
                {m.load_more()}
              </Button>
            </div>
          ) : null
        }
        onScroll={(bottomDistance) => {
          if (bottomDistance < 100) loadMore()
        }}
      >
        <ul className="flex flex-col gap-3">
          {items.map((announcement) => (
            <li key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </li>
          ))}
        </ul>
      </List>
    )
  }

  return (
    <div className="px-3 py-6">
      <PageTitle title={m.announcement_title()} />
      {body}
    </div>
  )
}

function AnnouncementCard({
  announcement,
}: {
  announcement: AnnouncementSummary
}) {
  const title = pickLocalized(announcement.titleZhHant, announcement.titleEn)
  return (
    <Link
      to={`/announcementDetail/${announcement.id}`}
      className="flex items-center gap-3 rounded-2xl border border-[#F0E510]/40 bg-linear-to-br from-[#4A5F73]/24 to-[#24313F]/24 p-4 transition-colors hover:border-[#FCD438] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCD438]"
    >
      <div className="min-w-0 flex-1">
        <h2 className="line-clamp-2 text-base leading-snug font-semibold wrap-break-word text-white">
          {title || '--'}
        </h2>
        <p className="mt-2 flex min-w-0 items-center gap-2 text-xs text-[#A0A3A7]">
          <span className="min-w-0 truncate">{announcement.publisher}</span>
          <span
            aria-hidden
            className="size-0.5 shrink-0 rounded-full bg-current"
          />
          <time
            dateTime={announcement.publishTime}
            className="shrink-0 tabular-nums"
          >
            {formatDateTime(announcement.publishTime)}
          </time>
        </p>
      </div>
      <ChevronRight aria-hidden className="size-4 shrink-0 text-[#FCD438]" />
    </Link>
  )
}
