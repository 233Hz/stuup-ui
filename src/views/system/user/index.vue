<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="用户名/手机号" prop="key">
              <el-input v-model="searchForm.key" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="状态" prop="state">
              <el-select
                v-model="searchForm.state"
                placeholder="请选择状态"
                style="width: 100%"
              >
                <el-option
                  v-for="item in USER_STATE.getDict()"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                  @click="fetchData"
                  :loading="loading"
                >
                  查询
                </el-button>
                <el-button icon="Close" plain @click="searchRef?.resetFields()">
                  清空
                </el-button>
                <el-button
                  type="primary"
                  icon="Plus"
                  plain
                  v-permission="'user_add_edit'"
                  @click="addRow"
                >
                  添加
                </el-button>
                <el-button
                  icon="Refresh"
                  plain
                  :disabled="loading"
                  circle
                  @click="fetchData"
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
          prop="loginName"
          label="登入账号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="userName"
          label="用户姓名"
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
          prop="mobile"
          label="手机号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="degree"
          label="文化程度"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="teacherType"
          label="教师类型"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ TEACHER_TYPE.getKeyForValue(row.teacherType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="userType"
          label="用户类型"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ USER_TYPE.getKeyForValue(row.userType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="所属部门"
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
          prop="birthday"
          label="出生年月"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="roleNames"
          label="用户角色"
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
            {{ USER_STATE.getKeyForValue(row.state) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="340" align="center">
          <template #default="{ row }">
            <el-button
              bg
              text
              icon="Edit"
              v-permission="'user_add_edit'"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              bg
              text
              icon="Delete"
              v-permission="'user_del'"
              @click="delRow(row.oid)"
            >
              删除
            </el-button>
            <el-button
              bg
              text
              icon="Setting"
              v-permission="'user_set_password'"
              @click="setPassword(row.oid)"
            >
              修改密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination @size-change="fetchData" @current-change="fetchData" />
    </el-card>
    <el-dialog
      v-model="active"
      :title="title"
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
        <el-form-item label="用户账号" prop="loginName">
          <el-input v-model="form.loginName" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名" />
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
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="文化程度" prop="degree">
          <el-input v-model="form.degree" placeholder="请选择文化程度" />
        </el-form-item>
        <el-form-item label="教师类型" prop="teacherType">
          <el-select
            v-model="form.teacherType"
            placeholder="请选择教师类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in TEACHER_TYPE.getDict()"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select
            v-model="form.userType"
            placeholder="请选择用户类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in USER_TYPE.getDict()"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-select
            v-model="form.deptId"
            placeholder="请选择所属部门"
            style="width: 100%"
          >
            <el-option
              v-for="item in dictionaryStore.dept"
              :key="item.oid"
              :label="item.value"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号" />
        </el-form-item>
        <el-form-item label="出生年月" prop="birthday">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="请选择出生年月"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="用户角色" prop="roles">
          <el-select
            v-model="form.roles"
            placeholder="请选择用户角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="item in dictionaryStore.role"
              :key="item.oid"
              :label="item.value"
              :value="item.oid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select
            v-model="form.state"
            placeholder="请选择状态"
            style="width: 100%"
          >
            <el-option
              v-for="item in USER_STATE.getDict()"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button icon="Close" @click="active = false">取 消</el-button>
        <el-button
          type="primary"
          icon="Check"
          :loading="loading"
          @click="submitForm"
        >
          提 交
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, reactive } from 'vue'
import { getUserPage, saveOrUpdateUser, delUser } from '@/api/system/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SEX, TEACHER_TYPE, USER_TYPE, USER_STATE } from '@/utils/dict'
import { formatDate } from '@/utils/util'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserVO } from '@/api/system/user/type'
import useDictionaryStore from '@/store/modules/dictionary'
import usePaginationStore from '@/store/modules/pagination'
import { passwordRegex } from '@/utils/regex'
import { setUserPassword } from '@/api/system/user'

const dictionaryStore = useDictionaryStore()
const paginationStore = usePaginationStore()

onMounted(async () => {
  await fetchData()
  await dictionaryStore.init()
})

const loading = ref<boolean>(false)
const active = ref<boolean>(false)
const title = ref<string>('')
const tableData = ref<UserVO[]>()
const searchForm = ref({
  size: 10,
  key: void 0,
  state: void 0,
})
const form = ref<any>({
  oid: void 0,
  loginName: void 0,
  userName: void 0,
  sex: void 0,
  mobile: void 0,
  degree: void 0,
  teacherType: void 0,
  userType: void 0,
  deptId: void 0,
  idCard: void 0,
  birthday: void 0,
  roles: [],
  state: USER_STATE.NORMAL,
})
const rules = reactive<FormRules>({
  loginName: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  roles: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchData = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getUserPage(Object.assign(query))
    paginationStore.setTotal(res.total)
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const addRow = () => {
  title.value = '添加'
  active.value = true
}
const updateRow = (row: UserVO) => {
  title.value = '修改'
  active.value = true
  form.value.oid = row.oid
  form.value.loginName = row.loginName
  form.value.userName = row.userName
  form.value.sex = row.sex
  form.value.mobile = row.mobile
  form.value.degree = row.degree
  form.value.teacherType = row.teacherType
  form.value.userType = row.userType
  form.value.deptId = row.deptId
  form.value.idCard = row.idCard
  form.value.birthday = row.birthday
  form.value.roles = row.roles
  form.value.state = row.state
}
const delRow = (oid: number) => {
  ElMessageBox.confirm('确认删除？', '删除学年', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        const res = await delUser(oid.toString())
        ElMessage.success(res.msg)
        fetchData()
      } catch (error) {
        console.trace(error)
      }
    })
    .catch(() => {})
}

const setPassword = (id: number) => {
  ElMessageBox.prompt('请输入要修改的密码', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: passwordRegex,
    inputErrorMessage: '密码必须包括字母大小写、数字、特殊字符',
  })
    .then(async ({ value }) => {
      const { msg } = await setUserPassword(id, value)
      ElMessage.success(msg)
    })
    .catch(() => {})
}

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value?.validate()
  if (!valid) return
  loading.value = true
  try {
    const res = await saveOrUpdateUser(form.value)
    ElMessage.success(res.msg)
    active.value = false
    fetchData()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    oid: void 0,
    loginName: void 0,
    userName: void 0,
    sex: void 0,
    mobile: void 0,
    degree: void 0,
    teacherType: void 0,
    userType: void 0,
    deptId: void 0,
    idCard: void 0,
    birthday: void 0,
    roles: [],
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
