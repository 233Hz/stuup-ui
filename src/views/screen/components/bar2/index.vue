<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full p-10 relative">
        <div ref="chartRef" class="w-full h-full" />
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqCountMajorPopulations } from '@/api/screen'
import type { MajorPopulationsList } from '@/api/screen/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<MajorPopulationsList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: MajorPopulationsList): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: number[] = []
  data.forEach((item) => {
    xArr.push(item.majorName)
    yArr.push(item.count)
  })
  return {
    title: {
      text: '各专业人数',
    },
    tooltip: {
      formatter: '{b}',
    },
    xAxis: {
      type: 'category',
      data: xArr,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yArr,
        type: 'bar',
        // @ts-ignore
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'top',
          color: '#29fcff',
          // @ts-ignore
          formatter: '{c}人',
        },
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqCountMajorPopulations()
    dataArr.value = data
  } catch (error) {
    console.log(error)
  } finally {
    chart.hideLoading()
  }
}

onMounted(() => {
  echarts.registerTheme('CustomTheme', CustomTheme)
  chart = echarts.init(chartRef.value, 'CustomTheme')
  fetch()
})
</script>
