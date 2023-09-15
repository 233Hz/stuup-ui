<template>
  <div style="margin: 20px">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-20">
        <MessageCard
          title="通知公告"
          :loading="loading"
          :messages="notifyMsgs"
          more-path="/self/message/notify"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-20">
        <MessageCard
          title="智慧提醒"
          :loading="loading"
          :messages="systemMsgs"
          more-path="/self/message/system"
        />
      </el-col>
      <el-col :span="24">
        <FastCard />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqMyNotifyPage, reqMySystemPage } from '@/api/system/announcement'
import MessageCard from './MessageCard.vue'
import FastCard from './FastCard.vue'

const router = useRouter()

const loading = ref<boolean>(false)
const systemMsgs = ref()
const notifyMsgs = ref()

onMounted(() => {
  initMsg()
})

const initMsg = () => {
  loading.value = true
  reqMyNotifyPage()
    .then(({ data }) => {
      notifyMsgs.value = data.records
      return reqMySystemPage()
    })
    .then(({ data }) => {
      systemMsgs.value = data.records
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
