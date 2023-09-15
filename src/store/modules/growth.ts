import { defineStore } from 'pinia'
import type { GrowthState } from './types/type'
import { getGrowthTree } from '@/api/grow/config'

const useGrowthStore = defineStore('Growth', {
  state: (): GrowthState => ({
    // 用户信息
    level1: [],
    level2: [],
    level3: [],
    isInit: false,
  }),
  actions: {
    async init(refresh: boolean = false) {
      this.level2 = []
      this.level3 = []
      if (this.isInit && !refresh) return
      const { data } = await getGrowthTree()
      this.level1 = data
      this.isInit = true
    },
    handleLevel1Change(id: number) {
      this.level3 = []
      this.level2 = this.level1.find((item) => item.id === id)?.children || []
    },
    handleLevel2Change(id: number) {
      this.level3 = this.level2.find((item) => item.id === id)?.children || []
    },
  },
})

export default useGrowthStore
