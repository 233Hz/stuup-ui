<script setup lang="ts">
import ModuleCard from '../../../ModuleCard/index.vue'
import CustomItem from '../../../CustomItem/index.vue'
import CustomTag from '../../../CustomTag/index.vue'
import type { IdeologicalCharacter } from '@/api/growthReport/type'

const { data } = defineProps<{
  data?: IdeologicalCharacter
}>()
</script>

<template>
  <module-card header-left-text="思想品德" color="#2594ff33">
    <template #headerRight>
      <span>
        共获得
        <span class="font-bold text-[#2594ff] text-[24px]">0</span>
        成长积分
      </span>
    </template>
    <div class="p-[10px]">
      <custom-item>
        <p>
          参加爱国爱校相关活动
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countLoveTheCountryAndTheSchool || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          参加时政学习相关活动
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countCurrentPoliticsStudy || 0 }}
          </span>
          次
        </p>
      </custom-item>
      <custom-item>
        <p>
          参加安全法制相关活动
          <span class="text-[24px] text-bold mx-[10px] text-[#2594ff]">
            {{ data?.countSecurityRuleOfLaw || 0 }}
          </span>
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
            v-if="
              data?.participatingSocieties &&
              data.participatingSocieties.length > 0
            "
            v-for="item in data?.participatingSocieties"
            :key="item"
            border-color="#2594ff"
            :text="item"
          />
          <custom-item :show-left-border="false">
            <p class="text-center">未参加过任何社团</p>
          </custom-item>
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
