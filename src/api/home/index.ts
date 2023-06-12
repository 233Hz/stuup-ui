import { ApiResult, get } from '@/api/api';

export const getStudentScore = async (): Promise<ApiResult<number>> => {
  return get('/stuScore/getStudentScore');
};
