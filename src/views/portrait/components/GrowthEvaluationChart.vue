<template>
  <div ref="chartRef" class="w-full h-400"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();
const option = ref({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    shape: 'circle',
    indicator: [
      { name: '道德与公民素养', max: 1000 },
      { name: '技能与学习素养', max: 1000 },
      { name: '运动与身心健康', max: 1000 },
      { name: '审美与艺术修养', max: 1000 },
      { name: '劳动与职业素养', max: 1000 },
    ],
  },
  series: [
    {
      name: '成长综合评价',
      type: 'radar',
      data: [
        {
          value: [653, 456, 345, 544, 123, 22],
          name: '成长方向',
        },
      ],
    },
  ],
});

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option.value && chart.setOption(option.value);
});
</script>
