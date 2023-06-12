import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface SchoolRankVO {
  id: string;
  studentName: string;
  studentNo: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  majorName: string;
  score: string;
}

export const getSchoolRanking = async (params: Page): Promise<ApiResult<PageResult<SchoolRankVO[]>>> => {
  return await get('/stuScore/schoolRanking', params);
};
