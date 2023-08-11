<template>
  <el-card class="m-20">
    <template #header>
      <el-page-header :icon="ArrowLeft" @click="router.back()">
        <template #content>
          <span class="text-large weight-600 mr-3">
            {{ announcement.title }}
          </span>
        </template>
      </el-page-header>
    </template>
    <el-skeleton :rows="5" animated :loading="loading">
      <div id="article-content" v-html="announcement.content" />
    </el-skeleton>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { getAnnouncementById } from '@/api/system/announcement'

const route = useRoute()
const router = useRouter()

const loading = ref<boolean>(false)
const announcement = ref({
  title: '',
  content: '',
})

onMounted(async () => {
  loading.value = true
  try {
    const id = Number(route.params.id)
    const { data } = await getAnnouncementById(id)
    announcement.value.title = data.title
    announcement.value.content = data.content
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss"></style>
