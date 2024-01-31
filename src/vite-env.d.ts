/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 环境变量
 */
interface ImportMetaEnv {
  readonly NODE_ENV: string
  readonly VITE_PROP: string
  readonly VITE_APP_TITLE: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_SERVE: string
  readonly VITE_LOGO_SUFFIX: 'pooho' | 'shuang' | 'yiyao'
  readonly VITE_COPYRIGHT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
