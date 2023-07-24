import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons({ scale: 1.2, warn: true })],
  shortcuts: {
    'page-r': 'flex justify-end items-center mt-10',
  },
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d)}px` })],
    [/^mx-(\d+)$/, ([, d]) => ({ margin: `0 ${Number(d)}px` })],
    [/^my-(\d+)$/, ([, d]) => ({ margin: `${Number(d)}px 0` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${Number(d)}px` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${Number(d)}px` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${Number(d)}px` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${Number(d)}px` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px` })],
    [/^px-(\d+)$/, ([, d]) => ({ padding: `0 ${Number(d)}px` })],
    [/^py-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px 0` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${Number(d)}px` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${Number(d)}px` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${Number(d)}px` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${Number(d)}px` })],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${Number(d)}px` })],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${Number(d)}px` })],
    [/^size-(\d+)$/, ([, d]) => ({ 'font-size': `${Number(d)}` })],
    [/^weight-(\d+)$/, ([, d]) => ({ 'font-weight': `${Number(d)}` })],
  ],
  theme: {},
});
