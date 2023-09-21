<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="专业名称" prop="key">
              <el-input v-model="searchForm.key" placeholder="请输入专业名称" />
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
          prop="majorCode"
          label="专业编号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="majorName"
          label="专业名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="facultyName"
          label="所属系部"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="system"
          label="学制"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="state"
          label="状态"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ EFFECTIVENESS.getKeyForValue(row.state) }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button bg text type="primary" icon="Edit" @click="updateRow(row)">修改</el-button>
            <el-button bg text type="danger" icon="Delete" @click="delRow(row.oid)">删除</el-button>
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
        <el-form-item label="专业编号" prop="majorCode">
          <el-input v-model="form.majorCode" placeholder="请输入专业编号" />
        </el-form-item>
        <el-form-item label="专业名称" prop="majorName">
          <el-input v-model="form.majorName" placeholder="请输入专业名称" />
        </el-form-item>
        <el-form-item label="所属系部" prop="facultyId">
          <el-select
            v-model="form.facultyId"
            placeholder="请输入所属系部"
            style="width: 100%"
          >
            <el-option
              v-for="item in dictionaryStore.faculty"
              :key="item.oid"
              :label="item.facultyName"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业编号" prop="system">
          <el-input-number
            v-model="form.system"
            placeholder="请输入学制"
            controls-position="right"
            :min="0"
            :max="5"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="专业编号" prop="state">
          <el-radio-group v-model="form.state">
            <el-radio
              v-for="item in EFFECTIVENESS.getDict()"
              :key="item.value"
              :label="item.value"
              border
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
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

<script setup lang="ts" name="Major">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { delMajor, getMajorPage, saveOrUpdateMajor } from '@/api/basic/major'
import type { Major } from '@/api/basic/major/type'
import { EFFECTIVENESS } from '@/utils/dict'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchList()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<Major[]>()

const searchForm = ref({
  key: void 0,
})
const form = ref<any>({
  oid: void 0,
  majorCode: void 0,
  majorName: void 0,
  facultyId: void 0,
  system: void 0,
  state: void 0,
})
const rules = reactive<FormRules>({
  majorCode: [{ required: true, message: '请填写专业编号', trigger: 'blur' }],
  majorName: [{ required: true, message: '请填写专业名称', trigger: 'blur' }],
  facultyId: [{ required: true, message: '请选择所属系部', trigger: 'blur' }],
  system: [{ required: true, message: '请输入学制', trigger: 'blur' }],
  state: [{ required: true, message: '请选择专业状态', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getMajorPage(query)
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
const updateRow = (row: Major) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.majorCode = row.majorCode
  form.value.majorName = row.majorName
  form.value.facultyId = row.facultyId
  form.value.system = row.system
  form.value.state = row.state
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
        const res = await delMajor(oid.toString())
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
    const res = await saveOrUpdateMajor(form.value)
    ElMessage.success(res.msg)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    oid: void 0,
    majorCode: void 0,
    majorName: void 0,
    facultyId: void 0,
    system: void 0,
    state: void 0,
  }
  formRef.value?.resetFields()
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
