<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form
                ref="searchFormRef"
                :model="searchForm"
                label-width="120px"
              >
                <el-row>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="一级项目" prop="firstLevelId">
                      <el-select
                        v-model="searchForm.firstLevelId"
                        @change="
                          (id: number) => {
                            growthStore.handleLevel1Change(id)
                            searchForm.secondLevelId = void 0
                            searchForm.threeLevelId = void 0
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
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="二级项目" prop="secondLevelId">
                      <el-select
                        v-model="searchForm.secondLevelId"
                        @change="
                          (id: number) => {
                            growthStore.handleLevel2Change(id)
                            searchForm.threeLevelId = void 0
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
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="三级项目" prop="threeLevelId">
                      <el-select
                        v-model="searchForm.threeLevelId"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in growthStore.level3"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="成长项目" prop="growName">
                      <el-input v-model="searchForm.growName" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学年" prop="yearId">
                      <el-select
                        v-model="searchForm.yearId"
                        style="width: 100%"
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
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="年级" prop="gradeId">
                      <el-select
                        v-model="searchForm.gradeId"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in dictionaryStore.grade"
                          :key="item.oid"
                          :label="item.gradeName"
                          :value="item.oid"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属班级" prop="className">
                      <el-input v-model="searchForm.className" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学生姓名" prop="studentName">
                      <el-input v-model="searchForm.studentName" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学号" prop="studentNo">
                      <el-input v-model="searchForm.studentNo" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="获取时间" prop="datatimeRange">
                      <el-date-picker
                        v-model="searchForm.datatimeRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="YYYY-MM-DD HH:mm:ss"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </template>
        <div style="text-align: center">
          <el-space>
            <el-button type="primary" @click="handleSearch" :loading="loading">
              查询
            </el-button>
            <el-button @click="searchFormReset">清空</el-button>
          </el-space>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24">
      <el-card style="margin: 10px 0">
        <template #header>
          <el-space>
            <el-divider direction="vertical" />
            <el-button :disabled="loading" circle @click="fetchList">
              <el-icon><Refresh /></el-icon>
            </el-button>
          </el-space>
        </template>

        <el-table
          :data="tableData"
          border
          stripe
          v-loading="loading"
          empty-text="空空如也~~"
          style="width: 100%"
        >
          <el-table-column
            prop="firstLevelName"
            label="一级栏目"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="secondLevelName"
            label="二级栏目"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="threeLevelName"
            label="三级栏目"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="growName"
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
          />
        </el-table>
        <div class="page-r">
          <el-pagination
            background
            :total="total"
            v-model:current-page="searchForm.current"
            v-model:page-size="searchForm.size"
            :page-sizes="[10, 20, 30, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next"
          />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="GrowScore">
import { ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import type { RecScoreVO } from '@/api/growScore/type'
import type { GrowthTreeVO } from '@/api/grow/config/type'
import { getRecScorePage } from '@/api/growScore/index'
import useDictionaryStore from '@/store/modules/dictionary'
import { DictionaryType } from '@/store/modules/dictionary'
import useGrowthStore from '@/store/modules/growth'

const dictionaryStore = useDictionaryStore()
const growthStore = useGrowthStore()

onMounted(async () => {
  await dictionaryStore.init(DictionaryType.YEAR, DictionaryType.GRADE)
  await growthStore.init()
  fetchList()
})

const loading = ref<boolean>(false)
const tableData = ref<RecScoreVO[]>()
const total = ref<number>(0)
const searchForm = ref({
  current: 1,
  size: 10,
  yearId: void 0,
  firstLevelId: void 0,
  secondLevelId: void 0,
  threeLevelId: void 0,
  growName: void 0,
  gradeId: void 0,
  className: void 0,
  studentName: void 0,
  studentNo: void 0,
  datatimeRange: [],
  startTime: void 0,
  endTime: void 0,
})
const searchFormRef = ref<FormInstance>()

const handleSearch = () => {
  const timeRange = searchForm.value.datatimeRange
  if (timeRange && timeRange.length) {
    searchForm.value.startTime = timeRange[0]
    searchForm.value.endTime = timeRange[1]
  }
  fetchList()
}

const fetchList = async () => {
  loading.value = true
  try {
    const { data: res } = await getRecScorePage(searchForm.value)
    total.value = res.total
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const findChildrenById = (
  list: GrowthTreeVO[],
  id: number,
): GrowthTreeVO[] | [] => {
  for (const item of list) {
    if (item.id === id) {
      return item.children || []
    }
  }
  return []
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}

const searchFormReset = () => {
  searchForm.value = {
    current: 1,
    size: 10,
    yearId: void 0,
    firstLevelId: void 0,
    secondLevelId: void 0,
    threeLevelId: void 0,
    growName: void 0,
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
