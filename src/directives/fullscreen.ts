import type { App } from 'vue'

export const fullscreen = (app: App<Element>) => {
  const getScale = (w: number = 1920, h: number = 1080) => {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
  }
  app.directive('fullscreen', {
    mounted(el, binding) {
      const w = binding.value?.width || 1920
      const h = binding.value?.height || 1080
      el.style.position = 'fixed'
      el.style.left = '50%'
      el.style.top = '50%'
      el.style.transformOrigin = 'left top'
      el.style.transform = `scale(${getScale(w, h)}) translate(-50%,-50%)`
      window.onresize = () => {
        el.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
      }
    },
  })
}
