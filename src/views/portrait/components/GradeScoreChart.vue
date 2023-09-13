<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import { reqRankingCurve } from '@/api/portrait'
import { PortraitRankingCurveList } from '@/api/portrait/type'

const route = useRoute()

interface DataType {
  value: number
  score: number
}

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
  xAxis: {
    type: 'category',
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
      type: 'line',
      smooth: true,
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
          fill: '#03aa8c',
          text: '暂无数据',
          fontSize: 30,
        },
      },
    ],
  },
}

const chartRef = ref()
let chart: ECharts
const chartData = ref<PortraitRankingCurveList>()

watch(
  chartData,
  (newVal) => {
    if (newVal && newVal?.length) {
      let x: string[] = []
      let y: DataType[] = []
      newVal.forEach((item) => {
        x.push(item.semesterName)
        y.push({
          value: item.rank,
          score: item.score,
        })
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
  },
  { deep: true },
)

const fetchData = async () => {
  try {
    chart.showLoading()
    const { data } = await reqRankingCurve(+route.params.id)
    chartData.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(option)
  fetchData()
})
</script>
