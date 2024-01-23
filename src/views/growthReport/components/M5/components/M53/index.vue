<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import type { CreditCompletion } from '@/api/growthReport/type'

defineProps<{
  data?: CreditCompletion[]
}>()
</script>

<template>
  <module-card header-left-text="生产劳动实践学分" color="#17c492">
    <div class="p-[10px]">
      <table class="w-full">
        <thead align="center">
          <tr>
            <th>学期</th>
            <th>学分完成情况</th>
          </tr>
        </thead>
        <tbody align="center" v-if="data && data.length > 0">
          <tr v-for="item in data" :key="item.semesterId">
            <td>{{ item.semesterName }}</td>
            <td>{{ item.completion }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <th colspan="2">暂无数据</th>
          </tr>
        </tbody>
      </table>
    </div>
  </module-card>
</template>

<style scoped lang="scss">
table,
th,
td {
  border: 1px solid #17c492;
  vertical-align: middle;
}

th,
td {
  line-height: 30px;
}

thead {
  background-color: #17c4924d;
}
</style>
