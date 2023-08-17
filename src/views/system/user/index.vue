<template>
  <div style="padding: 10px 20px">
    <el-card style="margin: 10px 0">
      <template #header>
        <el-row>
          <el-col :span="24">
            <el-form
              ref="searchFormRef"
              :model="searchForm"
              label-width="120px"
            >
              <el-row>
                <el-col :sm="24" :md="12" :xl="8">
                  <el-form-item label="用户名/手机号" prop="key">
                    <el-input
                      v-model="searchForm.key"
                      placeholder="请输入用户名/手机号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :sm="24" :md="12" :xl="8">
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
          <el-button type="primary" @click="addRow">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
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
            {{ TESCHER_TYPE.getKeyForValue(row.teacherType) }}
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
        />
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
        <el-table-column label="操作" width="200" align="center">
          <template #default="{ row }">
            <el-button @click="updateRow(row)">修改</el-button>
            <el-button @click="delRow(row.oid)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-r">
        <el-pagination
          background
          :total="total"
          v-model:current-page="searchForm.current"
          v-model:page-size="searchForm.size"
          :page-sizes="[10, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
        />
      </div>
    </el-card>
  </div>
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
            v-for="item in TESCHER_TYPE.getDict()"
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
</template>

<script setup lang="ts" name="User">
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserVO } from '@/api/system/user/type'
import { getUserPage, saveOrUpdateUser, delUser } from '@/api/system/user/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SEX, TESCHER_TYPE, USER_TYPE, USER_STATE } from '@/utils/dict'
import useDictionaryStore from '@/store/modules/dictionary'
import { DictionaryType } from '@/store/modules/dictionary'

const dictionaryStore = useDictionaryStore()

onMounted(async () => {
  await dictionaryStore.init(DictionaryType.DEPT, DictionaryType.ROLE)
  fetchList()
})

const loading = ref<boolean>(false)
const active = ref<boolean>(false)
const title = ref<string>('')
const tableData = ref<UserVO[]>()
const total = ref<number>(0)
const searchForm = ref({
  current: 1,
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
const searchFormRef = ref<FormInstance>()
const formRef = ref<FormInstance>()

const fetchList = async () => {
  loading.value = true
  try {
    const { data: res } = await getUserPage(Object.assign(searchForm.value))
    total.value = res.total
    tableData.value = res.records
  } finally {
    loading.value = false
  }
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}

const addRow = () => {
  title.value = '添加'
  active.value = true
}
const updateRow = (row: UserVO) => {
  title.value = '修改'
  active.value = true
  console.log(row, form.value)

  Object.assign(form.value, row)
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
        const res = await delUser(oid.toString())
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
    const data = form.value as UserVO
    const res = await saveOrUpdateUser(data)
    ElMessage.success(res.message)
    active.value = false
    fetchList()
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    oid: void 0,
    loginName: '',
    userName: '',
    sex: void 0,
    mobile: '',
    degree: '',
    teacherType: void 0,
    userType: void 0,
    deptId: void 0,
    idCard: '',
    birthday: void 0,
    roles: [],
    state: void 0,
  }
  formRef.value?.resetFields()
}
</script>
