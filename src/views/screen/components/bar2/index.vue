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
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { BorderBox10 as DvBorderBox10 } from '@kjgl77/datav-vue3'
import CustomTheme from '@/config/echarts/CustomTheme.json'
import { countReviewOfEachClass } from '@/api/screen'
import type { ReviewOfEachClassVO } from '@/api/screen/type'

type ECharts = echarts.ECharts
type EChartOption = echarts.EChartOption

const option: EChartOption = {
  dataZoom: [
    {
      type: 'slider', //隐藏或显示（true）组件
      show: true,
      startValue: 0,
      endValue: 15,
      filterMode: 'empty',
      zoomLock: true, // 是否锁定选择区域（或叫做数据窗口）的大小
      brushSelect: false,
      fillerColor: 'rgb(3, 187, 154)',
    },
    {
      //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
      type: 'inside',
      zoomOnMouseWheel: false, //滚轮是否触发缩放
      moveOnMouseMove: true, //鼠标滚轮触发滚动
      moveOnMouseWheel: true,
    },
  ],
  title: {
    text: '各班级项目申请情况对比',
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}',
  },
  legend: {
    top: 30,
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      name: '学生申请项目数',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
      label: {
        show: true,
        position: 'top',
        color: '#29fcff',
        formatter: '{c}次',
      },
    },
    {
      type: 'bar',
      name: '班主任审核项目数',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
      label: {
        show: true,
        position: 'top',
        color: '#29fcff',
        formatter: '{c}次',
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
let chart: ECharts
const chartData = ref<ReviewOfEachClassVO[]>()

watch(chartData, (newVal) => {
  if (newVal && newVal?.length) {
    let x: string[] = []
    let y1: number[] = []
    let y2: number[] = []
    newVal.forEach((item) => {
      x.push(item.className)
      y1.push(item.applyCount)
      y2.push(item.auditCount)
    })
    chart.setOption({
      xAxis: {
        data: x,
      },
      series: [
        {
          data: y1,
        },
        {
          data: y2,
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
    const { data } = await countReviewOfEachClass()
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
