<template>
  <div class="visual">
    <div class="visual-wrapper">
      <div class="visual-wrapper__header">
        <div class="decoration-left">
          <div class="top"><Decoration8 /></div>
          <div class="down"><Decoration10 /></div>
        </div>
        <div class="decoration-center"><Decoration11>可视化大屏</Decoration11></div>
        <div class="decoration-right">
          <div class="top"><Decoration8 :reverse="true" /></div>
          <div class="down"><Decoration10 /></div>
        </div>
      </div>
      <div class="visual-wrapper__main">
        <div class="main-left">
          <div class="chart_1">
            <BorderBox1></BorderBox1>
          </div>
          <div class="chart_2"><BorderBox1></BorderBox1></div>
          <div class="chart_3"><BorderBox1></BorderBox1></div>
        </div>
        <div class="main-right">
          <div class="main-right__top"><BorderBox1></BorderBox1></div>
          <div class="main-right__center"><BorderBox1></BorderBox1></div>
          <div class="main-right__bottom">
            <div class="left"><BorderBox1></BorderBox1></div>
            <div class="right"><BorderBox1></BorderBox1></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { BorderBox1, Decoration8, Decoration10, Decoration11 } from '@kjgl77/datav-vue3';

onMounted(() => {
  resetSize();
});

const resetSize = () => {
  const { innerWidth, innerHeight } = window;
  const content = document.querySelector('.visual-wrapper') as HTMLDivElement;

  if (innerWidth > innerHeight && innerWidth / innerHeight > 16 / 9) {
    content.style.transform = `scale(${innerHeight / 1080})`;
  } else {
    content.style.transform = `scale(${innerWidth / 1920})`;
  }
};
window.onresize = () => {
  resetSize();
};
</script>

<style lang="scss" scoped>
.visual {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #01050b;

  &-wrapper {
    min-width: 1920px;
    min-height: 1080px;
    width: 1920px;
    height: 1080px;
    position: relative;
    overflow: hidden;
    user-select: none;

    $header-height: 70px;

    &__header {
      width: 100%;
      height: $header-height;
      display: flex;

      .decoration-left {
        width: 500px;
        height: 100%;

        .top {
          width: 100%;
          height: 50px;
        }
        .down {
          width: 100%;
          height: 20px;
        }
      }
      .decoration-center {
        flex: 1;
        width: 100%;
        height: 100%;
        line-height: 70px;
        color: white;
        font-size: 24px;
      }
      .decoration-right {
        width: 500px;
        height: 100%;

        .top {
          width: 100%;
          height: 50px;
        }

        .down {
          width: 100%;
          height: 20px;
          transform: rotate(180deg);
        }
      }
    }

    &__main {
      width: 100%;
      height: calc(100% - $header-height);
      display: flex;
      padding: 10px;
      gap: 10px;

      .main-left {
        width: 500px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .chart_1 {
          flex: 1;
        }
        .chart_2 {
          flex: 1;
        }
        .chart_3 {
          flex: 1;
        }
      }

      .main-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .main-right__top {
          flex: 1;
        }
        .main-right__center {
          flex: 1;
        }
        .main-right__bottom {
          flex: 1;
          display: flex;

          .left {
            flex: 1;
          }
          .right {
            flex: 2;
          }
        }
      }
    }
  }
}
</style>
