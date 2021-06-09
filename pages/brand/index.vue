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
                            Добавить бренд
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-text-field
                            label="Название бренда"
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
                            label="Логотип бренда"
                            :rules="validate1"
                            v-model="info.image"
                        ></v-file-input>

                        <Select :category="category" />
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
                <li>Бренды</li>
            </ul>

            <button class="add-form" @click="modalAdd = true">
                <fa icon="plus" />
                Добавить бренд
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
            modalAdd: false,
            modalEdit: false,
            isOpen: false,
            category: [],
            id: "",
            validate1: [value => !!value || "Обязательное поле !!!"],
            valid1: true,
            header: [
                { text: "Картина", value: "image" },
                { text: "Название", value: "name" },
                { text: "Категория", value: "category.name.uz" },
                { text: "", value: "actions" }
            ],
            data: [],

            info: {
                name: "",
                image: null
            },

            cat: null,
            cat2: null,
            cat3: null
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
            this.$axios.delete("/brand/" + id).then(async res => {
                this.id = "";
                this.isOpen = false;

                let data = await this.$axios.$get("/brand/all");
                this.data = data.data;

                let category = await this.$axios.$get("/category/all");
                this.category = category.data;
            });
        },

        addBrand() {
            let item = this.$store.state.categoryBrand;

            let v = this.$refs.val1.validate();

            if (v) {
                let fd = new FormData();

                console.log(this.item);
                console.log(item);

                fd.append("name", this.info.name);
                fd.append("image", this.info.image);
                fd.append("category", item._id);
                this.$axios({
                    url: "/brand/create",
                    method: "POST",
                    data: fd
                }).then(async res => {
                    this.modalAdd = false;
                    let data = await this.$axios.$get("/brand/all");
                    this.data = data.data;

                    this.info.name = "";
                    this.info.image = "";

                    this.$router.go();
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
