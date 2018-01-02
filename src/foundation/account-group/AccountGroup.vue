<template lang="html">
    <div id="account-group" class="container">
        <hr>
        <form name="formAccountGroup" class="row">
            <div class="col-md-3">
                <label for="name" class="col-form-label">Grupo de Contas: </label>
            </div>
            <div class="col-md-6">
                <input type="text" class="form-control" name="name" v-model="payload.agr_name" required>
            </div>
            <div class="col-md-3">
                <button class="btn btn-success btn-block" @click.prevent.default="onSubmit($event)">Salvar</button>
            </div>
        </form>
        <hr>
        <div class="row">
            <div class="col-md-12">
                <div v-if="accountGroupLst.length > 0">
                    <div class="datagrid-container">
                        <div class="datagrid-header bg-primary">
                            <span>Grupo de Contas</span>
                            <span>Criado Em</span>
                        </div>
                        <template v-for="accountGroup in accountGroupLst" :id="accountGroup.agr_id">
                            <div class="datagrid-context" :class="{ 'bg-selected': idSelected == accountGroup.agr_id }"
                                @click="idSelected == accountGroup.agr_id ? idSelected = 0 : idSelected = accountGroup.agr_id"
                                @dblclick="onEdit($event, accountGroup)">
                                <span>{{ accountGroup.agr_name }}</span>
                                <span>{{ accountGroup.agr_created_at | formatDate }}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div v-else class="alert alert-warning">Nenhum Registro Encontrado!</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountGroup',
    data () {
        return {
            accountGroupLst: [],
            idSelected: 0,
            payload: {}
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        onEdit (evt, accountGroup) {
            console.log(accountGroup)
        },
        getList () {
            this.$http.get('account-group').then(this.afterGetList).catch(this.$throwException)
        },
        afterGetList ({ data }) {
            this.accountGroupLst = data
        },
        afterSubmit ({ data }) {
            this.payload = {}
            this.getList()
        },
        onSubmit (evt) {
            console.log({ evt })
            // this.$http.post('account-group', this.payload).then(this.afterSubmit).catch(this.$throwException)
        }
    }
}
</script>

<style lang="sass">@import "./AccountGroup.scss"</style>
