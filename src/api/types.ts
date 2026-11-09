export interface PageParams {
  pageNo: number
  pageSize: number
}

export interface PageResult<T> {
  content: T[]
  first: boolean
  last: boolean
  /** 从 0 开始的页码 */
  number: number
  size: number
  numberOfElements: number
  totalPages: number
  totalElements: number
  sort: {
    direction: 'ASC' | 'DESC'
    property: string
    ignoreCase: boolean
    nullHandling: string
    ascending: boolean
    descending: boolean
  }[]
}
