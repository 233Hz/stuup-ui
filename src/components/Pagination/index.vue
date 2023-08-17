<template>
  <div class="flex justify-end mt-12">
    <el-scrollbar>
      <el-pagination
        background
        :total="paginationStore.total"
        v-model:current-page="paginationStore.current"
        v-model:page-size="paginationStore.size"
        :page-sizes="props.pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :layout="props.layout"
      />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import usePaginationStore from '@/store/modules/pagination'

const paginationStore = usePaginationStore()

interface Props {
  pageSizes?: number[]
  layout?: string
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 30, 50, 100],
  layout: 'total, sizes, prev, pager, next',
})

onUnmounted(() => {
  paginationStore.reset()
})

const emit = defineEmits<{
  (e: 'sizeChange', val: number): void
  (e: 'currentChange', val: number): void
}>()

const handleSizeChange = (val: number) => {
  paginationStore.setSize(val)
  emit('sizeChange', val)
}

const handleCurrentChange = (val: number) => {
  paginationStore.setCurrent(val)
  emit('currentChange', val)
}
</script>

<style scoped lang="scss"></style>
