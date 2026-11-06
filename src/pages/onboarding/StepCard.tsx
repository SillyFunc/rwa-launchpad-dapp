import type { ReactNode } from 'react'

export function StepCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-5 flex flex-col rounded-2xl bg-[#1a1a1a] p-4">
      <h2 className="max-w-max bg-linear-to-r from-[#EEEEEE] to-[#FFC615] bg-clip-text text-xl font-semibold text-transparent">
        {title}
      </h2>
      {children}
    </section>
  )
}
