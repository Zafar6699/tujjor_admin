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
            <h2>Магазины</h2>
        </div>

        <div class="box-white">
            <div class="box-title-top">
                <h4>Все магазины</h4>

                <nuxt-link class="add-form" to="/product/add">
                    <fa icon="plus" /> Добавить магазины</nuxt-link
                >
            </div>

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
                { text: "Rasmi", value: "image" },
                { text: "Nomi", value: "name" },
                { text: "Adress", value: "info.address" },
                { text: "Email", value: "info.email" },
                { text: "Status", value: "status" },
                { text: "", value: "actions" }
            ],
            data: [],

            type: "shop"
        };
    },

    async mounted() {
        let a = await this.$axios.$get("/shop/all");

        this.data = a.data;
    }
};
</script>

<style lang="scss" scoped></style>
