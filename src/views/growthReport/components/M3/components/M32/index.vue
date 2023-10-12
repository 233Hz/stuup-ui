<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
</script>

<template>
  <div class="h-full">
    <module-card header-left-text="心理素养" :header-class="['bg-[#fca93c33]']">
      <div class="p-[10px] flex gap-[10px]">
        <custom-item background-color="#fca93c1a" border-left-color="#fca93c">
          <div class="flex gap-[10px]">
            <div class="w-[80px] h-[80px] bg-[#fca93c]"></div>
            <div class="flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">参加心理剧或心理月展示活动</p>
              <p class="text-[18px] mt-[20px]">
                <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                  1
                </span>
                次
              </p>
            </div>
          </div>
        </custom-item>
        <custom-item background-color="#fca93c1a" border-left-color="#fca93c">
          <div class="flex gap-[10px]">
            <div class="w-[80px] h-[80px] bg-[#fca93c]"></div>
            <div class="flex flex-col justify-center text-white">
              <p class="text-[24px] font-bold">参与心理中心活动</p>
              <p class="text-[18px] mt-[20px]">
                <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                  1
                </span>
                次
              </p>
            </div>
          </div>
        </custom-item>
      </div>
    </module-card>
  </div>
</template>

<style scoped lang="scss"></style>
