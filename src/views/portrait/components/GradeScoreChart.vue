<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqRankingCurve } from '@/api/portrait/index'
import { PortraitRankingCurveList } from '@/api/portrait/type'

const data = Array.from({ length: 7 }, (_, index) => {
  return Math.floor(Math.random() * 1000 + 200)
})

const chartRef = ref()
let option = {}
const list = ref()

interface DataType {
  value: number | undefined
  score: number | undefined
}
watch(list, (newVal: PortraitRankingCurveList) => {
  let xData: string[] = []
  let values: DataType[] = []
  newVal.forEach((item) => {
    xData.push(item.semesterName)
    values.push({
      value: item.rank,
      score: item.score,
    })
  })
  option = {
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
      inverse: true,
    },
    series: [
      {
        label: {
          show: true,
          formatter: ({ data }: { data: DataType }) => {
            return `${data.value} 名(${data.score}分)`
          },
          fontSize: 18,
          color: '#03aa8c',
        },
        data: values,
        type: 'line',
        smooth: true,
      },
    ],
  }
  const chart = echarts.init(chartRef.value)
  option && chart.setOption(option, true)
})

onMounted(async () => {
  const { data } = await reqRankingCurve()
  list.value = data
})
</script>
