<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="fs-18 font-600">{{ props.title }}</span>
        <el-button type="success" text bg @click="router.push('/self/notify')">
          更多
          <el-icon><DArrowRight /></el-icon>
        </el-button>
      </div>
    </template>
    <el-skeleton :rows="10" animated :loading="props.loading">
      <el-scrollbar height="400px">
        <div
          v-if="isNoNotify()"
          class="p-20 flex justify-between items-center hover:text-#1a8e00 cursor-pointer"
          v-for="(item, index) in props.messages"
          :key="item.id"
          @click="router.push('/article/' + item.id)"
        >
          <span class="block fs-16">{{ index + 1 }}. {{ item.title }}</span>
          <span class="block fs-12 text-#999 text-right">
            发布时间：{{ formatDate(item.createTime.toString(), 'YYYY-MM-DD') }}
          </span>
        </div>
        <el-empty v-else class="h-400" description="暂无消息" />
      </el-scrollbar>
    </el-skeleton>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/util'
import type { Notify } from '@/api/system/announcement/type'

const router = useRouter()

interface Props {
  title?: string
  loading?: boolean
  messages?: Notify[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const isNoNotify = () => {
  return props.messages && props.messages?.length !== 0
}
</script>
