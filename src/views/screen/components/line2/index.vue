<template>
  <div class="w-full h-full">
    <dv-border-box10>
      <div class="w-full h-full p-10">
        <div ref="chartRef" class="w-full h-full" />
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqNear3YearsAtSchoolNum } from '@/api/screen'
import type { Near3YearsAtSchoolNumList } from '@/api/screen/type'

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
  title: {
    text: '近三年在校生人数',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'line',
      areaStyle: {},
      label: {
        show: true,
        formatter: '{c}人',
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
          fill: '#fff',
          text: '暂无数据',
          fontSize: 30,
        },
      },
    ],
  },
}

const chartRef = ref()
let chart: echarts.ECharts
const chartData = ref<Near3YearsAtSchoolNumList>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    let x: string[] = []
    let y: number[] = []
    newVal.forEach((item) => {
      x.push(item.year)
      y.push(item.personNum)
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
})

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqNear3YearsAtSchoolNum()
    chartData.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  echarts.registerTheme('CustomTheme', CustomTheme)
  chart = echarts.init(chartRef.value, 'CustomTheme')
  chart.setOption(option)
  fetch()
})
</script>
