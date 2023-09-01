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
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqAwardsByCompetition } from '@/api/screen'
import type { AwardsByCompetitionList } from '@/api/screen/type'

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
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
const chartData = ref<AwardsByCompetitionList>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    chart.setOption({
      series: [
        {
          data: newVal.map((item) => {
            return {
              value: item.awardNum,
              name: item.awardType,
            }
          }),
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
    const { data } = await reqAwardsByCompetition()
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
