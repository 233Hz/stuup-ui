<template>
  <div>
    <el-card>
      <el-form ref="searchRef" :model="searchForm">
        <el-row :gutter="20">
          <el-col :sm="24" :md="12" :xl="4">
            <el-form-item label="角色名称" prop="key">
              <el-input v-model="searchForm.key" placeholder="请输入角色名称" />
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
                  v-permission="'role_add_edit'"
                  @click="addRow"
                >
                  添加
                </el-button>
                <el-button
                  icon="Refresh"
                  plain
                  circle
                  :disabled="loading"
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
          prop="roleName"
          label="角色名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="roleCode"
          label="角色编号"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column label="操作" width="400" align="center">
          <template #default="{ row }">
            <el-button
              bg
              text
              icon="Edit"
              v-permission="'role_add_edit'"
              @click="updateRow(row)"
            >
              修改
            </el-button>
            <el-button
              bg
              text
              icon="Setting"
              v-permission="'role_auth'"
              @click="openRoleMenuTree(row.oid)"
            >
              角色权限
            </el-button>
            <!-- <el-button>角色用户</el-button> -->
            <el-button
              bg
              text
              type="danger"
              icon="Delete"
              v-permission="'role_del'"
              @click="delRow(row.oid)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
      </el-table>
      <Pagination @size-change="fetchData" @current-change="fetchData" />
    </el-card>
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode">
          <el-input v-model="form.roleCode" placeholder="请输入角色编号" />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            v-model="form.roleDesc"
            type="textarea"
            maxlength="500"
            placeholder="请输入角色描述"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button icon="Close" @click="dialog_active = false">取 消</el-button>
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
    <Drawer ref="drawerRef" />
  </div>
</template>

<script setup lang="ts" name="Role">
import { onMounted, reactive, ref } from 'vue'
import { delRole, getRolePage, saveRole } from '@/api/system/role/index'
import { RoleVO } from '@/api/system/role/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDate } from '@/utils/util'
import { requiredRule } from '@/utils/rules'
import type { FormInstance, FormRules } from 'element-plus'
import Drawer from './drawer.vue'
import usePaginationStore from '@/store/modules/pagination'

const paginationStore = usePaginationStore()

onMounted(() => {
  fetchData()
})

const loading = ref<boolean>(false)
const dialog_active = ref<boolean>(false)
const dialog_title = ref<string>('')
const tableData = ref<RoleVO[]>()
const searchForm = ref({
  key: void 0,
})
const form = ref<any>({
  oid: void 0,
  roleName: void 0,
  roleCode: void 0,
  roleDesc: void 0,
})
const rules = reactive<FormRules>({
  roleName: [requiredRule('角色名称不能为空')],
  roleCode: [requiredRule('角色编号不能为空')],
})
const searchRef = ref<FormInstance>()
const formRef = ref<FormInstance>()
const drawerRef = ref()

const fetchData = async () => {
  loading.value = true
  try {
    const { current, size } = paginationStore
    const query = Object.assign(searchForm.value, { current, size })
    const { data: res } = await getRolePage(query)
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
const updateRow = (row: RoleVO) => {
  dialog_title.value = '修改'
  dialog_active.value = true
  form.value.oid = row.oid
  form.value.roleName = row.roleName
  form.value.roleCode = row.roleCode
  form.value.roleDesc = row.roleDesc
}
const delRow = (oid: number) => {
  ElMessageBox.confirm('确认删除？', '删除角色', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        const res = await delRole(oid)
        ElMessage.success(res.msg)
        fetchData()
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
    const res = await saveRole(form.value)
    ElMessage.success(res.msg)
    dialog_active.value = false
    fetchData()
  } finally {
    loading.value = false
  }
}

const openRoleMenuTree = async (roleId: number) => {
  drawerRef.value?.open(roleId)
}

const resetForm = () => {
  form.value = {
    oid: void 0,
    roleName: void 0,
    roleDesc: void 0,
  }
  formRef.value?.resetFields()
}
</script>

<style scoped>
.el-card {
  margin: 10px;
}
</style>
