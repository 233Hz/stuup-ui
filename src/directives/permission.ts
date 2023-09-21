import { App } from 'vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

export const permission = (app: App<Element>) => {
  app.directive('permission', {
    mounted(el, binding) {
      if (!userStore.permissions.includes(binding.value))
        el.style.display = 'none'
    },
  })
}
