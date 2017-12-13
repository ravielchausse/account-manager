<template lang="html">
    <div id="balance">
        
        <button id="show-modal" class="btn btn-primary" @click="showModal = true">Nova Compra</button>
        
        <balance-form :showModal="showModal" @close="showModal = false" />

    </div>
</template>

<script>
import BalanceForm from './Form'
export default {
    name: 'BalanceList',
    components: { BalanceForm },
    data () {
        return {
            showModal: false
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
