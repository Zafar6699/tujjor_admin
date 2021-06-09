<template>
    <div>
        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog v-model="modalAdd" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Добавить категорию
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-text-field
                            label="Категория (Уз)"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="category.name.uz"
                        ></v-text-field>
                        <v-text-field
                            label="Категория (Ру)"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="category.name.ru"
                        ></v-text-field>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addCategory">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <CategoryAdd />
        <CategoryEdit />

        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>Категории</li>
            </ul>

            <button class="add-form" @click="modalAdd = true">
                <fa icon="plus" />
                Добавить категорию
            </button>
        </div>

        <div class="box-white" v-if="categories != null">
            <div class="accordion-category">
                <ul
                    class="tree-list"
                    v-for="(item, index) in categories"
                    :key="index"
                    :tree="item"
                >
                    <node-tree :node="item"></node-tree>
                </ul>
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
            confirmModal: false,
            validate1: [value => !!value || "To'ldirilishi shart !!!"],
            validate2: [value => !!value || "To'ldirilishi shart !!!"],

            valid1: true,
            valid2: true,

            category: {
                name: {
                    uz: "",
                    ru: ""
                }
            }
        };
    },
    computed: {
        categories() {
            console.log(this.$store.state.category.categoryList);
            return this.$store.state.category.categoryList;
        }
    },
    async mounted() {
        await this.$store.dispatch("category/getInfo");
    },
    methods: {
        async addCategory() {
            let v = this.$refs.val1.validate();

            if (v) {
                await this.$axios
                    .$post("category/create", this.category)
                    .then(res => {
                        this.category.name.uz = "";
                        this.category.name.ru = "";
                        this.$refs.val1.reset();

                        this.modalAdd = false;

                        this.$store.dispatch("category/getInfo");

                        this.$store.commit("changeSuccess");
                    })
                    .catch(err => {});
            }
        }
    }
};
</script>

<style lang="scss"></style>
