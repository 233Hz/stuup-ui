<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqStudyGrade } from '@/api/portrait'
import type { PortraitStudyGradeList } from '@/api/portrait/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<PortraitStudyGradeList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: PortraitStudyGradeList): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: number[] = []
  data.forEach((item) => {
    xArr.push(item.semesterName)
    yArr.push(item.score)
  })
  return {
    xAxis: {
      type: 'category',
      data: xArr,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        label: {
          show: true,
          formatter: '{c} 分',
          fontSize: 18,
          color: '#03aa8c',
        },
        data: yArr,
        type: 'line',
        smooth: true,
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqStudyGrade()
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
