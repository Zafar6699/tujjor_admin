<template>
    <div>
        <v-dialog v-model="modal" width="1000">
            <v-card>
                <v-card-title>
                    Privacy Polic
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="modal = false">
                        Yopish
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="page-title-box">
            <h2>Dashboard</h2>
        </div>
        <div class="dashboard-cards mt-3" v-if="orders != null">
            <div class="row">
                <div class="col-md-3">
                    <div class="cards__item">
                        <div class="card-top">
                            <h2>Barcha mahsulotlar</h2>
                            <span class="__icon bg-success">
                                <fa icon="cubes" />
                            </span>
                        </div>
                        <h3 class="text-success">{{orders.products}}</h3>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="cards__item">
                        <div class="card-top">
                            <h2>Buyurtmalar</h2>
                            <span class="__icon bg-info">
                                <fa icon="cube" />
                            </span>
                        </div>
                        <h3 class="text-info">{{orders.orders}}</h3>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="cards__item">
                        <div class="card-top">
                            <h2>Do'konlar</h2>
                            <span class="__icon bg-danger">
                                <fa icon="dollar-sign" />
                            </span>
                        </div>
                        <h3 class="text-danger">{{orders.shops}}</h3>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="cards__item">
                        <div class="card-top">
                            <h2>Foydalanuvchilar</h2>
                            <span class="__icon bg-primary">
                                <fa icon="cubes" />
                            </span>
                        </div>
                        <h3 class="text-primary">{{orders.users}}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-white mt-6">
            <div class="box-title-top">
                <h4>Все заказы</h4>
            </div>

            <div class="data-table" v-if="orders != null">
                <v-data-table :headers="header" :items="orders.lastOrders">
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: null,
            action: null,
            modal: false,
            header: [
                { text: "Rasmi", value: "image" },
                { text: "Mahsulot nomi", value: "name.uz" },
                { text: "ID nomeri", value: "orderId" },
                { text: "Narxi", value: "amount" },
                { text: "O`lchami", value: "size" },
                { text: "Status", value: "status" },
                { text: "", value: "actions" }
            ],

        };
    },
   async mounted() {
        let order = await this.$axios({
            method: "get",
            url: '/stat/dashboard',
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
       this.orders = order.data
    }
};
</script>

<style lang="scss" scoped>
div.dashboard-cards {
    div.cards__item {
        width: 100%;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.1);
        h3 {
            font-size: 1.75rem;
        }
        div.card-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            h2 {
                font-size: 16px;
                color: #333;
                margin-bottom: 0px;
            }
            span.__icon {
                width: 58px;
                height: 58px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                svg {
                    font-size: 25px;
                    color: #fff;
                }
            }
        }
    }
}
</style>
