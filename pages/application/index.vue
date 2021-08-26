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
                                <h6>Имя</h6>
                                <h4>{{ item.name }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Названия компания</h6>
                                <h4>{{ item.companyName }}</h4>
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
                        </div>
                        <div class="col-6">
                            <div class="info-item">
                                <h6>Телефон номер</h6>
                                <h4>+{{ item.phone }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Эмаил</h6>
                                <h4>{{ item.email }}</h4>
                            </div>
                            <div class="info-item">
                                <h6>Комментарий</h6>
                                <h4>{{ item.comment }}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="modal = false">
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
                <li>Заявление</li>
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
            isInfo: false,
            item: {},
            header: [
                { text: "Имя", value: "name" },
                { text: "Телефон номер", value: "phone" },
                { text: "Названия компания", value: "companyName" },
                { text: "Время", value: "createdAt" },
                { text: "Статус", value: "switch" },
                { text: "", value: "actions" }
            ],
            data: [],

            type: "application"
        };
    },

    async mounted() {
        let a = await this.$axios.$get("/application/all");

        this.data = a.data;
    },
    methods: {
        changeStatus(item) {
            this.$axios
                .$put("/application/status/" + item._id, {
                    status: item.status
                })
                .then(async res => {
                    let a = await this.$axios.$get("/application/all");

                    this.data = a.data;
                });
        },
        deleteOpen() {},
        openInfo(item) {
            this.isInfo = true;
            this.item = item;
        }
    }
};
</script>

<style lang="scss" scoped></style>
