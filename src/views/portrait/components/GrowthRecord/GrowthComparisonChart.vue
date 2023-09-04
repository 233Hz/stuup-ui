<template>
  <div ref="chartRef" class="h-400" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

interface Data {
  name: string
  myScore: number
  avgScore: number
}
type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption
type EChartTooltipFormat = echarts.EChartOption.Tooltip.Format[]

const barWidth = 40
const labelColor = '#e89736'
const color1 = {
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  type: 'linear',
  global: false,
  colorStops: [
    {
      //第一节下面
      offset: 0,
      color: 'rgba(32, 170, 146,0.8)',
    },
    {
      offset: 1,
      color: 'rgba(20, 76, 41,1)',
    },
  ],
}
const color2 = {
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  type: 'linear',
  global: false,
  colorStops: [
    {
      //第一节下面
      offset: 0,
      color: 'rgba(5, 164, 224,0.8)',
    },
    {
      offset: 1,
      color: 'rgba(16, 57, 89,1)',
    },
  ],
}
const option: EChartOption = {
  //提示框
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (params) => {
      const _params = params as EChartTooltipFormat
      return (
        _params[0].name +
        '：' +
        _params[0].value +
        '分' +
        '<br />' +
        _params[1].name +
        '：' +
        _params[1].value +
        '分'
      )
    },
  },
  grid: {
    top: '25%',
    left: '5%',
    bottom: '10%',
    right: '5%',
    containLabel: true,
  },
  legend: {
    data: ['我的', '平均'],
    selectedMode: false,
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      data: [],
    },
    {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      show: true,
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },
  ],
  series: [
    {
      name: '内部柱子顶部',
      type: 'pictorialBar',
      symbolSize: [barWidth, 10],
      symbolOffset: ['-81%', -5],
      symbolPosition: 'end',
      z: 15,
      color: 'rgba(45, 206, 177,0.9)',
      zlevel: 2,
    },
    {
      name: '内部柱子顶部2',
      type: 'pictorialBar',
      symbolSize: [barWidth, 10],
      symbolOffset: ['81%', -5],
      symbolPosition: 'end',
      z: 15,
      color: 'rgba(2, 175, 249,1)',
      zlevel: 2,
    },
    {
      name: '我的',
      type: 'bar',
      barGap: '60%',
      barWidth: barWidth,
      itemStyle: {
        color: color1,
        borderColor: color1,
        borderWidth: 1,
        borderType: 'solid',
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 14,
        color: labelColor,
        formatter: '{c}分',
      },
      zlevel: 2,
    },
    {
      name: '平均',
      type: 'bar',
      barGap: '60%',
      barWidth: barWidth,
      itemStyle: {
        color: color2,
        borderColor: color2,
        borderWidth: 1,
        borderType: 'solid',
      },
      label: {
        show: true,
        position: 'top',
        fontSize: 14,
        color: labelColor,
        formatter: '{c}分',
      },
      zlevel: 2,
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
const xData = ref<string[]>([
  '道德与公民素养',
  '技能与学习素养',
  '运动与身心健康',
  '审美与艺术修养',
  '劳动与职业素养',
])

let chart: ECharts
const chartRef = ref()
const chartData = ref<Data[]>()

const props = defineProps<{
  semesterId: number | undefined
}>()

watch(
  () => props.semesterId,
  (newVal) => {
    if (newVal) {
      const data = generateData()
      if (data && data.length) {
        const x: string[] = []
        const y1: number[] = []
        const y2: number[] = []
        for (const value of data) {
          x.push(value.name)
          y1.push(value.myScore)
          y2.push(value.avgScore)
        }
        chart.setOption({
          xAxis: [
            {
              data: x,
            },
          ],
          series: [
            {
              data: y1,
            },
            {
              data: y2,
            },
            {
              data: y1,
            },
            {
              data: y2,
            },
          ],
        })
        return
      }
    }
    chart.setOption({
      graphic: {
        invisible: false,
      },
    })
  },
)

const generateData = (): Data[] => {
  return xData.value.map((item) => {
    return {
      name: item,
      myScore: Math.floor(Math.random() * 100),
      avgScore: Math.floor(Math.random() * 100),
    }
  })
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(option)
})
</script>
