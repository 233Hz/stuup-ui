<template>
  <div class="br-20 p-20 m-20">
    <p class="text-center fs-24 text-green-500 font-bold line-h-42">当前等级</p>
    <div class="flex gap-12">
      <div
        class="w-100 h-100 rounded-full overflow-hidden p-5 bg-green-100 border-4 border-green-500 border-solid"
        v-for="(item, index) in flowersStore.calculateFlowerLevelFill(
          userStore.userInfo.totalScore,
        )"
        :key="index"
      >
        <img class="w-full h-full" :src="item.image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useFlowersStore from '@/store/modules/flowers'

const userStore = useUserStore()
const flowersStore = useFlowersStore()
</script>
