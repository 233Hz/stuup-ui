<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="系部名称" prop="key">
                    <el-input
                      v-model="searchForm.key"
                      placeholder="请输入系部名称"
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
          prop="facultyCode"
          label="系部编号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="facultyName"
          label="系部名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="adminName"
          label="管理员"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
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
      <el-form-item label="系部编号" prop="facultyCode">
        <el-input v-model="form.facultyCode" placeholder="请输入系部编号" />
      </el-form-item>
      <el-form-item label="系部名称" prop="facultyName">
        <el-input v-model="form.facultyName" placeholder="请输入系部名称" />
      </el-form-item>
      <el-form-item label="系部管理员" prop="facultyAdmin">
        <el-select
          v-model="form.facultyAdmin"
          placeholder="请选择管理员"
          style="width: 100%"
        >
          <el-option
            v-for="item in dictionaryStore.user"
            :key="item.oid"
            :label="item.value"
            :value="item.oid"
          />
        </el-select>
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

<script setup lang="ts" name="Faculty">
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
  getFacultyPage,
  saveOrUpdateFaculty,
  delFaculty,
} from '@/api/basic/faculty'
import type { Faculty } from '@/api/basic/faculty/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(() => {
  fetchList()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<Faculty[]>()

const searchForm = ref({
  key: void 0,
})
const form = ref<any>({
  oid: void 0,
  facultyCode: void 0,
  facultyName: void 0,
  facultyAdmin: void 0,
})
const rules = reactive<FormRules>({
  facultyCode: [{ required: true, message: '请填写系部编号', trigger: 'blur' }],
  facultyName: [{ required: true, message: '请填写系部名称', trigger: 'blur' }],
  facultyAdmin: [
    { required: true, message: '请选择系部管理员', trigger: 'blur' },
  ],
})
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getFacultyPage(query)
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
const updateRow = (row: Faculty) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.facultyCode = row.facultyCode
  form.value.facultyName = row.facultyName
  form.value.facultyAdmin = row.facultyAdmin
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
        const res = await delFaculty(oid.toString())
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
    const res = await saveOrUpdateFaculty(form.value)
    ElMessage.success(res.message)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    facultyCode: void 0,
    facultyName: void 0,
    facultyAdmin: void 0,
  }
  formRef.value?.resetFields()
}
</script>
