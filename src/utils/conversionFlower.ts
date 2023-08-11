import { FlowerVO } from '@/api/grow/model/type'
import useFlowersStore from '@/store/modules/flowers'

import bmh_seed from '@/assets/image/FlowerLevel/bmh1.png'
import bmh_sprout from '@/assets/image/FlowerLevel/bmh2.png'
import bmh_bloom from '@/assets/image/FlowerLevel/bmh3.png'
import bmh_fruit from '@/assets/image/FlowerLevel/bmh4.png'
import xcj_seed from '@/assets/image/FlowerLevel/xcj1.png'
import xcj_sprout from '@/assets/image/FlowerLevel/xcj2.png'
import xcj_bloom from '@/assets/image/FlowerLevel/xcj3.png'
import xcj_fruit from '@/assets/image/FlowerLevel/xcj4.png'
import xhh_seed from '@/assets/image/FlowerLevel/xhh1.png'
import xhh_sprout from '@/assets/image/FlowerLevel/xhh2.png'
import xhh_bloom from '@/assets/image/FlowerLevel/xhh3.png'
import xhh_fruit from '@/assets/image/FlowerLevel/xhh4.png'

/**
 * 积分换算花朵工具类
 */

export interface Flowers {
  key: string
  name: string
  value: number
  imageSrc: string
}

export interface FlowerLevel {
  current: Flowers
  next: Flowers
}

interface FlowerOption {
  src: string
  name: string
}

class ConversionFlower {
  readonly option: Record<string, FlowerOption> = {
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
      name: '白梅花成品',
    },
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
      name: '小雏菊成品',
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
      name: '西红花成品',
    },
  }
  private flowers: Flowers[] = []

  constructor(flower: FlowerVO) {
    let tempArr = []
    for (const [key, value] of Object.entries(flower)) {
      tempArr.push({
        key,
        value,
        name: this.option[key].name,
        imageSrc: this.option[key].src,
      })
    }
    this.flowers = tempArr.sort((a, b) => b.value - a.value)
  }

  /**
   * 计算分数对应对话花朵等级的数量
   * @param score
   * @returns
   */
  calculateConversionFlower(score: number): Flowers[] {
    const copyFlowers = [...this.flowers]
    const result: Flowers[] = []
    const maxFlower = copyFlowers[0]
    const maxScore = maxFlower.value
    if (maxScore !== 0) {
      // 计算最高等级花朵的个数
      if (score >= maxScore) {
        const count = Math.floor(score / maxScore)
        result.push({
          key: maxFlower.key,
          name: maxFlower.name,
          value: count,
          imageSrc: maxFlower.imageSrc,
        })
        score -= count * maxScore
      }
      if (score > 0) {
        // 移除最高的再计算剩下等级
        copyFlowers.shift()
        for (const flower of copyFlowers) {
          if (flower.value > 0) {
            if (score >= flower.value) {
              result.push({
                key: flower.key,
                name: flower.name,
                value: 1,
                imageSrc: flower.imageSrc,
              })
              break
            }
          }
        }
      }
    }
    return result
  }

  /**
   *
   * @param score 计算最高等级，都不符合则返回最低等级
   * @returns
   */
  calculateMaxLevel(score: number): FlowerLevel {
    const lenght = this.flowers.length
    for (let index = 0; index < lenght; index++) {
      const flower = this.flowers[index]
      if (score >= flower.value) {
        return {
          current: flower,
          next: index === 0 ? flower : this.flowers[index - 1],
        }
      }
    }
    return {
      current: this.flowers[this.flowers.length - 1],
      next: this.flowers[1],
    }
  }
}

export const useConversionFlower = () => {
  const flowerStore = useFlowersStore()
  return new ConversionFlower(flowerStore.flowers)
}
