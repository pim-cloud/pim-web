import { createApp } from 'vue'
import App from './App.vue'

import '/src/assets/icon/iconfont.js'

import router from './router'
import store from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueCropper from 'vue-cropper';
import { directive, menusEvent, Vue3Menus } from 'vue3-menus';

const app = createApp(App)

app.directive('menus', directive); // 只注册指令
app.component('vue3-menus', Vue3Menus); // 只注册组件
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueCropper)
app.mount('#app')