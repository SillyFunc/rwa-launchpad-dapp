import { useInfiniteQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import { Button, Empty, List, Loading, Progress } from 'tdesign-mobile-react'

import { listRwaProjects, type RwaProject } from '@/api/projects.ts'
import rwaAssetsBanner from '@/assets/home/banner-rwa-assets.webp'
import { ProjectDescriptionPreview } from '@/components/projects/ProjectDescriptionPreview.tsx'
import { m } from '@/paraglide/messages.js'
import { formatAmount, formatDateTime } from '@/utils/format.ts'
import {
  formatTokenSymbol,
  getProjectDescription,
  PROJECT_DESCRIPTION_SECTION_ID,
} from '@/utils/projects.ts'

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
      footer={
        projects.isFetching ? (
          <div role="status" className="flex justify-center pt-4">
            <Loading text={m.project_list_loading()} />
          </div>
        ) : projects.hasNextPage ? (
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
  const tokenSymbol = formatTokenSymbol(project.symbol)
  const description = getProjectDescription(project)
  const progressPercentage =
    project.vestingRate == null
      ? null
      : Math.min(100, Math.max(0, project.vestingRate * 100))
  const progressLabel =
    progressPercentage == null ? '--' : `${formatAmount(progressPercentage)}%`

  return (
    <article className="relative rounded-3xl border border-[#FCD438] bg-[#1D1D1D] p-3">
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
          <Link
            to={`/projectDetail/${project.id}`}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#FCD438]"
          >
            {project.name}
          </Link>
        </h2>
        <Link
          to={`/projectDetail/${project.id}#${PROJECT_DESCRIPTION_SECTION_ID}`}
          aria-label={`${m.project_read_full_description()}: ${project.name}`}
          className="relative z-10 mb-3 block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCD438]"
        >
          <ProjectDescriptionPreview description={description}>
            <span
              aria-hidden
              className="flex size-6 shrink-0 items-center justify-center rounded-full text-[#FCD438]"
            >
              <ChevronDown className="size-4" />
            </span>
          </ProjectDescriptionPreview>
        </Link>
        <div className="mb-2.5">
          <div className="mb-1.5 flex items-center justify-between text-base font-semibold text-white tabular-nums">
            <span className="min-w-0 truncate">
              {project.tokenAmount == null
                ? '--'
                : `${formatAmount(project.tokenAmount)} ${tokenSymbol}`}
            </span>
            <span className="min-w-0 truncate">{progressLabel}</span>
          </div>
          <div
            role="progressbar"
            aria-label={m.project_progress()}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercentage ?? undefined}
            aria-valuetext={progressLabel}
          >
            <Progress
              percentage={progressPercentage ?? 0}
              label={false}
              color={{ from: '#FEFE00', to: '#CF4F00' }}
              trackColor="rgba(255, 255, 255, 0.1)"
              className="[&_.t-progress\_\_bar]:h-1.5 [&_.t-progress\_\_bar]:p-px"
            />
          </div>
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
        <span className="flex h-10 w-full items-center justify-center rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-base font-semibold text-[#090E11] uppercase">
          {m.project_see_more()}
        </span>
      </div>
    </article>
  )
}
