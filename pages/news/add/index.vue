<template>
    <div>
        <div class="page-title-box">
            <h2>Yangiliklar</h2>
        </div>
        <div class="box-white">
            <div class="box-title-top">
                <h4>Yangilik qo'shish</h4>
                <button class="add-form mt-4" @click="addInfo">
                    Saqlash
                </button>
            </div>

            <v-file-input
                class="mt-5"
                accept="image/png, image/jpeg, image/bmp, video/*"
                prepend-icon="mdi-camera"
                outlined
                dense
                label="Yangilik uchun asosiy rasm yoki video"
                :rules="validate"
                v-model="info.file"
            ></v-file-input>

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
                            label="Yangilik title (UZ)"
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
                            label="Yangilik title (RU)"
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
            validate: [value => !!value || "To'ldirilishi shart"],
            valid: true,

            editorConfig: {
                simpleUpload: {
                    uploadUrl: "http://cdn.tujjor.org/api/uploads/create",
                    headers: {
                        Authorization: ""
                    }
                },

                removePlugins: ["Title"],
                placeholder: "--"
            },
            contentHolder: "",
            tab: "",
            info: {
                file: null,
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
                let fd = new FormData();

                fd.append("file", this.info.file);
                fd.append("title[uz]", this.info.title.uz);
                fd.append("title[ru]", this.info.title.ru);
                fd.append("description[uz]", this.info.description.uz);
                fd.append("description[ru]", this.info.description.ru);

                this.$axios({
                    method: "POST",
                    url: "/news/create",
                    data: fd
                }).then(res => {
                    this.$router.push("/news");
                });
            }
        }
    }
};
</script>

1330 420 218.75 Zafar -- 54.6 + 43.75 + 43.75 + 36.45 + 43.75 + 36.45 + 31.25 +
31.25 = 277.5 Jamshid -- 54.6 + 43.75 + 43.75 + 36.45 + 43.75 + 36.45 + 31.25 +
31.25 = 277.5 Javlon -- 54.6 + 43.75 + 43.75 + 36.45 + 43.75 + 36.45 + 31.25 +
31.25 = 277.5 Jasur -- 36.45 + 43.75 + 36.45 + 31.25 + 31.25 = 179.15 Ismat --
43.75 + 36.45 + 31.25 + 31.25 = Javohir -- 36.45 + 31.25 + 31.25 + Alijon --
31.25 + 31.25 + Hasan -- 54.6 + 43.75 + 43.75 + 36.45 + Avaz -- 43.75 + 36.45 +
43.75 + 36.45 +

<style></style>
