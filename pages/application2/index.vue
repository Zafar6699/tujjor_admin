<template>
    <div>
        <v-dialog v-model="isInfo" width="1000">
            <v-card>
                <v-card-title>
                    Подробная информация
                </v-card-title>

                <v-divider> </v-divider>

                <div>
                    <div class="d-flex">
                        <div class="col-6">
                            <div class="info-item">
                                <h6>Имя директор</h6>
                                <h4>{{ item.fullNameDirector }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Названия компания</h6>
                                <h4>{{ item.shopName }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Наименования банка</h6>
                                <h4>{{ item.bankName }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Время</h6>
                                <h4>
                                    {{
                                        $moment(item.createdAt).format(
                                            "DD-MM-YY HH:mm"
                                        )
                                    }}
                                </h4>
                            </div>

                            <a
                                target="blank"
                                :href="
                                    $store.state.uploads + item.fileCertificate
                                "
                            >
                                <v-btn block color="primary" elevation="2"
                                    >Сертификат компании</v-btn
                                >
                            </a>
                        </div>
                        <div class="col-6">
                            <div class="info-item">
                                <h6>Телефон номер</h6>
                                <h4>+{{ item.phone }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Адресс</h6>
                                <h4>{{ item.address }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Эмаил</h6>
                                <h4>{{ item.email }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>ИНН</h6>
                                <h4>{{ item.inn }}</h4>
                            </div>
                            <a
                                target="blank"
                                :href="$store.state.uploads + item.fileContract"
                            >
                                <v-btn block color="primary" elevation="2"
                                    >Файл контракта</v-btn
                                >
                            </a>
                        </div>
                    </div>

                    <hr />

                    <div class="d-flex flex-wrap">
                        <div class="col-12">
                            <v-checkbox
                                v-model="ready"
                                label="Готов открыть магазин"
                            ></v-checkbox>
                        </div>

                        <div v-if="ready" class="d-flex flex-wrap w-100">
                            <Select
                                @changeSelect="changeSelect"
                                :category="category"
                                class="col-12"
                            />
                        </div>

                        <div class="col-12">
                            <v-btn
                                block
                                color="primary"
                                @click="addShop"
                                elevation="2"
                                >Добавить магазин</v-btn
                            >
                        </div>
                    </div>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="isInfo = false">
                        Закрыть
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>Заявление-2</li>
            </ul>
        </div>

        <div class="box-white">
            <Table
                :header="header"
                :data="data"
                :type="type"
                @changeStatus="changeStatus"
                @deleteOpen="deleteOpen"
                @openInfo="openInfo"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ready: false,
            isChange: false,
            category: [],
            validate1: [value => !!value || "Обязательное поле !!!"],
            valid1: true,
            isInfo: false,
            item: {},
            header: [
                { text: "Имя директор", value: "fullNameDirector" },
                { text: "Телефон компания", value: "phone" },
                { text: "Названия компания", value: "shopName" },
                { text: "Время", value: "createdAt" },
                { text: "Статус", value: "switch" },
                { text: "", value: "actions" }
            ],
            data: [],

            shop: {
                status: true
            },

            type: "application2"
        };
    },

    async mounted() {
        let a = await this.$axios.$get("/shop/contract/all");

        this.data = a.data;

        let category = await this.$axios.$get("/category/all");
        this.category = category.data;

        console.log("category--", this.category);
    },
    methods: {
        // changeStatus(item) {
        //     this.$axios
        //         .$put("/shop/" + item._id, {
        //             status: item.status
        //         })
        //         .then(async res => {
        //             let a = await this.$axios.$get("/shop/contract/all");

        //             this.data = a.data;
        //         });
        // },
        changeSelect() {
            this.isChange = true;
        },
        deleteOpen() {},
        openInfo(item) {
            this.isInfo = true;
            this.item = item;
        },
        async addShop() {
            let item = this.$store.state.categoryBrand;
            // console.log("cat", item);
            if (this.isChange) {
                this.$axios
                    .$put("/shop/status/" + this.item._id, {
                        category: item._id,
                        status: 1
                    })
                    .then(async res => {
                        this.isInfo = false;
                        let a = await this.$axios.$get("/shop/contract/all");

                        this.data = a.data;
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
