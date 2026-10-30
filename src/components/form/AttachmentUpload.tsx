import { useRef } from 'react'
import { CirclePlus, FileText, X } from 'lucide-react'
import { formatFileSize } from '@/utils/format.ts'

type AttachmentUploadProps = {
  id: string
  labelId: string
  files: File[]
  accept: string
  maxFiles: number
  invalid?: boolean
  describedBy?: string
  onChange: (files: File[]) => void
  onBlur?: () => void
}

export function AttachmentUpload({
  id,
  labelId,
  files,
  accept,
  maxFiles,
  invalid,
  describedBy,
  onChange,
  onBlur,
}: AttachmentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isFull = files.length >= maxFiles

  return (
    <div className="flex flex-col gap-2">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        // 用 aria-disabled 而非 disabled，删除文件后焦点才能移回这个按钮
        aria-disabled={isFull}
        aria-labelledby={`${labelId} ${id}`}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => {
          if (!isFull) inputRef.current?.click()
        }}
        onBlur={onBlur}
        className={`flex h-10.5 w-full items-center justify-center gap-2 rounded-xl border border-dashed ${invalid ? 'border-[#FF0000]' : 'border-white/40'} bg-black/30 text-base font-semibold text-[#FCD438] cursor-pointer aria-disabled:cursor-not-allowed aria-disabled:opacity-40`}
      >
        <CirclePlus aria-hidden className="size-5" strokeWidth={1.5} />
        Attachment(s)
      </button>
      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {files.map((file, index) => (
            <li
              key={`${index}-${file.name}-${file.lastModified}`}
              className="flex h-10 items-center gap-2 rounded-xl bg-black/30 pl-3 pr-1 text-sm"
            >
              <FileText aria-hidden className="size-4 shrink-0 text-white/60" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-white/40">
                {formatFileSize(file.size)}
              </span>
              <button
                type="button"
                aria-label={`移除 ${file.name}`}
                onClick={() => {
                  onChange(files.filter((_, i) => i !== index))
                  triggerRef.current?.focus()
                }}
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/60 cursor-pointer"
              >
                <X aria-hidden className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        hidden
        onChange={(event) => {
          const selected = Array.from(event.currentTarget.files ?? [])
          if (selected.length > 0) onChange([...files, ...selected])
          event.currentTarget.value = ''
        }}
      />
    </div>
  )
}
