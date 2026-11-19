import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

import { m } from '@/paraglide/messages.js'

export function ProjectDescriptionPreview({
  description,
  children,
}: {
  description?: string
  children: ReactNode
}) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useLayoutEffect(() => {
    const text = textRef.current
    if (!text) return

    const measure = () => setIsTruncated(text.scrollHeight > text.clientHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(text)
    return () => observer.disconnect()
  }, [description])

  return (
    <div className="flex items-end gap-2">
      <p
        ref={textRef}
        className="line-clamp-2 min-w-0 flex-1 text-xs leading-relaxed wrap-break-word whitespace-pre-line text-[#A0A3A7]"
      >
        {description || m.project_description_empty()}
      </p>
      {description && isTruncated ? children : null}
    </div>
  )
}
