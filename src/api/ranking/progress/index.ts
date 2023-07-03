import { ApiResult, get } from '@/api/api';

export interface ProgressRankVO {
  rank: number;
  year: number;
  month: number;
  studentName: string;
  studentNo: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  facultyName: string;
  majorName: string;
  score: number;
  rankTrend: number;
  rankChange: number;
  scoreChange: number;
}

export const getProgressRank = async (): Promise<ApiResult<ProgressRankVO[]>> => {
  return await get('/rank/progress');
};
