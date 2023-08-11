<template>
  <div class="flex gap-16 flex-wrap">
    <div
      class="w-240 h-80 br-8 bg-white px-12 py-4 flex gap-12 el-shadow-light"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="w-60 flex">
        <img :src="icon" class="w-60 h-60 m-auto object-cover" />
      </div>
      <div class="flex-1 text-center">
        <p>
          <span class="fs-18 text-gray-400">{{ item.label }}</span>
        </p>
        <p class="fs-28 font-bold text-gray-600">{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import icon from '@/assets/svg/home-applay.svg'
import { reqGrowthData } from '@/api/portrait'
import { PortraitGrowthData } from '@/api/portrait/type'

const props = defineProps({
  semesterId: {
    type: Number,
  },
})

interface CrowthData {
  key: keyof PortraitGrowthData
  label: string
  value: number | string
}
const data = ref<CrowthData[]>([
  {
    key: 'score',
    label: '成长值',
    value: '暂无数据',
  },
  {
    key: 'rank',
    label: '全校排名',
    value: '暂无数据',
  },
  {
    key: 'minusScore',
    label: '成长扣除分',
    value: '暂无数据',
  },
  {
    key: 'activityCount',
    label: '参加活动次数',
    value: '暂无数据',
  },
  {
    key: 'awardCount',
    label: '获奖次数',
    value: '暂无数据',
  },
  {
    key: 'certificateCount',
    label: '获得证书',
    value: '暂无数据',
  },
])

watch(
  () => props.semesterId,
  async (newVal) => {
    if (!newVal) return
    const { data: res } = await reqGrowthData(newVal)
    data.value.forEach((item) => {
      const value = res[item.key]
      if (value !== null) {
        item.value = value
      } else {
        item.value = '暂无数据'
      }
    })
  },
)
</script>

<style scoped lang="scss">
img {
  -webkit-user-drag: none;
}
</style>
