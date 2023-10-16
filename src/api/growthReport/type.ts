export interface BasicInfo {
  studentId?: number
  studentNo?: string
  studentName?: string
  gender?: string
  ethnicGroup?: string
  className?: string
  majorName?: string
  homeAddress?: string
  dateOfBirth?: string
  politicalStatus?: string
  idCard?: string
  phone?: string
  academicStatus?: string
  militaryTrainingLevel?: string

  [key: string]: any
}

export interface IdeologicalCharacter {
  countArtSocieties?: number
  countLoveTheCountryAndTheSchool?: number
  countCurrentPoliticsStudy?: number
  countSecurityRuleOfLaw?: number
  participatingSocieties?: string[]
}
export interface CivilizedCultivation {
  countMobileRedFlags?: number
  countCivilizationBedroom?: number
  countGroomingViolations?: number
  countViolationOfCivilityAndEtiquette?: number
  countSanitaryEnvironmentViolations?: number
}
export interface BeDisciplinedAndSelfDisciplined {
  countDisciplinaryAction?: number
  countLateArrivalAndEarlyDeparture?: number
  countAbsenteeismFromClass?: number
  countNotGettingOutOnTime?: number
}
export interface IndividualHonors {
  countNationalScholarships?: number
  countDistrictLevelIndustryHonors?: number
  countOutstandingStudentRegimentCadres?: number
  countSchoolScholarships?: number
  countMunicipalHonors?: number
  countMiyoshiStudent?: number
  countGoodStudentsInPharmacySchool?: number
}

export interface EthicsAndCitizenship {
  ideologicalCharacter?: IdeologicalCharacter
  civilizedCultivation?: CivilizedCultivation
  beDisciplinedAndSelfDisciplined?: BeDisciplinedAndSelfDisciplined
  individualHonors?: IndividualHonors
}

export interface CourseGrades {
  courseName: string
  score: number
}

export interface SubjectGrades {
  semesterId?: number
  semesterName?: string
  totalScoreAtTheEndOfThePeriod?: number
  courseGrades?: CourseGrades[]
}

export interface DoubleInnovationCompetition {
  countNationalLevel?: number
  countMunicipalLevel?: number
  countDistrictIndustryLevel?: number
  countSchoolLevel?: number
  nationalLevelRecords?: string[]
  municipalLevelRecords?: string[]
  districtIndustryLevelRecords?: string[]
  schoolLevelRecords?: string[]
}

export interface SkillsAndLearningLiteracy {
  subjectGrades?: SubjectGrades
  professionalQualifications?: string[]
  professionalism?: string[]
  doubleInnovationCompetition?: DoubleInnovationCompetition
}

export interface PsychologicalLiteracy {
  countPsychodramaOrPsychoMonthShowcase?: number
  countPsychologicalCenter?: number
}

export interface PhysicalLiteracy {
  countNationalLevel?: number
  countMunicipalLevel?: number
  countDistrictIndustryLevel?: number
  countSchoolLevel?: number
}

export interface ExerciseAndPhysicalAndMentalHealth {
  psychologicalLiteracy?: PsychologicalLiteracy
  physicalLiteracy?: PhysicalLiteracy
}

export interface AArtisticActivities {
  countTalentActivities?: number
}

export interface TalentShow {
  countNationalLevel?: number
  countMunicipalLevel?: number
  countDistrictIndustryLevel?: number
  countSchoolLevel?: number
  nationalLevelRecords?: string[]
  municipalLevelRecords?: string[]
  districtIndustryLevelRecords?: string[]
  schoolLevelRecords?: string[]
}

export interface ArtSocieties {
  countArtSocieties?: number
}

export interface AestheticAndArtisticAccomplishment {
  artisticActivities?: AArtisticActivities
  talentShow?: TalentShow
  artSocieties?: ArtSocieties
}

export interface CreditCompletion {
  semesterId: number
  semesterName: string
  completion: string
}

export interface LArtisticActivities {
  countVolunteerService?: number
  countTrafficPostsAreOnDuty?: number
}

export interface LaborAndProfessionalism {
  artisticActivities?: LArtisticActivities
  creditsForShiharaActivities?: CreditCompletion[]
  productionLaborPracticeCredits?: CreditCompletion[]
}
