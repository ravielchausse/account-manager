<template lang="html">
    <div id="balance" v-show="showModal">
        <modal @close="$emit('close')">
            <h3 slot="header">Nova Compra</h3>
            <div slot="body">
                <form name="form_auth">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="select-skills">Compotência: </label>
                                <select id="select-skills" name="select-skills" class="form-control" v-model="payload.ski_id">
                                    <option value="0" selected></option>
                                    <option v-for="skill in skillLst" :value="skill.ski_id">{{ skill.ski_value }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="select-purchasers">Comprador: </label>
                                <select id="select-purchasers" name="select-purchasers" class="form-control" v-model="payload.pur_id">
                                    <option value="0" selected></option>
                                    <option v-for="purchaser in purchaserLst" :value="purchaser.pur_id">{{ purchaser.pur_name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="select-priorities">Prioridade: </label>
                                <select id="select-priorities" name="select-priorities" class="form-control" v-model="payload.pri_id">
                                    <option value="0" selected></option>
                                    <option v-for="priority in priorityLst" :value="priority.pri_id">{{ priority.pri_name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="select-payments">Forma de Pagamento: </label>
                                <select id="select-payments" name="select-payments" class="form-control" v-model="payload.pay_id">
                                    <option value="0" selected></option>
                                    <option v-for="payment in paymentLst" :value="payment.pay_id">{{ payment.pay_name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="bal_date">Data</label>
                                <input type="date" id="bal_date" name="bal_date" class="form-control" v-model="payload.bal_date">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="bal_value">Valor</label>
                                <div class="input-group">
                                    <div class="input-group-addon">R$</div>
                                    <input type="text" id="bal_value" name="bal_value" class="form-control" v-model="payload.bal_value">
                                    <div class="input-group-addon">.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9">
                            <div class="form-group">
                                <label for="bal_account">Compra</label>
                                <input type="text" id="bal_account" name="bal_account" class="form-control" v-model="payload.bal_account">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group checkbox--continued">
                                <label for="bal_continued">Contínuo</label>
                                <div class="material-switch">
                                    <input type="checkbox" id="bal_continued" name="bal_continued" v-model="payload.bal_continued" />
                                    <label for="bal_continued" class="badge-success"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="bal_comments">Observações</label>
                                <input type="text" id="bal_comments" name="bal_comments" class="form-control" v-model="payload.bal_comments">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div slot="footer">
                <button class="btn btn-danger" @click="onCancel($event)">Cancelar</button>
                <button class="btn btn-success" @click="onSubmit($event)">Cadastrar</button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/modal/Modal'
export default {
    name: 'BalanceForm',
    components: { Modal },
    props: {
        showModal: {
            type: Boolean,
            required: true,
            default () { return false }
        },
        purchaserLst: {
            type: Array,
            required: true,
            default () { return [] }
        },
        priorityLst: {
            type: Array,
            required: true,
            default () { return [] }
        },
        paymentLst: {
            type: Array,
            required: true,
            default () { return [] }
        },
        skillLst: {
            type: Array,
            required: true,
            default () { return [] }
        }
    },
    data () {
        return {
            payload: {}
        }
    },
    methods: {
        onCancel (evt) {
            this.payload = {}
            this.$emit('close')
        },
        onAfterSubmit ({ data }) {
            this.payload = {}
            this.$toasted.success('Compra salva com sucesso!').goAway(1500)
            this.$emit('reload')
            this.$emit('close')
        },
        onSubmit (evt) {
            this.$http.post('balance', this.payload).then(this.onAfterSubmit).catch(this.$throwException)
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
