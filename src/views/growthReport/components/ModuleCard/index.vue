<script setup lang="ts">
interface Props {
  showHeader?: boolean
  headerLeftText?: string
  headerRightText?: string
  headerHeight?: number
  color?: string
}

withDefaults(defineProps<Props>(), {
  showHeader: true,
  headerHeight: 40,
  color: '#409eff66',
})
</script>

<template>
  <div
    class="relative overflow-hidden border-solid border-l-[1px] border-b-[1px] border-r-[1px] box-border"
    :style="{
      borderColor: color,
    }"
  >
    <div
      v-if="showHeader"
      class="w-full text-bold text-[18px] text-white px-[10px] flex"
      :style="{
        height: headerHeight + 'px',
        lineHeight: headerHeight + 'px',
        backgroundColor: color,
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
    <div>
      <slot></slot>
    </div>
  </div>
</template>
