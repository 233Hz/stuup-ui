<template>
  <el-dialog v-model="active" title="导入详情" width="40%">
    <div style="height: 600px">
      <el-auto-resizer v-loading="loading">
        <template #default="{ width, height }">
          <el-table-v2
            :columns="columns"
            :data="tableData"
            :width="width"
            :height="height"
          />
        </template>
      </el-auto-resizer>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RecDefaultVO, growthRecordDetails } from '@/api/collect/index'

const columns = [
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '年级',
    width: 100,
  },
  {
    dataKey: 'className',
    key: 'className',
    title: '班级',
    width: 300,
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 100,
  },
  {
    dataKey: 'studentNo',
    key: 'studentNo',
    title: '学号',
    width: 100,
  },
  {
    dataKey: 'idCard',
    key: 'idCard',
    title: '证件号',
    width: 150,
  },
  {
    dataKey: 'remark',
    key: 'remark',
    title: '备注',
    width: 150,
  },
]
const batchCode = ref<number>()
const active = ref<boolean>(false)
const loading = ref<boolean>(false)
const tableData = ref<RecDefaultVO[]>([])

const open = async (code: number) => {
  batchCode.value = code
  fetchData()
  active.value = true
}

const fetchData = async () => {
  if (!batchCode.value) return
  loading.value = true
  try {
    const { data } = await growthRecordDetails(batchCode.value)
    tableData.value = Object.freeze(data) as RecDefaultVO[]
  } finally {
    loading.value = false
  }
}

defineExpose({ open })
</script>

<style scoped lang="scss"></style>
