<template>
  <div style="color: #00866e" ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { reqGrowthAnalysis } from '@/api/portrait/index'
import { PortraitGrowthAnalysisList } from '@/api/portrait/type'

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

let chart: ECharts
let option: EChartOption = {
  xAxis: {
    type: 'category',
    name: '全校成长平均值',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    // interval: 5,
  },
  series: [
    {
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
      // @ts-ignore
      areaStyle: {
        color: '#a9df96',
      },
    },
  ],
}

const chartRef = ref()
const source = ref<PortraitGrowthAnalysisList>()

watch(source, (newVal) => {
  if (!newVal) return
  const x: string[] = []
  const y: number[] = []
  newVal.forEach((item) => {
    x.push(item.semesterName)
    y.push(item.avgScoreGap)
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
})

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqGrowthAnalysis()
    source.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

const generateCourseData = () => {
  return Array.from({ length: 6 }).map((_, index) => {
    const plusOrMinus = Math.random() > 0.5 ? 1 : -1
    return {
      semesterName: `第${index + 1}学期`,
      avgScoreGap: (Math.floor(Math.random() * 80) + 20) * plusOrMinus,
    }
  })
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(option)
  source.value = generateCourseData()
  console.log(source.value)
})
</script>

<style scoped lang="scss"></style>
