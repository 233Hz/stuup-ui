export interface ResponseData<T> {
  code: number
  message: string
  data: T
  token?: string
}

export interface Page {
  current: number
  size: number
}

export interface PageResult<T> {
  current: number
  size: number
  total: number
  records: T
  pages: number
  start: number
}

export interface Tree {
  key: string
  value: any
  children: Tree[]
}

export interface File {
  id: number
  storageName: string
  originalName: string
  bucket: string
  suffix: string
  url: string
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
