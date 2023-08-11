import { get, post } from '@/api/api'
import type { FlowerVO, FlowerForm } from './type'

enum API {
  GET_FLOWERS_EXCHANGE_NUM_URL = '/growthModel/flowers',
  SET_FLOWERS_EXCHANGE_NUM_URL = '/growthModel/setFlowerConfig',
}

/**
 * 获取花朵兑换数
 * @returns
 */
export const reqFlowerExchangeNum = async () =>
  get<FlowerVO>(API.GET_FLOWERS_EXCHANGE_NUM_URL)

/**
 * 设置花朵兑换数
 * @returns
 */
export const setFlowerConfig = async (data: FlowerForm) =>
  post(API.SET_FLOWERS_EXCHANGE_NUM_URL, data)
