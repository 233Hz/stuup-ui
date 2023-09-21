export type StorageType = 'localStorage' | 'sessionStorage'

class WebCache<T> {
  storage: Storage

  constructor(type: StorageType) {
    this.storage =
      type === 'localStorage' ? window.localStorage : window.sessionStorage
  }

  set(key: string, value: T) {
    const data = JSON.stringify(value)
    this.storage.setItem(key, data)
  }

  get(key: string): T | undefined {
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
  TOKEN_INFO: 'token_info',
  USER_INFO: 'user_info',
}

export const useWebCache = <T>(type: StorageType = 'localStorage') =>
  new WebCache<T>(type)
