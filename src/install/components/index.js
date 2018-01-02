import Vue from 'vue'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'

import vSelect from 'vue-select'
import Toasted from 'vue-toasted'

Vue.component('icon', Icon)
Vue.component('v-select', vSelect)
Vue.use(Toasted)
