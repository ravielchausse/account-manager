<template lang="html">
    <div id="balance" class="container">
        <div class="row">
            <div class="col-md-3">
                <button id="show-filter" class="btn btn-info form-control" @click="showFilter = !showFilter">
                    {{ showFilter ? 'Ocultar' : 'Exibir' }} Filtros
                </button>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
            <div class="col-md-3">
                <button id="show-modal" class="btn btn-primary form-control" @click="showModal = true">Nova Compra</button>
            </div>
        </div>
        <div class="row">
            <div :class="{ 'col-md-3': showFilter, 'd-none': !showFilter }">
                <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                <form name="form-filters" class="border-filter">
                    <div class="form-group">
                        <label for="select-skills">Compotência: </label>
                        <select id="select-skills" name="select-skills" class="form-control">
                            <option value="0" selected></option>
                            <option v-for="skill in skillLst" :value="skill.ski_id">{{ skill.ski_value }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="select-purchasers">Comprador: </label>
                        <select id="select-purchasers" name="select-purchasers" class="form-control">
                            <option value="0" selected></option>
                            <option v-for="purchaser in purchaserLst" :value="purchaser.pur_id">{{ purchaser.pur_name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="select-priorities">Prioridade: </label>
                        <select id="select-priorities" name="select-priorities" class="form-control">
                            <option value="0" selected></option>
                            <option v-for="priority in priorityLst" :value="priority.pri_id">{{ priority.pri_name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="select-payments">Forma de Pagamento: </label>
                        <select id="select-payments" name="select-payments" class="form-control">
                            <option value="0" selected></option>
                            <option v-for="payment in paymentLst" :value="payment.pay_id">{{ payment.pay_name }}</option>
                        </select>
                    </div>
                    <button id="btn-search" class="btn btn-success form-control" @click.prevent.default="onSearch($event)">Pesquisar</button>
                </form>
            </div>
            <div :class="{ 'col-md-9': showFilter, 'col-md-12': !showFilter }">
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
                                <span>{{ balance.bal_id_payment_methods }}</span>
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
            :purchaserLst="purchaserLst" 
            :priorityLst="priorityLst" 
            :paymentLst="paymentLst" 
            :skillLst="skillLst" 
            @reload="onGetList"
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
            purchaserLst: [],
            priorityLst: [],
            paymentLst: [],
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
            this.purchaserLst = data.purchaserLst
            this.priorityLst = data.priorityLst
            this.paymentLst = data.paymentLst
            this.skillLst = data.skillLst
            this.onGetList()
        },
        onGetList () {
            this.filter = {}
            this.$http.get('balance').then(this.onAfterGetList).catch(this.$throwException)
        },
        onAfterGetList ({ data }) {
            this.balanceLst = data
        },
        onSearch (evt) {
            console.log({ evt })
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
