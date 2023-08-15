<template>
  <div ref="chartRef" class="h-1500" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref()

const yData = [
  '爱国主义教育',
  '主题教育活动',
  '参加时政学习',
  '时政比赛',
  '参加党团学习',
  '参加安全教育',
  '法制教育',
  '参加国防民防教育',
  '优秀学员',
  '合格学员',
  '参加社团',
  '纪律处分',
  '迟到早退一次',
  '上课缺勤一次',
  '不准时出操',
  '未按规定着装校服校裤',
  '佩戴胸卡',
  '不染发',
  '不烫发',
  '不披散长发',
  '不化妆不美甲不佩戴首饰',
  '礼貌用语',
  '文明就餐',
  '个人卫生',
  '书桌整洁',
  '前十名班级',
  '评为先进',
  '国家奖学金',
  '市级',
  '区级（行业）',
  '校级',
  '平均≥90分',
  '平均≥80分',
  '平均≥70分',
  '平均≥60分',
  '每个证书',
  '国家级',
  '市级',
  '区级',
  '校级',
  '国家级',
  '市级',
  '区级',
  '校级',
  '发明专利',
  '体质达标',
  '参加体育课外活动',
  '国家级',
  '市级',
  '区级',
  '校级',
  '参加心理剧或心理月展示活动',
  '参与心理中心活动',
  '场馆观摩',
  '国家级比赛',
  '市级比赛',
  '区级比赛',
  '校级比赛',
  '学校及以上组织',
  '参加志愿服务每次',
  '参加交通岗值勤',
  '修满学分',
  '日常家务劳动',
  '值日值周',
  '修满学分',
]
const option = {
  tooltip: {},
  legend: {},
  grid: [
    {
      // 左侧对应坐标系
      show: false,
      left: '15%',
      top: '10%',
      bottom: '10%',
      width: '40%',
    },
    {
      // 右侧对应坐标系
      show: false,
      left: '55%',
      top: '10%',
      bottom: '10%',
      width: '40%',
    },
    {
      // 用来显示的坐标系
      show: false,
      left: '15%',
      top: '10%',
      bottom: '10%',
      width: '80%',
    },
  ],
  // x轴是度量，y轴是维度
  xAxis: [
    {
      // 左侧轴
      type: 'value',
      inverse: true,
      min: 0,
      max: (val: any) => {
        return Math.floor(val.max * 1.1)
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999',
          fontSize: 12,
        },
      },
      splitLine: {
        show: false,
      },
    },
    {
      // 右侧轴
      type: 'value',
      gridIndex: 1,
      min: 0,
      max: (val: any) => {
        return Math.floor(val.max * 1.1)
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999',
          fontSize: 12,
        },
      },
      splitLine: {
        show: false,
      },
    },
    {
      // 最左侧y轴对应x轴
      gridIndex: 2,
      name: 'x',
      nameLocation: 'center',
      nameGap: 40, // 与坐标轴距离
      nameTextStyle: {
        color: '#999999',
        fontSize: 12,
      },
      axisLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'category',
      position: 'right',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        margin: 0,
      },
      data: yData,
    },
    {
      gridIndex: 1,
      type: 'category',
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        show: false,
      },
      data: yData,
    },
    {
      name: 'y',
      gridIndex: 2,
      type: 'category',
      position: 'left',
      nameLocation: 'end',
      nameGap: 25, // 与坐标轴距离
      nameTextStyle: {
        color: '#999999',
        fontSize: 12,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#000',
          fontSize: 12,
        },
      },
      data: yData,
    },
  ],
  dataZoom: [
    {
      type: 'slider',
      yAxisIndex: [0, 1, 2],
      filterMode: 'filter',
      minSpan: 20,
    },
    {
      type: 'inside',
      yAxisIndex: [0, 1, 2],
      filterMode: 'filter',
      minSpan: 20,
    },
  ],
  series: [
    {
      name: '项目积分',
      type: 'bar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      barMaxWidth: '20%',
      data: [
        83, 7, 92, 55, 20, 41, 62, 87, 49, 73, 14, 98, 30, 77, 66, 35, 18, 70,
        3, 52, 95, 81, 29, 59, 8, 44, 67, 12, 37, 64, 28, 16, 91, 50, 1, 25, 97,
        2, 96, 84, 53, 17, 79, 46, 86, 13, 19, 60, 40, 23, 31, 6, 78, 33, 57,
        88, 39, 48, 63, 76, 43, 21, 69, 27, 9, 54, 32, 47, 11,
      ],
    },
    {
      name: '平均值',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      barMaxWidth: '20%',
      data: [
        89, 15, 26, 64, 100, 70, 39, 80, 17, 48, 86, 4, 73, 51, 33, 91, 56, 23,
        12, 42, 79, 36, 62, 94, 8, 68, 20, 40, 90, 16, 83, 28, 6, 74, 55, 11,
        59, 7, 85, 25, 31, 45, 71, 99, 50, 19, 95, 30, 67, 3, 22, 72, 13, 37,
        57, 87, 52, 35, 81, 2, 47, 63, 38, 9, 54, 10, 98, 46, 24, 75,
      ],
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  option && chart.setOption(option)
})
</script>

<style scoped lang="scss"></style>
