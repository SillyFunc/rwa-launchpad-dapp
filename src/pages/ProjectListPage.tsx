import { useInfiniteQuery } from '@tanstack/react-query'
import { Button, Empty, List, Toast } from 'tdesign-mobile-react'

import { listRwaProjects, type RwaProject } from '@/api/projects.ts'
import rwaAssetsBanner from '@/assets/home/banner-rwa-assets.webp'
import { m } from '@/paraglide/messages.js'
import { formatAmount, formatDateTime } from '@/utils/format.ts'

const PAGE_SIZE = 10

export function ProjectListPage() {
  const projects = useInfiniteQuery({
    queryKey: ['rwaProjects'],
    queryFn: ({ pageParam, signal }) =>
      listRwaProjects({ pageNo: pageParam, pageSize: PAGE_SIZE }, signal),
    initialPageParam: 1,
    // 后端 number 从 0 开始，pageNo 从 1 开始
    getNextPageParam: (page) => (page.last ? undefined : page.number + 2),
  })

  const items = projects.data?.pages.flatMap((page) => page.content) ?? []

  if (projects.isError && items.length === 0) {
    return (
      <Empty
        className="py-20"
        description={m.project_list_load_failed()}
        action={
          <Button
            shape="round"
            variant="outline"
            onClick={() => projects.refetch()}
          >
            {m.retry()}
          </Button>
        }
      />
    )
  }

  if (projects.isSuccess && items.length === 0) {
    return <Empty className="py-20" description={m.project_list_empty()} />
  }

  const loadMore = () => {
    if (projects.hasNextPage && !projects.isFetchingNextPage) {
      projects.fetchNextPage()
    }
  }

  return (
    <List
      className="px-3 py-6"
      asyncLoading={
        projects.isFetching
          ? 'loading'
          : projects.hasNextPage
            ? 'load-more'
            : ''
      }
      onLoadMore={loadMore}
      onScroll={(bottomDistance) => {
        if (bottomDistance < 100) loadMore()
      }}
    >
      <div className="flex flex-col gap-4">
        {items.map((project, index) => (
          <ProjectCard key={project.id} project={project} eager={index === 0} />
        ))}
      </div>
    </List>
  )
}

function ProjectCard({
  project,
  eager,
}: {
  project: RwaProject
  eager: boolean
}) {
  return (
    <article className="rounded-3xl border border-[#FCD438] bg-[#1D1D1D] p-3">
      <div className="mb-3">
        <div className="relative h-71.25 w-full overflow-hidden rounded-2xl">
          <img
            src={project.coinImg || rwaAssetsBanner}
            alt=""
            decoding="async"
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            className="size-full object-cover"
          />
          <div className="absolute inset-x-5 top-0 flex gap-1.5 text-xs">
            <span className="rounded-br-sm rounded-bl-sm bg-white px-1.5 py-0.75 text-[#FB8B0F]">
              {m.project_tag_private_round()}
            </span>
            <span className="rounded-br-sm rounded-bl-sm bg-[#FCD438] px-1.5 py-0.75 text-[#090E11]">
              {m.project_tag_live()}
            </span>
            <span className="rounded-br-sm rounded-bl-sm bg-[#FB8B0F] px-1.5 py-0.75 text-[#090E11]">
              RWA
            </span>
          </div>
        </div>
      </div>
      <div className="mb-3.75">
        <h2 className="mb-2.5 max-w-full truncate bg-linear-[100deg] from-white to-[#FCD900] bg-clip-text text-2xl leading-none font-bold text-transparent uppercase">
          {project.name}
        </h2>
        <p className="mb-3 text-xs leading-relaxed wrap-break-word text-[#A0A3A7]">
          {m.project_total_pool_amount()}
        </p>
        <div className="mb-2.5 flex items-center justify-between text-base font-semibold text-white tabular-nums">
          <span className="min-w-0 truncate">
            {project.hardcap === null ? '--' : formatAmount(project.hardcap)}
          </span>
          <span className="min-w-0 truncate">0%</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A0A3A7]">{m.project_start_in()}</span>
            <span className="text-white tabular-nums">
              {project.startTime ? formatDateTime(project.startTime) : '--'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A0A3A7]">{m.project_end_in()}</span>
            <span className="text-white tabular-nums">
              {project.endTime ? formatDateTime(project.endTime) : '--'}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-full bg-linear-to-r from-[#FCCC1F]/10 to-[#EFBA09]/10 p-1">
        <button
          type="button"
          aria-label={m.project_see_more_aria()}
          onClick={() => Toast(m.coming_soon())}
          className="h-10 w-full cursor-pointer rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-base font-semibold text-[#090E11] uppercase"
        >
          {m.project_see_more()}
        </button>
      </div>
    </article>
  )
}
