import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/app/dashboard/Main.vue'

import Balance from '@/app/balance/Main.vue'
import BalanceList from '@/app/balance/List.vue'

import User from '@/user/User.vue'

import AccountGroup from '@/foundation/account-group/AccountGroup.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'dashboard.main' }
        },
        {
            path: '/dashboard',
            name: 'dashboard.main',
            component: Dashboard
        },
        {
            path: '/balance',
            name: 'balance.main',
            component: Balance,
            redirect: { name: 'balance.list' },
            children: [
                {
                    path: '/balance/list',
                    name: 'balance.list',
                    component: BalanceList
                }
            ]
        },
        {
            path: '/user',
            name: 'user.main',
            component: User
        },
        {
            path: '/account-group',
            name: 'account.main',
            component: AccountGroup
        }
    ]
})
