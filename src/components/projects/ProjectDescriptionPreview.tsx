import { ChevronDown } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'

import { m } from '@/paraglide/messages.js'

export function ProjectDescriptionPreview({
  description,
  controls,
  onReadMore,
}: {
  description?: string
  controls: string
  onReadMore: () => void
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
      {description && isTruncated ? (
        <button
          type="button"
          aria-label={m.project_read_full_description()}
          aria-controls={controls}
          onClick={onReadMore}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#FCD438] hover:bg-[#FCD438]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCD438]"
        >
          <ChevronDown aria-hidden className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
