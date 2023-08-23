<template>
  <div class="self" v-if="userStore.userInfo.userType === USER_TYPE.STUDENT">
    <div class="wrapper">
      <div class="content">
        <div class="avatar" @click="router.push('/self/center')">
          <img :src="userStore.userInfo.avatar || defaultAvatar" />
        </div>
        <div class="info">
          <p class="name">{{ userStore.userInfo.userName }}</p>
          <p class="ranking">
            全校排名:
            <span>{{ userStore.userInfo.ranking || '暂无排名' }}</span>
          </p>
        </div>
        <div class="score">
          <p>总积分</p>
          <p>{{ userStore.userInfo.totalScore || 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { GrowthInfo } from '@/api/home/type'
import { reqGrowthInfo } from '@/api/home/index'
import { USER_TYPE } from '@/utils/dict'
import setting from '@/setting'

const { defaultAvatar } = setting
const router = useRouter()
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.self {
  .wrapper {
    background: url(src/assets/image/home-student-info-border.png) no-repeat;
    background-size: 100% 100%;
    padding: 40px 100px 40px 100px;

    .content {
      width: 500px;
      display: flex;
      gap: 12px;
      background-color: #16a085;
      background-image: linear-gradient(90deg, #16a085 0%, #f4d03f 100%);
      border-radius: 8px;
      padding: 12px;

      .avatar {
        width: 120px;
        height: 120px;
        cursor: pointer;

        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      .info {
        flex: 2;
        position: relative;

        .name {
          font-size: 32px;
          color: #f4d03f;
          margin-top: 45px;
        }

        .ranking {
          position: relative;
          bottom: 0;
          font-size: 20px;
          color: white;
          margin-top: 12px;

          > span {
            font-size: 24px;
            font-weight: bold;
          }
        }
      }

      .score {
        flex: 1;
        text-align: center;

        > p:nth-child(1) {
          font-size: 24px;
          color: white;
          margin-top: 30px;
        }
        > p:nth-child(2) {
          font-size: 42px;
          background-color: #fa8bff;
          background-image: linear-gradient(
            45deg,
            #fa8bff 0%,
            #2bd2ff 52%,
            #2bff88 90%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
