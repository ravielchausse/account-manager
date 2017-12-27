<template lang="html">
    <div id="balance" class="container">
        <div class="row">
            <div class="col-md-3">
                <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                <form name="form-filters" class="border border-dark">
                    <div class="form-group">
                        <label for="show-modal"></label>
                        <button id="show-modal" class="btn btn-primary form-control" @click.prevent.default="showModal = true">Nova Compra</button>
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
                    <div class="form-group">
                        <label for="select-skills">Compotência: </label>
                        <select id="select-skills" name="select-skills" class="form-control">
                            <option value="0" selected></option>
                            <option v-for="skill in skillLst" :value="skill.ski_id">{{ skill.ski_value }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="btn-search"></label>
                        <button id="btn-search" class="btn btn-success form-control" @click.prevent.default="onSearch($event)">Pesquisar</button>
                    </div>
                </form>
            </div>
            <div class="col-md-9">
                <table class="table">
                    <tr>
                        <th>Comprador</th>
                        <th>Prioridade</th>
                        <th>Forma de Pagamento</th>
                        <th>Compotência</th>
                    </tr>
                </table>
            </div>
        </div>

        <balance-form 
            :showModal="showModal" 
            :purchaserLst="purchaserLst" 
            :priorityLst="priorityLst" 
            :paymentLst="paymentLst" 
            :skillLst="skillLst" 
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
        onGetLookups () {
            this.$http.get('lookup').then(this.onAfterGetLookups).catch(this.$throwException)
        },
        onAfterGetLookups ({ data }) {
            this.purchaserLst = data.purchaserLst
            this.priorityLst = data.priorityLst
            this.paymentLst = data.paymentLst
            this.skillLst = data.skillLst
        },
        onSearch (evt) {
            console.log({ evt })
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
