import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2, warn: true }),
  ],
  shortcuts: {
    'page-r': 'flex justify-end items-center mt-10',
  },
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d)}px` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px` })],
    [
      /^mx-(\d+)$/,
      ([, d]) => ({
        'margin-left': `${Number(d)}px`,
        'margin-right': `${Number(d)}px`,
      }),
    ],
    [
      /^my-(\d+)$/,
      ([, d]) => ({
        'margin-top': `${Number(d)}px`,
        'margin-bottom': `${Number(d)}px`,
      }),
    ],
    [
      /^px-(\d+)$/,
      ([, d]) => ({
        'padding-left': `${Number(d)}px`,
        'padding-right': `${Number(d)}px`,
      }),
    ],
    [
      /^py-(\d+)$/,
      ([, d]) => ({
        'padding-top': `${Number(d)}px`,
        'padding-bottom': `${Number(d)}px`,
      }),
    ],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${Number(d)}px` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${Number(d)}px` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${Number(d)}px` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${Number(d)}px` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${Number(d)}px` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${Number(d)}px` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${Number(d)}px` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${Number(d)}px` })],
    [/^t-(\d+)$/, ([, d]) => ({ top: `${Number(d)}px` })],
    [/^r-(\d+)$/, ([, d]) => ({ right: `${Number(d)}px` })],
    [/^b-(\d+)$/, ([, d]) => ({ bottom: `${Number(d)}px` })],
    [/^l-(\d+)$/, ([, d]) => ({ left: `${Number(d)}px` })],
    [/^-t-(\d+)$/, ([, d]) => ({ '-top': `${Number(d)}px` })],
    [/^-r-(\d+)$/, ([, d]) => ({ '-right': `${Number(d)}px` })],
    [/^-b-(\d+)$/, ([, d]) => ({ '-bottom': `${Number(d)}px` })],
    [/^-l-(\d+)$/, ([, d]) => ({ '-left': `${Number(d)}px` })],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${Number(d)}px` })],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${Number(d)}px` })],
    [/^min-w-(\d+)$/, ([, d]) => ({ 'min-width': `${Number(d)}px` })],
    [/^min-h-(\d+)$/, ([, d]) => ({ 'min-height': `${Number(d)}px` })],
    [/^max-w-(\d+)$/, ([, d]) => ({ 'max-width': `${Number(d)}px` })],
    [/^max-h-(\d+)$/, ([, d]) => ({ 'max-height': `${Number(d)}px` })],
    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${Number(d)}px` })],
    [/^weight-(\d+)$/, ([, d]) => ({ 'font-weight': `${Number(d)}` })],
    [/^line-h-(\d+)$/, ([, d]) => ({ 'line-height': `${Number(d)}px` })],
    [/^br-(\d+)$/, ([, d]) => ({ 'border-radius': `${Number(d)}px` })],
    [/^gap-(\d+)$/, ([, d]) => ({ gap: `${Number(d)}px` })],
    [/^flex-(\d+)$/, ([, d]) => ({ flex: `${Number(d)}` })],
    ['bg-system', { 'background-color': 'var(--base-color)' }],
    ['text-system', { color: 'var(--base-color)' }],
    ['el-shadow', { 'box-shadow': 'var(--el-box-shadow)' }],
    ['el-shadow-light', { 'box-shadow': 'var(--el-box-shadow-light)' }],
    ['el-shadow-lighter', { 'box-shadow': 'var(--el-box-shadow-lighter)' }],
    ['el-shadow-dark', { 'box-shadow': 'var(--el-box-shadow-dark)' }],
  ],
  theme: {},
})
