import Vue from 'vue'
import Router from 'vue-router'

import User from '@/user/User.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'user.main' }
        },
        {
            path: '/user',
            name: 'user.main',
            component: User
        }
    ]
})
