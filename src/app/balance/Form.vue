<template lang="html">
    <div id="balance">
        <p class="module-title">Nova Compra</p>
        <hr>
        <form name="form_auth">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-skills"><em>*</em> Competência: </label>
                        <select id="select-skills" name="select-skills" class="form-control" v-model="payload.ski_id">
                            <option value="0" selected></option>
                            <option v-for="skill in skillLst" :value="skill.ski_id">{{ skill.ski_value }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="bal_date"><em>*</em> Data: </label>
                        <input type="date" id="bal_date" name="bal_date" class="form-control" v-model="payload.bal_date">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-payment-methods"><em>*</em> Forma de Pagamento: </label>
                        <select id="select-payment-methods" name="select-payment-methods" class="form-control" v-model="payload.pay_id">
                            <option value="0" selected></option>
                            <option v-for="paymentMethod in paymentMethodLst" :value="paymentMethod.pay_id">{{ paymentMethod.pay_name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-payment-terms"><em>*</em> Condição de Pagamento: </label>
                        <select id="select-payment-terms" name="select-payment-terms" class="form-control" v-model="payload.pat_id">
                            <option value="0" selected></option>
                            <option v-for="paymentTerm in paymentTermLst" :value="paymentTerm.pat_id">{{ paymentTerm.pat_name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-account-groups"><em>*</em> Grupo de Contas: </label>
                        <select id="select-account-groups" name="select-account-groups" class="form-control" v-model="payload.agr_id">
                            <option value="0" selected></option>
                            <option v-for="accountGroup in accountGroupLst" :value="accountGroup.agr_id">{{ accountGroup.agr_name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-accounts-type"><em>*</em> Tipo de Contas: </label>
                        <select id="select-accounts-type" name="select-accounts-type" class="form-control" v-model="payload.acc_id">
                            <option value="0" selected></option>
                            <option v-for="accountType in accountTypeLst" :value="accountType.acc_id">{{ accountType.acc_name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-priorities"><em>*</em> Prioridade: </label>
                        <select id="select-priorities" name="select-priorities" class="form-control" v-model="payload.pri_id">
                            <option value="0" selected></option>
                            <option v-for="priority in priorityLst" :value="priority.pri_id">{{ priority.pri_name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="select-purchasers"><em>*</em> Comprador: </label>
                        <select id="select-purchasers" name="select-purchasers" class="form-control" v-model="payload.pur_id">
                            <option value="0" selected></option>
                            <option v-for="purchaser in purchaserLst" :value="purchaser.pur_id">{{ purchaser.pur_name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="bal_account"><em>*</em> Compra: </label>
                        <input type="text" id="bal_account" name="bal_account" class="form-control" v-model="payload.bal_account">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="bal_value"><em>*</em> Valor: </label>
                        <div class="input-group">
                            <div class="input-group-addon">R$</div>
                            <input type="text" id="bal_value" name="bal_value" class="form-control" v-model="payload.bal_value">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="bal_comments">Observações: </label>
                        <input type="text" id="bal_comments" name="bal_comments" class="form-control" v-model="payload.bal_comments">
                    </div>
                </div>
            </div>
            <hr>
            <div class="btn-form">
                <button class="btn btn-danger" @click.prevent.default="onCancel($event)">Cancelar</button>
                <button class="btn btn-success" @click="onSubmit($event)">Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'BalanceForm',
    data () {
        return {
            accountGroupLst: [],
            accountTypeLst: [],
            paymentMethodLst: [],
            paymentTermLst: [],
            priorityLst: [],
            purchaserLst: [],
            skillLst: [],
            payload: {}
        }
    },
    mounted () {
        this.onGetLookups()
    },
    methods: {
        onGetLookups () {
            this.$http.get('lookup').then(this.onAfterGetLookups).catch(this.$throwException)
        },
        onAfterGetLookups ({ data }) {
            // this.accountGroupLst = data.accountGroupLst
            this.accountTypeLst = data.accountTypeLst
            this.purchaserLst = data.purchaserLst
            this.priorityLst = data.priorityLst
            this.paymentMethodLst = data.paymentMethodLst
            this.paymentTermLst = data.paymentTermLst
            this.skillLst = data.skillLst
            this.getAccountGroupList()
        },
        getAccountGroupList () {
            this.$http.get('account-group').then(this.afterGetAccountGroupList).catch(this.$throwException)
        },
        afterGetAccountGroupList ({ data }) {
            this.accountGroupLst = data
        },
        onCancel (evt) {
            this.payload = {}
            this.$router.push({ name: 'balance.list' })
        },
        onAfterSubmit ({ data }) {
            this.payload = {}
            this.$toasted.success('Compra salva com sucesso!').goAway(1500)
        },
        onSubmit (evt) {
            this.$http.post('balance', this.payload).then(this.onAfterSubmit).catch(this.$throwException)
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
