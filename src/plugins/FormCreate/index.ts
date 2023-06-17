import type { App } from 'vue';
import formCreate from '@form-create/element-ui';
import install from '@form-create/element-ui/auto-import';

export const setupFormCreate = (app: App<Element>) => {
  formCreate.use(install);
  app.use(formCreate);
};
