import { FlowerVO } from '@/api/grow/model';
import { userFlowerStoreWithOut } from '@/store/modules/flowers';

import bmh_seed from '@/assets/flower_icons/bmh_seed.png';
import bmh_sprout from '@/assets/flower_icons/bmh_sprout.png';
import bmh_bloom from '@/assets/flower_icons/bmh_bloom.jpg';
import bmh_fruit from '@/assets/flower_icons/bmh_fruit.png';
import xcj_seed from '@/assets/flower_icons/xcj_seed.png';
import xcj_sprout from '@/assets/flower_icons/xcj_sprout.png';
import xcj_bloom from '@/assets/flower_icons/xcj_bloom.png';
import xcj_fruit from '@/assets/flower_icons/xcj_fruit.png';
import xhh_seed from '@/assets/flower_icons/xhh_seed.png';
import xhh_sprout from '@/assets/flower_icons/xhh_sprout.png';
import xhh_bloom from '@/assets/flower_icons/xhh_bloom.png';
import xhh_fruit from '@/assets/flower_icons/xhh_fruit.png';

/**
 * 积分换算花朵工具类
 */

export interface Flowers {
  key: string;
  value: number;
  imageSrc: string;
}

class ConversionFlower {
  readonly flowerImage: Record<string, string> = {
    bmhSeed: bmh_seed,
    bmhSprout: bmh_sprout,
    bmhBloom: bmh_bloom,
    bmhFruit: bmh_fruit,
    xcjSeed: xcj_seed,
    xcjSprout: xcj_sprout,
    xcjBloom: xcj_bloom,
    xcjFruit: xcj_fruit,
    xhhSeed: xhh_seed,
    xhhSprout: xhh_sprout,
    xhhBloom: xhh_bloom,
    xhhFruit: xhh_fruit,
  };
  private flowers: Flowers[] = [];

  constructor(flower: FlowerVO) {
    for (const [key, value] of Object.entries(flower)) {
      this.flowers.push({
        key,
        value,
        imageSrc: this.flowerImage[key],
      });
    }
  }

  calculateConversionFlower(score: number): Flowers[] {
    const sortFlowers = this.flowers.sort((a, b) => b.value - a.value);
    const copyFlowers = [...sortFlowers];
    const result: Flowers[] = [];
    const maxFlower = copyFlowers[0];
    const maxScore = maxFlower.value;
    if (maxScore !== 0) {
      // 计算最高等级花朵的个数
      if (score >= maxScore) {
        const count = Math.floor(score / maxScore);
        result.push({
          key: maxFlower.key,
          value: count,
          imageSrc: maxFlower.imageSrc,
        });
        score -= count * maxScore;
      }
      if (score > 0) {
        // 移除最高的再计算剩下等级
        copyFlowers.shift();
        for (const flower of copyFlowers) {
          if (flower.value > 0) {
            if (score >= flower.value) {
              result.push({
                key: flower.key,
                value: 1,
                imageSrc: flower.imageSrc,
              });
              break;
            }
          }
        }
      }
    }
    return result;
  }
}

export const useConversionFlower = () => {
  const flowerStores = userFlowerStoreWithOut();
  // return new ConversionFlower(flowerStores.getFlowers);
  return new ConversionFlower({
    bmhSeed: 1,
    bmhSprout: 3,
    bmhBloom: 9,
    bmhFruit: 12,
    xcjSeed: 15,
    xcjSprout: 18,
    xcjBloom: 21,
    xcjFruit: 24,
    xhhSeed: 27,
    xhhSprout: 30,
    xhhBloom: 33,
    xhhFruit: 36,
  });
};
