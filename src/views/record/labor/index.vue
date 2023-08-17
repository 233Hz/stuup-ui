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
                label-width="80px"
              >
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
                        placeholder="请选择年级"
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
                      <el-input
                        v-model="searchForm.className"
                        placeholder="请输入所属班级"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="学生姓名" prop="studentName">
                      <el-input
                        v-model="searchForm.studentName"
                        placeholder="请输入学生姓名"
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
            <el-button type="primary" @click="fetchList" :loading="loading">
              查询
            </el-button>
            <el-button @click="searchFormRef?.resetFields()">清空</el-button>
          </el-space>
        </div>
      </el-card>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
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
            prop="hours"
            label="累计课时"
            show-overflow-tooltip
            align="center"
          />
        </el-table>
        <div class="page-r">
          <el-pagination
            background
            :total="page.total"
            v-model:current-page="page.current"
            v-model:page-size="page.size"
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

<script setup lang="ts" name="Labor">
import { ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import type { RecLaborTimeVO } from '@/api/record/labor/type'
import { getRecLaborTimePage } from '@/api/record/labor/index'
import { REC_CODE } from '@/utils/dict'
import { downRecord } from '@/api/record'
import useDictionaryStore from '@/store/modules/dictionary'
import useUserStore from '@/store/modules/user'
import { DictionaryType } from '@/store/modules/dictionary'

const dictionaryStore = useDictionaryStore()
const userStore = useUserStore()

onMounted(async () => {
  await dictionaryStore.init(DictionaryType.YEAR, DictionaryType.GRADE)
  fetchList()
})

const loading = ref<boolean>(false)
const tableData = ref<RecLaborTimeVO[]>()
const page = ref({
  current: 1,
  size: 10,
  total: 10,
})
const searchForm = ref({
  yearId: userStore.userInfo.yearId,
  gradeId: undefined,
  className: undefined,
  studentName: undefined,
  name: undefined,
  level: undefined,
})
const searchFormRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { data: res } = await getRecLaborTimePage(
      Object.assign(page.value, searchForm.value),
    )
    page.value.total = res.total
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const downloadRec = async () => {
  await downRecord(
    Object.assign({
      rec_code: REC_CODE.REC_LABOR_TIME,
      ...searchForm.value,
    }),
    `${REC_CODE.getKey('REC_LABOR_TIME')}.xlsx`,
  )
}

const handleCurrentChange = (val: number) => {
  page.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  page.value.size = val
  fetchList()
}
</script>
