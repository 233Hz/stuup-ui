import { ApiResult, get } from '@/api/api';
import { Page } from '@/types/global';

export interface StudentRecScoreVO {
  id: number;
  name: string;
  score: string;
  createTime: Date;
}

export interface StudentScoreDetailsVO {
  totalScore: number;
  records: StudentRecScoreVO[];
}

export const pageStudentRecScore = async (params: Page): Promise<ApiResult<StudentScoreDetailsVO>> => {
  return get('/stuScoreLog/page', params);
};
