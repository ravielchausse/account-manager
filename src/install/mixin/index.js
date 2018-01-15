import Vue from 'vue'

import swal from 'sweetalert'
import querystring from 'querystring'

Vue.mixin({
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
                let { ExceptionMessage, message } = response.data
                return swal('Opsss...', ExceptionMessage || message || 'Error Internal Server', 'error')
            }
            let { ExceptionMessage, message } = error
            if (typeof message === 'string') {
                return swal('Opsss...', ExceptionMessage || message || 'Error Internal Server', 'error')
            }
            return swal('Opsss...', 'Error Internal Server', 'error')
        }
    }
})
