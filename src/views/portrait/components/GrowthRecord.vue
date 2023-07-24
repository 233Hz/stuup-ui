<template>
  <div class="growth-record">
    <div class="growth-record-wrapper">
      <ul class="record-link">
        <li class="record-link__item item-active">第一学期</li>
        <li class="record-link__item">第二学期</li>
        <li class="record-link__item">第三学期</li>
        <li class="record-link__item">第四学期</li>
        <li class="record-link__item">第五学期</li>
        <li class="record-link__item">第六学期</li>
      </ul>
      <ul class="record-card">
        <li class="record-card__item" v-for="(item, index) in list" :key="index">
          <div class="item-wrapper">
            <div class="icon">
              <div class="icon-wrapper">
                <img :src="avatar" />
              </div>
            </div>
            <div class="content">
              <div class="label">{{ item.label }}</div>
              <div class="value">{{ item.value }}</div>
            </div>
          </div>
        </li>
      </ul>
      <el-divider>学习课程</el-divider>
      <div class="w-full flex">
        <div class="flex-1">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="curseName" label="课程名称" header-align="center" align="center" />
            <el-table-column prop="curseScore" label="课程成绩" header-align="center" align="center" />
          </el-table>
        </div>
        <div class="flex-1">
          <div ref="chartRef" class="w-full h-400"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import avatar from '@/assets/svg/home-applay.svg';

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
      { name: '课程1', max: 100 },
      { name: '课程2', max: 100 },
      { name: '课程3', max: 100 },
      { name: '课程4', max: 100 },
      { name: '课程5', max: 100 },
      { name: '课程6', max: 100 },
      { name: '课程7', max: 100 },
    ],
  },
  series: [
    {
      name: '课程成绩',
      type: 'radar',
      data: [
        {
          value: [65, 45, 34, 54, 12, 22, 57],
          name: '课程成绩',
        },
        {
          value: [78, 89, 67, 76, 66, 98, 77],
          name: '平均成绩',
        },
      ],
    },
  ],
});

const list = [
  {
    label: '成长分',
    value: '200分',
  },
  {
    label: '全校排名',
    value: '123名',
  },
  {
    label: '成长扣除分',
    value: '100分',
  },
  {
    label: '参加活动次数',
    value: '12次',
  },
  {
    label: '获奖次数',
    value: '1次',
  },
  {
    label: '获得证书',
    value: '1次',
  },
];

const tableData = [
  {
    curseName: '课程1',
    curseScore: '78',
  },
  {
    curseName: '课程2',
    curseScore: '78',
  },
  {
    curseName: '课程3',
    curseScore: '78',
  },
  {
    curseName: '课程4',
    curseScore: '78',
  },
  {
    curseName: '课程5',
    curseScore: '78',
  },
  {
    curseName: '课程6',
    curseScore: '78',
  },
  {
    curseName: '课程7',
    curseScore: '78',
  },
];

onMounted(() => {
  const chart = echarts.init(chartRef.value);
  option.value && chart.setOption(option.value);
});
</script>

<style scoped lang="scss">
.growth-record {
  width: 100%;
  padding: 20px;

  &-wrapper {
    width: 100%;

    .record-link {
      width: 100%;
      font-size: 14px;
      line-height: 32px;
      display: flex;
      border-bottom: 1px solid #e5e5e5;

      &__item {
        width: 80px;
        text-align: center;
        margin: 5px;

        &:hover {
          cursor: pointer;
          font-weight: bold;
          color: #66a3ff;
          background-color: #ecf5ff;
        }
      }
      .item-active {
        font-weight: bold;
        color: #66a3ff;
        background-color: #ecf5ff;
      }
    }

    .record-card {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      &__item {
        width: 200px;
        height: 100px;
        padding: 10px;

        .item-wrapper {
          width: 100%;
          height: 100%;
          background-color: white;
          box-shadow: var(--el-box-shadow-lighter);
          display: flex;
          border-radius: 8px;

          .icon {
            width: 70px;
            height: 100%;
            display: flex;

            .icon-wrapper {
              width: 50px;
              height: 50px;
              margin: auto;

              > img {
                width: 100%;
                height: 100%;
              }
            }
          }

          .content {
            flex: 1;
            justify-content: center;
            line-height: 35px;

            .label {
              margin-top: 14px;
              line-height: 20px;
              font-size: 16px;
              color: #909399;
            }
            .value {
              line-height: 30px;
              font-size: 24px;
              color: #409eff;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>
