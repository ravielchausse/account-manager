<template lang="html">
    <div id="dashboard">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <img class="card-img-top" src="static/images/fluxo-de-caixa.jpg" alt="Fluxo de Caixa">
                    <div class="card-block">
                        <h4 class="card-title">Fluxo de Caixa</h4>
                        <p class="card-text">Controle todas as suas contas de maneira simples e organizada.</p>
                    </div>
                    <router-link tag="a" class="btn btn-primary" :to="{ name: 'balance.main' }">
                        Fluxo de Caixa
                    </router-link>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <img class="card-img-top" src="static/images/grupo-de-contas.jpg" alt="Fluxo de Caixa">
                    <div class="card-block">
                        <h4 class="card-title">Grupo de Contas</h4>
                        <p class="card-text">Crie seu próprio grupo de contas.</p>
                    </div>
                    <router-link tag="a" class="btn btn-primary" :to="{ name: 'account.main' }">
                        Grupo de Contas
                    </router-link>
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
