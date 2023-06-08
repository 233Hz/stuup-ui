import { PERIOD, CALCULATE_TYPE, LEVEL, MILITARY_LEVEL, WHETHER } from './constant';
import { EnumImpl } from '@/utils/util';

export const PERIOD_NAMES = {
  [PERIOD.UNLIMITED]: '不限',
  [PERIOD.DAY]: '每天',
  [PERIOD.WEEK]: '每周',
  [PERIOD.MONTH]: '每月',
  [PERIOD.SEMESTER]: '每学期',
  [PERIOD.YEAR]: '每年',
  [PERIOD.THREE_YEAR]: '三年',
};

export const CALCULATE_TYPE_NAMES = {
  [CALCULATE_TYPE.ADD]: '录入加分',
  [CALCULATE_TYPE.SUBTRACT]: '录入减分',
};

export const LEVEL_NAMES = {
  [LEVEL.SCHOOL]: '校级',
  [LEVEL.DISTRICT]: '区（行级）',
  [LEVEL.CITY]: '市级',
  [LEVEL.COUNTRY]: '国家',
  [LEVEL.INTERNATIONAL]: '国际',
};

export const MILITARY_LEVEL_NAMES = {
  [MILITARY_LEVEL.QUALIFIED]: '合格',
  [MILITARY_LEVEL.UNQUALIFIED]: '不合格',
};

export const WHETHER_NAMES = {
  [WHETHER.YES]: '是',
  [WHETHER.NO]: '否',
};

/**
 * 通知类型
 */
export const ANNOUNCEMENT_TYPE = new EnumImpl({
  SYSTEM: ['系统消息', 1],
  ACTIVE: ['活动通知', 2],
});

/**
 * 通知范围
 */
export const ANNOUNCEMENT_SCOPE = new EnumImpl({
  ALL: ['全体用户', 1],
  DESIGNATED: ['指定用户', 2],
});

/**
 * 公告状态
 */
export const ANNOUNCEMENT_STATE = new EnumImpl({
  PUBLISHED: ['已发布', 1],
  UNPUBLISHED: ['未发布', 2],
});

/**
 * 用户类型
 */
export const USER_TYPE = new EnumImpl({
  STUDENT: ['学生', 1],
  TEACHER: ['老师', 2],
});
