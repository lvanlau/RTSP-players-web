import { createApp } from 'vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as Icons from '@element-plus/icons-vue'
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
for (let i in Icons) {
  app.component(i, Icons[i])
}

import flvjs from 'flv.js'
app.config.globalProperties.$flvjs = flvjs

/**
 * nvr数据
 */
import hkNvrData from '@/assets/json/hk-nvr-data.json'
app.config.globalProperties.$hkNvrData = hkNvrData
app.mount('#app')