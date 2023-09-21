<template>
  <el-card>
    <el-form ref="searchRef" :model="searchForm">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :xl="4">
          <el-form-item label="学年" prop="yearId">
            <el-select
              v-model="searchForm.yearId"
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
          <el-form-item label="年级" prop="gradeId">
            <el-select
              v-model="searchForm.gradeId"
              style="width: 100%"
              placeholder="请选择查询年级"
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
        <el-col :sm="24" :md="12" :xl="4">
          <el-form-item label="所属班级" prop="className">
            <el-input
              v-model="searchForm.className"
              placeholder="请输入所属班级"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="4">
          <el-form-item label="学生姓名" prop="studentName">
            <el-input
              v-model="searchForm.studentName"
              placeholder="请输入学生姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="4">
          <el-form-item label="荣誉称号" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入荣誉称号" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="4">
          <el-form-item label="级别" prop="level">
            <el-select
              v-model="searchForm.level"
              style="width: 100%"
              placeholder="请选择级别"
            >
              <el-option
                v-for="item in AWARD_LEVEL.getDict()"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :xl="4">
          <el-form-item>
            <el-space>
              <el-button
                type="primary"
                icon="Search"
                plain
                @click="fetchList"
                :loading="loading"
              >
                查询
              </el-button>
              <el-button icon="Close" plain @click="searchRef?.resetFields()">
                清空
              </el-button>
              <el-button
                type="primary"
                icon="Download"
                plain
                v-permission="'honor_export'"
                :loading="loading"
                @click="downloadRec"
              >
                导出
              </el-button>
              <el-button
                icon="Refresh"
                plain
                circle
                :loading="loading"
                @click="fetchList"
              />
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
        prop="name"
        label="荣誉称号"
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
          {{ AWARD_LEVEL.getKey(row.level) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="评选单位"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="time"
        label="评选时间"
        show-overflow-tooltip
        align="center"
      />
    </el-table>
    <Pagination @size-change="fetchList" @current-change="fetchList" />
  </el-card>
</template>

<script setup lang="ts" name="Honor">
import { ref, onMounted } from 'vue'
import { getRecHonorPage } from '@/api/record/honor'
import { AWARD_LEVEL, REC_CODE } from '@/utils/dict'
import { downRecord } from '@/api/record'
import type { FormInstance } from 'element-plus'
import type { RecHonorVO } from '@/api/record/honor/type'
import useDictionaryStore from '@/store/modules/dictionary'
import useUserStore from '@/store/modules/user'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const userStore = useUserStore()
const paginationStore = usePaginationStore()

// REF
const searchRef = ref<FormInstance>()

//DATA
const loading = ref<boolean>(false)
const tableData = ref<RecHonorVO[]>()
const searchForm = ref({
  yearId: userStore.otherInfo.yearId,
  gradeId: void 0,
  className: void 0,
  studentName: void 0,
  name: void 0,
  level: void 0,
})

onMounted(async () => {
  await fetchList()
  await dictionaryStore.init()
})

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getRecHonorPage(query)
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const downloadRec = async () => {
  await downRecord(
    Object.assign({
      rec_code: REC_CODE.REC_HONOR,
      ...searchForm.value,
    }),
    `${REC_CODE.getKey('REC_HONOR')}.xlsx`,
  )
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 10px;
}
</style>
