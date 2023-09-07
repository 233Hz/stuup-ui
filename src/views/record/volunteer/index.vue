<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card shadow="never">
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchRef" :model="searchForm" label-width="140px">
                <el-row>
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
                    <el-form-item label="基地/项目名称" prop="name">
                      <el-input v-model="searchForm.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="级别" prop="level">
                      <el-select v-model="searchForm.level" style="width: 100%">
                        <el-option
                          v-for="item in AWARD_LEVEL.getDict()"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </template>
        <div style="text-align: center">
          <el-space>
            <el-button type="primary" @click="fetchList" :loading="loading">
              查询
            </el-button>
            <el-button @click="searchRef?.resetFields()">清空</el-button>
          </el-space>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      <el-card shadow="never">
        <template #header>
          <el-space>
            <el-button type="primary">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
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
            prop="yearName"
            label="学年"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="gradeNameSet"
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
            prop="name"
            label="基地/项目名称"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="level"
            label="级别"
            show-overflow-tooltip
            align="center"
          >
            <template #default="{ row }">
              {{ AWARD_LEVEL.getKeyForValue(row.level) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="child"
            label="子项目"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="post"
            label="岗位"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="studyTime"
            label="学时"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="serviceTime"
            label="服务时间"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="reason"
            label="晚填理由"
            show-overflow-tooltip
            align="center"
          />
        </el-table>
        <Pagination @size-change="fetchList" @current-change="fetchList" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="Volunteer">
import { ref, onMounted } from 'vue'
import { getVolunteerPage } from '@/api/record/volunteer'
import { downRecord } from '@/api/record'
import { AWARD_LEVEL, REC_CODE } from '@/utils/dict'
import type { FormInstance } from 'element-plus'
import type { RecVolunteerVO } from '@/api/record/volunteer/type'
import useDictionaryStore from '@/store/modules/dictionary'
import useUserStore from '@/store/modules/user'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const userStore = useUserStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchList()
  await dictionaryStore.init()
})

const loading = ref<boolean>(false)
const tableData = ref<RecVolunteerVO[]>()
const searchForm = ref({
  yearId: userStore.userInfo.yearId,
  gradeId: void 0,
  className: void 0,
  studentName: void 0,
  name: void 0,
  level: void 0,
})
const searchRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getVolunteerPage(query)
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const downloadRec = async () => {
  await downRecord(
    Object.assign({
      rec_code: REC_CODE.REC_SOCIETY,
      ...searchForm.value,
    }),
    `${REC_CODE.getKey('REC_SOCIETY')}.xlsx`,
  )
}
</script>
