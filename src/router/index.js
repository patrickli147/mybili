import Vue from 'vue';
import Router from 'vue-router';

import register from '@/views/register.vue';
import login from '@/views/login.vue';
import userInfo from '@/views/userInfo.vue';

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
    ]
});

//路由守卫
router.beforeEach((to, from, next) => {
    if ((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.isTokenNeeded === true) {
        router.push('/login');
        Vue.prototype.$msg.fail('请重新登录');
        return;
    }
    next();
})

export default router;

