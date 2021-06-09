<template>
    <div>
        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog v-model="modalAdd" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Добавить баннер
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-file-input
                            accept="image/*"
                            prepend-icon="mdi-camera"
                            outlined
                            dense
                            label="Баннер"
                            :rules="validate1"
                            v-model="slider.image"
                        ></v-file-input>

                        <v-select
                            :items="num"
                            :label="'Место расположения'"
                            outlined
                            dense
                            v-model="slider.num"
                        ></v-select>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addSlider">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <Delete
            :isOpen="isOpen"
            :id="id"
            @deleteClose="deleteClose"
            @deleteRequest="deleteRequest"
        />

        <v-form :ref="'val2'" v-model="valid2" lazy-validation>
            <v-dialog v-model="modalEdit" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Изменить баннер
                        </v-card-title>
                    </div>

                    <div class="modal_body">
                        <v-file-input
                            accept="image/*"
                            prepend-icon="mdi-camera"
                            outlined
                            dense
                            label="Баннер"
                            :rules="validate2"
                            v-model="sliderEdit.image"
                        ></v-file-input>

                        <v-select
                            :items="num"
                            :rules="validate2"
                            :label="'Место расположения'"
                            outlined
                            dense
                            v-model="sliderEdit.num"
                        ></v-select>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="editSlider">
                            Изменить
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
                <li>Слайдер</li>
            </ul>

            <button class="add-form" @click="modalAdd = true">
                <fa icon="plus" />
                Добавить слайдер
            </button>
        </div>

        <div class="flex-box box-white">
            <div
                class="flex__item"
                v-for="(item, index) in sliders"
                :key="index"
            >
                <div class="item__image">
                    <img :src="$store.state.uploads + item.image" alt="" />
                </div>
                <div class="card-actions">
                    <h4>{{ item.position }}</h4>
                    <div>
                        <button @click="openEdit(item)">
                            <fa class="__edit edit-icon" icon="edit" />
                        </button>

                        <button @click="openDelete(item._id)">
                            <fa class="__delete" icon="trash" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,

            modalAdd: false,
            modalEdit: false,
            validate1: [value => !!value || "Обязательное поле !!!"],
            validate2: [value => !!value || "Обязательное поле !!!"],
            valid1: true,
            valid2: true,

            slider: {
                image: [],
                num: ""
            },
            sliderEdit: {
                image: [],
                num: ""
            },
            sliderEdit: [],

            sliders: [],

            id: "",
            num: [1, 2, 3, 4, 5]
        };
    },
    async mounted() {
        let s = await this.$axios.get("/banner/all");

        this.sliders = s.data.data;

        console.log(s);
    },
    methods: {
        openDelete(id) {
            this.id = id;
            this.isOpen = true;
        },
        deleteClose() {
            this.isOpen = false;
            this.id = "";
        },
        openEdit(item) {
            this.modalEdit = true;
            this.id = item._id;
            this.sliderEdit.num = item.position;
        },
        addSlider() {
            let v = this.$refs.val1.validate();

            if (v) {
                let fd = new FormData();
                fd.append("image", this.slider.image);
                fd.append("position", this.slider.num);

                this.$axios({
                    url: "/banner/create",
                    method: "POST",
                    data: fd
                }).then(async res => {
                    this.modalAdd = false;

                    this.$refs.val1.reset();

                    let s = await this.$axios.get("/banner/all");
                    this.sliders = s.data.data;
                });
            }
        },
        async editSlider() {
            let v = this.$refs.val2.validate();

            if (v) {
                let fd = new FormData();
                fd.append("image", this.sliderEdit.image);
                fd.append("position", this.sliderEdit.num);

                this.$axios({
                    url: "/banner/" + this.id,
                    method: "PUT",
                    data: fd
                }).then(async res => {
                    this.modalEdit = false;

                    this.$refs.val2.reset();

                    let s = await this.$axios.get("/banner/all");
                    this.sliders = s.data.data;
                });
            }
        },
        deleteRequest(id) {
            this.$axios.delete("/banner/" + id).then(async res => {
                this.id = "";
                this.isOpen = false;

                let s = await this.$axios.get("/banner/all");
                this.sliders = s.data.data;
            });
        }
    }
};
</script>

<style lang="scss">
.flex-box {
    display: flex;
    flex-wrap: wrap;
    .flex__item {
        width: 22%;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 15px;
        margin-bottom: 15px;
        div.item__image {
            width: 100%;
            position: relative;
            max-height: 300px;
            min-height: 250px;
            overflow: hidden;
            img {
                width: 100%;
                position: absolute;
                top: 50%;
                // height: 100%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        div.card-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            button {
                margin: 0px 10px;
            }
            .__edit {
                color: #74788d;
                font-size: 18px;
                &:hover {
                    color: #333;
                }
            }
            .__delete {
                color: #f46a6a;
                font-size: 18px;
                &:hover {
                    color: #333;
                }
            }
        }
    }
}
</style>
