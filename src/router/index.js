import Vue from 'vue'
import Router from 'vue-router'

import AuthJwt from '@/auth/AuthJwt.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: AuthJwt
        }
    ]
})
