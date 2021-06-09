<template>
    <div>
        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/help">Все вопросы / </nuxt-link>
                </li>
                <li>Добавить вопрос</li>
            </ul>

            <button class="add-form" @click="addInfo">
                Сохранить
            </button>
        </div>
        <div class="box-white">
            <div class="d-flex justify-content-center">
                <v-tabs v-model="tab">
                    <!-- <v-tabs-slider color="primary"></v-tabs-slider> -->

                    <v-tab>
                        Узбекская
                    </v-tab>
                    <v-tab>
                        Русский
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
                    /></v-form>
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
            validate: [value => !!value || "Обязательное поле !!!"],
            valid: true,

            editorConfig: {
                simpleUpload: {
                    uploadUrl: "http://cdn.tujjor.org/api/uploads/create",
                    headers: {
                        Authorization: ""
                    }
                }
            },
            contentHolder: "",
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
    mounted() {
        this.editorConfig.simpleUpload.headers.Authorization = this.$auth.strategy.token.get();
    },
    methods: {
        addInfo() {
            let v1 = this.$refs.val.validate();
            if (v1) {
                this.$axios
                    .$post("/help/create", this.info)
                    .then(res => {
                        this.$router.push("/help");
                    })
                    .catch(err => {
                        alert("Malumotlar saqlanishi uchun yetarli emas");
                    });
            }
        }
    }
};
</script>

<style></style>
