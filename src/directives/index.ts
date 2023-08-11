import type { App } from 'vue'
import { fullscreen } from './fullscreen'

export default {
  install(app: App) {
    fullscreen(app)
  },
}
