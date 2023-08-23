<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqRankingCurve } from '@/api/portrait/index'
import { PortraitRankingCurveList } from '@/api/portrait/type'

interface DataType {
  value: number
  score: number
}

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<PortraitRankingCurveList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: PortraitRankingCurveList): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: DataType[] = []
  data.forEach((item) => {
    xArr.push(item.semesterName)
    yArr.push({
      value: item.rank,
      score: item.score,
    })
  })
  return {
    xAxis: {
      type: 'category',
      data: xArr,
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
    const { data } = await reqRankingCurve()
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
