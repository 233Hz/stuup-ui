<template>
  <div class="w-full h-500" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref()
const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555']
const bgColor = '#fff'
// const data = [
//   {
//     name: '道德与公民素养',
//     itemStyle: {
//       color: colors[0],
//     },
//     children: [
//       {
//         name: '思想品德',
//         itemStyle: {
//           color: colors[0],
//         },
//         children: [
//           {
//             name: '爱国爱校',
//             itemStyle: {
//               color: colors[0],
//             },
//             children: [
//               {
//                 name: '主题教育活动',
//                 value: '12',
//                 itemStyle: {
//                   color: colors[0],
//                 },
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: '遵纪自律',
//         itemStyle: {
//           color: colors[0],
//         },
//         children: [
//           {
//             name: '遵纪守法',
//             itemStyle: {
//               color: colors[0],
//             },
//             children: [
//               {
//                 name: '纪律处分',
//                 value: '22',
//                 itemStyle: {
//                   color: colors[0],
//                 },
//               },
//             ],
//           },
//           {
//             name: '日常考勤',
//             itemStyle: {
//               color: colors[0],
//             },
//             children: [
//               {
//                 name: '迟到早退一次',
//                 value: '112',
//                 itemStyle: {
//                   color: colors[0],
//                 },
//               },
//               {
//                 name: '上课缺勤一次',
//                 value: '112',
//                 itemStyle: {
//                   color: colors[0],
//                 },
//               },
//               {
//                 name: '不准时出操',
//                 value: '112',
//                 itemStyle: {
//                   color: colors[0],
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: '2',
//     itemStyle: {
//       color: colors[1],
//     },
//     children: [
//       {
//         name: '思想品德',
//         itemStyle: {
//           color: colors[1],
//         },
//         children: [
//           {
//             name: '爱国爱校',
//             itemStyle: {
//               color: colors[1],
//             },
//             children: [
//               {
//                 name: '主题教育活动',
//                 value: '12',
//                 itemStyle: {
//                   color: colors[1],
//                 },
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: '遵纪自律',
//         itemStyle: {
//           color: colors[1],
//         },
//         children: [
//           {
//             name: '遵纪守法',
//             itemStyle: {
//               color: colors[1],
//             },
//             children: [
//               {
//                 name: '纪律处分',
//                 value: '22',
//                 itemStyle: {
//                   color: colors[1],
//                 },
//               },
//             ],
//           },
//           {
//             name: '日常考勤',
//             itemStyle: {
//               color: colors[0],
//             },
//             children: [
//               {
//                 name: '迟到早退一次',
//                 value: '112',
//                 itemStyle: {
//                   color: colors[1],
//                 },
//               },
//               {
//                 name: '上课缺勤一次',
//                 value: '112',
//                 itemStyle: {
//                   color: colors[1],
//                 },
//               },
//               {
//                 name: '不准时出操',
//                 value: '112',
//                 itemStyle: {
//                   color: colors[1],
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

const data = [
  {
    name: '道德与公民素养',
    itemStyle: { color: colors[0] },
    children: [
      {
        name: '思想品德',
        itemStyle: { color: '#ad8b3d' },
        children: [
          {
            name: '爱国爱校',
            itemStyle: { color: '#aa2116' },
            value: 1,
          },
          {
            name: '时政学习',
            itemStyle: { color: '#b76f40' },
            value: 1,
          },
          {
            name: '安全法制',
            itemStyle: { color: '#006c54' },
            value: 1,
          },
          {
            name: '军事训练',
            itemStyle: { color: '#472d56' },
            value: 1,
          },
          {
            name: '社团活动',
            itemStyle: { color: '#b64533' },
            value: 1,
          },
        ],
      },
      {
        name: '遵纪自律',
        itemStyle: { color: '#375830' },
        children: [
          {
            name: '遵纪守法',
            itemStyle: { color: '#b54334' },
            value: 1,
          },
          {
            name: '日常考勤',
            itemStyle: { color: '#dea32c' },
            value: 1,
          },
        ],
      },
      {
        name: '文明修养',
        itemStyle: { color: '#45224a' },
        children: [
          {
            name: '仪表规范',
            itemStyle: { color: '#274d3d' },
            value: 1,
          },
          {
            name: '仪容整洁',
            itemStyle: { color: '#411445' },
            value: 1,
          },
          {
            name: '文明礼仪',
            itemStyle: { color: '#853f04' },
            value: 1,
          },
          {
            name: '卫生环境',
            itemStyle: { color: '#d1923f' },
            value: 1,
          },
          {
            name: '六项评比（流动红旗）',
            itemStyle: { color: '#375830' },
            value: 1,
          },
          {
            name: '文明寝室',
            itemStyle: { color: '#4b2f3d' },
            value: 1,
          },
        ],
      },
      {
        name: '个人荣誉（奖学金、三好学生、优秀学生（团）干部、药校好学子',
        itemStyle: { color: '#00a6ac' },
        children: [
          {
            name: '国家奖学金',
            itemStyle: { color: '#f15a22' },
            value: 1,
          },
          {
            name: '市级',
            itemStyle: { color: '#d3c6a6' },
            value: 1,
          },
          {
            name: '区级（行业）',
            itemStyle: { color: '#78cdd1' },
            value: 1,
          },
          {
            name: '校级',
            itemStyle: { color: '#b4533c' },
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: '技能与学习素养',
    itemStyle: { color: '#a03939' },
    value: 1,
    children: [
      {
        name: '学科成绩',
        itemStyle: { color: '#c37e00' },
        value: 5,
      },
      {
        name: '职业资格证书',
        itemStyle: { color: '#73b9a2' },
        value: 4,
      },
      {
        name: '职业素养',
        itemStyle: { color: '#ea66a6' },
        value: 3,
      },
      {
        name: '双创比赛',
        itemStyle: { color: '#8a2e3b' },
        value: 3,
      },
    ],
  },
]
console.log(data)

// const option = {
//   backgroundColor: bgColor,
//   color: colors,
//   series: [
//     {
//       type: 'sunburst',
//       center: ['50%', '48%'],
//       data: data,
//       sort: function (a, b) {
//         if (a.depth === 1) {
//           return b.getValue() - a.getValue()
//         } else {
//           return a.dataIndex - b.dataIndex
//         }
//       },
//       label: {
//         rotate: 'radial',
//         color: bgColor,
//       },
//       itemStyle: {
//         borderColor: bgColor,
//         borderWidth: 2,
//       },
//       levels: [
//         {},
//         {
//           r0: 0,
//           r: 40,
//           label: {
//             rotate: 0,
//           },
//         },
//         {
//           r0: 40,
//           r: 105,
//         },
//         {
//           r0: 115,
//           r: 140,
//           itemStyle: {
//             shadowBlur: 2,
//             shadowColor: colors[2],
//             color: 'transparent',
//           },
//           label: {
//             rotate: 'tangential',
//             fontSize: 10,
//             color: colors[0],
//           },
//         },
//         {
//           r0: 140,
//           r: 145,
//           itemStyle: {
//             shadowBlur: 80,
//             shadowColor: colors[0],
//           },
//           label: {
//             position: 'outside',
//             textShadowBlur: 5,
//             textShadowColor: '#333',
//           },
//           downplay: {
//             label: {
//               opacity: 0.5,
//             },
//           },
//         },
//       ],
//     },
//   ],
// }

onMounted(() => {
  // const chart = echarts.init(chartRef.value)
  // option && chart.setOption(option)
})
</script>
