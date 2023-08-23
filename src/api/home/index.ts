import { get } from '@/api/api'
import type {
  WholeSchoolTop10List,
  WholeClassTop10List,
  ProgressTop10List,
  UnCollectScore,
} from './type'

enum API {
  WHOLE_SCHOOL_TOP10_RANKING = '/rank/wholeSchoolTop10',
  WHOLE_CLASS_TOP10_RANKING = '/rank/wholeClassTop10',
  PROGRESS_TOP10_RANKING = '/rank/progressTop10',
  UN_COLLECT_SCORE = '/recScore/unCollectScore',
  UPDATE_RECORD_STATE = '/recScore/updateState',
}

/**
 * 获取全校 top10 排名
 * @returns
 */
export const reqWholeSchoolTop10Ranking = () =>
  get<WholeSchoolTop10List>(API.WHOLE_SCHOOL_TOP10_RANKING)

/**
 * 获取全校班级 top10 排名
 * @returns
 */
export const reqWholeClassTop10Ranking = () =>
  get<WholeClassTop10List>(API.WHOLE_CLASS_TOP10_RANKING)

/**
 * 获取进步 top10 排名
 * @returns
 */
export const reqProgressTop10Ranking = () =>
  get<ProgressTop10List>(API.PROGRESS_TOP10_RANKING)

/**
 * 查询当前学生的成长信息
 * @returns
 */
export const reqUnCollectScore = () =>
  get<UnCollectScore[]>(API.UN_COLLECT_SCORE)

/**
 * 更新记录状态
 * @returns
 */
export const reqUpdateRecordState = (idStr: string) =>
  get(API.UPDATE_RECORD_STATE, { idStr })
