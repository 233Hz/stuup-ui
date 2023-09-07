<template>
  <el-row style="margin: 20px">
    <el-col :span="24">
      <el-card>
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchRef" :model="searchForm" label-width="80px">
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
                    <el-form-item label="社团名称" prop="name">
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
    <el-col :span="24">
      <el-card>
        <template #header>
          <el-space>
            <el-button type="primary" @click="downloadRec">
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
            label="社团名称"
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
            prop="startTime"
            label="开始时间"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="endTime"
            label="结束时间"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="role"
            label="角色"
            show-overflow-tooltip
            align="center"
          />
        </el-table>
        <Pagination @size-change="fetchList" @current-change="fetchList" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="Society">
import { ref, onMounted } from 'vue'
import { getRecSocietyPage } from '@/api/record/society'
import { AWARD_LEVEL, REC_CODE } from '@/utils/dict'
import { downRecord } from '@/api/record'
import type { FormInstance } from 'element-plus'
import type { RecSocietyVO } from '@/api/record/society/type'
import useUserStore from '@/store/modules/user'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const userStore = useUserStore()
const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchList()
  await dictionaryStore.init()
})

const loading = ref<boolean>(false)
const tableData = ref<RecSocietyVO[]>()
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
    const { data: res } = await getRecSocietyPage(query)
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

<style lang="scss" scoped>
.el-col {
  margin-top: 10px;
}
</style>
