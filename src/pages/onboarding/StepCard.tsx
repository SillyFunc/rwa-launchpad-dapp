import type { ReactNode } from 'react'

export function StepCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="bg-[#1a1a1a] p-4 rounded-2xl mt-5 flex flex-col">
      <h2 className="max-w-max bg-clip-text text-transparent text-xl font-semibold bg-linear-to-r from-[#EEEEEE] to-[#FFC615]">
        {title}
      </h2>
      {children}
    </section>
  )
}
