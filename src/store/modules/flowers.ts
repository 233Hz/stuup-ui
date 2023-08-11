import { defineStore } from 'pinia'
import type { FlowersState } from './types/type'
import { reqFlowerExchangeNum } from '@/api/grow/model'
import type { FlowerVO } from '@/api/grow/model/type'

let useFlowersStore = defineStore('Flowers', {
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
    }
  },
  actions: {
    setFlowers(key: keyof FlowerVO, value: number) {
      this.flowers[key] = value
    },
    async getFlowers() {
      const { data } = await reqFlowerExchangeNum()
      this.flowers = data
      this.isExist = true
    },
  },
})

export default useFlowersStore
