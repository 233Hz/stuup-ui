<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="教师姓名" prop="key">
              <el-input v-model="searchForm.key" placeholder="请输入教师姓名" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
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
          prop="jobNo"
          label="教师工号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="name"
          label="教师姓名"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="sex"
          label="性别"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ SEX.getKeyForValue(row.sex) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="facultyName"
          label="所属系部"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="teachGroupName"
          label="教研组"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="phone"
          label="联系方式"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="idCard"
          label="身份证号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="address"
          label="地址"
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
            {{ TEACHER_STATE.getKeyForValue(row.state) }}
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
        <el-form-item label="教师工号" prop="jobNo">
          <el-input v-model="form.jobNo" placeholder="请输入教师工号" />
        </el-form-item>
        <el-form-item label="教师姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入教师姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio
              v-for="item in SEX.getDict()"
              :key="item.value"
              :label="item.value"
              border
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属系部" prop="facultyId">
          <el-select
            v-model="form.facultyId"
            placeholder="请选择所属系部"
          ></el-select>
        </el-form-item>
        <el-form-item label="教研组" prop="teachGroup">
          <el-select
            v-model="form.teachGroup"
            placeholder="请选择教研组"
          ></el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="form.state">
            <el-radio
              v-for="item in TEACHER_STATE.getDict()"
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

<script setup lang="ts" name="Teacher">
import { ref, onMounted, reactive } from 'vue'
import { getTeacherPage, saveTeacher } from '@/api/basic/teacher'
import { ElMessage } from 'element-plus'
import { SEX, TEACHER_STATE } from '@/utils/dict'
import type { FormInstance, FormRules } from 'element-plus'
import type { TeacherVO } from '@/api/basic/teacher/type'
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
const tableData = ref<TeacherVO[]>()

const searchForm = ref({
  key: void 0,
  facultyId: void 0,
})
const form = ref<any>({
  jobNo: void 0,
  name: void 0,
  sex: void 0,
  facultyId: void 0,
  teachGroup: void 0,
  phone: void 0,
  idCard: void 0,
  address: void 0,
  state: void 0,
})
const rules = reactive<FormRules>({
  jobNo: [{ required: true, message: '请填写教师工号', trigger: 'blur' }],
  name: [{ required: true, message: '请填写教师姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择教师性别', trigger: 'blur' }],
  facultyId: [{ required: true, message: '请选择所属系部', trigger: 'blur' }],
  teachGroup: [{ required: true, message: '请选择教研组', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  state: [{ required: true, message: '请选择专业状态', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getTeacherPage(query)
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
const updateRow = (row: TeacherVO) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.jobNo = row.jobNo
  form.value.name = row.name
  form.value.sex = row.sex
  form.value.facultyId = row.facultyId
  form.value.teachGroup = row.teachGroup
  form.value.phone = row.phone
  form.value.idCard = row.idCard
  form.value.address = row.address
  form.value.state = row.state
}
const delRow = (oid: number) => {
  console.log(oid)
}

const submitForm = async () => {
  if (!formRef) return
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  try {
    const res = await saveTeacher(form.value)
    ElMessage.success(res.msg)
    dialog_active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    jobNo: void 0,
    name: void 0,
    sex: void 0,
    facultyId: void 0,
    teachGroup: void 0,
    phone: void 0,
    idCard: void 0,
    address: void 0,
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
