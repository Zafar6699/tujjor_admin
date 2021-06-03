<template>
    <div>
        <v-dialog v-model="modalConfirm" width="420">
            <v-card>
                <v-card-title class="headline">
                    Ma`lumotni o'chirmoqchimisiz?
                </v-card-title>
                <v-card-text class="d-flex justify-content-center">
                    <fa class="danger-delete" icon="exclamation-triangle" />
                </v-card-text>
                <v-card-text>
                    Ma`lumot o'chirilgandan keyin uni qayta tiklash imloni yo'q
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="teal"
                        depressed
                        outlined
                        text
                        @click="deleteById"
                    >
                        Ha
                    </v-btn>
                    <v-btn
                        color="error"
                        depressed
                        outlined
                        text
                        @click="modalConfirm = false"
                    >
                        Yo'q
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog v-model="modalAdd" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Brend qo'shish
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-text-field
                            label="Brend nomi"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="info.name"
                        ></v-text-field>
                        <v-file-input
                            accept="image/*"
                            prepend-icon="mdi-camera"
                            outlined
                            dense
                            label="Brend logosi"
                            :rules="validate1"
                            v-model="info.image"
                        ></v-file-input>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addRegion">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <div class="page-title-box">
            <h2>Brendlar</h2>
        </div>

        <div class="box-white">
            <div class="box-title-top">
                <h4>Barcha brendlar</h4>

                <button class="add-form" @click="modalAdd = true">
                    <fa icon="plus" /> Brend qo'shish
                </button>
            </div>

            <div class="data-table">
                <v-data-table
                    :headers="header"
                    :items="data"
                    :footer-props="{
                        'items-per-page-text': ''
                    }"
                >
                    <template v-slot:item.image="{ item }">
                        <div class="table-image">
                            <img
                                :src="$store.state.uploads + item.image"
                                alt=""
                            />
                        </div>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <div class="table-actions">
                            <button class="__edit">
                                <fa class="edit-icon" icon="edit" />
                            </button>
                            <button
                                type="button"
                                @click="openConfirm"
                                class="__delete"
                            >
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
            modalAdd: false,
            modalEdit: false,
            validate1: [value => !!value || "To'ldirilishi shart !!!"],
            valid1: true,
            modalConfirm: false,
            header: [
                { text: "Rasmi", value: "image" },
                { text: "Nomi", value: "name" },
                { text: "Kategoriyasi", value: "category" },
                { text: "", value: "actions" }
            ],
            data: [],
            category: [],

            info: {
                name: "",
                image: null,
                category: ""
            }
        };
    },
    async mounted() {
        let data = await this.$axios.$get("/brand/all");
        this.data = data.data;

        let category = await this.$axios.$get("/category/all");
        this.category = category.data;
    },
    methods: {
        openInfo() {
            this.modalInfo = true;
        },
        openConfirm() {
            this.modalConfirm = true;
        }
    }
};
</script>

<style lang="scss" scoped></style>
