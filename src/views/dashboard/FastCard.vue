<template>
  <el-card shadow="never">
    <el-skeleton :rows="10" animated :loading="props.loading">
      <div class="grid grid-cols-6 gap-4">
        <div
          v-for="item in props.fasts"
          :key="item.path"
          class="select-none text-center fs-18 text-#1a8e00 font-bold mb-40 cursor-pointer"
          @click="router.push(item.path)"
        >
          <svg-icon :name="item.icon" width="150px" height="150px" />
          {{ item.name }}
        </div>
      </div>
    </el-skeleton>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface Fast {
  name: string
  path: string
  icon: string
}

interface Props {
  loading?: boolean
  fasts?: Fast[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  fasts: () => [
    {
      name: '成长项目设置',
      path: '/grow/config',
      icon: 'dashboard-icon-project',
    },
    {
      name: '成长模型',
      path: '/grow/model',
      icon: 'dashboard-icon-model',
    },
    {
      name: '数据采集',
      path: '/collect',
      icon: 'dashboard-icon-collect',
    },
    {
      name: '综评记录',
      path: '/record',
      icon: 'dashboard-icon-record_2',
    },
    {
      name: '采集记录',
      path: '/growScore',
      icon: 'dashboard-icon-record_1',
    },
    {
      name: '成长排名',
      path: '/ranking',
      icon: 'dashboard-icon-ranking',
    },
  ],
})
</script>
