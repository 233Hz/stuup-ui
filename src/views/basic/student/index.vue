<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="学生姓名/班级名称" prop="key">
              <el-input
                v-model="searchForm.key"
                placeholder="请输入学生姓名/班级名称"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
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
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="所属专业" prop="majorId">
              <el-select
                v-model="searchForm.majorId"
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
                <!--  <el-button type="primary" icon="Plus" plain @click="addRow">
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
          prop="studentNo"
          label="学号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="name"
          label="学生姓名"
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
          prop="className"
          label="所属班级"
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
          prop="idCard"
          label="身份证号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="nation"
          label="民族"
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
          prop="status"
          label="学业状态"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ SCHOOL_WORD_STATE.getKeyForValue(row.status) }}
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
        <el-form-item label="学号" prop="studentNo">
          <el-input v-model="form.studentNo" placeholder="请输入学号" />
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
        <el-form-item label="所属班级" prop="classId">
          <el-select
            v-model="form.classId"
            placeholder="请选择所属班级"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="所属年级" prop="gradeId">
          <el-select
            v-model="form.gradeId"
            placeholder="请选择所属年级"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="所属专业" prop="majorId">
          <el-select
            v-model="form.majorId"
            placeholder="请选择所属专业"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-select
            v-model="form.nation"
            placeholder="请选择民族"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="学业状态" prop="statue">
          <el-select
            v-model="form.statue"
            placeholder="请选择学业状态"
            style="width: 100%"
          >
            <el-option
              v-for="item in SCHOOL_WORD_STATE.getDict()"
              :key="item.value"
              :label="item.label"
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
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts" name="Student">
import { ref, onMounted, reactive } from 'vue'
import { getStudentPage, saveStudent } from '@/api/basic/student'
import { ElMessage } from 'element-plus'
import { SEX, SCHOOL_WORD_STATE } from '@/utils/dict'
import type { FormInstance, FormRules } from 'element-plus'
import type { StudentVO } from '@/api/basic/student/type'
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
const tableData = ref<StudentVO[]>()

const searchForm = ref({
  key: void 0,
  gradeId: void 0,
  majorId: void 0,
})
const form = ref<any>({
  oid: void 0,
  studentNo: void 0,
  name: void 0,
  sex: void 0,
  classId: void 0,
  gradeId: void 0,
  majorId: void 0,
  idCard: void 0,
  nation: void 0,
  phone: void 0,
  statue: void 0,
})
const rules = reactive<FormRules>({
  studentNo: [{ required: true, message: '请填写学号', trigger: 'blur' }],
  name: [{ required: true, message: '请填写学生姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  classId: [{ required: true, message: '请选择所属班级', trigger: 'blur' }],
  gradeId: [{ required: true, message: '请选择所属年级', trigger: 'blur' }],
  majorId: [{ required: true, message: '请选择所属专业', trigger: 'blur' }],
  idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  nation: [{ required: true, message: '请选择民族', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  statue: [{ required: true, message: '请选择学业状态', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getStudentPage(query)
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
const updateRow = (row: StudentVO) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.studentNo = row.studentNo
  form.value.name = row.name
  form.value.sex = row.sex
  form.value.classId = row.classId
  form.value.gradeId = row.gradeId
  form.value.majorId = row.majorId
  form.value.idCard = row.idCard
  form.value.nation = row.nation
  form.value.phone = row.phone
  form.value.statue = row.statue
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
    const res = await saveStudent(form.value)
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
    studentNo: void 0,
    name: void 0,
    sex: void 0,
    classId: void 0,
    gradeId: void 0,
    majorId: void 0,
    idCard: void 0,
    nation: void 0,
    phone: void 0,
    statue: void 0,
  }
  formRef.value?.resetFields()
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
