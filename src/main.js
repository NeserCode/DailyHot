import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'

const app = createApp(App)
app.use(ElementPlus)

app.use(router).mount('#app')
app.config.globalProperties.$axios = axios;