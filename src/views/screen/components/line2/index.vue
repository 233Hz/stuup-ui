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
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqNear3YearsAtSchoolNum } from '@/api/screen'
import type { Near3YearsAtSchoolNumList } from '@/api/screen/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<Near3YearsAtSchoolNumList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: Near3YearsAtSchoolNumList): echarts.EChartOption => {
  let xArr: string[] = []
  let yArr: number[] = []
  data.forEach((item) => {
    xArr.push(item.year)
    yArr.push(item.personNum)
  })
  return {
    title: {
      text: '近三年在校生人数',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xArr,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yArr,
        type: 'line',
        areaStyle: {},
        label: {
          show: true,
          formatter: '{c}人',
        },
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqNear3YearsAtSchoolNum()
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
