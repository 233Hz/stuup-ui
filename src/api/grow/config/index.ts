import { ApiResult, get, post, del, download } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface GrowthTreeVO {
  id?: number;
  pid?: number;
  name: string;
  description?: string;
  sort: number;
  children?: GrowthTreeVO[] | [];
}

export interface GrowthVO {
  id?: number;
  pid?: number;
  name: string;
  description?: string;
  sort?: number;
}

export interface GrowthItemVO {
  id: number;
  name: string;
  code: string;
  description?: string;
  scorePeriod?: number;
  scoreUpperLimit: number;
  collectLimit: number;
  calculateType?: number;
  score?: number;
  gatherer?: number;
  growthItems: number[];
  firstLevelId: number;
  secondLevelId?: number;
  threeLevelId?: number;
}

export const getGrowthTree = async (): Promise<ApiResult<GrowthTreeVO[]>> => {
  return await get('/growth/tree');
};

export const saveOrUpdateGrowth = async (data: GrowthVO): Promise<ApiResult<number>> => {
  return await post('/growth/saveOrUpdate', data);
};

export const delGrowth = async (id: number) => {
  return await post('/growth/del/' + id);
};

export const getGrowthItemPage = async (params: Page): Promise<ApiResult<PageResult<GrowthItemVO[]>>> => {
  return await get('/growthItem/page', params);
};

export const saveOrUpdateGrowthItem = async (data: GrowthItemVO): Promise<ApiResult<number>> => {
  return await post('/growthItem/saveOrUpdate', data);
};

export const delGrowthItem = async (id: number) => {
  return await del('/growthItem/del/' + id);
};

export const getUserGrowthItems = async (): Promise<ApiResult<GrowthItemVO[]>> => {
  return await get('/growthItem/myGrowthItems');
};

export const manualTask = async (num: number) => {
  return await get(`/manualTask/task${num}`);
};

export const downTemp = async (rec_code: string) => {
  await download('/grow/downTemp', { rec_code });
};

export const setGrowthItemUser = async (growId: number, userIds: number[]) => {
  return await post('/growUser/setGrowthItemUser', { growId, userIds });
};

export const getGrowItemUser = async (growId: number) => {
  return await get('/growUser/getGrowItemUser/' + growId);
};
