<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form
              ref="searchFormRef"
              :model="searchForm"
              label-width="100px"
            >
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属学年" prop="yearId">
                    <el-select
                      v-model="searchForm.yearId"
                      placeholder="请选择"
                      class="w-full"
                    >
                      <el-option
                        v-for="item in YEAR"
                        :key="item.oid"
                        :label="item.value"
                        :value="item.oid"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="学期名称" prop="name">
                    <el-input v-model="searchForm.name" />
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
    <el-card>
      <template #header>
        <el-space>
          <!-- <el-button type="primary" :disabled="loading" @click="addRow">
            <el-icon class="mr-4"><Plus /></el-icon>
            添加
          </el-button> -->
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
          label="所属学年"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="name"
          label="学期名称"
          show-overflow-tooltip
          align="center"
        />
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
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column label="当前学期" show-overflow-tooltip align="center">
          <template #default="{ row }">
            <el-tag v-show="row.isCurrent === WHETHER.YES">当前学期</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button
              :disabled="row.isCurrent === WHETHER.YES"
              @click="setCurrent(row.id)"
              :type="row.isCurrent === WHETHER.YES ? 'success' : ''">
              {{ row.isCurrent === WHETHER.YES ? '当前学期' : '设置为当前学期' }}
            </el-button>
            <el-button :disabled="loading" @click="updateRow(row)">修改</el-button>
            <el-button type="danger" :disabled="loading" @click="delRow(row.id)">删除</el-button>
          </template>
        </el-table-column> -->
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
    <el-dialog
      v-model="active"
      :title="title"
      width="500"
      draggable
      @close="resetForm"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :disabled="loading"
        label-position="top"
        style="margin-top: 10px"
      >
        <el-form-item label="所属学年" prop="yearId">
          <el-select v-model="form.yearId" placeholder="请选择" class="w-full">
            <el-option
              v-for="item in YEAR"
              :key="item.oid"
              :label="item.value"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学期名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="起止时间" prop="dateRange">
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="active = false">
          <el-icon><Close /></el-icon>
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">
          <el-icon><Check /></el-icon>
          提交
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import {
  pageSemester,
  saveOrUpdateSemester,
  delSemester,
  setCurrentSemester,
} from '@/api/basic/semester'
import { getYearList } from '@/api/basic/year'
import { requiredRule } from '@/utils/rules'
import { ElMessage, ElMessageBox } from 'element-plus'
import { WHETHER } from '@/utils/dict'

onMounted(() => {
  initYear()
  fetchList()
})

// REF
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

// DICT
const YEAR = ref()

// DATA
const active = ref<boolean>(false)
const title = ref<string>('')
const loading = ref<boolean>(false)
const tableData = ref()
const total = ref<number>(0)
const form = ref({
  id: void 0,
  yearId: void 0,
  name: void 0,
  dateRange: void 0,
})
const rules = {
  yearId: [requiredRule('所属学年')],
  name: [requiredRule('学期名称')],
  dateRange: [requiredRule('起止时间')],
}
const searchForm = ref({
  current: 1,
  size: 10,
  yearId: void 0,
  name: void 0,
})

// METHODS
const initYear = async () => {
  const { data: res } = await getYearList()
  YEAR.value = res
}

const fetchList = async () => {
  loading.value = true
  try {
    const { data } = await pageSemester(searchForm.value)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const setCurrent = (id: number) => {
  ElMessageBox.confirm('确认设置为当前年？', '设置为当前年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await setCurrentSemester(id)
        ElMessage.success(res.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const addRow = () => {
  title.value = '添加'
  active.value = true
}
const updateRow = (row) => {
  title.value = '修改'
  active.value = true
  form.value.id = row.id
  form.value.yearId = row.yearId
  form.value.name = row.name
  form.value.dateRange = [row.startTime, row.endTime]
}

const delRow = (id: number) => {
  ElMessageBox.confirm('确认删除？', '删除学年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await delSemester(id)
        ElMessage.success(res.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const submitForm = async () => {
  if (!formRef) return
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  const { dateRange, ...data } = form.value
  const startTime = dateRange![0]
  const endTime = dateRange![1]
  try {
    const res = await saveOrUpdateSemester(
      Object.assign(data, { startTime, endTime }),
    )
    ElMessage.success(res.message)
    active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}

const resetForm = () => {
  form.value = {
    yearId: void 0,
    name: void 0,
    dataRange: void 0,
  }
  formRef.value?.resetFields()
}
</script>
