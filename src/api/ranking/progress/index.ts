import { ApiResult, get } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface ProgressRankVO {
  id: string;
  year: number;
  month: number;
  yearName: string;
  studentName: string;
  studentNo: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  majorName: string;
  score: string;
  progressState: number;
  progressRanking: number;
}

interface YearRankingQueryParams extends Page {
  yearId: number;
}

export const getProgressRanking = async (params: Record<string, any>): Promise<ApiResult<ProgressRankVO[]>> => {
  return await get('/rankingMonth/progressRanking', params);
};
