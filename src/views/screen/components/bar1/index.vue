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
import { reqStudentGrowthMonitor } from '@/api/screen'
import type { StudentGrowthMonitorList } from '@/api/screen/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<StudentGrowthMonitorList>()

watch(
  dataArr,
  (newVal) => {
    if (dataArr && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: StudentGrowthMonitorList): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: number[] = []
  data.forEach((item) => {
    xArr.push(item.growItemName)
    yArr.push(item.personNum)
  })
  return {
    title: {
      text: '学生成长监控',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      bottom: 0,
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: xArr,
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: '违规人次',
        type: 'bar',
        data: yArr,
        label: {
          show: true,
          formatter: '{b} {c}人',
        },
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqStudentGrowthMonitor()
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
