<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full p-10">
        <table
          class="w-full h-full"
          border="1"
          cellspacing="0"
          v-loading="loading"
          element-loading-text="Loading"
          element-loading-background="rgba(255, 255, 255, 0.9)"
        >
          <tr>
            <th>成长项目</th>
            <th>成长小计</th>
            <th>上月总分</th>
            <!-- <th></th> -->
          </tr>
          <tr v-for="(item, index) in dataArr" :key="index">
            <td>{{ item.growthName }}</td>
            <td>{{ item.growthItemCount }}</td>
            <td>{{ item.totalScore }}</td>
            <td>
              <div
                class="flex justify-center align-center"
                v-if="item.scoreChangeType"
              >
                <div>
                  <svg-icon
                    :name="selectChangeTypeSvg(item.scoreChangeType)"
                  ></svg-icon>
                </div>
                <div
                  v-if="
                    item.scoreChangeType === PROGRESS_STATE.UP ||
                    item.scoreChangeType === PROGRESS_STATE.DOWN
                  "
                >
                  {{ item.changeValue }}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import { reqGrowthScoreCompare } from '@/api/screen'
import type { GrowthScoreCountList } from '@/api/screen/type'
import { PROGRESS_STATE } from '@/utils/dict'

const loading = ref(false)
const dataArr = ref<GrowthScoreCountList>()

const fetch = async () => {
  try {
    loading.value = true
    const { data } = await reqGrowthScoreCompare()
    dataArr.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const selectChangeTypeSvg = (type: number): string => {
  let svg: string
  switch (type) {
    case PROGRESS_STATE.UP:
      svg = 'rise'
      break
    case PROGRESS_STATE.DOWN:
      svg = 'drop'
      break
    case PROGRESS_STATE.SAME:
      svg = 'unchanged'
      break
    default:
      svg = ''
  }
  return svg
}

onMounted(() => {
  fetch()
})
</script>

<style scoped lang="scss">
table,
th,
td {
  border: 1px solid white;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  vertical-align: middle;
  color: white;
}

th {
  font-style: 16px;
}

td {
  font-style: 14px;
}
</style>
