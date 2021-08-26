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
            <div class="data-table">
                <v-data-table
                    :headers="header"
                    :items="data"
                    :footer-props="{
                        'items-per-page-text': ''
                    }"
                >
                    <template v-slot:item.switch="{ item }">
                        <v-switch v-model="item.status"></v-switch>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <div class="table-actions"></div>
                    </template>
                </v-data-table>
            </div>

            <Select
                @changeSelect="changeSelect"
                :category="category"
                class="col-12"
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
                { text: "Названия", value: "shopName" },
                { text: "Адресс", value: "address" },
                { text: "Эмаил", value: "email" },
                { text: "Статус", value: "switch" },
                { text: "", value: "actions" }
            ],
            data: [],

            category: [],

            type: "shop"
        };
    },

    async mounted() {
        let a = await this.$axios.$get("/shop/all");

        this.data = a.data;

        console.log("shop-->", this.data);

        let category = await this.$axios.$get("/category/all");
        this.category = category.data;
    },
    methods: {
        changeStatus() {},
        deleteOpen() {},
        changeSelect(e) {}
    }
};
</script>

<style lang="scss" scoped></style>
