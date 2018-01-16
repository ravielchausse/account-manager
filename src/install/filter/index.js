import Vue from 'vue'
import moment from 'moment'
import accounting from 'accounting'

window.moment = require('moment')
moment.locale('pt-BR')

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
})

Vue.filter('formatDateEn', function (value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
    }
})

Vue.filter('momentFormat', function (value, formatOutput = 'dddd', formatInput = 'YYYY-MM-DD') {
    if (value) {
        return moment(value, formatInput).format(formatOutput)
    }
})

Vue.filter('formatMoney', function (value) {
    return accounting.formatMoney(value, 'R$ ', 2, '.', ',')
})
