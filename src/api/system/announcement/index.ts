import { get, post, del } from '@/api/api'
import { Page, PageResult } from '@/types/global'
import type {
  Announcement,
  AnnouncementVO,
  AnnouncementPremUserVO,
} from './type'

export const getAnnouncementPage = async (params: Page) => {
  return await get<PageResult<AnnouncementVO[]>>('/announcement/page', params)
}

export const saveOrUpdateAnnouncement = async (data: AnnouncementVO) => {
  return await post('/announcement/save_update', data)
}

export const delAnnouncement = async (id: number) => {
  return await del('/announcement/del/' + id)
}

export const publishAnnouncement = async (id: number) => {
  return await get('/announcement/publish/' + id)
}

export const getAnnouncementPremUser = async (params: Page) => {
  return await get<PageResult<AnnouncementPremUserVO[]>>(
    '/announcement/premUser/page',
    params,
  )
}

export const getAnnouncementMyPage = async (params?: Page) => {
  return await get<PageResult<AnnouncementVO[]>>('/announcement/myPage', params)
}

export const getAnnouncementById = async (id: number) => {
  return await get<Announcement>('/announcement/' + id)
}
