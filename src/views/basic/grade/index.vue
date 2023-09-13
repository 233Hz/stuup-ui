<template>
  <div>
    <div style="padding: 10px 20px">
      <el-card style="margin: 10px 0">
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchRef" :model="searchForm" label-width="80px">
                <el-row>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="年级名称" prop="key">
                      <el-input
                        v-model="searchForm.key"
                        placeholder="请选择年级名称"
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
            <el-button @click="searchRef?.resetFields()">清空</el-button>
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
              <el-icon>
                <Refresh />
              </el-icon>
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
            prop="gradeName"
            label="年级名称"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="year"
            label="年份"
            show-overflow-tooltip
            align="center"
          />
          <!-- <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
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
      >
        <el-form-item label="年级名称" prop="gradeNameSet">
          <el-input v-model="form.gradeName" placeholder="请选择年级名称" />
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-select
            v-model="form.year"
            placeholder="请选择年份"
            style="width: 100%"
          >
            <el-option
              v-for="item in dictionaryStore.year"
              :key="item.oid"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog_active = false">
          <el-icon>
            <Close />
          </el-icon>
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">
          <el-icon>
            <Check />
          </el-icon>
          提交
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Grade">
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
  getGraderPage,
  saveOrUpdateGrade,
  delGrade,
} from '@/api/basic/grade/index'
import type { Grade } from '@/api/basic/grade/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchList()
  // await dictionaryStore.init()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<Grade[]>()

const searchForm = ref({
  key: void 0,
})
const form = ref<any>({
  oid: void 0,
  gradeName: void 0,
  year: void 0,
})
const rules = reactive<FormRules>({
  gradeName: [{ required: true, message: '请填写年级名称', trigger: 'blur' }],
  year: [{ required: true, message: '请填写年份', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getGraderPage(query)
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const addRow = () => {
  dialog_title.value = '添加'
  dialog_active.value = true
}
const updateRow = (row: Grade) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.gradeName = row.gradeName
  form.value.year = row.year
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
        const res = await delGrade(oid.toString())
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
  try {
    const res = await saveOrUpdateGrade(form.value)
    ElMessage.success(res.message)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    gradeName: void 0,
    year: void 0,
  }
  formRef.value?.resetFields()
}
</script>
