import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface YearRankVO {
  id: string;
  yearName: string;
  studentName: string;
  studentNo: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  majorName: string;
  score: string;
}

interface YearRankingQueryParams extends Page {
  yearId: number;
}

export const getYearRanking = async (params: YearRankingQueryParams): Promise<ApiResult<PageResult<YearRankVO[]>>> => {
  return await get('/rankingYear/yearRanking', params);
};
