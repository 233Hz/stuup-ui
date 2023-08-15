<template>
  <div class="details">
    <div class="details-wrapper">
      <el-page-header :icon="ArrowLeft"></el-page-header>
      <div class="details-wrapper__header">
        <p class="total-score">{{ totalScore }}</p>
        <p class="total-text">当前总积分</p>
      </div>
      <div class="details-wrapper__content">
        <ul class="content-wrapper">
          <li class="content-wrapper__item" v-for="item in list" :key="item.id">
            <div class="item-left">
              <div class="score-source">{{ item.name }}</div>
              <div class="score-time">{{ item.createTime }}</div>
            </div>
            <div class="item-right">
              <div class="score-number">{{ item.score }}</div>
            </div>
          </li>
          <li class="flex justify-center py-10">
            <el-button type="primary" plain v-show="!loading" @click="load">
              {{ isNoMore ? '没有更多了' : '加载更多' }}
              <el-icon v-if="!isNoMore"><ArrowRight /></el-icon>
            </el-button>
            <el-icon v-show="loading" class="is-loading"><Loading /></el-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Details">
import { ref, onMounted } from 'vue'
import { pageStudentRecScore } from '@/api/details'
import type { StudentRecScoreVO } from '@/api/details/type'
import { ArrowLeft, Loading, ArrowRight } from '@element-plus/icons-vue'

const loading = ref(false)
const size = 10
const page = ref(1)
const isNoMore = ref<boolean>(false)
const totalScore = ref<number>(0)
const list = ref<StudentRecScoreVO[]>([])

const load = () => {
  if (isNoMore.value) return
  loading.value = true
  pageStudentRecScore({ current: page.value, size })
    .then(({ data }) => {
      if (data.records && data.records.length) {
        totalScore.value = data.totalScore
        data.records.forEach((item) => list.value!.push(item))
        page.value++
      } else {
        isNoMore.value = true
      }
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  load()
})
</script>

<style scoped lang="scss">
.details {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'Arial', 'SimSun';

  &-wrapper {
    position: relative;
    margin: auto;
    width: 50%;
    height: 100%;
    padding: 20px;

    &__header {
      text-align: center;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: #ccc solid 1px;

      .total-score {
        font-size: 48px;
        font-weight: 600;
        color: #0a0a24;
      }

      .total-text {
        font-size: 16px;
        color: #818181;
      }
    }

    &__content {
      width: 100%;

      .content-wrapper {
        position: relative;
        width: 100%;

        &__item {
          width: 100%;
          height: 100px;
          margin: 10px 0;
          padding: 10px;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          cursor: pointer;
          min-width: 300px;

          &:hover {
            color: #409eff;
            background-color: rgba(87, 87, 87, 0.1);
          }

          .item-left {
            flex: 1;
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .score-source,
            .score-time {
              width: 100%;
            }
            .score-source {
              font-size: 18px;
              font-weight: 600;
            }
            .score-time {
              margin-top: 10px;
              font-size: 12px;
              color: #818181;
            }
          }

          .item-right {
            width: 100px;
            height: 100%;
            line-height: 100px;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: #0a0a24;
          }
        }
      }
    }
  }
}
</style>
