<script setup lang="ts">
interface Props {
  showHeader?: boolean
  headerLeftText?: string
  headerRightText?: string
  headerHeight?: number
  cardClass?: string[]
  headerClass?: string[]
  contentClass?: string[]
}
const {
  showHeader,
  headerLeftText,
  headerRightText,
  headerHeight,
  cardClass,
  headerClass,
  contentClass,
} = withDefaults(defineProps<Props>(), {
  showHeader: true,
  headerHeight: 40,
  headerClass: () => ['bg-[#409eff66]'],
})
</script>

<template>
  <div
    class="bg-[rgba(255,255,255,0.1)] rounded-[8px] relative overflow-hidden"
    :class="cardClass"
  >
    <div
      v-if="showHeader"
      class="w-full text-bold text-[18px] text-white px-[10px] flex"
      :class="headerClass"
      :style="{
        height: headerHeight + 'px',
        lineHeight: headerHeight + 'px',
      }"
    >
      <slot name="header" :text="{ headerLeftText, headerRightText }">
        <div class="flex-1">
          <slot name="headerLeft" :text="{ headerLeftText }">
            {{ headerLeftText }}
          </slot>
        </div>
        <div class="flex-1 text-right">
          <slot name="headerRight" :text="{ headerRightText }">
            {{ headerRightText }}
          </slot>
        </div>
      </slot>
    </div>
    <div :class="contentClass">
      <slot></slot>
    </div>
  </div>
</template>
