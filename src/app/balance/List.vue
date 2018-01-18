<template lang="html">
    <div id="balance">
        <div class="row">
            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-12">
                        <select id="select-skills" name="select-skills" class="form-control" v-model="skillCurrent">
                            <option v-for="skill in skillLst" :value="skill.ski_id">{{ skill.ski_value }}</option>
                        </select>
                    </div>
                </div>            
            </div>
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-12">
                        <input type="text" class="form-control" placeholder="Busque por compra e/ou observação...">
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-6">
                        <button class="btn btn-success btn-block" @click.prevent.default="onSearch($event)">
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
                        <router-link tag="a" class="btn btn-success btn-block" :to="{ name: 'balance.store' }">
                            Nova Compra
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="row">
                    <div class="col-md-12">
                        <button class="btn btn-primary btn-block" @click.prevent.default="onDownload($event)">
                            Download 
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
                    <label for="select-skills">Tipo de Contas</label>
                    <select id="select-skills" name="select-skills" class="form-control">
                        <option value="0" selected></option>
                        <option v-for="accountType in accountTypeLst" :value="accountType.acc_id">{{ accountType.acc_value }}</option>
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
export default {
    name: 'BalanceList',
    data () {
        return {
            filter: {},
            idSelected: 0,
            skillCurrent: 0,
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
        let lookup = this.$getItem('lookup')
        this.accountTypeLst = lookup.accountTypeLst
        this.purchaserLst = lookup.purchaserLst
        this.priorityLst = lookup.priorityLst
        this.paymentMethodLst = lookup.paymentMethodLst
        this.paymentTermLst = lookup.paymentTermLst
        this.skillLst = lookup.skillLst

        let skillCurrent = this.$options.filters['skillCurrent']()
        this.skillCurrent = lookup.skillLst.filter((skill) => {
            return skill.ski_value === skillCurrent
        })[0].ski_id

        this.getAccountGroupList()
    },
    methods: {
        onSelected (evt, id) {
            this.idSelected === id ? this.idSelected = 0 : this.idSelected = id
        },
        onEdit (evt, id) {
            this.$router.push({ name: 'balance.update', params: { id } })
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
