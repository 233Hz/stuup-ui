<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
</script>

<template>
  <module-card header-left-text="文明修养" :header-class="['bg-[#2594ff33]']">
    <div class="p-[10px]">
      <div class="border-dashed border-2 border-[#2594ff] p-[10px]">
        <custom-item>
          <p>
            获得六项评比流动红旗（班级前十）
            <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
              1
            </span>
            次
          </p>
        </custom-item>
        <custom-item>
          <p>
            获得文明寝室（先进）
            <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
              1
            </span>
            次
          </p>
        </custom-item>
      </div>
      <div class="h-[10px]"></div>
      <div class="border-dashed border-2 border-[#2594ff] p-[10px]">
        <custom-item>
          <p>
            仪表仪容违规
            <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
              1
            </span>
            次
          </p>
        </custom-item>
        <custom-item>
          <p>
            文明礼仪违规
            <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
              1
            </span>
            次
          </p>
        </custom-item>
        <custom-item>
          <p>
            卫生环境违规
            <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
              1
            </span>
            次
          </p>
        </custom-item>
      </div>
    </div>
  </module-card>
</template>
