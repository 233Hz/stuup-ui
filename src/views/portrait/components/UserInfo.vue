<template>
  <div class="flex">
    <div class="w-198 relative">
      <div class="w-150 h-150 m-auto br-8 overflow-hidden">
        <img
          :src="userInfo?.avatar || defaultAvatar"
          alt="avatar"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <div class="flex-1 flex flex-col gap-12">
      <p class="line-h-42">
        <span
          class="fs-24 text-black font-bold cursor-pointer hover:text-sky-400"
        >
          {{ userInfo?.studentName }}
        </span>
        <el-divider direction="vertical" />
        <span class="fs-18 text-gray-400">{{ userInfo?.studentNo }}</span>
        <el-divider direction="vertical" />
        <span class="fs-18 text-gray-400">{{ userInfo?.phone }}</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">班级:</span>
        <span class="text-gray-400">{{ userInfo?.className }}</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">班主任:</span>
        <span class="text-gray-400">{{ userInfo?.classTeacher }}</span>
      </p>
      <p class="fs-18">
        <span class="text-gray-500 mr-24">专业:</span>
        <span class="text-gray-400">
          {{ userInfo?.majorName }}
        </span>
      </p>
      <div class="flex mt-24 items-center gap-24">
        <div class="min-w-100 br-8 px-12 py-6">
          <p class="text-center">
            <span class="fs-18 text-gray-400">成长等级</span>
          </p>
          <div class="flex gap-12 justify-center pt-12">
            <div
              class="w-100 h-100 relative"
              v-for="(item, index) in flowersStore.calculateFlowerLevelIgnore(
                userInfo?.totalScore!,
              )"
              :key="index"
            >
              <div
                class="absolute w-full l-0 b-0 text-center text-white fs-14 bg-system rounded-full"
              >
                <span class="mr-2">x</span>
                <span class="fs-18">{{ item.count }}</span>
              </div>
              <img
                :src="item.image"
                class="w-full h-full object-cover rounded-full"
                style="-webkit-user-drag: none"
                alt="用户等级"
              />
            </div>
          </div>
        </div>
        <div
          class="min-w-100 br-8 px-12 py-6 bg-orange-400 text-white text-center"
        >
          <p><span class="fs-18">成长总分</span></p>
          <h1 class="fs-32 font-bold mt-12">{{ userInfo?.totalScore }}</h1>
        </div>
        <div
          class="min-w-100 br-8 px-12 py-6 bg-red-400 text-white text-center"
        >
          <p><span class="fs-18">成长总扣分</span></p>
          <h1 class="fs-32 font-bold mt-12">{{ userInfo?.totalMinusScore }}</h1>
        </div>
        <div
          class="min-w-100 br-8 px-12 py-6 bg-sky-500 text-white text-center"
        >
          <p><span class="fs-18">全校排名</span></p>
          <h1 class="fs-32 font-bold mt-12">{{ userInfo?.ranking }}</h1>
        </div>
      </div>
      <div class="fs-18">
        <p>
          <span class="text-gray-500 mr-24">
            我参加过的社团
            <span class="text-sky-300">
              （{{ userInfo?.associations.length }}）
            </span>
          </span>
        </p>
        <div class="mt-12 flex gap-12 flex-wrap">
          <div class="mb-12" v-for="item in userInfo?.associations" :key="item">
            <span class="br-4 px-12 py-8 mr-12 text-sky-400">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqBasicInfo } from '@/api/portrait/index'
import { PortraitBasicInfo } from '@/api/portrait/type'
import useFlowersStore from '@/store/modules/flowers'
import defaultAvatar from '@/assets/image/default_avatar.png'

const flowersStore = useFlowersStore()
const userInfo = ref<PortraitBasicInfo>()

onMounted(async () => {
  let { data } = await reqBasicInfo()
  userInfo.value = data
})
</script>
