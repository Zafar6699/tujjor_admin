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
            <h2>Заказы</h2>
        </div>

        <div class="box-white">
            <div class="box-title-top">
                <h4>Все заказы</h4>
            </div>

            <div class="data-table">
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    :footer-props="{
                        'items-per-page-text': ''
                    }"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip
                            v-if="item.status == 1"
                            color="green"
                            x-small
                            pill
                            text-color="white"
                            >Active
                        </v-chip>
                        <v-chip
                            v-if="item.status == 0"
                            color="red"
                            x-small
                            pill
                            text-color="white"
                            >Inactive
                        </v-chip>
                    </template>

                    <template v-slot:item.image="{ item }">
                        <div class="table-image">
                            <img :src="item.image" alt="" />
                        </div>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <div class="table-actions">
                            <button
                                @click="openModal"
                                type="button"
                                class="__eye"
                            >
                                <fa class="eye-icon" icon="eye" />
                            </button>
                            <nuxt-link to="/product/edit" class="__edit">
                                <fa class="edit-icon" icon="edit" />
                            </nuxt-link>
                            <button type="button" class="__delete">
                                <fa class="delete-icon" icon="trash" />
                            </button>
                        </div>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modal: false,
            headers: [
                { text: "Rasmi", value: "image" },
                { text: "Mahsulot nomi", value: "name" },
                { text: "ID nomeri", value: "id" },
                { text: "Narxi", value: "price" },
                { text: "Soni", value: "count" },
                { text: "Status", value: "status" },
                { text: "", value: "actions" }
            ],
            desserts: [
                {
                    image: "/_nuxt/assets/img/pro.png",
                    name: "Nike Air 720 ",
                    id: 240989,
                    price: "400$",
                    count: 30,
                    status: 1,
                    actions: "Actions"
                },
                {
                    image: "/_nuxt/assets/img/pro.png",
                    name: "Nike Air 720",
                    id: 240989,
                    price: "400$",
                    count: 30,
                    status: 1,
                    actions: "Actions"
                },
                {
                    image: "/_nuxt/assets/img/pro.png",
                    name: "Nike Air 720",
                    id: 240989,
                    price: "400$",
                    count: 30,
                    status: 0,
                    actions: "Actions"
                },
                {
                    image: "/_nuxt/assets/img/pro.png",
                    name: "Nike Air 720",
                    id: 240989,
                    price: "400$",
                    count: 30,
                    status: 0,
                    actions: "Actions"
                }
            ]
        };
    },
    methods: {
        openModal() {
            this.modal = true;
        }
    }
};
</script>

<style lang="scss" scoped></style>
