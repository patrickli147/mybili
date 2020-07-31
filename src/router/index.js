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
            component: userInfo
        },
    ]
});

export default router;

