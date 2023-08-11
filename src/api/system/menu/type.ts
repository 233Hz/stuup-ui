export interface Menu {
  oid: number
  pid: number
  name: string
  code: string
  path: string
  flag: number
  icon: string
  redirect: string
  hidden: boolean
  children: Menu[] | []
}
export type MenuList = Menu[]
