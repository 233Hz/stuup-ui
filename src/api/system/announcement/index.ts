import { get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type { Notify, NotifyVO } from './type'

enum API {
  NOTIFY_PAGE = '/announcement/page',
  SAVE_UPDATE_NOTIFY = '/announcement/save_update',
  DEL_NOTIFY = '/announcement/del/',
  PUBLISH_NOTIFY = '/announcement/publish/',
  MY_NOTIFY_PAGE = '/announcement/my/notify/page',
  MY_SYSTEM_PAGE = '/announcement/my/system/page',
  QUERY_NOTIFY = '/announcement/',
}

export const reqNotifyPage = async (params: Page) => {
  return await get<PageResult<NotifyVO[]>>(API.NOTIFY_PAGE, params)
}

export const saveOrUpdateNotify = async (data: NotifyVO) => {
  return await post(API.SAVE_UPDATE_NOTIFY, data)
}

export const delNotify = async (id: number) => {
  return await del(API.DEL_NOTIFY + id)
}

export const publishNotify = async (id: number) => {
  return await get(API.PUBLISH_NOTIFY + id)
}

export const reqMyNotifyPage = async (params?: Page) => {
  return await get<PageResult<NotifyVO[]>>(API.MY_NOTIFY_PAGE, params)
}
export const reqMySystemPage = async (params?: Page) => {
  return await get<PageResult<NotifyVO[]>>(API.MY_SYSTEM_PAGE, params)
}

export const reqNotifyById = async (id: number) => {
  return await get<Notify>(API.QUERY_NOTIFY + id)
}
