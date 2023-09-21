import type { App } from 'vue'
import { fullscreen } from './fullscreen'
import { skeleton } from './skeleton'
import { permission } from './permission'

export default {
  install(app: App) {
    fullscreen(app)
    skeleton(app)
    permission(app)
  },
}
