<template>
    <div>
        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog
                v-model="modalAdd"
                width="400"
                @click:outside="closeModal"
            >
                <v-card v-if="category != null">
                    <div>
                        <v-card-title>
                            Kategoriyani o'zgartirish
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-text-field
                            v-model="category.name.uz"
                            label="Kategoriya nomi (Uz)"
                            :rules="validate1"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="category.name.ru"
                            label="Kategoriya nomi (Ru)"
                            :rules="validate1"
                            outlined
                            dense
                        ></v-text-field>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="edit">
                            O'zgartirish
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: {
                name: {
                    uz: "",
                    ru: ""
                }
            },
            id: "",
            validate1: [value => !!value || "To'ldirilishi shart !!!"],

            valid1: true
        };
    },

    computed: {
        modalAdd() {
            let a = this.$store.state.category.dataEdit;
            if (a != null) {
                this.category.name.uz = a.name.uz;
                this.category.name.ru = a.name.ru;
                this.id = a._id;
            }

            return this.$store.state.category.isEdit;
        }
    },
    methods: {
        closeModal() {
            this.$store.commit("category/closeModal");
            this.$store.commit("category/openEdit");
        },
        edit() {
            let v = this.$refs.val1.validate();

            if (v) {
                this.$axios
                    .$put("/category/" + this.id, this.category)
                    .then(res => {
                        this.$store.commit("category/openEdit");
                        this.$store.dispatch("category/getInfo");
                        this.category.name.uz = "";
                        this.category.name.ru = "";
                        this.$refs.val1.reset();
                    })
                    .catch(err => {});
            }
        }
    }
};
</script>

<style></style>
