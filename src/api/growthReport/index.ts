import { get } from '@/api/api'
import type {
  BasicInfo,
  EthicsAndCitizenship,
  SkillsAndLearningLiteracy,
  ExerciseAndPhysicalAndMentalHealth,
  AestheticAndArtisticAccomplishment,
  LaborAndProfessionalism,
} from './type'

enum API {
  BASIC_INFO = '/growth/report/basicInfo',
  ETHICS_AND_CITIZENSHIP = '/growth/report/ethicsAndCitizenship',
  SKILLS_AND_LEARNING_LITERACY = '/growth/report/skillsAndLearningLiteracy',
  EXERCISE_AND_PHYSICAL_AND_MENTAL_HEALTH = '/growth/report/exerciseAndPhysicalAndMentalHealth',
  AESTHETIC_AND_ARTISTIC_ACCOMPLISHMENT = '/growth/report/aestheticAndArtisticAccomplishment',
  LABOR_AND_PROFESSIONALISM = '/growth/report/laborAndProfessionalism',
}

/**
 * 基本信息
 */
export const reqGrowthReportBasicInfo = (studentId?: number) =>
  get<BasicInfo>(API.BASIC_INFO, { studentId })

/**
 * 道德与公民素养
 */
export const reqGrowthReportEthicsAndCitizenship = (studentId?: number) =>
  get<EthicsAndCitizenship>(API.ETHICS_AND_CITIZENSHIP, { studentId })

/**
 * 技能与学习素养
 */
export const reqGrowthReportSkillsAndLearningLiteracy = (studentId?: number) =>
  get<SkillsAndLearningLiteracy>(API.SKILLS_AND_LEARNING_LITERACY, {
    studentId,
  })

/**
 * 运动与身心健康
 */
export const reqGrowthReportExerciseAndPhysicalAndMentalHealth = (
  studentId?: number,
) =>
  get<ExerciseAndPhysicalAndMentalHealth>(
    API.EXERCISE_AND_PHYSICAL_AND_MENTAL_HEALTH,
    { studentId },
  )

/**
 * 审美与艺术修养
 */
export const reqGrowthReportAestheticAndArtisticAccomplishment = (
  studentId?: number,
) =>
  get<AestheticAndArtisticAccomplishment>(
    API.AESTHETIC_AND_ARTISTIC_ACCOMPLISHMENT,
    { studentId },
  )

/**
 * 劳动与职业素养
 */
export const reqGrowthReportLaborAndProfessionalism = (studentId?: number) =>
  get<LaborAndProfessionalism>(API.LABOR_AND_PROFESSIONALISM, { studentId })

export * from './type'
