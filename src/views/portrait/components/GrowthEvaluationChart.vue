<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import { reqCapacityEvaluator } from '@/api/portrait'
import { PortraitCapacityEvaluatorList } from '@/api/portrait/type'

const route = useRoute()

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
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
    axisName: {
      fontSize: 18,
      color: '#03aa8c',
    },
  },
  series: [
    {
      name: '成长综合评价',
      type: 'radar',
    },
  ],
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        invisible: true,
        style: {
          fill: '#03aa8c',
          text: '暂无数据',
          fontSize: 30,
        },
      },
    ],
  },
}

let chartRef = ref()
let chart: ECharts
const chartData = ref<PortraitCapacityEvaluatorList>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    const indicator: { name: string; max: number }[] = []
    const value: number[] = []
    newVal.forEach((item) => {
      indicator.push({
        name: `${item.indicatorName}（${item.indicatorScore}分）`,
        max: item.indicatorAvgScore,
      })
      value.push(item.indicatorScore)
    })
    chart.setOption({
      radar: { indicator },
      series: [
        {
          data: [
            {
              value,
              name: '成长方向',
            },
          ],
        },
      ],
    })
  } else {
    chart.setOption({
      graphic: {
        invisible: false,
      },
    })
  }
})

const fetchData = async () => {
  try {
    chart.showLoading()
    const { data } = await reqCapacityEvaluator(+route.params.id)
    chartData.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(option)
  fetchData()
})
</script>
