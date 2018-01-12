<template lang="html">
    <div id="balance">
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-12">
                        <input type="text" class="form-control" placeholder="Busque por compra e/ou observação...">
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-block" @click.prevent.default="onSearch($event)">
                            <icon name="search" scale="1" />
                        </button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary btn-block" @click="showFilter = !showFilter">
                            <icon name="filter" scale="1" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-12">
                        <button id="show-modal" class="btn btn-primary form-control" @click="showModal = true">
                            Nova Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="container-filter" v-if="showFilter">
            <div class="row">
                <div class="col-md-2">
                    <label for="select-account">Grupo de Contas</label>
                    <select id="select-account" name="select-account" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="accountGroup in accountGroupLst" :value="accountGroup.agr_id">{{ accountGroup.agr_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-skills">Compotência</label>
                    <select id="select-skills" name="select-skills" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="skill in skillLst" :value="skill.ski_id">{{ skill.ski_value }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-purchasers">Comprador</label>
                    <select id="select-purchasers" name="select-purchasers" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="purchaser in purchaserLst" :value="purchaser.pur_id">{{ purchaser.pur_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-priorities">Prioridade</label>
                    <select id="select-priorities" name="select-priorities" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="priority in priorityLst" :value="priority.pri_id">{{ priority.pri_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-payment-methods">Forma de Pagamento</label>
                    <select id="select-payment-methods" name="select-payment-methods" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="paymentMethod in paymentMethodLst" :value="paymentMethod.pay_id">{{ paymentMethod.pay_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-payment-terms">Condição de Pagamento</label>
                    <select id="select-payment-terms" name="select-payment-terms" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="paymentTerm in paymentTermLst" :value="paymentTerm.pat_id">{{ paymentTerm.pat_name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div v-if="balanceLst.length > 0">
                    <div class="datagrid-container">
                        <div class="datagrid-header bg-primary">
                            <span>Compotência</span>
                            <span>Prioridade</span>
                            <span>Pagamento</span>
                            <span>Comprador</span>
                            <span>Compra</span>
                            <span>Contínuo</span>
                            <span>Data</span>
                            <span>Valor</span>
                        </div>
                        <template v-for="balance in balanceLst" :id="balance.bal_id">
                            <div class="datagrid-context" :class="{ 'bg-selected': idSelected == balance.bal_id }"
                                @click="idSelected == balance.bal_id ? idSelected = 0 : idSelected = balance.bal_id"
                                @dblclick="onEdit(balance)">
                                <span>{{ balance.bal_id_skills }}</span>
                                <span>{{ balance.bal_id_priorities }}</span>
                                <span>{{ balance.bal_id_paymentMethod_methods }}</span>
                                <span>{{ balance.bal_id_purchasers }}</span>
                                <span>{{ balance.bal_account }}</span>
                                <span>{{ balance.bal_continued ? 'Sim' : 'Não' }}</span>
                                <span>{{ balance.bal_date | formatDate }}</span>
                                <span>{{ balance.bal_value | formatMoney }}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div v-else class="alert alert-warning">Nenhum Registro Encontrado!</div>
            </div>
        </div>

        <balance-form 
            :showModal="showModal" 
            :accountGroupLst="accountGroupLst" 
            :accountTypeLst="accountTypeLst" 
            :paymentMethodLst="paymentMethodLst" 
            :paymentTermLst="paymentTermLst" 
            :priorityLst="priorityLst" 
            :purchaserLst="purchaserLst" 
            :skillLst="skillLst" 
            @reload="getList"
            @close="showModal = false" />
    </div>
</template>

<script>
import BalanceForm from './Form'
export default {
    name: 'BalanceList',
    components: { BalanceForm },
    data () {
        return {
            filter: {},
            idSelected: 0,
            balanceLst: [],
            showFilter: false,
            showModal: false,
            accountGroupLst: [],
            accountTypeLst: [],
            paymentMethodLst: [],
            paymentTermLst: [],
            priorityLst: [],
            purchaserLst: [],
            skillLst: []
        }
    },
    mounted () {
        this.onGetLookups()
    },
    methods: {
        onEdit (balance) {
            console.log(balance)
        },
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
            this.getList()
        },
        getList () {
            this.filter = {}
            this.$http.get('balance').then(this.afterGetList).catch(this.$throwException)
        },
        afterGetList ({ data }) {
            this.balanceLst = data
        },
        onSearch (evt) {
            console.log({ evt })
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
