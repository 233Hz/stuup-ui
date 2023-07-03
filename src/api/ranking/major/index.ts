import { ApiResult, get } from '@/api/api';

export interface MajorRankVO {
  majorId: number;
  rank: number;
  majorName: string;
  facultyName: string;
  score: number;
}

export const getMajorRank = async (): Promise<ApiResult<MajorRankVO[]>> => {
  return await get('/rank/realTime/major');
};
