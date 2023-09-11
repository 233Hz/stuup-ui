<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm" label-width="120px">
        <el-row>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="一级项目" prop="firstLevelId">
              <el-select
                v-model="searchForm.l1Id"
                @change="
                  (id: number) => {
                    growthStore.handleLevel1Change(id)
                    searchForm.l2Id = void 0
                    searchForm.l3Id = void 0
                  }
                "
                style="width: 100%"
              >
                <el-option
                  v-for="item in growthStore.level1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="二级项目" prop="secondLevelId">
              <el-select
                v-model="searchForm.l2Id"
                @change="
                  (id: number) => {
                    growthStore.handleLevel2Change(id)
                    searchForm.l3Id = void 0
                  }
                "
                style="width: 100%"
              >
                <el-option
                  v-for="item in growthStore.level2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="三级项目" prop="threeLevelId">
              <el-select v-model="searchForm.l3Id" style="width: 100%">
                <el-option
                  v-for="item in growthStore.level3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="成长项目" prop="growName">
              <el-input v-model="searchForm.growthItemName" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="学年" prop="yearId">
              <el-select v-model="searchForm.yearId" style="width: 100%">
                <el-option
                  v-for="item in dictionaryStore.year"
                  :key="item.oid"
                  :label="item.value"
                  :value="item.oid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="年级" prop="gradeId">
              <el-select v-model="searchForm.gradeId" style="width: 100%">
                <el-option
                  v-for="item in dictionaryStore.grade"
                  :key="item.oid"
                  :label="item.gradeName"
                  :value="item.oid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="所属班级" prop="className">
              <el-input v-model="searchForm.className" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="学生姓名" prop="studentName">
              <el-input v-model="searchForm.studentName" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="学号" prop="studentNo">
              <el-input v-model="searchForm.studentNo" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item label="获取时间" prop="datatimeRange">
              <el-date-picker
                v-model="datatimeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="6">
            <el-form-item>
              <el-space>
                <el-button
                  icon="Search"
                  type="primary"
                  :loading="loading"
                  @click="handleSearch"
                >
                  查询
                </el-button>
                <el-button
                  icon="Close"
                  @click="
                    () => {
                      searchFormReset()
                      datatimeRange = []
                    }
                  "
                >
                  清空
                </el-button>
                <el-button
                  icon="Refresh"
                  :disabled="loading"
                  @click="fetchData"
                >
                  刷新
                </el-button>
              </el-space>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        stripe
        v-loading="loading"
        empty-text="空空如也~~"
        style="width: 100%"
      >
        <el-table-column
          prop="l1"
          label="一级栏目"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ row.l1 || '无' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="l2"
          label="二级栏目"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ row.l2 || '无' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="l3"
          label="三级栏目"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ row.l3 || '无' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="growthItemName"
          label="成长项目"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="yearName"
          label="学年"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="gradeName"
          label="年级"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="className"
          label="班级名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="studentName"
          label="学生姓名"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="studentNo"
          label="学号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="idCard"
          label="证件号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="score"
          label="获得积分"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="获取时间"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
      </el-table>
      <Pagination @size-change="fetchData" @current-change="fetchData" />
    </el-card>
  </div>
</template>

<script setup lang="ts" name="RecAddScore">
import { onMounted, ref } from 'vue'
import { reqRecAddScorePage } from '@/api/growScore/recAddScore'
import { formatDate } from '@/utils/util'
import type { FormInstance } from 'element-plus'
import type { RecScoreVO } from '@/api/growScore/type'
import useDictionaryStore from '@/store/modules/dictionary'
import useGrowthStore from '@/store/modules/growth'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const growthStore = useGrowthStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchData()
  await growthStore.init()
  await dictionaryStore.init()
})

const loading = ref<boolean>(false)
const tableData = ref<RecScoreVO[]>()
const datatimeRange = ref([])
const searchForm = ref({
  yearId: void 0,
  l1Id: void 0,
  l2Id: void 0,
  l3Id: void 0,
  growthItemName: void 0,
  gradeId: void 0,
  className: void 0,
  studentName: void 0,
  studentNo: void 0,
  startTime: void 0,
  endTime: void 0,
})
const searchRef = ref<FormInstance>()

const handleSearch = () => {
  const timeRange = datatimeRange.value
  if (timeRange && timeRange.length) {
    searchForm.value.startTime = timeRange[0]
    searchForm.value.endTime = timeRange[1]
  }
  fetchData()
}

const fetchData = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await reqRecAddScorePage(query)
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const searchFormReset = () => {
  searchForm.value = {
    yearId: void 0,
    l1Id: void 0,
    l2Id: void 0,
    l3Id: void 0,
    growthItemName: void 0,
    gradeId: void 0,
    className: void 0,
    studentName: void 0,
    studentNo: void 0,
    datatimeRange: [],
    startTime: void 0,
    endTime: void 0,
  }
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
