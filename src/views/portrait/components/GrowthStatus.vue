<template>
  <div style="color: #00866e" ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqGrowthAnalysis } from '@/api/portrait/index'
import { PortraitGrowthAnalysisList } from '@/api/portrait/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<PortraitGrowthAnalysisList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: PortraitGrowthAnalysisList): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: number[] = []
  data.forEach((item) => {
    xArr.push(item.semesterName)
    yArr.push(item.avgScoreGap)
  })
  return {
    xAxis: {
      type: 'category',
      name: '全校成长平均值',
      boundaryGap: false,
      data: xArr,
    },
    yAxis: {
      type: 'value',
      // interval: 5,
    },
    series: [
      {
        data: yArr,
        type: 'line',
        areaStyle: {},
        smooth: true,
        label: {
          show: true,
          formatter: '{c} 分',
          position: 'insideBottomLeft',
          fontSize: 18,
          color: '#03bb9a',
        },
        areaStyle: {
          color: '#a9df96',
        },
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqGrowthAnalysis()
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

<style scoped lang="scss"></style>
