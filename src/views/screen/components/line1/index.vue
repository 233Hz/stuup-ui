<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full p-10">
        <div ref="chartRef" class="w-full h-full" />
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqCountDailyVisits } from '@/api/screen'
import type { DailyVisits } from '@/api/screen/type'

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
  title: {
    text: '每日访问量',
  },
  tooltip: {},
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
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
          fill: '#fff',
          text: '暂无数据',
          fontSize: 30,
        },
      },
    ],
  },
}

const chartRef = ref()
let chart: echarts.ECharts
const chartData = ref<DailyVisits[]>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    let x: string[] = []
    let y: number[] = []
    newVal.forEach((item) => {
      x.push(item.date)
      y.push(item.count)
    })
    chart.setOption({
      xAxis: {
        data: x,
      },
      series: [
        {
          data: y,
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

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqCountDailyVisits()
    chartData.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  echarts.registerTheme('CustomTheme', CustomTheme)
  chart = echarts.init(chartRef.value, 'CustomTheme')
  chart.setOption(option)
  fetch()
})
</script>
