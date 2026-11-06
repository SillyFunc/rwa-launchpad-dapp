import type { ReactNode } from 'react'

export function FieldLabel({
  htmlFor,
  id,
  children,
}: {
  htmlFor?: string
  id?: string
  children: ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className="text-base font-semibold text-white"
    >
      <span aria-hidden className="mr-1 text-[#FF0000]">
        *
      </span>
      {children}
    </label>
  )
}
