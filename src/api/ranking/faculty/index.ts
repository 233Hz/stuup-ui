import { ApiResult, get } from '@/api/api';

export interface FacultyRankVO {
  facultyId: number;
  rank: number;
  facultyName: string;
  score: number;
}

export const getFacultyRank = async (): Promise<ApiResult<FacultyRankVO[]>> => {
  return await get('/rank/realTime/faculty');
};
