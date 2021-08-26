<template>
    <div>
        <Delete
            :isOpen="isOpen"
            :id="id"
            @deleteClose="deleteClose"
            @deleteRequest="deleteRequest"
        />

        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog v-model="modalAdd" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Добавить тег
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-text-field
                            label="Название тега"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="info.name"
                        ></v-text-field>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addBrand">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>Теги</li>
            </ul>

            <button class="add-form" @click="modalAdd = true">
                <fa icon="plus" />
                Добавить тег
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
                    <template v-slot:item.actions="{ item }">
                        <div class="table-actions">
                            <!-- <button class="__edit" @click="openEdit(item)">
                                <fa class="edit-icon" icon="edit" />
                            </button> -->
                            <button
                                type="button"
                                @click="openConfirm(item._id)"
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
            isLoading: null,
            modalAdd: false,
            modalEdit: false,
            isOpen: false,
            id: "",
            validate1: [value => !!value || "Обязательное поле !!!"],
            valid1: true,
            header: [
                { text: "Название", value: "name" },
                { text: "", value: "actions" }
            ],
            data: [],

            info: {
                name: ""
            }
        };
    },
    async mounted() {
        let data = await this.$axios.$get("/tag/all");
        this.data = data.data;

        this.isLoading = this.$store.state.isLoading;
    },
    methods: {
        openInfo() {
            this.modalInfo = true;
        },
        deleteClose() {
            this.isOpen = false;
            this.id = "";
        },
        openConfirm(id) {
            this.id = id;
            this.isOpen = true;
        },
        openEdit(item) {
            this.modalEdit = true;
            this.id = item.category._id;
        },
        deleteRequest(id) {
            this.$axios.delete("/tag/" + id).then(async res => {
                this.id = "";
                this.isOpen = false;

                let data = await this.$axios.$get("/tag/all");
                this.data = data.data;
            });
        },

        addBrand() {
            let v = this.$refs.val1.validate();

            if (v) {
                this.$axios.$post("/tag/create", this.info).then(async res => {
                    this.modalAdd = false;
                    let data = await this.$axios.$get("/tag/all");
                    this.data = data.data;

                    this.info.name = "";
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
