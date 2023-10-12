<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleCard from '../../../ModuleCard/index.vue'

const data = ref()

const mock_data = () => {
  return Array.from({ length: 6 }).map((_, index) => {
    return {
      semester: `第${index + 1}学期`,
      state: Math.random() > 0.5 ? '已完成' : '未完成',
    }
  })
}

onMounted(() => {
  data.value = mock_data()
})
</script>

<template>
  <module-card
    header-left-text="志原者活动学分"
    :headerClass="['bg-[#00d2c933]']"
  >
    <div class="p-[10px]">
      <table class="w-full">
        <thead align="center">
          <tr>
            <th>学期</th>
            <th>学分完成情况</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.semester }}</td>
            <td>{{ item.state }}</td>
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
  border: 1px solid #00d2c9;
  vertical-align: middle;
}

th,
td {
  line-height: 30px;
  color: white;
}

thead {
  background-color: #00d2c94d;
}
</style>
