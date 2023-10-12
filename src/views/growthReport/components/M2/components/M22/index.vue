<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
</script>

<template>
  <module-card
    header-left-text="职业资格证书"
    :header-class="['bg-[#fd3d7f33]']"
    class="h-full"
  >
    <div class="p-[10px]">
      <custom-item background-color="#fd3d7f1a" border-left-color="#fd3d7f">
        <p>教师资格证</p>
      </custom-item>
      <custom-item background-color="#fd3d7f1a" border-left-color="#fd3d7f">
        <p>法律职业资格</p>
      </custom-item>
      <custom-item background-color="#fd3d7f1a" border-left-color="#fd3d7f">
        <p>注册建筑师</p>
      </custom-item>
    </div>
  </module-card>
</template>
