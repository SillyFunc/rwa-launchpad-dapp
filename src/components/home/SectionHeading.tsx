import type { ReactNode } from 'react'

type SectionHeadingProps = {
  title: string
  underlineClassName: string
  children?: ReactNode
}

export function SectionHeading({
  title,
  underlineClassName,
  children,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="bg-linear-to-r from-[#fefe00] to-[#cf4f00] bg-clip-text text-xl leading-6 font-semibold whitespace-nowrap text-transparent">
        {title}
      </h2>
      <span
        className={`h-0.5 bg-linear-to-r from-[#fefe00] to-[#cf4f00] opacity-60 ${underlineClassName}`}
      />
      {children}
    </div>
  )
}
