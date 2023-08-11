<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full p-10">
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
import { reqAwardsByCompetition } from '@/api/screen'
import type { AwardsByCompetitionList } from '@/api/screen/type'

const chartRef = ref()
let chart: echarts.ECharts
const dataArr = ref<AwardsByCompetitionList>()

watch(
  dataArr,
  (newVal) => {
    if (newVal && newVal?.length) chart.setOption(update(newVal))
  },
  { deep: true },
)

const update = (data: AwardsByCompetitionList): echarts.EChartOption => {
  return {
    title: {
      text: '各类竞赛获奖人数',
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data.map((item) => {
          return {
            value: item.awardNum,
            name: item.awardType,
          }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: '{b}-{c}人',
        },
      },
    ],
  }
}

const fetch = async () => {
  try {
    chart.showLoading()
    const { data } = await reqAwardsByCompetition()
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
