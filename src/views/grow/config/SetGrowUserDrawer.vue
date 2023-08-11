<template>
  <el-drawer
    v-model="active"
    title="设置项目负责人"
    direction="rtl"
    @close="reset"
  >
    <el-row>
      <el-col :span="24">
        <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
          <el-row>
            <el-col :sm="24" :md="12" :xl="12">
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="searchForm.username"
                  placeholder="请输入用户名"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="12">
              <el-form-item label="教师工号" prop="teacherNo">
                <el-input
                  v-model="searchForm.teacherNo"
                  placeholder="请输入教师工号"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :xl="12">
              <el-form-item label="所属部门" prop="deptId">
                <el-select
                  v-model="searchForm.deptId"
                  placeholder="请选择所属部门"
                >
                  <el-option
                    v-for="item in DEPT"
                    :key="item.oid"
                    :label="item.value"
                    :value="item.oid"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24">
        <div style="text-align: center; margin-bottom: 10px">
          <el-space>
            <el-button type="primary" @click="fetchList" :loading="loading">
              查询
            </el-button>
            <el-button @click="searchFormRef?.resetFields()">清空</el-button>
          </el-space>
        </div>
      </el-col>
    </el-row>
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 14px">项目负责人</span>
      </template>
      <el-tag v-for="item in tagData" :key="item.id" class="mx-2">
        {{ item.username }}
      </el-tag>
    </el-card>
    <el-table
      ref="tableRef"
      :data="tableData"
      border
      stripe
      v-loading="loading"
      empty-text="空空如也~~"
      row-key="id"
      style="width: 100%; margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column
        prop="username"
        label="用户名"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="teacherNo"
        label="工号"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="deptName"
        label="所属部门"
        show-overflow-tooltip
        align="center"
      />
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
    <template #footer>
      <el-space>
        <el-button @click="active = false">关闭</el-button>
        <el-button type="primary" :loading="loading" @click="setGrowUser">
          提交
        </el-button>
      </el-space>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { SimpleUserVO, getSimpleUserPage } from '@/api/system/user'
import { getDeptList } from '@/api/basic/dept'
import { getGrowItemUser, setGrowthItemUser } from '@/api/grow/config'
import { ElMessage, ElTable } from 'element-plus'

/* Ref */
const searchFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()

/* Dict */
const DEPT = ref()

/* Data */
const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const total = ref<number>()
const tableData = ref<SimpleUserVO[]>()
const tagData = ref<SimpleUserVO[]>()
const searchForm = ref({
  current: 1,
  size: 20,
  username: void 0,
  teacherNo: void 0,
  deptId: void 0,
})
const form = ref({
  growId: void 0,
  userIds: [],
})

onMounted(() => {
  initDept()
  fetchList()
})

/* Init */
const initDept = async () => {
  const { data } = await getDeptList()
  DEPT.value = data
}

/* Methods */
const open = (id: number) => {
  active.value = true
  form.value.growId = id
  getGrowUser(id)
}

const fetchList = async () => {
  loading.value = true
  try {
    const { data } = await getSimpleUserPage(searchForm.value)
    total.value = data.total
    tableData.value = data.records
  } finally {
    loading.value = false
  }
}

const getGrowUser = async (id: number) => {
  loading.value = true
  try {
    const { data } = await getGrowItemUser(id)
    tagData.value = data
  } finally {
    loading.value = false
  }
}

/**
 * 设置项目负责人
 */
const setGrowUser = async () => {
  loading.value = true
  try {
    await setGrowthItemUser(form.value.growId, form.value.userIds)
    active.value = false
    ElMessage.success('设置成功')
  } finally {
    loading.value = false
  }
}

const handleSelectionChange = (val: SimpleUserVO[]) => {
  form.value.userIds = val.map((item) => item.id)
}

const handleCurrentChange = (val: number) => {
  searchForm.value.current = val
  fetchList()
}
const handleSizeChange = (val: number) => {
  searchForm.value.size = val
  fetchList()
}

const reset = () => {
  form.value = {
    growId: void 0,
    userIds: [],
  }
  tableRef.value!.clearSelection()
}

defineExpose({ open })
</script>

<style scoped lang="scss"></style>
