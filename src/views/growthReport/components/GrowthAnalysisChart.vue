<template>
  <div class="w-full h-1000" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();
const option = {
  backgroundColor: '#fff',
  series: [
    {
      type: 'sankey',
      left: 50.0,
      top: 20.0,
      right: 150.0,
      bottom: 25.0,
      data: [
        {
          name: '道德与公民素养',
          itemStyle: {
            color: '#009ad6',
            borderColor: '#009ad6',
          },
        },
        // ----------------------------
        {
          name: '思想品德',
          itemStyle: {
            color: '#ffe600',
            borderColor: '#ffe600',
          },
        },
        // ----------------------------
        {
          name: '爱国爱校',
          itemStyle: {
            color: '#f47920',
            borderColor: '#f47920',
          },
        },
        // ----------------------------
        {
          name: '主题教育活动',
          itemStyle: {
            color: '#f47920',
            borderColor: '#f47920',
          },
        },
        // ----------------------------
        {
          name: '时政学习',
          itemStyle: {
            color: '#2a5caa',
            borderColor: '#2a5caa',
          },
        },
        // ----------------------------
        {
          name: '参加时政学习',
          itemStyle: {
            color: '#2a5caa',
            borderColor: '#2a5caa',
          },
        },
        {
          name: '时政比赛',
          itemStyle: {
            color: '#2a5caa',
            borderColor: '#2a5caa',
          },
        },
        {
          name: '参加党团学习',
          itemStyle: {
            color: '#2a5caa',
            borderColor: '#2a5caa',
          },
        },
        // ----------------------------
        {
          name: '安全法制',
          itemStyle: {
            color: '#8552a1',
            borderColor: '#8552a1',
          },
        },
        // ----------------------------
        {
          name: '参加安全教育',
          itemStyle: {
            color: '#8552a1',
            borderColor: '#8552a1',
          },
        },
        {
          name: '法制教育',
          itemStyle: {
            color: '#8552a1',
            borderColor: '#8552a1',
          },
        },
        {
          name: '参加国防民防教育',
          itemStyle: {
            color: '#8552a1',
            borderColor: '#8552a1',
          },
        },
        // ----------------------------
        {
          name: '军事训练',
          itemStyle: {
            color: '#5ba33b',
            borderColor: '#5ba33b',
          },
        },
        // ----------------------------
        {
          name: '优秀学员',
          itemStyle: {
            color: '#5ba33b',
            borderColor: '#5ba33b',
          },
        },
        {
          name: '合格学员',
          itemStyle: {
            color: '#5ba33b',
            borderColor: '#5ba33b',
          },
        },
        // ----------------------------
        {
          name: '社团活动',
          itemStyle: {
            color: '#ef5b9c',
            borderColor: '#ef5b9c',
          },
        },
        // ----------------------------
        {
          name: '参加社团',
          itemStyle: {
            color: '#ef5b9c',
            borderColor: '#ef5b9c',
          },
        },
      ],
      links: [
        {
          source: '道德与公民素养',
          target: '思想品德',
          value: 1000,
        },
        {
          source: '思想品德',
          target: '爱国爱校',
          value: 200,
        },
        {
          source: '爱国爱校',
          target: '主题教育活动',
          value: 200,
        },
        {
          source: '思想品德',
          target: '时政学习',
          value: 200,
        },
        {
          source: '时政学习',
          target: '参加时政学习',
          value: 100,
        },
        {
          source: '时政学习',
          target: '时政比赛',
          value: 50,
        },
        {
          source: '时政学习',
          target: '参加党团学习',
          value: 50,
        },
        {
          source: '思想品德',
          target: '安全法制',
          value: 764,
        },
        {
          source: '安全法制',
          target: '参加安全教育',
          value: 100,
        },
        {
          source: '安全法制',
          target: '法制教育',
          value: 300,
        },
        {
          source: '安全法制',
          target: '参加国防民防教育',
          value: 364,
        },
        {
          source: '思想品德',
          target: '军事训练',
          value: 200,
        },
        {
          source: '军事训练',
          target: '优秀学员',
          value: 10,
        },
        {
          source: '军事训练',
          target: '合格学员',
          value: 190,
        },
        {
          source: '思想品德',
          target: '社团活动',
          value: 200,
        },
        {
          source: '社团活动',
          target: '参加社团',
          value: 200,
        },
      ],
    },
  ],
  tooltip: {
    trigger: 'item',
  },
};

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option && chart.setOption(option);
});
</script>
