<script setup lang="ts">
import { ref } from 'vue'
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'

const data1 = ref([
  {
    name: '国家级',
    icon: 'nation-level',
  },
  {
    name: '市级',
    icon: 'city-level',
  },
  {
    name: '区（行业）级',
    icon: 'district-level',
  },
  {
    name: '校级',
    icon: 'school-level',
  },
])
</script>

<template>
  <module-card
    header-left-text="双创比赛"
    :header-class="['bg-[#fd3d7f33]']"
    class="h-full"
  >
    <div class="p-[10px]">
      <div class="flex gap-[10px]">
        <div
          class="flex-1 p-[10px]"
          v-for="(item, index) in data1"
          :key="index"
        >
          <div class="flex h-[80px] gap-[10px]">
            <svg-icon
              :name="item.icon"
              width="80px"
              height="80px"
              color="#fd3d7f"
            />
            <div class="flex-1 flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">{{ item.name }}</p>
              <p class="text-[18px] mt-[20px]">
                <span class="text-[24px] text-bold text-[#fd3d7f] mx-[4px]">
                  1
                </span>
                次
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[10px]" />
      <div class="flex gap-[10px]">
        <div class="flex-1">
          <custom-item
            v-for="item in Math.floor(Math.random() * 10)"
            :key="item"
            background-color="#fd3d7f1a"
            border-left-color="transparent"
          >
            <p class="text-center">获奖记录{{ item }}</p>
          </custom-item>
        </div>
        <div class="flex-1">
          <custom-item
            v-for="item in Math.floor(Math.random() * 10)"
            :key="item"
            background-color="#fd3d7f1a"
            border-left-color="transparent"
          >
            <p class="text-center">获奖记录{{ item }}</p>
          </custom-item>
        </div>
        <div class="flex-1">
          <custom-item
            v-for="item in Math.floor(Math.random() * 10)"
            :key="item"
            background-color="#fd3d7f1a"
            border-left-color="transparent"
          >
            <p class="text-center">获奖记录{{ item }}</p>
          </custom-item>
        </div>
        <div class="flex-1">
          <custom-item
            v-for="item in Math.floor(Math.random() * 10)"
            :key="item"
            background-color="#fd3d7f1a"
            border-left-color="transparent"
          >
            <p class="text-center">获奖记录{{ item }}</p>
          </custom-item>
        </div>
      </div>
    </div>
  </module-card>
</template>

<style scoped lang="scss">
table,
th,
td {
  border: 1px solid white;
  vertical-align: middle;
}

th,
td {
  line-height: 30px;
  color: white;
}
</style>
