import { useNavigate } from 'react-router'

import iconBackUrl from '@/assets/back.svg?url'

export interface PageTitleProps {
  title: string
}
export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const nav = useNavigate()
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <button
        type="button"
        aria-label="返回"
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center transition-colors"
        onClick={() => nav(-1)}
      >
        <img
          aria-hidden
          loading="lazy"
          decoding="async"
          src={iconBackUrl}
          className="size-full text-transparent"
          alt=""
        />
      </button>
      <h1 className="min-w-0 text-lg whitespace-nowrap text-white">
        <span className="min-w-0 truncate">{title}</span>
      </h1>
    </div>
  )
}
