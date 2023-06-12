import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface MajorRankVO {
  id: string;
  majorName: string;
  facultyName: string;
  score: string;
}

export const getMajorRanking = async (params: Page): Promise<ApiResult<PageResult<MajorRankVO[]>>> => {
  return await get('/stuScore/majorRanking', params);
};
