<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="部门名称" prop="key">
              <el-input v-model="searchForm.key" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item>
              <el-space>
                <el-button
                  type="primary"
                  icon="Search"
                  plain
                  :loading="loading"
                  @click="fetchList"
                >
                  查询
                </el-button>
                <el-button icon="Close" plain @click="searchRef?.resetFields()">
                  清空
                </el-button>
                <!-- <el-button type="primary" icon="Plus" plain @click="addRow">
                  添加
                </el-button> -->
                <el-button
                  icon="Refresh"
                  plain
                  circle
                  :disabled="loading"
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
          prop="deptName"
          label="部门名称"
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
        <!-- <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button
              bg
              text
              type="primary"
              icon="Edit"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              bg
              text
              type="danger"
              icon="Delete"
              @click="delRow(row.oid)"
            >
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <Pagination @size-change="fetchList" @current-change="fetchList" />
    </el-card>
    <!-- <el-dialog
      v-model="dialog_active"
      :title="dialog_title"
      width="30%"
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
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入部门名称" />
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
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts" name="Dept">
import { ref, onMounted, reactive } from 'vue'
import { getDeptPage, saveOrUpdateDept, delDept } from '@/api/basic/dept/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/util'
import type { FormInstance, FormRules } from 'element-plus'
import type { Dept } from '@/api/basic/dept/type'
import usePaginationStore from '@/store/modules/pagination'

const paginationStore = usePaginationStore()

onMounted(() => {
  fetchList()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<Dept[]>()
const searchForm = ref({
  key: void 0,
})
const form = ref<any>({
  oid: void 0,
  deptName: void 0,
})
const rules = reactive<FormRules>({
  deptName: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getDeptPage(query)
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
const updateRow = (row: Dept) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.deptName = row.deptName
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
        const res = await delDept(oid.toString())
        ElMessage.success(res.msg)
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
    const res = await saveOrUpdateDept(form.value)
    ElMessage.success(res.msg)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    deptName: void 0,
  }
  formRef.value?.resetFields()
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
