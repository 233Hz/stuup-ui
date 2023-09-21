import type { RouteRecordRaw } from 'vue-router'

export const formatDate = (
  time: string,
  format: string = 'YYYY-MM-DD hh:mm:ss',
) => {
  const date = new Date(time)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const preArr = Array.apply(null, Array(10)).map((item, index) => '0' + index)

  return format
    .replace(/YYYY/g, String(year))
    .replace(/MM/g, preArr[month] || String(month))
    .replace(/DD/g, preArr[day] || String(day))
    .replace(/hh/g, preArr[hour] || String(hour))
    .replace(/mm/g, preArr[minute] || String(minute))
    .replace(/ss/g, preArr[second] || String(second))
}

/**
 * 过滤路由
 * @param routes
 * @param type
 * @returns
 */
export const filterRouter = (
  routes: RouteRecordRaw[],
  type: 1 | 2,
): RouteRecordRaw[] => {
  return routes.filter((route) => {
    if (route.meta?.flag === type) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, type)
      }
      return true
    }
  })
}

/**
 * 转换树形对象
 * @param list  需要转换的数组
 * @param cb    转换的方法
 * @returns
 */
export const convertTree = <T extends { children?: T[] }, K>(
  list: T[],
  cb: (item: T) => K,
): K[] => {
  return list.flatMap((item) => {
    const children = item.children ? convertTree(item.children, cb) : []
    return { ...cb(item), children }
  })
}
