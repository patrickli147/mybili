import Vue from 'vue';
import Router from 'vue-router';

import register from '@/views/register.vue';
import login from '@/views/login.vue';
import userInfo from '@/views/userInfo.vue';
import editUserInfo from '@/views/editUserInfo.vue';
import headImg from '@/views/headImg.vue';
import homePage from '@/views/homePage.vue';
import article from '@/views/article.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/register',
            component: register
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/userinfo',
            component: userInfo,
            meta: {
                isTokenNeeded: true
            }
        },
        {
            path: '/editUserInfo',
            component: editUserInfo,
            meta: {
                isTokenNeeded: true
            }
        },
        {
            path: '/headImg',
            name: 'headImg',
            component: headImg,
            meta: {
                isTokenNeeded: true
            }
        },
        {
            path: '/',
            name: 'homePage',
            component: homePage,
            meta: {
                keepalive: true,
            }
        },
        {
            path: '/article/:id',
            name: 'article',
            component: article,
        },
    ]
});

//路由守卫
router.beforeEach((to, from, next) => {
    if ((!sessionStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.isTokenNeeded === true) {
        router.push('/login');
        Vue.prototype.$toast.fail('请重新登录');
        return;
    }
    next();
})

export default router;

