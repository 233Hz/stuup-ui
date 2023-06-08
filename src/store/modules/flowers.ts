import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import { FlowerVO, getFlowerConfig } from '@/api/grow/model';

export interface FlowersState {
  flowers: FlowerVO;
  isExist: boolean;
}

export const useFlowersStore = defineStore(storeNames.FLOERTS, {
  state: (): FlowersState => {
    return {
      flowers: {
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
      isExist: false,
    };
  },
  getters: {
    getIsExist(): boolean {
      return this.isExist;
    },
    getFlowers(): FlowerVO {
      return this.flowers;
    },
  },
  actions: {
    setFlowers(key: string, value: number) {
      this.flowers[key] = value;
    },
    async loadFLowersConfig() {
      await getFlowerConfig().then(({ data }) => {
        this.isExist = true;
        this.flowers = data;
      });
    },
  },
});

export const userFlowerStoreWithOut = () => useFlowersStore(store);
