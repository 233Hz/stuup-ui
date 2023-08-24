<template>
  <div class="rank-list" v-show="dataArr?.length !== 0">
    <p class="rank-list__title">
      <span>学年班级排行榜</span>
    </p>
    <ul class="rank-list__wrapper">
      <li class="rank-list__item" v-for="item in dataArr" :key="item.ranking">
        <div class="item-wrapper">
          <div class="item-wrapper__avatar">
            <img class="avatar" :src="item.avatar || defaultAvatar" />
          </div>
          <div class="item-wrapper__info">
            <p class="name">{{ item.classTeacher }}</p>
            <p class="class-teacher">班主任</p>
          </div>
          <div class="item-wrapper__class">{{ item.className }}</div>
          <div class="item-wrapper__score">{{ item.score }}</div>
          <span class="ranking">{{ item.ranking }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqWholeClassTop10Ranking } from '@/api/home/index'
import defaultAvatar from '@/assets/image/default_avatar.png'

const dataArr = ref<WholeClassTop10List>()

onMounted(async () => {
  const { data } = await reqWholeClassTop10Ranking()
  dataArr.value = data
})
</script>

<style scoped lang="scss">
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
    background: url(src/assets/image/home-ranking-title-bg.png) no-repeat center
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
        background-color: #d9afd9;
        background-image: linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%);

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
          width: 100px;
          height: 100%;
          font-size: 12px;
          text-align: start;
          padding: 0 2px;
          color: white;
          display: flex;
          flex-direction: column;
          padding-left: 4px;
          justify-content: space-around;
          text-align: center;

          > p {
            height: 10px;
            line-height: 10px;
            margin-top: 5px;
            font-weight: bold;
            font-size: 14px;
          }

          .name {
            font-size: 14px;
            font-weight: bold;
          }

          .class-teacher {
            height: 15px;
            line-height: 15px;
            margin-top: 0;
          }
        }

        &__class {
          width: 200px;
          height: 100%;
          line-height: 60px;
          font-size: 14px;
          font-weight: bold;
          color: white;

          white-space: nowrap; /* 防止文本换行 */
          overflow: hidden; /* 隐藏溢出部分 */
          text-overflow: ellipsis; /* 在溢出部分显示省略号（...） */
        }

        &__score {
          width: 80px;
          height: 100%;
          line-height: 60px;
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          background-color: #0093e9;
          background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
