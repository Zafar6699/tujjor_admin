<template>
    <div>
        <v-app>
            <ModalConfirm />
            <Navbar />
            <Header />
            <div class="header-back"></div>
            <div class="nuxt-view">
                <div class="container-fluid">
                    <Nuxt />
                </div>
            </div>
        </v-app>
    </div>
</template>

<style>
.nuxt-view {
    margin-left: 240px;
    padding: 0px 5px 10px 5px;
}
.header-back {
    height: 60px;
}
</style>
