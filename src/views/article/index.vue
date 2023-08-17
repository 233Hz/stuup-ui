<template>
  <div class="h-full overflow-auto">
    <el-card class="m-20" style="min-height: calc(100% - 40px)">
      <template #header>
        <el-page-header :icon="ArrowLeft" @click="router.back()">
          <template #content>
            <span class="text-large weight-600 mr-3">
              {{ article.title }}
            </span>
          </template>
        </el-page-header>
      </template>
      <el-skeleton :rows="5" animated :loading="loading">
        <div
          class="break-words"
          v-if="article.content"
          v-html="article.content"
        />
        <el-empty description="还未填写内容" v-else />
      </el-skeleton>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { reqNotifyById } from '@/api/system/announcement/index'

const route = useRoute()
const router = useRouter()

const loading = ref<boolean>(false)

const article = ref({
  title: '',
  content: '',
})

onMounted(async () => {
  loading.value = true
  try {
    const id = Number(route.params.id)
    const { data } = await reqNotifyById(id)
    article.value.title = data.title
    article.value.content = data.content
  } finally {
    loading.value = false
  }
})
</script>
