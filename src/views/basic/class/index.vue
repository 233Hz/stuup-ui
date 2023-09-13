<template>
  <div>
    <div style="padding: 10px 20px">
      <el-card style="margin: 10px 0">
        <template #header>
          <el-row>
            <el-col :span="24">
              <el-form ref="searchRef" :model="searchForm" label-width="120px">
                <el-row>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="班级名称/班号" prop="key">
                      <el-input
                        v-model="searchForm.key"
                        placeholder="请输入班级名称/班号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属系部" prop="facultyId">
                      <el-select
                        v-model="searchForm.facultyId"
                        placeholder="请选择所属系部"
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
                  </el-col>
                  <el-col :sm="24" :md="12" :xl="8">
                    <el-form-item label="所属年级" prop="gradeId">
                      <el-select
                        v-model="searchForm.gradeId"
                        placeholder="请选择所属年级"
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
            prop="code"
            label="班号"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="name"
            label="班级名称"
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
            prop="gradeName"
            label="所属年级"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="majorName"
            label="所属专业"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="teacherName"
            label="班主任"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="count"
            label="人数"
            show-overflow-tooltip
            align="center"
          />
          <!-- <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.id)" type="danger">删除</el-button>
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
        <el-form-item label="班号" prop="code">
          <el-input v-model="form.code" placeholder="请输入班号" />
        </el-form-item>
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="所属系部" prop="facultyId">
          <el-select
            v-model="form.facultyId"
            placeholder="请选择所属系部"
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
        <el-form-item label="所属年级" prop="gradeId">
          <el-select
            v-model="form.gradeId"
            placeholder="请选择所属年级"
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
        <el-form-item label="所属专业" prop="majorId">
          <el-select
            v-model="form.majorId"
            placeholder="请选择所属专业"
            style="width: 100%"
          >
            <el-option
              v-for="item in dictionaryStore.major"
              :key="item.oid"
              :label="item.majorName"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" prop="teacherId">
          <el-select
            v-model="form.teacherId"
            placeholder="请选择班主任"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.oid"
              :label="item.value"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="管理员" prop="adminId">
          <el-select
            v-model="form.adminId"
            placeholder="请选择管理员"
            style="width: 100%"
          >
            <el-option
              v-for="item in []"
              :key="item.oid"
              :label="item.value"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人数" prop="count">
          <el-input-number
            v-model="form.count"
            :min="0"
            controls-position="right"
            placeholder="请选择人数"
            style="width: 100%"
          />
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

<script setup lang="ts" name="Class">
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { getClassPage, saveOrUpdateClass, delClass } from '@/api/basic/class'
import type { Class } from '@/api/basic/class/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'

const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchList()
  await dictionaryStore.init()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<Class[]>()
const searchForm = ref({
  key: void 0,
  facultyId: void 0,
  gradeId: void 0,
})
const form = ref<any>({
  id: void 0,
  code: void 0,
  name: void 0,
  facultyId: void 0,
  gradeId: void 0,
  majorId: void 0,
  teacherId: void 0,
  adminId: void 0,
  count: 0,
})
const rules = reactive<FormRules>({
  code: [{ required: true, message: '请填写班号', trigger: 'blur' }],
  name: [{ required: true, message: '请填写班级名称', trigger: 'blur' }],
  facultyId: [{ required: true, message: '请选择所属系部', trigger: 'blur' }],
  gradeId: [{ required: true, message: '请选择所属年级', trigger: 'blur' }],
  majorId: [{ required: true, message: '请选择所属专业', trigger: 'blur' }],
  teacherId: [{ required: true, message: '请选择班主任', trigger: 'blur' }],
  adminId: [{ required: true, message: '请选择管理员', trigger: 'blur' }],
  count: [{ required: true, message: '请输入人数', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getClassPage(query)
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
const updateRow = (row: Class) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.id = row.id
  form.value.code = row.code
  form.value.name = row.name
  form.value.facultyId = row.facultyId
  form.value.gradeId = row.gradeId
  form.value.majorId = row.majorId
  form.value.teacherId = row.teacherId
  form.value.adminId = row.adminId
  form.value.count = row.count
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
        const res = await delClass(id.toString())
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
    const res = await saveOrUpdateClass(form.value)
    ElMessage.success(res.message)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    code: void 0,
    name: void 0,
    facultyId: void 0,
    gradeId: void 0,
    majorId: void 0,
    teacherId: void 0,
    adminId: void 0,
    count: 0,
  }
  formRef.value?.resetFields()
}
</script>
