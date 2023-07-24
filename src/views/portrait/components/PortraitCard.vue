<template>
  <div class="card">
    <div class="card-wrapper">
      <div class="card-wrapper__header">
        <slot name="header">
          <span v-if="props.title">{{ props.title }}</span>
        </slot>
      </div>
      <div>
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  background-color: white;
  border-radius: 4px;

  &-wrapper {
    width: 100%;

    &__header {
      height: 32px;
      padding: 0 10px;
      font-size: 16px;
      font-weight: bold;
      line-height: 32px;
      background-color: #fafafa;
      color: #62778b;
    }
  }
}
</style>
