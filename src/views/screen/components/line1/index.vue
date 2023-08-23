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
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqCountDailyVisits } from '@/api/screen'
import type { DailyVisits } from '@/api/screen/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<DailyVisits[]>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: DailyVisits[]): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: number[] = []
  data.forEach((item) => {
    xArr.push(item.date)
    yArr.push(item.count)
  })
  return {
    title: {
      text: '每日访问量',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: xArr,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yArr,
        type: 'line',
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqCountDailyVisits()
    dataArr.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  echarts.registerTheme('CustomTheme', CustomTheme)
  chart = echarts.init(chartRef.value, 'CustomTheme')
  fetch()
})
</script>
