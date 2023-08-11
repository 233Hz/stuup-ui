export type StorageType = 'localStorage' | 'sessionStorage'

class WebCache {
  storage: Storage

  constructor(type: StorageType) {
    this.storage =
      type === 'localStorage' ? window.localStorage : window.sessionStorage
  }

  set(key: string, value: any) {
    const data = JSON.stringify(value)
    this.storage.setItem(key, data)
  }

  get(key: string) {
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }

  delete(key: string) {
    this.storage.removeItem(key)
  }

  exists(key: string) {
    return this.storage.getItem(key) !== null
  }

  clear() {
    this.storage.clear()
  }
}

export const STORAGE_KEY = {
  USER_INFO: 'user_info',
}

export const useWebCache = (type: StorageType = 'localStorage') =>
  new WebCache(type)
