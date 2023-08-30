<template>
  <div
    class="relative m-auto max-w-960 flex justify-center flex-wrap select-none"
    v-loading="loading"
  >
    <div
      class="w-200 relative br-8 m-20 p-20 shadow-lg"
      v-for="[key, value] in Object.entries(flowers)"
      :key="key"
    >
      <img class="block w-100 h-100 rounded-full m-auto" :src="value.src" />
      <div class="text-center">
        <h2 class="fs-20 mt-10 text-green-300">{{ value.name }}</h2>
        <p class="my-10 fs-16 text-#ccc">
          所需水滴：
          <span class="fs-26 font-bold text-#67c23a">
            {{ flowersStore.getFlowerConversionNum(key) }}
          </span>
        </p>
        <el-button
          @click="
            () => {
              flowersStore.getFlowerConversionNum(key) &&
                setExchangeValue(key, flowersStore.getFlowerConversionNum(key)!)
            }
          "
        >
          设置兑换值
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Model">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { setFlowerConfig } from '@/api/grow/model'
import { FlowerVO } from '@/api/grow/model/type'
import useFlowersStore from '@/store/modules/flowers'

import xcj_seed from '@/assets/image/FlowerLevel/xcj1.png'
import xcj_sprout from '@/assets/image/FlowerLevel/xcj2.png'
import xcj_bloom from '@/assets/image/FlowerLevel/xcj3.png'
import xcj_fruit from '@/assets/image/FlowerLevel/xcj4.png'
import bmh_seed from '@/assets/image/FlowerLevel/bmh1.png'
import bmh_sprout from '@/assets/image/FlowerLevel/bmh2.png'
import bmh_bloom from '@/assets/image/FlowerLevel/bmh3.png'
import bmh_fruit from '@/assets/image/FlowerLevel/bmh4.png'
import xhh_seed from '@/assets/image/FlowerLevel/xhh1.png'
import xhh_sprout from '@/assets/image/FlowerLevel/xhh2.png'
import xhh_bloom from '@/assets/image/FlowerLevel/xhh3.png'
import xhh_fruit from '@/assets/image/FlowerLevel/xhh4.png'

const flowersStore = useFlowersStore()

const flowers: Record<keyof FlowerVO, any> = {
  xcjSeed: {
    src: xcj_seed,
    name: '小雏菊种子',
  },
  xcjSprout: {
    src: xcj_sprout,
    name: '小雏菊发芽',
  },
  xcjBloom: {
    src: xcj_bloom,
    name: '小雏菊开花',
  },
  xcjFruit: {
    src: xcj_fruit,
    name: '小雏菊结果',
  },
  bmhSeed: {
    src: bmh_seed,
    name: '白梅花种子',
  },
  bmhSprout: {
    src: bmh_sprout,
    name: '白梅花发芽',
  },
  bmhBloom: {
    src: bmh_bloom,
    name: '白梅花开花',
  },
  bmhFruit: {
    src: bmh_fruit,
    name: '白梅花结果',
  },
  xhhSeed: {
    src: xhh_seed,
    name: '西红花种子',
  },
  xhhSprout: {
    src: xhh_sprout,
    name: '西红花发芽',
  },
  xhhBloom: {
    src: xhh_bloom,
    name: '西红花开花',
  },
  xhhFruit: {
    src: xhh_fruit,
    name: '西红花结果',
  },
}
const loading = ref<boolean>(false)

Object.entries(flowers).forEach(([key, value]) => {
  console.log(key, value)
})

const setExchangeValue = (key: string, num: number) => {
  if (!Object.hasOwnProperty.call(flowersStore.flowerConversionOption, key))
    throw new Error(`不存在对应的等级[${key}]`)
  ElMessageBox.prompt('请输入兑换值', '设置兑换值', {
    inputPlaceholder: '请输入数量',
    inputValue: String(num),
    confirmButtonText: '确 认',
    cancelButtonText: '取 消',
    inputPattern: /^[1-9]*[1-9][0-9]*$/,
    inputErrorMessage: '请输入数字',
  })
    .then(async ({ value }) => {
      const _key = key as keyof FlowerVO
      loading.value = true
      try {
        await setFlowerConfig({ key: _key, value: Number(value) })
        ElMessage.success('设置成功')
        flowersStore.setFlowers(_key, Number(value))
      } finally {
        loading.value = false
      }
    })
    .catch(() => {})
}
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
