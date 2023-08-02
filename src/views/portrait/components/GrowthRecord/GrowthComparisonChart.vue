<template>
  <div ref="chartRef" class="h-400" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref();

const xData = [
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
];

const yData1 = Array.from({ length: xData.length }, (_, index) => Math.floor(Math.random() * 80 + 20));
const yData2 = Array.from({ length: xData.length }, (_, index) => Math.floor(Math.random() * 80 + 20));
let option: echarts.EChartOption = {
  dataZoom: [
    {
      type: 'slider', //隐藏或显示（true）组件
      show: true,
      startValue: 0,
      endValue: 5,
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
        formatter: '{c} 分',
        fontSize: 18,
        color: '#fff',
      },
    },
  ],
};
onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option && chart.setOption(option);
});
</script>

<style scoped lang="scss"></style>
