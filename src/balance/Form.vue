<template lang="html">
    <div id="balance" v-show="showModal">
        <modal @close="$emit('close')">
            <h3 slot="header">Nova Compra</h3>
            <div slot="body">
                <form name="form_auth">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bal_date">Data</label>
                                <input type="text" id="bal_date" name="bal_date" class="form-control" v-model="payload.bal_date">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bal_account">Compra</label>
                                <input type="text" id="bal_account" name="bal_account" class="form-control" v-model="payload.bal_account">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bal_value">Valor</label>
                                <input type="text" id="bal_value" name="bal_value" class="form-control" v-model="payload.bal_value">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div slot="footer" class="form-group">
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
            default () {
                return false
            }
        }
    },
    data () {
        return {
            payload: {}
        }
    },
    methods: {
        onCancel () {
            this.payload = {}
            this.$emit('close')
        },
        onSubmit (evt) {
            console.log({ evt })
        }
    }
}
</script>

<style lang="sass">@import "./Balance.scss"</style>
