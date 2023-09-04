<template>
  <div class="w-full h-400">
    <el-table :data="listData" style="width: 100%" height="400">
      <el-table-column
        prop="awardName"
        label="获奖名称"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="awardType"
        label="获奖类型"
        header-align="center"
        align="center"
      >
        <template #default="{ row }">
          {{ AWARD_LEVEL.getKeyForValue(row.awardType) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="awardTime"
        label="获奖时间"
        header-align="center"
        align="center"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqAwardRecord } from '@/api/portrait'
import { AWARD_LEVEL } from '@/utils/dict'

const listData = ref()

onMounted(() => {
  getData()
})

const getData = async () => {
  const { data } = await reqAwardRecord()
  listData.value = data
}
</script>
