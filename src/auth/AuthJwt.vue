<template>
    <div id="auth-jwt" class="container">
        <hr>
        <div class="row">
            <div class="col-md-4">
                <form name="form_auth" @submit.prevent="onSubmit($event)">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" class="form-control" v-model="payload.Name">
                    </div>
                    <div class="form-group">
                        <label for="login">Login</label>
                        <input type="text" id="login" name="login" class="form-control" v-model="payload.Login">
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" class="form-control" v-model="payload.Email">
                    </div>
                    <div class="form-group" v-if="false">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control">
                    </div>
                    <input type="submit" class="form-control btn btn-primary pull-right" value="Cadastrar">
                </form>
            </div>
            <div class="col-md-8">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Login</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody v-for="user in userList">
                        <tr>
                            <td>{{ user.Name }}</td>
                            <td>{{ user.Login }}</td>
                            <td>{{ user.Email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import base64url from 'base64url'
export default {
    name: 'AuthJwt',
    data () {
        return {
            userList: [],
            payload: {}
        }
    },
    mounted () {
        let payload = {
            Name: 'Raviel Chausse',
            Login: 'rchausse',
            Email: 'ravielchausse@outlook.com',
            Password: 'abcd1234'
        }
        this.$http.post('auth', payload).then(this.destruct)
    },
    methods: {
        destruct ({ data }) {
            let arr = data.id_token.split('.')
            if (arr.length === 3) {
                this.userList.push(JSON.parse(base64url.decode(arr[1])).user)
            } else {
                console.error('JWT Invalid')
            }
        },
        onSubmit (evt) {
            this.$http.post('user', this.payload).then(this.destruct)
        }
    }
}
</script>

<style lang="sass">@import "./AuthJwt.scss"</style>
