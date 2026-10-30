import type { ReactNode } from 'react'

export function FieldError({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <p id={id} className="text-xs text-[#FF0000]">
      {children}
    </p>
  )
}
