export interface SaTokenInfo {
  tokenName: string
  tokenValue: string
  isLogin: boolean
  loginId: any
  loginType: string
  tokenTimeout: number
  sessionTimeout: number
  tokenSessionTimeout: number
  tokenActiveTimeout: number
  loginDevice: string
  tag: string
}

export interface ResponseData<T> {
  code: number
  msg: string
  data: T
  tokenInfo?: SaTokenInfo
  roleCodeList?: string[]
  permissionList?: string[]
}

export interface SaResult<T> {
  code: number
  msg: string
  data: T
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
