<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import { reqCapacityEvaluator } from '@/api/portrait'
import { PortraitCapacityEvaluatorList } from '@/api/portrait/type'

const route = useRoute()

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['我的积分', '平均积分'],
    bottom: 0,
  },
  radar: {
    name: {
      textStyle: {
        color: '#38bdf8',
        fontSize: '16',
        borderRadius: 3,
        padding: [3, 5],
      },
    },
    nameGap: '2',
    splitArea: {
      areaStyle: {
        color: [
          'rgba(0,255,255, 0.1)',
          'rgba(0,255,255, 0.2)',
          'rgba(0,255,255, 0.3)',
          'rgba(0,255,255, 0.4)',
          'rgba(0,255,255, 0.5)',
          'rgba(0,255,255, 0.6)',
        ].reverse(),
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowBlur: 30,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(0,206,209, 0.3)',
      },
    },
    splitLine: {
      lineStyle: {
        width: 1,
        color: [
          'rgba(0,206,209, 0.1)',
          'rgba(0,206,209, 0.2)',
          'rgba(0,206,209, 0.3)',
          'rgba(0,206,209, 0.4)',
          'rgba(0,206,209, 0.5)',
          'rgba(0,206,209, 0.6)',
        ].reverse(),
      },
    },
  },
  series: [
    {
      name: '我的积分',
      type: 'radar',
      areaStyle: {
        color: 'rgba(127,255,210, 0.5)',
      },
      symbol: 'circle',
      symbolSize: 12,
      itemStyle: {
        color: 'rgba(127,255,210,0.8)',
        borderColor: 'rgba(127,255,210,0.2)',
        borderWidth: 10,
      },
      lineStyle: {
        color: 'rgba(127,255,210, 0.6)',
        width: 2,
      },
    },
    {
      name: '平均积分',
      type: 'radar',
      areaStyle: {
        color: 'rgba(255,237,145, 0.5)',
      },
      symbol: 'circle',
      symbolSize: 12,
      itemStyle: {
        color: 'rgba(255,237,145,0.8)',
        borderColor: 'rgba(255,237,145,0.2)',
        borderWidth: 10,
      },
      lineStyle: {
        color: 'rgba(255,237,145, 0.6)',
        width: 2,
      },
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

let chartRef = ref()
let chart: ECharts
const chartData = ref<PortraitCapacityEvaluatorList>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    const indicator: { name: string; max: number }[] = []
    const data1: number[] = []
    const data2: number[] = []
    newVal.forEach((item) => {
      indicator.push({
        name: `${item.indicatorName}（${item.myScore}分）`,
        max: item.highestScore,
      })
      data1.push(item.myScore)
      data2.push(item.avgScore)
    })
    chart.setOption({
      radar: { indicator },
      series: [
        {
          data: [
            {
              value: data1,
            },
          ],
        },
        {
          data: [
            {
              value: data2,
            },
          ],
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
})

const fetchData = async () => {
  try {
    chart.showLoading()
    const { data } = await reqCapacityEvaluator(+route.params.id)
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
