<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
</script>

<template>
  <div class="h-full">
    <module-card header-left-text="身体素养" color="#fca93c33">
      <div class="p-[10px] flex gap-[10px]">
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="nation-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">国家级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                1
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="city-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">市级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                1
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="district-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">行（区）级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                1
              </span>
              次
            </p>
          </div>
        </div>
        <div class="flex-1 flex gap-[10px]">
          <svg-icon
            name="school-level"
            color="#fca93c"
            width="80px"
            height="80px"
          />
          <div class="flex flex-col justify-center text-white">
            <p class="text-[24px] font-bold">校级</p>
            <p class="text-[18px] mt-[20px]">
              <span class="mx-[4px] text-[24px] text-bold text-[#fca93c]">
                1
              </span>
              次
            </p>
          </div>
        </div>
      </div>
    </module-card>
  </div>
</template>

<style scoped lang="scss"></style>
