export interface Menu {
  oid: number
  pid: number
  name: string
  code: string
  path: string
  flag: number
  icon: string
  hidden: boolean
  redirect?: string
}

export interface MenuTree extends Menu {
  children?: MenuTree[]
}
