import ElementPlus from 'unplugin-element-plus/vite'
export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/static/',
    baseURL:'/vue-demo',
  },
  css: ['element-plus/dist/index.css', '@/assets/style/index.scss'],
  modules: [
    '@element-plus/nuxt'
  ],
  build: {
    transpile: [
      '/echarts/',
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
  }
})