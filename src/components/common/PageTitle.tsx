import iconBackUrl from '@/assets/back.svg?url'
import { useNavigate } from 'react-router'

export interface PageTitleProps {
  title: string
}
export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const nav = useNavigate()
  return (
    <div className="flex items-center flex-1 gap-1.5 min-w-0 px-3">
      <button
        type="button"
        aria-label="返回"
        className="flex items-center justify-center shrink-0 transition-colors size-6 cursor-pointer"
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
      <h1 className="min-w-0 whitespace-nowrap text-lg text-white">
        <span className="min-w-0 truncate">{title}</span>
      </h1>
    </div>
  )
}
