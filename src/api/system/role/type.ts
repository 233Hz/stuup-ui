export interface RoleVO {
  oid?: number
  roleName: string
  roleCode: string
  roleDesc: string
  createUserAdmin?: string
  createTime?: Date
}

export interface RoleMenuVO {
  roleId: number
  menuIds: number[]
}

export interface RoleDictVO {
  oid: number
  value: string
  disabled: boolean
}
