export interface Menu {
  oid: number
  pid: number
  name: string
  code?: string
  path?: string
  flag?: number
  icon?: string
  type: number
  sort: number
  keepAlive?: number
  permission?: string
  hidden?: boolean
  redirect?: string
}
