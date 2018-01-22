import Vue from 'vue'

import swal from 'sweetalert'
import querystring from 'querystring'

Vue.mixin({
    computed: {
        idEdit () {
            return this.$route.params.id
        },
        isUpdate () {
            return this.$route.name.indexOf('update') > -1
        }
    },
    methods: {
        $urlDecode (payload) {
            return querystring.decode(payload)
        },
        $urlEncode (payload) {
            return querystring.encode(payload)
        },
        $validateSession () {
            return true
        },
        $message (title = 'Deleted!', message = 'Your imaginary file has been deleted.', type = 'success') {
            return swal(title, message, type)
        },
        $askBefore (
            fnConfirmation,
            title = 'Você tem certeza?',
            text = 'Vamos continuar?',
            confirm = 'Sim',
            cancel = 'Não',
            icon = 'warning') {
            return swal({
                title,
                text,
                icon,
                buttons: {
                    cancel,
                    confirm: {
                        text: confirm,
                        closeModal: true
                    }
                }
            })
            .then(fnConfirmation)
        },
        $setItem (key, value) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        $getItem (key) {
            return JSON.parse(localStorage.getItem(key))
        },
        $isAdmin () {
            return this.$getItem('admin')
        },
        $throwException (error) {
            if (typeof error === 'string') {
                return swal('Opsss...', error, 'error')
            }
            let { response } = error
            if (response && response.status === 500) {
                let { message } = response.data
                return swal('Opsss...', message || 'Error Internal Server', 'error')
            }
            if (response && response.status === 400) {
                let errors = response.data
                return swal('Opsss...', errors[0].msg || 'Bad Request', 'warning')
            }
            return swal('Opsss...', 'Error Internal Server', 'error')
        }
    }
})
