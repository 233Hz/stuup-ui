<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqCapacityEvaluator } from '@/api/portrait/index'
import { PortraitCapacityEvaluatorList } from '@/api/portrait/type'

let chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<PortraitCapacityEvaluatorList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: PortraitCapacityEvaluatorList): echarts.EChartOption => {
  const indicator = data?.map((item) => {
    return {
      name: `${item.indicatorName}（${item.indicatorScore}分）`,
      max: item.indicatorAvgScore,
    }
  })
  console.log(indicator)

  const value = data?.map((item) => item.indicatorScore)
  return {
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
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqCapacityEvaluator()
    dataArr.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  fetch()
})
</script>
