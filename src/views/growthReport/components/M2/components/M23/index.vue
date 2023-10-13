<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
</script>

<template>
  <module-card header-left-text="职业素养" color="#fd3d7f33" class="h-full">
    <div class="p-[10px]">
      <custom-item background-color="#fd3d7f1a" border-left-color="transparent">
        <p class="text-center">未参加过职业素养类比赛</p>
      </custom-item>
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
