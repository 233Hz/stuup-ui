<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchRef" :model="searchForm" label-width="100px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="所属学年" prop="yearId">
                    <el-select
                      v-model="searchForm.yearId"
                      placeholder="请选择"
                      class="w-full"
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
          <el-button @click="searchRef?.resetFields()">清空</el-button>
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
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
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
      <Pagination @size-change="fetchList" @current-change="fetchList" />
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
              v-for="item in dictionaryStore.year"
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

<script setup lang="ts" name="Semester">
import { ref, onMounted } from 'vue'
import {
  reqSemesterPage,
  saveOrUpdateSemester,
  delSemester,
  setCurrentSemester,
} from '@/api/basic/semester'
import { requiredRule } from '@/utils/rules'
import { ElMessage, ElMessageBox } from 'element-plus'
import { WHETHER } from '@/utils/dict'
import { formatDate } from '@/utils/util'
import type { FormInstance } from 'element-plus'
import type { SemesterVO } from '@/api/basic/semester/type'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchList()
  await dictionaryStore.init()
})

// REF
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

// DATA
const active = ref<boolean>(false)
const title = ref<string>('')
const loading = ref<boolean>(false)
const tableData = ref<SemesterVO[]>()

const form = ref<any>({
  id: void 0,
  yearId: void 0,
  name: void 0,
  dateRange: [],
})
const rules = {
  yearId: [requiredRule('所属学年')],
  name: [requiredRule('学期名称')],
  dateRange: [requiredRule('起止时间')],
}
const searchForm = ref({
  yearId: void 0,
  name: void 0,
})

// METHODS

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data } = await reqSemesterPage(query)
    paginationStore.setTotal(data.total)
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
const updateRow = (row: SemesterVO) => {
  title.value = '修改'
  active.value = true
  Object.assign(form.value, row)
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
  const formData = Object.assign(data, {
    startTime,
    endTime,
  })
  try {
    const res = await saveOrUpdateSemester(formData)
    ElMessage.success(res.message)
    active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}
const resetForm = () => {
  form.value = {
    id: void 0,
    yearId: void 0,
    name: void 0,
    dateRange: [],
  }
  formRef.value?.resetFields()
}
</script>
