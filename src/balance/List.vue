<template lang="html">
    <div id="balance" class="container">
        <form name="form-filters" class="form-inline">
            <div class="row">
                <div class="form-group">
                    <label for="select-purchasers">Comprador: </label>
                    <select id="select-purchasers" name="select-purchasers" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="purchaser in purchaserLst" :value="purchaser.pur_id">{{ purchaser.pur_name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="btn-search"></label>
                    <button id="btn-search" class="btn btn-success" @click.prevent.default="onSearch($event)">Pesquisar</button>
                </div>
                <div class="form-group">
                    <label for="show-modal"></label>
                    <button id="show-modal" class="btn btn-primary" @click.prevent.default="showModal = true">Nova Compra</button>
                </div>
            </div>
        </form>
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
