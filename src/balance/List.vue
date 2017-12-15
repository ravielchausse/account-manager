<template lang="html">
    <div id="balance">
        
        <button id="show-modal" class="btn btn-primary" @click="showModal = true">Nova Compra</button>
        
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
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
