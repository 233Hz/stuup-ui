<template>
  <div style="color: #00866e" ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqGrowthAnalysis } from '@/api/portrait/index'
import { PortraitGrowthAnalysisVOList } from '@/api/portrait/type'

const chartRef = ref()
let option = {}
const list = ref()

watch(list, (newVal: PortraitGrowthAnalysisVOList) => {
  let xData: string[] = []
  let values: number[] = []
  newVal.forEach((item) => {
    xData.push(item.semesterName)
    values.push(item.avgScoreGap)
  })
  option = {
    xAxis: {
      type: 'category',
      name: '全校成长平均值',
      boundaryGap: false,
      data: xData,
    },
    yAxis: {
      type: 'value',
      // interval: 5,
    },
    series: [
      {
        data: values,
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
      },
    ],
    areaStyle: {
      color: '#a9df96',
    },
  }
  const chart = echarts.init(chartRef.value)
  option && chart.setOption(option)
})

onMounted(async () => {
  const { data } = await reqGrowthAnalysis()
  list.value = data
})
</script>

<style scoped lang="scss"></style>
