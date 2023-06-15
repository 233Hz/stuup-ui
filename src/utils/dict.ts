import { LEVEL, MILITARY_LEVEL, WHETHER } from './constant';
import { Enum } from '@/utils/enum';

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
 * 菜单类型
 */
export const MENU_TYPE = new Enum({
  FRONT: ['前端菜单', 1],
  BACK: ['后端菜单', 2],
});

/**
 * 通知类型
 */
export const ANNOUNCEMENT_TYPE = new Enum({
  SYSTEM: ['系统消息', 1],
  ACTIVE: ['活动通知', 2],
});

/**
 * 通知范围
 */
export const ANNOUNCEMENT_SCOPE = new Enum({
  ALL: ['全体用户', 1],
  DESIGNATED: ['全体教师', 2],
});

/**
 * 公告状态
 */
export const ANNOUNCEMENT_STATE = new Enum({
  PUBLISHED: ['已发布', 1],
  UNPUBLISHED: ['未发布', 2],
});

/**
 * 用户类型
 */
export const USER_TYPE = new Enum({
  STUDENT: ['学生', 1],
  TEACHER: ['老师', 2],
});

/**
 * 花园类型
 */
export const GARDEN_TYPE = new Enum({
  BMH: ['白梅花园', 1],
  XCJ: ['雏菊花园', 2],
  XHH: ['西红花园', 3],
});

/**
 * 有效/无效
 */
export const EFFECTIVENESS = new Enum({
  EFFECTIVE: ['有效', 1],
  INVALID: ['无效', 2],
});

/**
 * 性别
 */
export const SEX = new Enum({
  BOY: ['男', 1],
  GIRL: ['女', 2],
});

/**
 * 教师状态
 */
export const TESCHER_STATE = new Enum({
  ON_JOB: ['在职', 1],
  DIMISSION: ['离职', 2],
});

/**
 * 教师类型
 */
export const TESCHER_TYPE = new Enum({
  ON_PAYROLL: ['在职在编', 1],
  SUPERNUMERARY: ['编外运行', 2],
  ADMINISTRATIVE: ['行政外编', 3],
});

/**
 * 学业状态
 */
export const SCHOOL_WORD_STATE = new Enum({
  GRADUATE: ['毕业', 0],
  NORMAL: ['正常', 1],
  STUDENT_STATUS_CHANGE: ['学籍变更', 2],
});

/**
 * 用户状态
 */
export const USER_STATE = new Enum({
  NORMAL: ['正常', 1],
  DISABLED: ['禁用', 2],
});

/**
 * 周期
 */
export const PERIOD = new Enum({
  UNLIMITED: ['不限', 1],
  DAY: ['每天', 2],
  WEEK: ['每周', 3],
  MONTH: ['每月', 4],
  SEMESTER: ['每学期', 5],
  YEAR: ['每学年', 6],
  THREE_YEAR: ['每三年', 7],
  FIVE_YEAR: ['每五年', 8],
});

/**
 * 积分计算类型
 */
export const CALCULATE_TYPE = new Enum({
  ADD: ['录入加分', 1],
  SUBTRACT: ['录入减分', 2],
});

/**
 * 获奖等级
 */
export const AWARD_LEVEL = new Enum({
  SCHOOL: ['校级', 1],
  DISTRICT: ['区（行级）', 2],
  CITY: ['市级', 3],
  COUNTRY: ['国家', 4],
  INTERNATIONAL: ['国际', 5],
});

/**
 * 进步状态
 */
export const PROGRESS_STATE = new Enum({
  UP: ['上升', 1],
  DOWN: ['下降', 2],
  SAME: ['不变', 3],
});

/**
 * 成长项目类型
 */
export const GROWITEM_TYPE = new Enum({
  CUSTOM: ['自定义', 1],
  SYSTEM: ['系统类', 2],
});
