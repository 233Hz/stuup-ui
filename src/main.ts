// pinia
import { setupStore } from '@/store';

// Element Plus
import { setupElementPlus } from '@/plugins/ElementPlus';

// 路由
import { setupRouter } from '@/router';

// 全局组件
import { setupGlobalComponents } from '@/plugins/GlobalComponents';

// unocss
import 'uno.css';

import { createApp } from 'vue';

import App from './App.vue';

import 'element-plus/dist/index.css';

import './styles/index.scss';

import './premission';

const setupAll = async () => {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  setupElementPlus(app);
  setupGlobalComponents(app);
  app.mount('#app');
};

setupAll();
