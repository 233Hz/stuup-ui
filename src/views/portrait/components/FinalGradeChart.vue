<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import { reqStudyGrade } from '@/api/portrait'

const route = useRoute()

interface Data {
  name: string
  course1: number
  course2: number
  course3: number
  course4: number
  course5: number
  course6: number
}
type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const barWidth = 40
const option: EChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '课程1',
      type: 'bar',
      stack: '课程成绩',
      barWidth: barWidth,
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '课程2',
      type: 'bar',
      stack: '课程成绩',
      barWidth: barWidth,
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '课程3',
      type: 'bar',
      stack: '课程成绩',
      barWidth: barWidth,
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '课程4',
      type: 'bar',
      stack: '课程成绩',
      barWidth: barWidth,
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '课程5',
      type: 'bar',
      stack: '课程成绩',
      barWidth: barWidth,
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '课程6',
      type: 'bar',
      stack: '课程成绩',
      barWidth: barWidth,
      emphasis: {
        focus: 'series',
      },
    },
    {
      name: '总分',
      type: 'line',
      label: {
        show: true,
        formatter: '{c}分',
        color: '#f0d35e',
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

let chart: ECharts
const chartRef = ref()
const chartData = ref<Data[]>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    const x: string[] = []
    const y1: number[] = []
    const y2: number[] = []
    const y3: number[] = []
    const y4: number[] = []
    const y5: number[] = []
    const y6: number[] = []
    const y7: number[] = []
    for (const value of newVal) {
      x.push(value.name)
      y1.push(value.course1)
      y2.push(value.course2)
      y3.push(value.course3)
      y4.push(value.course4)
      y5.push(value.course5)
      y6.push(value.course6)
      y7.push(
        value.course1 +
          value.course2 +
          value.course3 +
          value.course4 +
          value.course5 +
          value.course6,
      )
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
          data: y3,
        },
        {
          data: y4,
        },
        {
          data: y5,
        },
        {
          data: y6,
        },
        {
          data: y7,
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

const generateData = () => {
  return Array.from({ length: 6 }).map((_, index) => {
    return {
      name: `第${index + 1}学期`,
      course1: Math.floor(Math.random() * 100),
      course2: Math.floor(Math.random() * 100),
      course3: Math.floor(Math.random() * 100),
      course4: Math.floor(Math.random() * 100),
      course5: Math.floor(Math.random() * 100),
      course6: Math.floor(Math.random() * 100),
    }
  })
}

const fetchData = async () => {
  try {
    chart.showLoading()
    const { data } = await reqStudyGrade(+route.params.id)
    // source.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(option)
  chartData.value = generateData()
})
</script>
