import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import Pagination from './Pagination/index.vue'
const components: { [name: string]: Component } = {
  SvgIcon,
  UploadExcel,
  Pagination,
}
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    //将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
