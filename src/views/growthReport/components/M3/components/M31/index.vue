<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
</script>

<template>
  <module-card header-left-text="身体素养" color="#fca93c33">
    <div class="p-[10px]">
      <custom-item background-color="#fca93c1a" border-left-color="#fca93c">
        <p>
          参加心理剧或心理月展示活动
          <span class="text-[24px] text-bold mx-[10px] text-[#fca93c]">1</span>
          次
        </p>
      </custom-item>
      <custom-item background-color="#fca93c1a" border-left-color="#fca93c">
        <p>
          参与心理中心活动
          <span class="text-[24px] text-bold mx-[10px] text-[#fca93c]">1</span>
          次
        </p>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss"></style>
