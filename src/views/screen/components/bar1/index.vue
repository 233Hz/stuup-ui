<template>
  <div class="h-full">
    <dv-border-box10>
      <div class="h-full p-10">
        <div ref="chartRef" class="w-full h-full" />
        <div class="w-full h-full">暂无数据</div>
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { reqStudentGrowthMonitor } from '@/api/screen'
import type { StudentGrowthMonitorList } from '@/api/screen/type'

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
  title: {
    text: '学生成长监控',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    bottom: 0,
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      show: false,
    },
  },
  series: [
    {
      name: '违规人次',
      type: 'bar',
      label: {
        show: true,
        formatter: '{b} {c}人',
      },
    },
  ],
  graphic: {
    type: 'text',
    left: 'center',
    top: 'middle',
    silent: true,
    style: {
      fill: 'black',
      fontWeight: 'bold',
      text: '暂无数据',
      fontSize: '26px',
      fill: 'white',
    },
  },
}

const chartRef = ref()
let chart: echarts.ECharts
const chartData = ref<StudentGrowthMonitorList>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    let x: string[] = []
    let y: number[] = []
    newVal.forEach((item) => {
      x.push(item.growItemName)
      y.push(item.personNum)
    })
    chart.setOption({
      yAxis: {
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
        invisible: false, //是否可见，这里的意思是当没有数据时可见
      },
    })
  }
})

const fetchData = async () => {
  try {
    chart.showLoading()
    const { data } = await reqStudentGrowthMonitor()
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
  fetchData()
})
</script>
