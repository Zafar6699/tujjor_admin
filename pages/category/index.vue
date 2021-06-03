<template>
    <div>
        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog v-model="modalAdd" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Kategoriya qo'shish
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-text-field
                            label="Kategoriya nomi (Uz)"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="category.name.uz"
                        ></v-text-field>
                        <v-text-field
                            label="Kategoriya nomi (Ru)"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="category.name.ru"
                        ></v-text-field>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addCategory">
                            Qo'shish
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <CategoryAdd />
        <CategoryEdit />

        <div class="page-title-box">
            <h2>Kategoriyalar</h2>
        </div>

        <div class="box-white" v-if="categories != null">
            <div class="box-title-top">
                <h4>Barcha kategoriyalar</h4>

                <button class="add-form" @click="modalAdd = true">
                    <fa icon="plus" />
                    Kategoriya qo'shish
                </button>
            </div>

            <div class="accordion-category">
                <tree
                    v-for="(item, index) in categories"
                    :key="index"
                    :tree="item"
                ></tree>
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
