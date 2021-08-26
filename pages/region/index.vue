<template>
    <div>
        <v-dialog v-model="confirmModal" width="420">
            <v-card>
                <v-card-title class="headline">
                    Ma`lumotni o'chirmoqchimisiz?
                </v-card-title>
                <v-card-text class="d-flex justify-content-center">
                    <fa class="danger-delete" icon="exclamation-triangle" />
                </v-card-text>
                <v-card-text>
                    Ma`lumot o'chirilgandan keyin uni qayta tiklash imloni yo'q
                </v-card-text>
                <input type="hidden" v-model="regionId" />
                <v-card-actions>
                    <input type="hidden" />
                    <input type="hidden" />
                    <v-spacer></v-spacer>
                    <v-btn
                        color="teal"
                        @click="deleteRequest"
                        depressed
                        outlined
                        text
                    >
                        Ha
                    </v-btn>
                    <v-btn
                        color="error"
                        @click="confirmModal = false"
                        depressed
                        outlined
                        text
                    >
                        Yo'q
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-form :ref="'val1'" v-model="valid1" lazy-validation>
            <v-dialog v-model="modalAdd" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Добавить область
                        </v-card-title>
                    </div>

                    <v-card-subtitle>
                        <v-text-field
                            label="Viloyat nomi (Uz)"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="region.name.uz"
                        ></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field
                            label="Названи область (Ру)"
                            :rules="validate1"
                            outlined
                            dense
                            v-model="region.name.ru"
                        ></v-text-field>
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addRegion">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <v-form :ref="'val2'" v-model="valid2" lazy-validation>
            <v-dialog v-model="modalEdit" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Изменить область
                        </v-card-title>
                    </div>

                    <v-card-subtitle>
                        <v-text-field
                            label="Viloyat nomi (Uz)"
                            :rules="validate2"
                            outlined
                            dense
                            v-model="oneRegion.name.uz"
                        ></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field
                            label="Названи область (Ру)"
                            :rules="validate2"
                            outlined
                            dense
                            v-model="oneRegion.name.ru"
                        ></v-text-field>
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="editRegion">
                            Изменить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <!-- addDIstrict -->
        <v-form :ref="'val3'" v-model="valid3" lazy-validation>
            <v-dialog v-model="modalAddDistrict" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Добавить район ( {{ oneRegion.name.ru }} )
                        </v-card-title>
                    </div>

                    <v-card-subtitle>
                        <v-text-field
                            label="Tuman nomi (Uz)"
                            :rules="validate3"
                            outlined
                            dense
                            v-model="district.name.uz"
                        ></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field
                            label="Названия район (Ру)"
                            :rules="validate3"
                            outlined
                            dense
                            v-model="district.name.ru"
                        ></v-text-field>
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="addDistrict">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <!-- editDIstrict -->
        <v-form :ref="'val4'" v-model="valid4" lazy-validation>
            <v-dialog v-model="modalEditDistrict" width="400">
                <v-card>
                    <div>
                        <v-card-title>
                            Изменить район
                        </v-card-title>
                    </div>

                    <v-card-subtitle>
                        <v-text-field
                            label="Viloyat nomi (Uz)"
                            :rules="validate4"
                            outlined
                            dense
                            v-model="oneDistrict.name.uz"
                        ></v-text-field>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-text-field
                            label="Названия район (Ру)"
                            :rules="validate4"
                            outlined
                            dense
                            v-model="oneDistrict.name.ru"
                        ></v-text-field>
                    </v-card-subtitle>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="editDistrict">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-form>

        <div class="page-title-box">
            <h2>Областы</h2>
        </div>

        <div class="box-white">
            <div class="box-title-top">
                <h4>Все область</h4>

                <button class="add-form" @click="modalAdd = true">
                    <fa class="plus-icon" icon="plus" /> Добавить область
                </button>
            </div>

            <v-expansion-panels class="mt-5">
                <v-expansion-panel v-for="(item, i) in regionget" :key="i">
                    <div class="region__item">
                        <h5 class="title_region">
                            <v-expansion-panel-header>{{
                                item.name.ru
                            }}</v-expansion-panel-header>
                        </h5>

                        <div class="actions">
                            <button class="add" @click="openDistrict(item)">
                                <fa icon="plus" />
                            </button>
                            <button class="edit" @click="openEdit(item)">
                                <fa icon="pen" />
                            </button>
                            <button
                                class="trash"
                                @click="deleteRegion(item._id)"
                            >
                                <fa icon="trash" />
                            </button>
                        </div>
                    </div>

                    <v-expansion-panel-content>
                        <ul class="sub_region">
                            <li v-if="item.districts.length == 0">
                                Районы недоступны
                            </li>
                            <li
                                v-else
                                v-for="(e, index) in item.districts"
                                :key="index"
                            >
                                <h6>{{ e.name.ru }}</h6>

                                <div class="d-flex">
                                    <button
                                        class="edit"
                                        @click="editDistrictModal(e)"
                                    >
                                        <fa icon="pen" />
                                    </button>
                                    <button
                                        class="trash"
                                        @click="deleteDistrictModal(e._id)"
                                    >
                                        <fa icon="trash" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalAdd: false,
            modalEdit: false,
            modalAddDistrict: false,
            modalEditDistrict: false,
            confirmModal: false,
            validate1: [value => !!value || "To'ldirilishi shart !!!"],
            validate2: [value => !!value || "To'ldirilishi shart !!!"],
            validate3: [value => !!value || "To'ldirilishi shart !!!"],
            validate4: [value => !!value || "To'ldirilishi shart !!!"],
            regionId: null,
            districtId: null,
            regionget: [],
            valid1: true,
            valid2: true,
            valid3: true,
            valid4: true,
            isDeleteRegion: null,
            region: {
                name: {
                    uz: "",
                    ru: ""
                }
            },
            oneRegion: {
                name: {
                    uz: "",
                    ru: ""
                }
            },
            district: {
                name: {
                    uz: "",
                    ru: ""
                }
            },
            oneDistrict: {
                name: {
                    uz: "",
                    ru: ""
                }
            }
        };
    },
    async mounted() {
        let a = await this.$axios.$get("/region/all");
        console.log(a);
        this.regionget = a.data;
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        addRegion() {
            let v = this.$refs.val1.validate();
            if (v) {
                this.$axios
                    .$post("/region/create", this.region)
                    .then(async res => {
                        console.log(res);
                        let a = await this.$axios.$get("/region/all");
                        this.regionget = a.data;
                        this.modalAdd = false;
                        this.region.name.uz = "";
                        this.region.name.ru = "";
                    })
                    .catch(err => {
                        console.log(err);
                        this.errorAlert = 3;
                    });
            }
        },
        deleteRegion(id) {
            this.confirmModal = true;
            this.regionId = id;
            this.isDeleteRegion = true;
        },
        deleteDistrictModal(id) {
            this.confirmModal = true;
            this.districtId = id;
            this.isDeleteRegion = false;
        },
        async deleteRequest() {
            if (this.isDeleteRegion) {
                await this.$axios
                    .$delete("/region/" + this.regionId)
                    .then(async res => {
                        console.log(res);
                        let a = await this.$axios.$get("/region/all");
                        this.regionget = a.data;
                        this.confirmModal = false;
                    });
            } else {
                await this.$axios
                    .$delete("/region/district/" + this.districtId)
                    .then(async res => {
                        console.log(res);
                        let a = await this.$axios.$get("/region/all");
                        this.regionget = a.data;
                        this.confirmModal = false;
                    });
            }
        },
        async editRegion() {
            let v = this.$refs.val2.validate();
            if (v) {
                await this.$axios
                    .$put("/region/" + this.regionId, this.oneRegion)
                    .then(async res => {
                        console.log(res);
                        let a = await this.$axios.$get("/region/all");
                        this.regionget = a.data;
                        this.modalEdit = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        openEdit(item) {
            this.modalEdit = true;
            this.oneRegion.name.uz = item.name.uz;
            this.oneRegion.name.ru = item.name.ru;
            this.regionId = item._id;
        },
        openDistrict(item) {
            this.modalAddDistrict = true;
            this.oneRegion = item;
            this.regionId = item._id;
        },
        async addDistrict() {
            let v = this.$refs.val3.validate();
            if (v) {
                this.district.region = this.regionId;

                this.$axios
                    .$post("/region/district/create", this.district)
                    .then(async res => {
                        console.log(res);
                        let a = await this.$axios.$get("/region/all");
                        this.regionget = a.data;
                        this.modalAddDistrict = false;
                        this.district.name.uz = "";
                        this.district.name.ru = "";
                    })
                    .catch(err => {
                        console.log(err);
                        this.errorAlert = 3;
                    });
            }
        },
        editDistrictModal(item) {
            this.districtId = item._id;
            this.oneDistrict.name.uz = item.name.uz;
            this.oneDistrict.name.ru = item.name.ru;

            this.modalEditDistrict = true;
        },
        async editDistrict() {
            let v = this.$refs.val4.validate();
            if (v) {
                await this.$axios
                    .$put(
                        "/region/district/" + this.districtId,
                        this.oneDistrict
                    )
                    .then(async res => {
                        console.log(res);
                        let a = await this.$axios.$get("/region/all");
                        this.regionget = a.data;
                        this.modalEditDistrict = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style lang="scss">
ul.sub_region {
    list-style-type: none;
    padding-left: 0;
    border-top: 1px solid #999;
    margin-bottom: 0;
    li {
        font-size: 16px;
        padding: 5px 10px;
        display: flex;
        width: 100%;
        justify-content: space-between;

        .edit,
        .trash {
            margin: 0px 5px;
        }
    }
}
div.region__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div.actions {
        margin-right: 15px;
        // position: absolute;
        // z-index: 4;
        // background-color: #ccc;
        right: 40px;
        button {
            margin: 0px 5px;
            &:hover {
                svg {
                    color: $gc;
                }
            }
        }
    }
}
.title_region {
    font-size: 16px;
    margin-bottom: 0px;
    font-weight: 400;
    width: 90%;
}
</style>
