interface Option {
  name: string
  icon: string
}

export const option1: Record<string, Option> = {
  atSchoolNum: {
    name: '在校生人数',
    icon: 'data-screen-student',
  },
  sexRatio: {
    name: '男女比例',
    icon: 'data-screen-sex',
  },
  classNum: {
    name: '班级总数',
    icon: 'data-screen-class',
  },
  clubNum: {
    name: '社团总数',
    icon: 'data-screen-club',
  },
  majorNum: {
    name: '专业总数',
    icon: 'data-screen-major',
  },
}
export const option2: Record<string, Option> = {
  growthNum: {
    name: '成长项目总数',
    icon: 'data-screen-growth',
  },
  activityNum: {
    name: '举办活动次数',
    icon: 'data-screen-activity',
  },
  passRate: {
    name: '合格率',
    icon: 'data-screen-qualified',
  },
  scholarshipNum: {
    name: '获得奖学金人数',
    icon: 'data-screen-scholarship',
  },
}
