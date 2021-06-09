<template>
    <div>
        <v-dialog v-model="modal" width="1000">
            <v-card>
                <v-card-title>
                    Privacy Policy
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="modal = false">
                        Yopish
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>Магазины</li>
            </ul>

            <button class="add-form" @click="modalAdd = true">
                <fa icon="plus" />
                Добавить магазины
            </button>
        </div>

        <div class="box-white">
            <Table
                :header="header"
                :data="data"
                :type="type"
                @changeStatus="changeStatus"
                @deleteOpen="deleteOpen"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modal: false,
            header: [
                { text: "Картина", value: "image" },
                { text: "Названия", value: "name" },
                { text: "Адресс", value: "info.address" },
                { text: "Эмаил", value: "info.email" },
                { text: "Статус", value: "status" },
                { text: "", value: "actions" }
            ],
            data: [],

            type: "shop"
        };
    },

    async mounted() {
        let a = await this.$axios.$get("/shop/all");

        this.data = a.data;
    },
    methods: {
        changeStatus() {},
        deleteOpen() {}
    }
};
</script>

<style lang="scss" scoped></style>
