import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import iconPlusUrl from '@/assets/plus.svg?url'

type ImageUploadSlotProps = {
  id: string
  label: string
  file: File | null
  accept: string
  invalid?: boolean
  describedBy?: string
  onChange: (file: File | null) => void
  onBlur?: () => void
}

function usePreviewUrl(file: File | null) {
  const [preview, setPreview] = useState<{ file: File; url: string }>()

  useEffect(() => {
    if (!file?.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => setPreview({ file, url: reader.result as string })
    reader.readAsDataURL(file)
    return () => reader.abort()
  }, [file])

  return preview?.file === file ? preview.url : undefined
}

export function ImageUploadSlot({
  id,
  label,
  file,
  accept,
  invalid,
  describedBy,
  onChange,
  onBlur,
}: ImageUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const previewUrl = usePreviewUrl(file)

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-label={`上传${label}`}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => inputRef.current?.click()}
        onBlur={onBlur}
        className={`relative w-full overflow-hidden rounded-xl border border-dashed ${invalid ? 'border-[#FF0000]' : 'border-white/40'} bg-black/30 h-22.5 flex flex-col gap-2 items-center justify-center cursor-pointer`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <>
            <img className="size-6" src={iconPlusUrl} alt="" />
            <span className="text-white text-xs">Upload</span>
          </>
        )}
      </button>
      {file && (
        <button
          type="button"
          aria-label={`移除${label}`}
          onClick={() => {
            onChange(null)
            triggerRef.current?.focus()
          }}
          className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-white cursor-pointer"
        >
          <X aria-hidden className="size-4" />
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(event) => {
          const selected = event.currentTarget.files?.[0]
          if (selected) onChange(selected)
          event.currentTarget.value = ''
        }}
      />
    </div>
  )
}
