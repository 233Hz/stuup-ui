import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface ClassRankVO {
  id: string;
  yearName: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  score: string;
}

export const getClassRanking = async (params: Page): Promise<ApiResult<PageResult<ClassRankVO[]>>> => {
  return await get('/stuScore/schoolRanking', params);
};
