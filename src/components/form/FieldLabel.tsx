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
      <span aria-hidden className="text-[#FF0000] mr-1">
        *
      </span>
      {children}
    </label>
  )
}
