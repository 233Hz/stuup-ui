import type { App } from 'vue'
import { fullscreen } from './fullscreen'
import { skeleton } from './skeleton'

export default {
  install(app: App) {
    fullscreen(app)
    skeleton(app)
  },
}
