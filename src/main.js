import { createApp } from 'vue'
import App from './App.vue'

import '/src/assets/icon/iconfont.js'

import router from './router'
import store from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueCropper from 'vue-cropper';
import { directive, menusEvent, Vue3Menus } from 'vue3-menus';

import dayjs from "dayjs"
import DiscordPicker from 'vue3-discordpicker';

import '../mock/index'

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs
app.use(DiscordPicker);
app.directive('menus', directive);
app.component('vue3-menus', Vue3Menus);
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueCropper)
app.mount('#app')