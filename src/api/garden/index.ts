import { ApiResult, get } from '@/api/api';
import { PageResult, Page } from '@/types/global';

export interface GrowGardenVO {
  studentId: number;
  studentName: string;
  gradeName: string;
  className: string;
  classTeacher: string;
  score: number;
}

export const getGrowGarden = async (params: Page): Promise<ApiResult<PageResult<GrowGardenVO[]>>> => {
  return get('/garden/page', params);
};
