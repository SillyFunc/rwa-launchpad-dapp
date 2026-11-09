import axios, { type AxiosRequestConfig } from 'axios'

import { m } from '@/paraglide/messages.js'

interface ApiEnvelope<T> {
  data: T
  code: number
  message: string
}

export class ApiError extends Error {
  readonly code?: number
  readonly status?: number

  constructor(
    message: string,
    options: { code?: number; status?: number; cause?: unknown } = {},
  ) {
    super(message, { cause: options.cause })
    this.name = 'ApiError'
    this.code = options.code
    this.status = options.status
  }
}

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error
  if (!axios.isAxiosError(error)) {
    return new ApiError(m.request_failed(), { cause: error })
  }

  const status = error.response?.status
  const message: unknown = error.response?.data?.message
  if (typeof message === 'string' && message.trim()) {
    return new ApiError(message, { status, cause: error })
  }
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError(m.request_timeout(), { cause: error })
  }
  if (status === undefined) {
    return new ApiError(m.network_connection_failed(), { cause: error })
  }
  return new ApiError(m.http_request_failed({ status }), {
    status,
    cause: error,
  })
}

function encodeParams(data: object) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue
    for (const item of Array.isArray(value) ? value : [value]) {
      params.append(key, String(item))
    }
  }
  return params
}

async function request<T>(url: string, config: AxiosRequestConfig) {
  let envelope: ApiEnvelope<T>
  try {
    envelope = (await client.request<ApiEnvelope<T>>({ url, ...config })).data
  } catch (error) {
    if (axios.isCancel(error)) throw error
    throw toApiError(error)
  }

  if (envelope.code !== 0) {
    throw new ApiError(envelope.message || m.request_failed(), {
      code: envelope.code,
    })
  }
  return envelope.data
}

export function get<T>(url: string, params?: object, signal?: AbortSignal) {
  return request<T>(url, {
    method: 'GET',
    params: params && encodeParams(params),
    signal,
  })
}

export function postForm<T>(url: string, data: object, signal?: AbortSignal) {
  return request<T>(url, { method: 'POST', data: encodeParams(data), signal })
}

export function postMultipart<T>(
  url: string,
  data: FormData,
  signal?: AbortSignal,
) {
  return request<T>(url, { method: 'POST', data, signal })
}
