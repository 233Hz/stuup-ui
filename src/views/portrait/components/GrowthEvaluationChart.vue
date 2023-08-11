<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqCapacityEvaluator } from '@/api/portrait/index'
import { PortraitCapacityEvaluatorList } from '@/api/portrait/type'

let chartRef = ref()

let option = {}
const list = ref<PortraitCapacityEvaluatorList>()

watch(list, (newVal) => {
  const indicator = newVal?.map((item) => {
    return {
      name: `${item.indicatorName}（${item.indicatorScore}分）`,
      max: item.indicatorAvgScore,
    }
  })
  const value = newVal?.map((item) => item.indicatorScore)
  option = {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '50%',
      bottom: '50%',
      left: '50%',
      right: '50%',
    },
    radar: {
      shape: 'circle',
      indicator,
      axisName: {
        fontSize: 18,
        color: '#03aa8c',
      },
    },
    series: [
      {
        name: '成长综合评价',
        type: 'radar',
        data: [
          {
            value,
            name: '成长方向',
          },
        ],
      },
    ],
  }
  const chart = echarts.init(chartRef.value)
  option && chart.setOption(option, true)
})

onMounted(async () => {
  const { data } = await reqCapacityEvaluator()
  list.value = data
})
</script>
