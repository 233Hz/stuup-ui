import { FlowerVO } from '@/api/grow/model';
import { userFlowerStoreWithOut } from '@/store/modules/flowers';

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
    bmhSeed: '/src/assets/flower_icons/bmh_seed.png',
    bmhSprout: '/src/assets/flower_icons/bmh_sprout.png',
    bmhBloom: '/src/assets/flower_icons/bmh_bloom.jpg',
    bmhFruit: '/src/assets/flower_icons/bmh_fruit.png',
    xcjSeed: '/src/assets/flower_icons/xcj_seed.png',
    xcjSprout: '/src/assets/flower_icons/xcj_sprout.png',
    xcjBloom: '/src/assets/flower_icons/xcj_bloom.png',
    xcjFruit: '/src/assets/flower_icons/xcj_fruit.png',
    xhhSeed: '/src/assets/flower_icons/xhh_seed.png',
    xhhSprout: '/src/assets/flower_icons/xhh_sprout.png',
    xhhBloom: '/src/assets/flower_icons/xhh_bloom.png',
    xhhFruit: '/src/assets/flower_icons/xhh_fruit.png',
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
