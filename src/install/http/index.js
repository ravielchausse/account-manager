import Vue from 'vue'
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
    }
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJ9.eyJ1c2VyIjp7Ik5hbWUiOiJSYXZpZWwgQ2hhdXNzZSIsIkxvZ2luIjoicmNoYXVzc2UiLCJFbWFpbCI6InJhdmllbGNoYXVzc2VAb3V0bG9vay5jb20ifX0.e1t9jTWODEgvRwFh+jSTxURaofpZmySqtfZgajvFh2g='

const request = {
    success: config => {
        config.headers.Authorization = token
        return config
    },
    error: error => {
        return Promise.reject(error)
    }
}
http.interceptors.request.use(request.success, request.error)

const response = {
    success: response => {
        return response
    },
    error: error => {
        return Promise.reject(error)
    }
}
http.interceptors.response.use(response.success, response.error)

Vue.prototype.$http = http
