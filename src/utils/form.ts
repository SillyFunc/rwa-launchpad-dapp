import type { AnyFieldApi } from '@tanstack/react-form'

export function getFieldError(field: AnyFieldApi): string | undefined {
  return field.state.meta.errors[0]?.message
}
