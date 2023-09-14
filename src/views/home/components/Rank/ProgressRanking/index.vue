<template>
  <div class="rank-list" v-show="dataArr?.length !== 0">
    <p class="rank-list__title">
      <span>每月进步榜</span>
    </p>
    <ul class="rank-list__wrapper">
      <li class="rank-list__item" v-for="item in dataArr" :key="item.ranking">
        <div class="item-wrapper">
          <div class="item-wrapper__avatar">
            <img class="avatar" :src="item.avatar || defaultAvatar" />
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
              v-for="(flower, index) in flowersStore.calculateFlowerLevelIgnore(
                item.score,
              )"
              :key="index"
            >
              <div class="icon-wrapper__border">
                <img :src="flower.image" />
              </div>
              <p class="absolute b-0 l0 w-full text-right text-white fs-12">
                x{{ flower.count }}
              </p>
            </div>
          </div>
          <div class="item-wrapper__score">
            <div class="number">
              {{ item.score }}
            </div>
            <div class="custom">
              <div>↑ {{ item.riseRanking }}</div>
            </div>
          </div>
          <span :class="`${rankingColorHandle(item.ranking)} ranking`">
            {{ item.ranking }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqProgressTop10Ranking } from '@/api/home/index'
import { ProgressTop10List } from '@/api/home/type'
import useFlowersStore from '@/store/modules/flowers'
import defaultAvatar from '@/assets/image/default_avatar.png'

const flowersStore = useFlowersStore()

const dataArr = ref<ProgressTop10List>()

onMounted(async () => {
  const { data } = await reqProgressTop10Ranking()
  dataArr.value = data
})

const rankingColorHandle = (ranking: number) => {
  if (ranking === 1) {
    return 'no_1'
  } else if (ranking === 2) {
    return 'no_2'
  } else if (ranking === 3) {
    return 'no_3'
  } else {
    return ''
  }
}
</script>

<style scoped lang="scss">
.no_1 {
  background-color: #ffb628 !important;
}
.no_2 {
  background-color: #94b6db !important;
}
.no_3 {
  background-color: #f2a897 !important;
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
    background: url(@/assets/image/home-ranking-title-bg.png) no-repeat center
      center;
    background-size: 100% 100%;
    > span {
      background-color: #4158d0;
      background-image: linear-gradient(
        43deg,
        #4158d0 0%,
        #c850c0 46%,
        #ffcc70 100%
      );
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

      .item-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #a9c9ff;
        background-image: linear-gradient(180deg, #a9c9ff 0%, #ffbbec 100%);

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
        }

        &__info {
          width: 200px;
          height: 100%;
          font-size: 12px;
          text-align: start;
          padding: 0 2px;
          color: white;
          display: flex;
          flex-direction: column;
          padding-left: 4px;
          justify-content: space-around;

          .name {
            font-size: 14px;
            font-weight: bold;
          }

          .class-name {
            white-space: nowrap; /* 防止文本换行 */
            overflow: hidden; /* 隐藏溢出部分 */
            text-overflow: ellipsis; /* 在溢出部分显示省略号（...） */
          }
        }

        &__grade {
          width: 110px;
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
              background-image: linear-gradient(
                160deg,
                #0093e9 0%,
                #80d0c7 100%
              );

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

          .custom {
            font-size: 20px;
            color: orchid;
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
