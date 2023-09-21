<template>
  <div class="p-20 w-full h-full" v-loading="loading">
    <el-card shadow="never" class="my-10">
      <el-form ref="searchRef" :model="search">
        <div v-show="shrink">
          <el-row :gutter="20">
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="学年">
                <el-select
                  v-model="search.yearId"
                  style="width: 100%"
                  placeholder="请选择查询学年"
                >
                  <el-option
                    v-for="item in dictionaryStore.year"
                    :key="item.oid"
                    :label="item.value"
                    :value="item.oid"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="学期">
                <el-select
                  v-model="search.semesterId"
                  style="width: 100%"
                  placeholder="请选择查询学期"
                >
                  <el-option
                    v-for="item in dictionaryStore.semester"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="年级" prop="gradeName">
                <el-select
                  v-model="search.gradeName"
                  style="width: 100%"
                  placeholder="请选择所属年级"
                >
                  <el-option
                    v-for="item in searchData.gradeNameSet"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="班级" prop="className">
                <el-select
                  v-model="search.className"
                  style="width: 100%"
                  placeholder="请选择查所属班级"
                >
                  <el-option
                    v-for="item in searchData.classNameSet"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="专业" prop="majorId">
                <el-select
                  v-model="search.majorName"
                  style="width: 100%"
                  placeholder="请选择查所属专业"
                >
                  <el-option
                    v-for="item in searchData.majorNameSet"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="学生姓名" prop="studentName">
                <el-input
                  v-model="search.studentName"
                  placeholder="请输入学生姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="4">
              <el-form-item label="学生学号" prop="studentNo">
                <el-input
                  v-model="search.studentNo"
                  placeholder="请输入学生学号"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <el-space>
            <el-button plain icon="Close" @click="searchRef?.resetFields()">
              清空
            </el-button>
            <el-button
              :loading="loading"
              icon="Refresh"
              plain
              @click="fetchData"
            >
              刷新
            </el-button>
            <el-link
              icon="ArrowUp"
              type="primary"
              :underline="false"
              @click="shrink = !shrink"
            >
              收缩查询
            </el-link>
          </el-space>
        </el-form-item>
      </el-form>
    </el-card>
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="tableData"
          :width="width"
          :height="height"
          :class="kls"
          :cell-props="cellProps"
          row-key="studentId"
          fixed
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { reqGrowthStatisticsList } from '@/api/growthStatistics'
import { PROGRESS_STATE } from '@/utils/dict'
import type { GrowthStatisticsVO } from '@/api/growthStatistics/type'
import type { Column } from 'element-plus'
import useUserStore from '@/store/modules/user'
import useDictionaryStore from '@/store/modules/dictionary'

const router = useRouter()
const userStore = useUserStore()
const dictionaryStore = useDictionaryStore()

