import { ApiResult, get, post, del } from '@/api/api';
import { Page, PageResult } from '@/types/global';

export interface StudentRecScoreVO {
  id: number;
  yearName?: string;
  firstLevelName?: string;
  secondLevelName?: string;
  threeLevelName?: string;
  growName?: string;
  score?: string;
  createTime?: Date;
  description?: Date;
}

export const pageStudentRecScore = async (params: Page): Promise<ApiResult<PageResult<StudentRecScoreVO[]>>> => {
  return get('/stuScoreLog/page', params);
};
