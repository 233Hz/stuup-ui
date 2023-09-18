<template>
  <div
    class="w-full h-full overflow-auto"
    style="
      background-color: #74ebd5;
      background-image: linear-gradient(180deg, #74ebd5 0%, #9face6 100%);
    "
  >
    <div class="w-1000 m-auto">
      <el-page-header icon="ArrowLeft" @back="router.back()" class="my-10">
        <template #content>
          <span class="text-large font-600 mr-3">我的成长明细</span>
        </template>
      </el-page-header>
      <div
        class="h-300 bg-white br-20 shadow-md flex flex-col justify-center items-center"
      >
        <p class="fs-24 text-gray-500">当前总积分</p>
        <p class="mt-20">
          <span class="fs-48">{{ totalScore }}</span>
          <span class="fs-24">分</span>
        </p>
      </div>
      <div
        class="flex items-center bg-white shadow-md my-10 p-20 br-8"
        v-for="item in tableData"
      >
        <div class="flex-1 flex flex-col justify-around gap-20">
          <p class="fs-20 font-bold">{{ item.name }}</p>
          <p class="text-gray-400 fs-16" v-if="item.description">
            {{ item.description }}
          </p>
        </div>
        <div class="w-100 text-center">
          <span class="fs-32 font-bold">{{ item.score }}</span>
        </div>
        <div class="w-160 text-center text-gray-500">
          <span class="fs-18">
            {{ formatDate(item.createTime, 'YYYY-MM-DD') }}
          </span>
        </div>
      </div>
      <div class="flex justify-center my-20">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="(val: number) => {
            page.current = val
            fetchData()
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { studentScoreDetails } from '@/api/details'
import { formatDate } from '@/utils/util'

const router = useRouter()

const total = ref(0)
const page = ref({
  current: 1,
  size: 10,
})
const loading = ref(false)
const totalScore = ref(0)
const tableData = ref<any[]>([])

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    loading.value = true
    const {
      data: { totalScore: score, detailPage },
    } = await studentScoreDetails(page.value)
    totalScore.value = score
    total.value = detailPage.total
    detailPage.records.forEach((item) => {
      item.score = Number(item.score) > 0 ? '+' + item.score : item.score
    })
    tableData.value = detailPage.records
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.details {
  width: 1200px;
  height: 100%;
  margin: auto;
  position: relative;

  .header {
    .score {
      width: 100%;
      height: 300px;
      padding: 20px;

      &-wrapper {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
          .total-text,
          .total-score {
            text-align: center;
          }

          .total-text {
            font-size: 24px;
          }

          .total-score {
            font-size: 48px;
            font-weight: bold;
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
