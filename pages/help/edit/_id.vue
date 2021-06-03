<template>
    <div>
        <div class="page-title-box">
            <h2>Yordam</h2>
        </div>
        <div class="box-white">
            <div class="box-title-top">
                <h4>Savol o'zgartirish</h4>
                <button class="add-form mt-4" @click="addInfo">
                    Saqlash
                </button>
            </div>

            <div class="d-flex justify-content-center">
                <v-tabs v-model="tab">
                    <!-- <v-tabs-slider color="primary"></v-tabs-slider> -->

                    <v-tab>
                        O'zbekcha
                    </v-tab>
                    <v-tab>
                        Ruscha
                    </v-tab>
                </v-tabs>
            </div>

            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-form :ref="'val'" v-model="valid" lazy-validation>
                        <v-text-field
                            class="mt-6"
                            label="Savol (UZ)"
                            outlined
                            dense
                            :rules="validate"
                            v-model="info.title.uz"
                        ></v-text-field>
                        <ckeditor-nuxt
                            v-model="info.description.uz"
                            :config="editorConfig"
                        />
                    </v-form>
                </v-tab-item>
                <v-tab-item>
                    <v-form :ref="'val2'" v-model="valid" lazy-validation>
                        <v-text-field
                            class="mt-6"
                            label="Savol (RU)"
                            outlined
                            dense
                            :rules="validate"
                            v-model="info.title.ru"
                        ></v-text-field>
                        <ckeditor-nuxt
                            v-model="info.description.ru"
                            :config="editorConfig"
                        />
                    </v-form>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        "ckeditor-nuxt": () => {
            return import("@blowstack/ckeditor-nuxt");
        }
    },
    data() {
        return {
            validate: [value => !!value || "To'ldirilishi shart"],
            valid: true,

            editorConfig: {
                simpleUpload: {
                    uploadUrl: "http://cdn.tujjor.org/api/uploads/create",
                    headers: {
                        Authorization: ""
                    }
                }
            },
            tab: "",
            info: {
                title: {
                    uz: "",
                    ru: ""
                },
                description: {
                    uz: "",
                    ru: ""
                }
            }
        };
    },
    async mounted() {
        this.editorConfig.simpleUpload.headers.Authorization = this.$auth.strategy.token.get();
        let a = await this.$axios.$get("/help/" + this.$route.query.slug);

        this.info = a.data;

        console.log(this.info);
    },
    methods: {
        addInfo() {
            let v1 = this.$refs.val.validate();
            if (v1) {
                this.$axios
                    .$put("/help/" + this.$route.query.id, {
                        title: {
                            uz: this.info.title.uz,
                            ru: this.info.title.uz
                        },
                        description: {
                            uz: this.info.description.uz,
                            ru: this.info.description.uz
                        }
                    })
                    .then(res => {
                        this.$router.push("/help");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style></style>
