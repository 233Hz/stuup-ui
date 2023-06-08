import { ApiResult, get, post } from '@/api/api';

export interface FlowerVO {
  bmhSeed: number;
  bmhSprout: number;
  bmhBloom: number;
  bmhFruit: number;
  xcjSeed: number;
  xcjSprout: number;
  xcjBloom: number;
  xcjFruit: number;
  xhhSeed: number;
  xhhSprout: number;
  xhhBloom: number;
  xhhFruit: number;
  [key: string]: number;
}

export const getFlowerConfig = async (): Promise<ApiResult<FlowerVO>> => {
  return await get('/growthModel/flowers');
};

export const setFlowerConfig = async (data: { key: string; value: number }) => {
  return await post('/growthModel/setFlowerConfig', data);
};
