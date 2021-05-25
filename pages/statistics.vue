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
            <h2>Статистика</h2>
        </div>

        <div class="box-white">
            <div class="box-title-top">
                <h4>Все заказы</h4>

                <div class="data-between">
                    <v-dialog
                        ref="dialog"
                        v-model="modaldate"
                        :return-value.sync="date"
                        width="290px"
                        @click:outside="modaldate = false"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Picker in dialog"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="modaldate = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(date)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-dialog
                        ref="dialog2"
                        v-model="modaldate"
                        :return-value.sync="date2"
                        width="290px"
                        @click:outside="modaldate2 = false"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date2"
                                label="Picker in dialog"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date2" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="modaldate2 = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog2.save(date2)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </div>
            </div>

            <div class="data-table">
                <v-data-table
                    :headers="headers"
                    :items="desserts"
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
                            >Inactive</v-chip
                        >
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

            modaldate: false,
            modaldate2: false,
            date: new Date().toISOString().substr(0, 10),
            date2: new Date().toISOString().substr(0, 10),

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
