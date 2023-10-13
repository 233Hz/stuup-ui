<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import CustomTag from '../../../CustomTag/index.vue'
</script>

<template>
  <module-card header-left-text="思想品德" color="#2594ff33">
    <template #headerRight>
      <span>
        共获得
        <span class="font-bold text-[#2594ff] text-[24px]">46</span>
        成长积分
      </span>
    </template>
    <div class="p-[10px]">
      <custom-item>
        <p>
          参加学校及以上组织的艺术社团
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">1</span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          参加爱国爱校相关活动
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">1</span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          参加时政学习相关活动
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">1</span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          参加安全法制相关活动
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">1</span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          <span>加入过的社团</span>
        </p>
        <div class="mt-[10px]">
          <custom-tag
            class="mr-[10px] mb-[10px]"
            v-for="item in 10"
            :key="item"
            border-color="#2594ff"
            :text="`社团${item}`"
          />
        </div>
      </custom-item>
    </div>
  </module-card>
</template>

<style scoped lang="scss">
.item {
  background-color: #2594ff1a;
  border-radius: 4px;
  border-left: 4px solid #2594ff;
  padding: 8px 16px;
  color: #fff;
  margin: 10px 0;
}
</style>
