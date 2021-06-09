<template>
    <div>
        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>Все вопросы</li>
            </ul>

            <nuxt-link class="add-form" to="/help/add">
                <fa icon="plus" /> Добавить вопрос</nuxt-link
            >
        </div>

        <Delete
            ref="del"
            :isOpen="isOpen"
            :id="id"
            @deleteRequest="deleteRequest"
            @deleteClose="deleteClose"
        />

        <div class="box-white">
            <Table
                :header="header"
                :data="data"
                :type="type"
                @changeStatus="changeStatus"
                @deleteOpen="deleteOpen"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            header: [
                { text: "Savol", value: "title.uz" },
                { text: "Yaratilgan vaqti", value: "createdAt" },
                { text: "Status", value: "switch" },
                { text: "", value: "actions" }
            ],
            data: [],
            type: "help",
            isOpen: false,
            id: ""
        };
    },
    async mounted() {
        let a = await this.$axios.$get("/help/all");
        this.data = a.data;
    },
    methods: {
        async changeStatus(item) {
            let status = item.status;
            await this.$axios
                .$put("/help/" + item._id, {
                    status
                })
                .then(async res => {
                    let a = await this.$axios.$get("/help/all");
                    this.data = a.data;
                });
        },
        deleteOpen(id) {
            this.isOpen = true;
            this.id = id;
        },
        deleteClose() {
            this.isOpen = false;
            this.id = "";
        },
        deleteRequest(id) {
            this.$axios.$delete("/" + this.type + "/" + id).then(async res => {
                this.deleteClose();

                let a = await this.$axios.$get("/help/all");
                this.data = a.data;
            });
        }
    }
};
</script>

<style></style>
