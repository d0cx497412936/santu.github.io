import ElementPlus from 'unplugin-element-plus/vite'
export default defineNuxtConfig({
  css: ['element-plus/dist/index.css', '@/assets/style/index.scss'],
  modules: [
    '@element-plus/nuxt'
  ],
  build: {
    transpile: [
      'element-plus/dist',
      'element-plus/es',
      '@element-plus/icons-vue',
    ],
  },
  vite: {
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
  },
  router: {
    base:'/vue-demo'
  },
  generate: {
    subFolders: false,
  }
})