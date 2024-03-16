import ElementPlus from 'unplugin-element-plus/vite'
export default defineNuxtConfig({
  css: ['element-plus/dist/index.css', '@/assets/style/index.scss'],
  build: {
    transpile: [
      'element-plus/dist',
      'element-plus/es',
      '@element-plus/icons-vue',
    ],
  },
  vite: {
    vue: {
      customElement: true
    },
    vueJsx: {
      mergeProps: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/style/variable.scss";',
        }
      }
    },
    plugins: [
      ElementPlus()
    ],
  }
})