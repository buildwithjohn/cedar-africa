import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
import RouterRoot from './RouterRoot.vue'
import './style.css'

const app = createApp(RouterRoot)
app.use(MotionPlugin)
app.use(router)
app.mount('#app')
