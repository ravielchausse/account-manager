<template lang="html">
    <div id="balance" v-show="showModal">
        <modal @close="$emit('close')">
            <h3 slot="header">Nova Compra</h3>
            <div slot="body">
                <form name="form_auth">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="skill">Competência</label>
                                <v-select id="skill" name="skill" :options="skillLst" label="ski_value" v-model="payload.skill" />
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bal_date">Data</label>
                                <input type="text" id="bal_date" name="bal_date" class="form-control" v-model="payload.bal_date">
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group checkbox--continued">
                                <label for="bal_continued">Contínuo</label>
                                <div class="material-switch">
                                    <input type="checkbox" id="bal_continued" name="bal_continued" v-model="payload.bal_continued" />
                                    <label for="bal_continued" class="label-success"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="bal_account">Compra</label>
                                <input type="text" id="bal_account" name="bal_account" class="form-control" v-model="payload.bal_account">
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
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="priority">Prioridade</label>
                                <v-select id="priority" name="priority" :options="priorityLst" label="pri_name" v-model="payload.priority" />
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="payment">Forma de Pagamento</label>
                                <v-select id="payment" name="payment" :options="paymentLst" label="pay_name" v-model="payload.payment" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="purchaser">Comprador</label>
                                <v-select id="purchaser" name="purchaser" :options="purchaserLst" label="pur_name" v-model="payload.purchaser" />
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label for="bal_comments">Observações</label>
                                <input type="text" id="bal_comments" name="bal_comments" class="form-control" v-model="payload.bal_comments">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div slot="footer" class="form-group">
                <button class="btn btn-lg btn-danger" @click="onCancel($event)">Cancelar</button>
                <button class="btn btn-lg btn-success" @click="onSubmit($event)">Cadastrar</button>
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
        onSubmit (evt) {
            console.log({ evt, payload: this.payload })
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
