<template lang="html">
    <div id="dashboard">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <img class="card-img-top" src="static/images/fluxo-de-caixa.jpg" alt="Fluxo de Caixa">
                    <div class="card-block">
                        <h4 class="card-title">Fluxo de Caixa</h4>
                        <p class="card-text">Controle de todas as contas de maneira simples e organizada.</p>
                        <router-link tag="a" class="btn btn-primary" :to="{ name: 'balance.main' }">
                            Fluxo de Caixa
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard'
}
</script>

<style lang="sass">@import "./Dashboard.scss"</style>
