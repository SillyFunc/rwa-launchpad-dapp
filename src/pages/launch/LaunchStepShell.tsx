import type { ReactNode } from 'react'

export function LaunchStepShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby="launch-heading"
      className="gradient-border mt-5 flex flex-col items-center rounded-3xl bg-linear-to-br from-[#4A5F73]/25 to-[#24313F]/25 px-4 py-6"
    >
      <h2
        id="launch-heading"
        className="max-w-2xs bg-linear-to-br from-[#EEEEEE] to-[#FCD438] bg-clip-text text-center text-xl leading-tight font-semibold text-transparent"
      >
        {title}
      </h2>
      <p className="mt-2 text-center text-xs leading-tight text-white">
        {description}
      </p>
      {children}
    </section>
  )
}
