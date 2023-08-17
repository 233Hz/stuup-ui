import { defineStore } from 'pinia'
import type { PaginationState } from './types/type'

let usePaginationStore = defineStore('Pagination', {
  state: (): PaginationState => {
    return {
      current: 1,
      size: 10,
      total: 0,
    }
  },
  actions: {
    setCurrent(current: number) {
      this.current = current
    },
    setSize(size: number) {
      this.size = size
    },
    setTotal(total: number) {
      this.total = total
    },
    reset() {
      this.current = 1
      this.size = 10
      this.total = 0
    },
  },
})

export default usePaginationStore
