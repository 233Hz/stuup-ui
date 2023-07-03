import type { App } from 'vue';
import { ElLoading, ElScrollbar, ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const plugins = [ElLoading, ElMessage];

const components = [ElScrollbar];

export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach(plugin => {
    app.use(plugin);
  });

  components.forEach(component => {
    app.component(component.name, component);
  });

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.config.globalProperties.$message = ElMessage;
};

/* import type { App } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import 'dayjs/locale/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export const setupElementPlus = (app: App<Element>) => {
  app.use(ElementPlus, { size: 'small', locale: zhCn });

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}; */
