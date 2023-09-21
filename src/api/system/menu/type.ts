export interface Menu {
  id: number
  pid: number
  name: string
  code: string
  path: string
  icon: string
  type: number
  flag: number
  sort: number
  keepAlive: number
  permission: string
  layout: number
  hidden: number
  redirect: string
  createTime: Date
}

export interface MenuTree extends Menu {
  children?: MenuTree[]
}
