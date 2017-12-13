<template>
    <div id="user" class="container">
        <hr>
        <div class="row">
            <div class="col-md-4">
                <form name="form_auth" @submit.prevent="onSubmit($event)">
                    <div class="form-group">
                        <label for="use_name">Name</label>
                        <input type="text" id="use_name" name="use_name" class="form-control" v-model="user.use_name">
                    </div>
                    <div class="form-group">
                        <label for="use_login">Login</label>
                        <input type="text" id="use_login" name="use_login" class="form-control" v-model="user.use_login">
                    </div>
                    <div class="form-group">
                        <label for="use_email">E-mail</label>
                        <input type="email" id="use_email" name="use_email" class="form-control" v-model="user.use_email">
                    </div>
                    <div class="form-group" v-if="false">
                        <label for="use_password">Password</label>
                        <input type="password" id="use_password" name="use_password" class="form-control">
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
                            <td>{{ user.use_name }}</td>
                            <td>{{ user.use_login }}</td>
                            <td>{{ user.use_email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthJwt',
    data () {
        return {
            userList: [],
            user: {}
        }
    },
    mounted () {
        this.onGet()
    },
    methods: {
        onGet () {
            this.$http.get('user').then(this.onAfterGet)
        },
        onAfterGet ({ data }) {
            this.userList = data
        },
        onSubmit (evt) {
            this.$http.post('user', this.user).then(this.onGet)
            this.user = {}
        }
    }
}
</script>

<style lang="sass">@import "./User.scss"</style>
