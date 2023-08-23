<template>
  <div ref="chartRef" class="h-400" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { reqGrowthComparison } from '@/api/portrait'

const props = defineProps({
  semesterId: {
    type: Number,
  },
})

const chartRef = ref()
let chart: echarts.ECharts

watch(
  () => props.semesterId,
  async (newVal) => {
    if (!newVal) return
    const { data } = await reqGrowthComparison(newVal)
    const xData = data.map((item) => item.growthItemName)
    const yData1 = data.map((item) => item.score)
    const yData2 = data.map((item) => item.avgScore)
    let option: echarts.EChartOption = {
      dataZoom: [
        {
          type: 'slider', //隐藏或显示（true）组件
          show: true,
          startValue: 0,
          endValue: 5,
          filterMode: 'empty',
          zoomLock: true, // 是否锁定选择区域（或叫做数据窗口）的大小
          // @ts-ignore
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
      tooltip: {},
      legend: {},
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '我的成长积分',
          data: yData1,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          itemStyle: {
            color: '#03aa8c',
          },
          label: {
            show: true,
            // @ts-ignore
            formatter: '{c} 分',
            fontSize: 18,
            color: '#fff',
          },
        },
        {
          name: '全校成长平均值',
          data: yData2,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
          itemStyle: {
            color: '#14b8a6',
          },
          label: {
            show: true,
            // @ts-ignore
            formatter: '{c} 分',
            fontSize: 18,
            color: '#fff',
          },
        },
      ],
    }
    chart.setOption(option)
  },
)

onMounted(() => {
  chart = echarts.init(chartRef.value)
})
</script>

<style scoped lang="scss"></style>
