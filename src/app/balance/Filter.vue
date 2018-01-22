<template>
    <div id="balance-filter">
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
                        <input type="text" class="form-control" placeholder="Busque por compra e/ou observação..." v-model="filter.query">
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
                        <option value="0" selected>Selecione</option>
                        <option v-for="accountGroup in accountGroupLst" :value="accountGroup.agr_id">{{ accountGroup.agr_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-skills">Tipo de Contas</label>
                    <select id="select-skills" name="select-skills" class="form-control">
                        <option value="0" selected>Selecione</option>
                        <option v-for="accountType in accountTypeLst" :value="accountType.acc_id">{{ accountType.acc_value }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-purchasers">Comprador</label>
                    <select id="select-purchasers" name="select-purchasers" class="form-control">
                        <option value="0" selected>Selecione</option>
                        <option v-for="purchaser in purchaserLst" :value="purchaser.pur_id">{{ purchaser.pur_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-priorities">Prioridade</label>
                    <select id="select-priorities" name="select-priorities" class="form-control">
                        <option value="0" selected>Selecione</option>
                        <option v-for="priority in priorityLst" :value="priority.pri_id">{{ priority.pri_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-payment-methods">Forma de Pagamento</label>
                    <select id="select-payment-methods" name="select-payment-methods" class="form-control">
                        <option value="0" selected>Selecione</option>
                        <option v-for="paymentMethod in paymentMethodLst" :value="paymentMethod.pay_id">{{ paymentMethod.pay_name }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="select-payment-terms">Condição de Pagamento</label>
                    <select id="select-payment-terms" name="select-payment-terms" class="form-control">
                        <option value="0" selected>Selecione</option>
                        <option v-for="paymentTerm in paymentTermLst" :value="paymentTerm.pat_id">{{ paymentTerm.pat_name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BalanceFilter',
    data () {
        return {
            filter: {},
            showFilter: false,
            skillCurrent: 0,
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
        const lookup = this.$getItem('lookup')
        this.accountTypeLst = lookup.accountTypeLst
        this.purchaserLst = lookup.purchaserLst
        this.priorityLst = lookup.priorityLst
        this.paymentMethodLst = lookup.paymentMethodLst
        this.paymentTermLst = lookup.paymentTermLst
        this.skillLst = lookup.skillLst

        const skillCurrent = this.$options.filters['skillCurrent']()
        this.skillCurrent = lookup.skillLst.filter((skill) => {
            return skill.ski_value === skillCurrent
        })[0].ski_id
        this.filter = { ski_id: this.skillCurrent }

        this.getAccountGroupList()
    },
    methods: {
        getList () {
            this.$emit('getList', this.filter)
        },
        getAccountGroupList () {
            this.$http.get('account-group').then(this.afterGetAccountGroupList).catch(this.$throwException)
        },
        afterGetAccountGroupList ({ data }) {
            this.accountGroupLst = data
            this.getList()
        },
        onSkillChange (evt) {
            // this.filter = { ski_id: this.skillCurrent }
            // this.getList()
        },
        onSearch (evt) {
            this.getList()
        }
    }
}
</script>
