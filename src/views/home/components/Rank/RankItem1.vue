<template>
  <div class="rank-list">
    <p class="rank-list__title">
      <span>{{ props.rankName }}</span>
    </p>
    <ul class="rank-list__wrapper">
      <li class="rank-list__item" v-for="(item, index) in props.data" :key="item[props.dataKey] || index">
        <div class="item-wrapper" :class="props.backgroundColor">
          <div class="item-wrapper__avatar">
            <img class="avatar" :src="item.avatarUrl || defaultAvatar" />
          </div>
          <div class="item-wrapper__info">
            <p class="name">{{ item.studentName }}</p>
            <p class="class-name">
              班级：
              <span>{{ item.className }}</span>
            </p>
            <p class="class-teacher">
              班主任：
              <span>{{ item.classTeacher }}</span>
            </p>
          </div>
          <div class="item-wrapper__grade">
            <div
              class="icon-wrapper"
              v-for="(flower, index) in conversionFlower.calculateConversionFlower(item.score)"
              :key="index">
              <div class="icon-wrapper__border">
                <img :src="flower.imageSrc" />
              </div>
            </div>
          </div>
          <div class="item-wrapper__score">
            <div class="number">
              {{ item.score }}
            </div>
            <div class="custom">
              <slot :row="item"></slot>
            </div>
          </div>
          <span class="ranking">{{ item.rank }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/image/default_avatar.png';
import { useConversionFlower } from '@/utils/conversionFlower';
const conversionFlower = useConversionFlower();

interface RankVO {
  id: number;
  avatarUrl?: string;
  studentName: string;
  className?: string;
  classTeacher?: string;
  score: number;
  rank: number;
  rankChange?: number;
}

interface Props {
  rankName: string; // 排行榜名称
  dataKey?: string; // 数据绑定的key
  backgroundColor?: 'color1' | 'color2' | 'color3' | 'color4'; // 每一列的样式
  data?: RankVO[]; // 排行榜数据
}
const props = withDefaults(defineProps<Props>(), {
  dataKey: 'id',
});
</script>

<style scoped lang="scss">
.color1 {
  background-color: #ffdee9 !important;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%) !important;
}
.color2 {
  background-color: #a9c9ff !important;
  background-image: linear-gradient(180deg, #a9c9ff 0%, #ffbbec 100%) !important;
}
.color3 {
  background-color: #74ebd5 !important;
  background-image: linear-gradient(90deg, #74ebd5 0%, #9face6 100%) !important;
}
.color4 {
  background-color: #a9c9ff !important;
  background-image: linear-gradient(180deg, #a9c9ff 0%, #ffbbec 100%) !important;
}

.rank-list {
  width: 500px;
  height: 900px;
  border-radius: 8px;
  cursor: pointer;
  margin: 50px 20px 0 20px;

  &__title {
    height: 60px;
    font-size: 32px;
    line-height: 60px;
    font-family: 华文行楷;
    color: white;
    background: url(../../../../assets/image/title_border.png) no-repeat center center;
    background-size: 100% 100%;
    > span {
      background-color: #4158d0;
      background-image: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__wrapper {
    width: 100%;
    height: 860px;
    padding: 20px;

    .rank-list__item {
      width: 100%;
      height: 80px;
      padding: 5px 0;

      &:nth-child(1) .ranking {
        background-color: #ffb628 !important;
      }
      &:nth-child(2) .ranking {
        background-color: #94b6db !important;
      }
      &:nth-child(3) .ranking {
        background-color: #f2a897 !important;
      }

      .item-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fa8bff;
        background-image: linear-gradient(45deg, #fa8bff 0%, #2bd2ff 52%, #2bff88 90%);

        display: flex;
        justify-content: space-between;
        padding: 5px;
        border-radius: 8px;
        overflow: hidden;

        &__avatar {
          position: relative;
          width: 60px;
          height: 100%;
          background-color: white;
          display: flex;
          border-radius: 50%;
          background-color: #85ffbd;
          background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);

          .avatar {
            margin: auto;
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 50%;
          }

          &::after {
            content: '';
            position: absolute;
            top: 25px;
            right: -5px;
            width: 20px;
            height: 20px;
            background: url(../../../../assets/image/xhh.png) no-repeat 0 0;
            background-size: 100% 100%;
          }
          &::before {
            content: '';
            position: absolute;
            top: 45px;
            right: 5px;
            width: 15px;
            height: 15px;
            background: url(../../../../assets/image/bmh.png) no-repeat 0 0;
            background-size: 100% 100%;
          }
        }

        &__info {
          flex: 1;
          height: 100%;
          font-size: 12px;
          text-align: start;
          padding: 0 2px;
          color: white;
          display: flex;
          flex-direction: column;
          padding-left: 4px;
          justify-content: space-around;

          > p {
            height: 10px;
            line-height: 10px;
            margin-top: 5px;
            font-weight: 100;
            // color: #bafdfb;

            > span {
              font-weight: 500;
              // color: #ece4ec;
            }

            &:nth-child(1) {
              height: 15px;
              line-height: 15px;
              margin-top: 0;
            }
          }

          .name {
            font-size: 14px;
            font-weight: bold;
            // color: #f9c253;
          }
        }

        &__grade {
          width: 220px;
          height: 100%;
          display: flex;
          justify-content: end;
          align-items: center;

          .icon-wrapper {
            position: relative;
            width: 55px;
            height: 55px;
            display: flex;

            &__border {
              margin: auto;
              width: 50px;
              height: 50px;
              overflow: hidden;
              border-radius: 99% 100% 30% 89% / 0% 98% 1% 73%;
              display: flex;
              background-color: #0093e9;
              background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

              > img {
                display: block;
                margin: auto;
                width: 45px;
                height: 45px;
                object-fit: cover;
                -webkit-user-drag: none;
                border-radius: 99% 100% 30% 89% / 0% 98% 1% 73%;
              }
            }
          }
        }

        &__score {
          width: 80px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .number {
            width: 100%;
            font-size: 24px;
            text-align: center;
            font-weight: bold;
            background-color: #0093e9;
            background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        &__ranking {
          width: 50px;
          height: 100%;
          position: relative;

          .shadow {
            position: absolute;
            left: 50%;
            bottom: 10px;
            width: 40px;
            height: 10px;
            transform: translateX(-50%);
            background-color: rgb(123, 133, 154, 0.4);
            border-radius: 50%;
          }

          .score {
            position: absolute;
            width: 100%;
            height: 100%;
            color: white;
            font-size: 32px;
            font-weight: 900;
          }
        }

        .ranking {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          text-align: start;
          font-weight: bold;
          color: white;
          line-height: 25px;
          font-size: 20px;
          border-radius: 0 0 100%;
          background-color: #7b859a;
          font-style: italic;
        }
      }
    }
  }
}
</style>
