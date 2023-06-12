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
    const result: Flowers[] = [];
    for (const flower of sortFlowers) {
      if (flower.value === 0) {
        console.error(`${flower.key} 兑换值为 0 ,无法显示兑换花朵`);
        continue;
      }
      if (score >= flower.value) {
        const count = Math.floor(score / flower.value);
        result.push({
          key: flower.key,
          value: count,
          imageSrc: flower.imageSrc,
        });
        score -= count * flower.value;
      }
    }

    return result;
  }
}

export const useConversionFlower = () => {
  const flowerStores = userFlowerStoreWithOut();
  return new ConversionFlower(flowerStores.getFlowers);
};
