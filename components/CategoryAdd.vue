<template>
    <div>
        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog
                v-model="modalAdd"
                width="400"
                @click:outside="closeModal"
            >
                <v-card v-if="modalInfo != null">
                    <div>
                        <v-card-title>
                            Kategoriya qo'shish
                        </v-card-title>
                    </div>
                    <v-card-subtitle>
                        <p>{{ modalInfo.name.uz }}</p>
                    </v-card-subtitle>

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
                        <v-btn color="primary" text @click="addChildren">
                            Qo'shish
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
                },
                parentId: ""
            },
            validate1: [value => !!value || "To'ldirilishi shart !!!"],

            valid1: true
        };
    },

    computed: {
        modalAdd() {
            return this.$store.state.category.isOpen;
        },
        modalInfo() {
            return this.$store.state.category.data;
        }
    },
    methods: {
        closeModal() {
            this.$store.commit("category/closeModal");
        },
        addChildren() {
            let v = this.$refs.val1.validate();

            if (v) {
                this.category.parentId = this.modalInfo._id;
                this.$axios
                    .$post("/category/create", this.category)
                    .then(res => {
                        this.$store.commit("category/closeModal");
                        this.$store.dispatch("category/getInfo");
                        this.category.name.uz = "";
                        this.category.name.ru = "";
                        this.category.parentId = "";
                        this.$refs.val1.reset();
                    })
                    .catch(err => {});
            }
        }
    }
};
</script>

<style></style>
