import { defineStore } from 'pinia'
import { reqFlowerExchangeNum } from '@/api/grow/model'
import type {
  FlowersState,
  Flower,
  FlowerGrowStage,
  FlowerMaxStage,
} from './types/type'
import type { FlowerVO } from '@/api/grow/model/type'

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

let useFlowersStore = defineStore('Flowers', {
  state: (): FlowersState => {
    return {
      flowerConversionOption: {
        bmhSeed: 0,
        bmhSprout: 0,
        bmhBloom: 0,
        bmhFruit: 0,
        xcjSeed: 0,
        xcjSprout: 0,
        xcjBloom: 0,
        xcjFruit: 0,
        xhhSeed: 0,
        xhhSprout: 0,
        xhhBloom: 0,
        xhhFruit: 0,
      },
      flowers: [],
      flowerIconOption: {
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
      },
      isExist: false,
    }
  },
  getters: {},
  actions: {
    setFlowers(key: keyof FlowerVO, value: number) {
      this.flowerConversionOption[key] = value
    },
    async getFlowers() {
      const { data } = await reqFlowerExchangeNum()
      this.flowerConversionOption = data
      this.flowers = Object.entries(data)
        .map(([key, value]) => {
          return {
            key,
            conversionCount: value,
            name: this.flowerIconOption[key].name,
            image: this.flowerIconOption[key].src,
          }
        })
        .sort((a, b) => b.conversionCount - a.conversionCount)
      this.isExist = true
    },

    /**
     * 计算分数对应的生长阶段的等级（不足下一级的分数忽略）
     * @param score number 需要计算的分数
     * @returns
     */
    calculateFlowerLevelIgnore(score: number): FlowerGrowStage[] {
      const copyFlowers = [...this.flowers]
      const result: FlowerGrowStage[] = []
      const maxFlower = copyFlowers[0]
      const maxScore = maxFlower.conversionCount
      if (maxScore !== 0) {
        // 计算最高等级花朵的个数
        if (score >= maxScore) {
          const count = Math.floor(score / maxScore)
          result.push({
            ...maxFlower,
            count,
          })
          score -= count * maxScore
        }
        if (score > 0) {
          // 移除最高的再计算剩下等级
          copyFlowers.shift()
          for (const flower of copyFlowers) {
            if (flower.conversionCount > 0) {
              if (score >= flower.conversionCount) {
                result.push({
                  ...flower,
                  count: 1,
                })
                break
              }
            }
          }
        }
      }
      return result
    },

    /**
     * 计算分数对应的生长阶段的等级（不足下一级的分数用低等级补充）
     * @param score number 需要计算的分数
     * @returns
     */
    calculateFlowerLevelFill(score: number): Flower[] {
      const copyFlowers = [...this.flowers]
      const result: Flower[] = []
      for (const flower of copyFlowers) {
        if (flower.conversionCount === 0) {
          console.error(`${flower.key} 兑换值为 0 ,无法显示兑换花朵`)
          continue
        }
        if (score >= flower.conversionCount) {
          const count = Math.floor(score / flower.conversionCount)
          for (let index = 0; index < count; index++) {
            result.push(flower)
          }
          score -= count * flower.conversionCount
        }
      }

      return result
    },

    /**
     * 计算分数新等级所处的阶段
     * @param score number 需要计算的分数
     * @returns
     */
    calculateFlowerNewLevel(score: number): Flower | undefined {
      const copyFlowers = [...this.flowers]
      const maxFlower = copyFlowers[0]
      const maxScore = maxFlower.conversionCount
      let result: Flower | undefined
      if (maxScore !== 0) {
        // 计算最高等级花朵的个数
        if (score >= maxScore) {
          const count = Math.floor(score / maxScore)
          score -= count * maxScore
          result = maxFlower
        }
        if (score > 0) {
          // 移除最高的再计算剩下等级
          copyFlowers.shift()
          for (const flower of copyFlowers) {
            if (flower.conversionCount > 0) {
              if (score >= flower.conversionCount) {
                return flower
              }
            }
          }
        }
      }
      return result
    },

    /**
     * 计算最高等级，都不符合则返回最低等级
     * @param score number 需要计算的分数
     * @returns
     */
    calculateFlowerMaxLevel(score: number): FlowerMaxStage {
      const length = this.flowers.length
      for (let index = 0; index < length; index++) {
        const flower = this.flowers[index]
        if (score >= flower.conversionCount) {
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
    },
  },
})

export default useFlowersStore
