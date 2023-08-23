<template>
  <div ref="chartRef" class="w-full h-400" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { reqStudyCourse } from '@/api/portrait'

const props = defineProps({
  semesterId: {
    type: Number,
  },
})

const chartRef = ref()
let chart: echarts.ECharts

interface Indicator {
  name: string
  max: number
}

watch(
  () => props.semesterId,
  async (newVal) => {
    if (!newVal) return
    const { data } = await reqStudyCourse(newVal)
    if (!(data && data.length)) return
    let indicatorData: Indicator[] = []
    let values: number[] = []
    data.forEach((item) => {
      indicatorData.push({
        name: `${item.courseName}（${item.score}分）`,
        max: 100,
      })
      values.push(item.score)
    })
    let option: echarts.EChartOption = {
      tooltip: {
        trigger: 'item',
      },
      radar: {
        shape: 'circle',
        indicator: indicatorData,
        axisName: {
          fontSize: 18,
          color: '#03aa8c',
        },
      },
      series: [
        {
          name: '课程成绩',
          type: 'radar',
          data: [
            {
              value: values,
              name: '课程成绩',
            },
          ],
        },
      ],
    }
    chart.setOption(option)
    emit('change', data)
  },
)

onMounted(() => {
  chart = echarts.init(chartRef.value)
})

const emit = defineEmits(['change'])
</script>

<style scoped lang="scss"></style>
