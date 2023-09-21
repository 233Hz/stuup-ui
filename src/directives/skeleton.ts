import { App, reactive, watchEffect, h, render, VNode } from 'vue'

const state = reactive<{
  loading: boolean
  list: HTMLElement[]
}>({
  // 加载状态
  loading: false,
  // 使用了 v-skeleton-item 指令的节点保存在这里
  list: [],
})

watchEffect(() => {
  // 创建 vnode
  const children = state.list.map((el) =>
    h('div', {
      style: {
        position: 'absolute',
        top: el.getBoundingClientRect().top + 'px',
        left: el.getBoundingClientRect().left + 'px',
        width: el.getBoundingClientRect().width + 'px',
        height: el.getBoundingClientRect().height + 'px',
        background: '#e5e5e5',
        // @ts-ignore
        borderRadius: getComputedStyle(el).borderRadius,
      },
    }),
  )

  // 创建 div 容器
  const container = h('div', children)

  // 将 div容器 渲染到 body 中
  render(state.loading ? container : null, document.body)
})

export const skeleton = (app: App<Element>) => {
  app.directive('skeleton', {
    mounted(el: HTMLElement, binding) {
      state.loading = binding.value
    },
    updated(el: HTMLElement, binding) {
      state.loading = binding.value
    },
    unmounted(el: HTMLElement) {
      state.loading = false
    },
  })
  app.directive('skeleton-item', {
    mounted(el: HTMLElement, binding) {
      // 保存 el
      // @ts-ignore
      state.list.push(el)
    },
    unmounted(el: HTMLElement) {
      // 删除 el
      // @ts-ignore
      const i = state.list.indexOf(el)
      if (i == -1) return
      state.list.splice(i, 1)
    },
  })
}
