<template>
  <div ref="chartRef" class="w-full h-400" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as echarts from 'echarts'
import { reqStudyCourse } from '@/api/portrait'

const props = defineProps({
  semesterId: {
    type: Number,
  },
})

const chartRef = ref()

let option = {}

watch(
  () => props.semesterId,
  async (newVal) => {
    if (!newVal) return
    const { data } = await reqStudyCourse(newVal)
    const indicatorData = data?.map((item) => {
      return {
        name: `${item.courseName}（${item.score}分）`,
        max: 100,
      }
    })
    const values = data?.map((item) => item.score)
    option = {
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
    const chart = echarts.init(chartRef.value)
    option && chart.setOption(option)
    emit('change', data)
  },
)

const emit = defineEmits(['change'])
</script>

<style scoped lang="scss"></style>
