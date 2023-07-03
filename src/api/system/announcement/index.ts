import { ApiResult, get, post, del } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface Announcement {
  id: number;
  title: string;
  type: number;
  scope: number;
  content: string;
  state: number;
  createUser: number;
  createTime: Date;
  updateTime: Date;
}

export interface AnnouncementVO {
  id?: number;
  title: string;
  type: number;
  scope: number;
  userIds: number[];
  publish?: boolean;
}

export interface AnnouncementPremUserVO {
  id?: number;
  username: string;
  userType: number;
}

export const getAnnouncementPage = async (params: Page): Promise<ApiResult<PageResult<AnnouncementVO[]>>> => {
  return await get('/announcement/page', params);
};

export const saveOrUpdateAnnouncement = async (data: AnnouncementVO) => {
  return await post('/announcement/save_update', data);
};

export const delAnnouncement = async (id: number) => {
  return await del('/announcement/del/' + id);
};

export const publishAnnouncement = async (id: number) => {
  return await get('/announcement/publish/' + id);
};

export const getAnnouncementPremUser = async (
  params: Page
): Promise<ApiResult<PageResult<AnnouncementPremUserVO[]>>> => {
  return await get('/announcement/premUser/page', params);
};

export const getAnnouncementMyPage = async (params?: Page): Promise<ApiResult<PageResult<AnnouncementVO[]>>> => {
  return await get('/announcement/myPage', params);
};

export const getAnnouncementById = async (id: number): Promise<ApiResult<Announcement>> => {
  return await get('/announcement/' + id);
};
