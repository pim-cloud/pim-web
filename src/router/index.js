import {createRouter, createWebHistory} from 'vue-router'
import store from '../store/index'
import {ElMessage} from "element-plus";

const routes = [
    //tab
    {path: '/', redirect: '/home',},
    {path: '/home', component: () => import('../views/home/index.vue'), meta: {auth: true}},
    {
        path: '/friends',
        component: () => import('../views/friends/index.vue'),
        meta: {auth: true},
        children: [
            {path: '/friends', component: () => import('../views/public/welcome.vue'), meta: {auth: true}},//默认
            {path: '/friends/new_friends', component: () => import('../views/friends/new_friends.vue'), meta: {auth: true}},
            {path: '/friends/lookup', component: () => import('../views/friends/lookup.vue'), meta: {auth: true}},
            {path: '/friends/personal', component: () => import('../views/friends/personal.vue'), meta: {auth: true}},
            {path: '/friends/group', component: () => import('../views/friends/group.vue'), meta: {auth: true}},
        ]
    },
    {path: '/setting', component: () => import('../views/setting/index.vue'), meta: {auth: true}},
    //登录注册
    {path: '/login', component: () => import('../views/login/index.vue'), meta: {auth: false}},
    {path: '/register', component: () => import('../views/register/index.vue'), meta: {auth: false}},
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.auth)) {
        if (store.state.global.token) {
            next();
        } else {
            ElMessage.error('请重新登录，授权已过期');
            next({path: "/login"});
        }
    } else {
        next();
    }
});

export default router
