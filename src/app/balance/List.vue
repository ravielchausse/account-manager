<template lang="html">
    <div id="balance">
        <balance-filter @getList="getList"></balance-filter>
        <div class="row">
            <div class="col-md-12">
                <div v-if="balanceLst.length > 0">
                    <div class="datagrid-container">
                        <div class="datagrid-header bg-primary">
                            <span>Competência</span>
                            <span>Tipo</span>
                            <span>Grupo</span>
                            <span>Prioridade</span>
                            <span>Pagamento</span>
                            <span>Condição</span>
                            <span>Comprador</span>
                            <span>Compra</span>
                            <span>Data</span>
                            <span>Valor</span>
                        </div>
                        <template v-for="balance in balanceLst" :id="balance.bal_id">
                            <div class="datagrid-context" :class="{ 'bg-selected': idSelected == balance.bal_id }"
                                @click="onSelected($event, balance.bal_id)" @dblclick="onEdit($event, balance.bal_id)">
                                <span>{{ balance.ski_value }}</span>
                                <span>{{ balance.acc_name }}</span>
                                <span>{{ balance.agr_name }}</span>
                                <span>{{ balance.pri_name }}</span>
                                <span>{{ balance.pay_name }}</span>
                                <span>{{ balance.pat_name }}</span>
                                <span>{{ balance.pur_name }}</span>
                                <span>{{ balance.bal_account }}</span>
                                <span>{{ balance.bal_date | formatDate }}</span>
                                <span>{{ balance.bal_value | formatMoney }}</span>
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
import XLSX from 'xlsx'
import BalanceFilter from './Filter.vue'
export default {
    name: 'BalanceList',
    components: {
        BalanceFilter
    },
    data () {
        return {
            idSelected: 0,
            balanceLst: []
        }
    },
    methods: {
        onSelected (evt, id) {
            this.idSelected === id ? this.idSelected = 0 : this.idSelected = id
        },
        onEdit (evt, id) {
            this.$router.push({ name: 'balance.update', params: { id } })
        },
        getList (payload) {
            this.$http.get(`balance?${this.$urlEncode(payload)}`).then(this.afterGetList).catch(this.$throwException)
        },
        afterGetList ({ data }) {
            this.balanceLst = data
        },
        onDownload (evt) {
            /* starting from this data */
            let data = []
            this.balanceLst.forEach((balance) => {
                data.push({
                    'Competência': balance.ski_value,
                    'Tipo de Conta': balance.acc_name,
                    'Grupo de Conta': balance.agr_name,
                    'Prioridade': balance.pri_name,
                    'Forma de Pagamento': balance.pay_name,
                    'Condição de Pagamento': balance.pat_name,
                    'Comprador': balance.pur_name,
                    'Compra': balance.bal_account,
                    'Data': balance.bal_date,
                    'Valor da Compra': balance.bal_value,
                    'Observação': balance.bal_comments
                })
            })

            /* generate a worksheet */
            let ws = XLSX.utils.json_to_sheet(data)

            /* add to workbook */
            let wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'Fluxo de Caixa')

            /* write workbook (use type 'array' for ArrayBuffer) */
            let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

            /* generate a download */
            let link = document.createElement('a')
            let blob = new Blob([wbout], { type: 'application/octet-stream' })
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Fluxo de Caixa.xlsx'
            link.click()
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
