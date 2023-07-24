<template>
  <div class="user-info">
    <div class="user-info-wrapper">
      <div class="avatar">
        <div class="avatar-wrapper">
          <img :src="defaultAvatar" alt="头像" />
        </div>
      </div>
      <div class="info">
        <div class="info-wrapper">
          <p class="name">
            张三
            <span class="sex">♂</span>
          </p>
          <div class="info-wrapper__item">
            <span>班级:</span>
            <span>22药剂（药品物流）中澳合作22623</span>
          </div>
          <div class="info-wrapper__item">
            <span>班主任:</span>
            <span>李四</span>
          </div>
          <div class="info-wrapper__item">
            <span>专业:</span>
            <span>药品食品检验（药品质量检验）（中高职）</span>
          </div>
          <div class="info-wrapper__item">
            <span>手机号:</span>
            <span>13888888888</span>
          </div>
          <div class="info-wrapper__item cursor-pointer">
            <span>成长总积分:</span>
            <span class="text-xl text-blue-400 font-bold">1000</span>
          </div>
          <div class="info-wrapper__item cursor-pointer">
            <span>成长扣分:</span>
            <span class="text-xl text-red-400 font-bold">100</span>
          </div>
          <div class="info-wrapper__item">
            <span>成长等级:</span>
            <span>
              <div
                class="w-50 h-50 mx-2 rounded-md overflow-hidden inline-block relative"
                v-for="item in conversionFlower.calculateConversionFlower(100)">
                <img :src="item.imageSrc" :alt="item.key" class="w-full h-full" style="-webkit-user-drag: none" />
                <div class="absolute top-0 left-0 block text-xs text-white text-center bg-blue-400 rounded-br-lg">
                  {{ item.value }}
                </div>
              </div>
            </span>
          </div>
          <div class="info-wrapper__item">
            <span>加入社团:</span>
            <span>
              <div class="w-full rounded-md bg-white relative shadow-inner p-4">
                <el-tag class="mx-2" v-for="item in 10" :key="item">社团{{ item }}</el-tag>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/image/default_avatar.png';
import { useConversionFlower } from '@/utils/conversionFlower';

const conversionFlower = useConversionFlower();
</script>

<style scoped lang="scss">
$blue: #66a3ff;

.user-info {
  width: 300px;
  height: 884px;
  background-color: white;

  &-wrapper {
    width: 100%;
    height: 100%;

    .avatar {
      width: 100%;
      height: 150px;
      position: relative;

      &-wrapper {
        margin: auto;
        width: 150px;
        height: 150px;
        padding: 10px;

        > img {
          display: block;
          border-radius: 12px;
          width: 100%;
          height: 100%;
        }
      }
    }

    .info {
      width: 100%;

      &-wrapper {
        width: 100%;
        border-radius: 8px;
        padding: 20px;

        .name {
          text-align: center;
          font-size: 24px;
          color: black;
          line-height: 48px;

          .sex {
            font-size: 24px;
            color: $blue;
            font-weight: bold;
          }
        }

        &__item {
          font-size: 16px;
          line-height: 36px;
          color: #696b6c;
          display: flex;

          > span {
            display: block;

            &:nth-child(1) {
              width: 100px;
              color: $blue;
              font-weight: 700;
            }
            &:nth-child(2) {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>
