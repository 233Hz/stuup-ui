<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="年份名称" prop="yearName">
                    <el-input v-model="searchForm.yearName" />
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
          <!-- <el-button type="primary" @click="addRow">
            <el-icon><Plus /></el-icon>
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
          label="年份名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="yearStart"
          label="开始时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="yearEnd"
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
        <el-table-column label="当前学年" show-overflow-tooltip align="center">
          <template #default="{ row }">
            <el-tag v-show="row.curr === WHETHER.YES">当前学年</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button :disabled="row.curr === 1" @click="setCurrent(row.oid)" :type="row.curr === 1 ? 'success' : void 0">
              {{ row.curr === 1 ? '当前学年' : '设置为当前年' }}
            </el-button>
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <Pagination @size-change="fetchList" @current-change="fetchList" />
    </el-card>
  </div>
  <el-dialog
    v-model="dialog_active"
    :title="dialog_title"
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
      <el-form-item label="年份名称" prop="yearName">
        <el-input v-model="form.yearName" />
      </el-form-item>
      <el-form-item label="起止时间" prop="yearRange">
        <el-date-picker
          v-model="form.yearRange"
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
      <el-button @click="dialog_active = false">
        <el-icon><Close /></el-icon>
        取消
      </el-button>
      <el-button type="primary" :loading="loading" @click="submitForm">
        <el-icon><Check /></el-icon>
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="Year">
import { ref, onMounted, reactive } from 'vue'
import {
  getYearPage,
  saveOrUpdateYear,
  delYear,
  setCurrentYear,
} from '@/api/basic/year/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { WHETHER } from '@/utils/dict'
import { formatDate } from '@/utils/util'
import type { FormInstance, FormRules } from 'element-plus'
import type { YearVO } from '@/api/basic/year/type'
import usePaginationStore from '@/store/modules/pagination'

const paginationStore = usePaginationStore()

onMounted(() => {
  fetchList()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<YearVO[]>()
const searchForm = ref({
  yearName: void 0,
})
const form = ref<any>({
  oid: void 0,
  yearName: void 0,
  yearRange: [],
  yearStart: void 0,
  yearEnd: void 0,
  lastSemester: void 0,
  nextSemester: void 0,
})
const rules = reactive<FormRules>({
  yearName: [{ required: true, message: '请填写年份名称', trigger: 'blur' }],
  yearRange: [
    { required: true, message: '请填写年份起止时间', trigger: 'blur' },
  ],
})
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data } = await getYearPage(query)
    paginationStore.setTotal(data.total)
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const setCurrent = async (id: number) => {
  ElMessageBox.confirm('确认设置为当前年？', '设置为当前年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await setCurrentYear(id)
        ElMessage.success(res.message)
        fetchList()
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}

const addRow = () => {
  dialog_title.value = '添加'
  dialog_active.value = true
}
const updateRow = (row: YearVO) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.yearName = row.yearName
  form.value.yearRange = [row.yearStart, row.yearEnd]
  form.value.lastSemester = row.lastSemester
  form.value.nextSemester = row.nextSemester
}
const delRow = (oid: number) => {
  ElMessageBox.confirm('确认删除？', '删除学年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await delYear(oid.toString())
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
  form.value.yearStart = form.value.yearRange[0]
  form.value.yearEnd = form.value.yearRange[1]
  try {
    const res = await saveOrUpdateYear(form.value)
    ElMessage.success(res.message)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    oid: void 0,
    yearName: void 0,
    yearRange: [],
    yearStart: void 0,
    yearEnd: void 0,
    lastSemester: void 0,
    nextSemester: void 0,
  }
  formRef.value?.resetFields()
}
</script>
