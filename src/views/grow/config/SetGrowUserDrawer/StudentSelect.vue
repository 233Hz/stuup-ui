<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :sm="24" :md="8" :xl="8">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="searchForm.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :xl="8">
            <el-form-item label="教师工号" prop="teacherNo">
              <el-input
                v-model="searchForm.teacherNo"
                placeholder="请输入教师工号"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :xl="8">
            <el-form-item label="所属部门" prop="deptId">
              <el-select
                v-model="searchForm.deptId"
                placeholder="请选择所属部门"
              >
                <el-option
                  v-for="item in dictionaryStore.dept"
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
  <el-table
    ref="tableRef"
    :data="tableData"
    border
    stripe
    v-loading="loading"
    empty-text="空空如也~~"
    row-key="id"
    style="width: 100%; margin-top: 10px"
    @selection-change="tableSelectChangeHandler"
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
      :small="true"
      v-model:current-page="searchForm.current"
      v-model:page-size="searchForm.size"
      :page-sizes="[10, 20, 30, 50, 100]"
      @size-change="pageSizeChangeHandler"
      @current-change="pageCurrentChangeHandler"
      layout="total, sizes, prev, pager, next"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSimpleUserPage } from '@/api/system/user'
import { ElTable } from 'element-plus'
import { DictionaryType } from '@/store/modules/dictionary'
import useDictionaryStore from '@/store/modules/dictionary'
import type { FormInstance } from 'element-plus'
import type { SimpleUserVO } from '@/api/system/user/type'

const dictionaryStore = useDictionaryStore()

const searchFormRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const loading = ref<boolean>(false)
const total = ref<number>(0)
const tableData = ref<SimpleUserVO[]>()
const searchForm = ref({
  current: 1,
  size: 10,
  username: void 0,
  teacherNo: void 0,
  deptId: void 0,
})

onMounted(async () => {
  await dictionaryStore.init(DictionaryType.DEPT)
  fetchList()
})

/**
 * 获取列表
 */
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

/**
 * 表格选中改变处理
 * @param val
 */
const tableSelectChangeHandler = (val: SimpleUserVO[]) => {
  emit('selectChange', val)
}

/**
 * 分页页码改变处理
 * @param val
 */
const pageCurrentChangeHandler = (val: number) => {
  searchForm.value.current = val
  fetchList()
}

/**
 * 分页大小改变处理
 * @param val
 */
const pageSizeChangeHandler = (val: number) => {
  searchForm.value.size = val
  fetchList()
}

/**
 * 重置
 */
const reset = () => {
  searchFormRef.value?.resetFields()
  tableRef.value?.clearSelection()
}

/**
 * 清空选中
 */
const clearSelection = () => {
  tableRef.value?.clearSelection()
}

/**
 * 取消选取
 * @param userId
 */
const cancelSelect = (userId: number) => {
  const row = tableRef.value
    ?.getSelectionRows()
    ?.find((row: SimpleUserVO) => row.id === userId)
  if (row) tableRef.value?.toggleRowSelection(row, false)
}

const emit = defineEmits<{
  selectChange: [selected: SimpleUserVO[]]
}>()
defineExpose({ reset, clearSelection, cancelSelect })
</script>