const columns: Column[] = [
  {
    align: 'center',
    key: 'yearName',
    dataKey: 'yearName',
    title: '学年',
    width: 150,
  },
  {
    align: 'center',
    key: 'semesterName',
    dataKey: 'semesterName',
    title: '学期',
    width: 150,
  },
  {
    align: 'center',
    key: 'gradeName',
    dataKey: 'gradeName',
    title: '年级',
    width: 100,
  },
  {
    align: 'center',
    key: 'majorName',
    dataKey: 'majorName',
    title: '所属专业',
    width: 300,
  },
  {
    align: 'center',
    key: 'className',
    dataKey: 'className',
    title: '所属班级',
    width: 300,
  },
  {
    align: 'center',
    key: 'classTeacher',
    dataKey: 'classTeacher',
    title: '班主任',
    width: 150,
  },
  {
    align: 'center',
    key: 'studentName',
    dataKey: 'studentName',
    title: '学生姓名',
    width: 150,
    cellRenderer: ({ rowData }) => (
      <el-link
        type="primary"
        onClick={() => router.push(`/portrait/${rowData.studentId}`)}
      >
        {rowData.studentName}
      </el-link>
    ),
  },
  {
    align: 'center',
    key: 'semesterScore',
    dataKey: 'semesterScore',
    title: '本学期成长值',
    width: 300,
  },
  {
    align: 'center',
    key: 'semesterRank',
    dataKey: 'semesterRank',
    title: '本学期的成长排名',
    width: 300,
  },
  {
    align: 'center',
    key: 'lastSemesterCompare',
    dataKey: 'lastSemesterCompare',
    title: '与上学期的对比',
    width: 150,
    cellRenderer: ({ cellData: name }) => {
      if (PROGRESS_STATE.UP === name) {
        return <svg-icon name={'rise'} />
      } else if (PROGRESS_STATE.DOWN === name) {
        return <svg-icon name={'drop'} />
      } else {
        return <svg-icon name={'unchanged'} />
      }
    },
  },
  {
    align: 'center',
    key: 'applyCount',
    dataKey: 'applyCount',
    title: '本学期申请的项目数',
    width: 150,
  },
  {
    align: 'center',
    key: 'totalScore',
    dataKey: 'totalScore',
    title: '成长总分',
    width: 150,
  },
  {
    align: 'center',
    key: 'finalGrades',
    dataKey: 'finalGrades',
    title: '期末成绩',
    width: 150,
  },
]
const cellProps = ({ columnIndex }: { columnIndex: number }) => {
  const key = `hovering-col-${columnIndex}`
  return {
    ['data-key']: key,
    onMouseenter: () => {
      kls.value = key
    },
    onMouseleave: () => {
      kls.value = ''
    },
  }
}

let dataSource: readonly GrowthStatisticsVO[] = []
const kls = ref<string>('')
const { yearId, semesterId } = userStore.otherInfo

const searchRef = ref()
const tableData = ref<any>([])
const loading = ref(false)
const shrink = ref(true)

const search = ref<any>({
  yearId: void 0,
  semesterId: void 0,
  gradeName: void 0,
  className: void 0,
  majorName: void 0,
  studentName: void 0,
  studentNo: void 0,
})

interface SearchDataType {
  majorNameSet: Set<string>
  classNameSet: Set<string>
  gradeNameSet: Set<string>
}

const searchData = ref<SearchDataType>({
  majorNameSet: new Set(),
  classNameSet: new Set(),
  gradeNameSet: new Set(),
})

const fetchData = async (query?: any) => {
  loading.value = true
  try {
    const { yearId, semesterId } = search.value
    const params = Object.assign({ yearId, semesterId }, query)
    const { data } = await reqGrowthStatisticsList(params)
    dataSource = Object.freeze(data)
    tableData.value = dataSource
    dataSource.forEach((item) => {
      item.lastSemesterCompare = 3
      item.gradeName && searchData.value.gradeNameSet.add(item.gradeName)
      item.majorName && searchData.value.majorNameSet.add(item.majorName)
      item.className && searchData.value.classNameSet.add(item.className)
    })
  } finally {
    loading.value = false
  }
}

watch(
  [() => search.value.yearId, () => search.value.semesterId],
  ([newYear, newSemester]) => {
    fetchData()
  },
)
watch(
  search.value,
  ({ gradeName, className, majorName, studentName, studentNo }) => {
    console.log('aaa')
    tableData.value = dataSource.filter((item) => {
      if (studentName && !item.studentName.includes(studentName)) {
        return false
      }
      if (studentNo && !item.studentNo.includes(studentNo)) {
        return false
      }
      if (gradeName && item.gradeName !== gradeName) {
        return false
      }
      if (majorName && item.majorName !== majorName) {
        return false
      }
      return !(className && item.className !== className)
    })
  },
)

onMounted(async () => {
  await dictionaryStore.init()
  search.value.yearId = yearId
  search.value.semesterId = semesterId
})
</script>

<style>
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
  background: var(--el-table-row-hover-bg-color);
}

[data-key='hovering-col-0'] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
</style>
