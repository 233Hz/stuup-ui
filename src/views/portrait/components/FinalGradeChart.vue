<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqStudyGrade } from '@/api/portrait'
import type { PortraitStudyGradeList } from '@/api/portrait/type'

let data = ref<PortraitStudyGradeList>()
let option = {}

const chartRef = ref()
watch(data, (newVal) => {
  const xData = newVal?.map((item) => item.semesterName)
  const yData = newVal?.map((item) => item.score)
  option = {
    xAxis: {
      type: 'category',
      data: xData,
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
        data: yData,
        type: 'line',
        smooth: true,
      },
    ],
  }
  const chart = echarts.init(chartRef.value)
  option && chart.setOption(option)
})

onMounted(async () => {
  const { data: res } = await reqStudyGrade()
  data.value = res
})
</script>
