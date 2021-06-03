<template>
    <div>
        <div class="page-title-box">
            <h2>Yangiliklar</h2>
        </div>
        <div class="box-white">
            <div class="box-title-top">
                <h4>Yangilik o'zgartirish</h4>
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
                v-model="file"
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
                    <v-form>
                        <v-text-field
                            class="mt-6"
                            label="Yangilik title (UZ)"
                            outlined
                            dense
                            v-model="info.title.uz"
                        ></v-text-field>
                        <ckeditor-nuxt
                            v-model="info.description.uz"
                            :config="editorConfig"
                        />
                    </v-form>
                </v-tab-item>
                <v-tab-item>
                    <v-form>
                        <v-text-field
                            class="mt-6"
                            label="Yangilik title (RU)"
                            outlined
                            dense
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
            file: null,
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

        let a = await this.$axios.$get("/news/" + this.$route.query.slug);
        this.info = a.data;
    },
    methods: {
        addInfo() {
            let fd = new FormData();
            fd.append("file", this.file);

            this.$axios
                .$put("/news/" + this.$route.query.id, {
                    title: {
                        uz: this.info.title.uz,
                        ru: this.info.title.ru
                    },
                    description: {
                        uz: this.info.description.uz,
                        ru: this.info.description.ru
                    }
                })
                .then(res => {
                    this.$axios({
                        method: "PUT",
                        url: "/news/file/" + this.$route.query.id,
                        data: fd
                    }).then(res => {});

                    this.$router.push("/news");
                });
        }
    }
};
</script>

<style></style>
