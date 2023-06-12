<template>
  <div class="bunga-flower" v-loading="loading">
    <div class="bunga-flower-item" v-for="[key, value] in Object.entries(flowers)" :key="key">
      <img :src="value.src" />
      <div class="bunga-flower-item__content">
        <h2>{{ value.name }}</h2>
        <p>
          所需水滴：
          <span>{{ flowersStore.getFlowers[key] }}</span>
        </p>
        <el-button @click="setExchangeValue(key, flowersStore.getFlowers[key])">设置兑换值</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { setFlowerConfig } from '@/api/grow/model';
import { useFlowersStore } from '@/store/modules/flowers';

const flowersStore = useFlowersStore();

const flowers = {
  bmhSeed: {
    src: '/src/assets/flower_icons/bmh_seed.png',
    name: '白梅花种子',
  },
  bmhSprout: {
    src: '/src/assets/flower_icons/bmh_sprout.png',
    name: '白梅花发芽',
  },
  bmhBloom: {
    src: '/src/assets/flower_icons/bmh_bloom.jpg',
    name: '白梅花开花',
  },
  bmhFruit: {
    src: '/src/assets/flower_icons/bmh_fruit.png',
    name: '白梅花结果',
  },
  xcjSeed: {
    src: '/src/assets/flower_icons/xcj_seed.png',
    name: '小雏菊种子',
  },
  xcjSprout: {
    src: '/src/assets/flower_icons/xcj_sprout.png',
    name: '小雏菊发芽',
  },
  xcjBloom: {
    src: '/src/assets/flower_icons/xcj_bloom.png',
    name: '小雏菊开花',
  },
  xcjFruit: {
    src: '/src/assets/flower_icons/xcj_fruit.png',
    name: '小雏菊结果',
  },
  xhhSeed: {
    src: '/src/assets/flower_icons/xhh_seed.png',
    name: '西红花种子',
  },
  xhhSprout: {
    src: '/src/assets/flower_icons/xhh_sprout.png',
    name: '西红花发芽',
  },
  xhhBloom: {
    src: '/src/assets/flower_icons/xhh_bloom.png',
    name: '西红花开花',
  },
  xhhFruit: {
    src: '/src/assets/flower_icons/xhh_fruit.png',
    name: '西红花结果',
  },
};

const loading = ref<boolean>(false);

const setExchangeValue = (key: string, num: number) => {
  ElMessageBox.prompt('请输入兑换值', '设置兑换值', {
    inputPlaceholder: '请输入数量',
    inputValue: String(num),
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputPattern: /^[1-9]*[1-9][0-9]*$/,
    inputErrorMessage: '请输入数字',
  })
    .then(async ({ value }) => {
      loading.value = true;
      try {
        await setFlowerConfig({ key, value: Number(value) });
        ElMessage.success('设置成功');
        flowersStore.setFlowers(key, Number(value));
      } finally {
        loading.value = false;
      }
    })
    .catch(() => {});
};
</script>

<style scoped lang="scss">
@include b(flower) {
  position: relative;
  margin: auto;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  user-select: none;

  @include b(flower-item) {
    width: 260px;
    position: relative;
    border-radius: 8px;
    margin: 20px;
    padding: 20px;
    box-shadow: var(--el-box-shadow);

    > img {
      display: block;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: auto;
      -webkit-user-drag: none;
    }

    @include e(content) {
      text-align: center;
      > h2 {
        font-size: 28px;
        margin-top: 10px;
        color: var(--aside-menu-background);
      }

      > p {
        margin: 10px 0;
        font-size: 16px;
        color: #ccc;

        > span {
          font-size: 32px;
          font-weight: 900;
          color: #67c23a;
        }
      }
    }
  }
}
</style>
