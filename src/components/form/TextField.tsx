import type { AnyFieldApi } from '@tanstack/react-form'
import { getFieldError } from '@/utils/form.ts'
import { FieldError } from './FieldError.tsx'
import { FieldLabel } from './FieldLabel.tsx'

export function TextField({
  field,
  label,
  placeholder,
  type = 'text',
}: {
  field: AnyFieldApi
  label: string
  placeholder: string
  type?: 'text' | 'email'
}) {
  const error = getFieldError(field)
  const errorId = `${field.name}-error`

  return (
    <div className="flex flex-col gap-3.5">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className="flex flex-col gap-1.5">
        <input
          id={field.name}
          name={field.name}
          type={type}
          required
          placeholder={placeholder}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`bg-black/10 rounded-xl border ${error ? 'border-[#FF0000]' : 'border-white/40'} h-10.5 px-4 text-sm placeholder:text-white/40`}
        />
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    </div>
  )
}
