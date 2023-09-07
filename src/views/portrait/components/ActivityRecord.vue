<template>
  <div class="w-full h-400">
    <el-table
      :data="listData"
      style="width: 100%"
      height="400"
      header-row-class-name="text-#03aa8c"
    >
      <el-table-column
        prop="activityName"
        label="活动名称"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="activityTime"
        label="参加时间"
        header-align="center"
        align="center"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqActivityRecord } from '@/api/portrait/index'

const listData = ref()

onMounted(() => {
  getData()
})

const getData = async () => {
  const { data } = await reqActivityRecord()
  listData.value = data
}
</script>
