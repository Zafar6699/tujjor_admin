<template>
    <div>
        <div class="page-title-box">
            <ul class="map-site">
                <li>
                    <nuxt-link to="/">Главная / </nuxt-link>
                </li>
                <li>Новости</li>
            </ul>

            <nuxt-link class="add-form" to="/news/add">
                <fa icon="plus" /> Добавить новости</nuxt-link
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
                { text: "Title", value: "title.uz" },
                { text: "Yaratilgan vaqti", value: "createdAt" },
                { text: "Status", value: "switch" },
                { text: "", value: "actions" }
            ],
            data: [],
            type: "news",
            isOpen: false,
            id: ""
        };
    },
    async mounted() {
        let a = await this.$axios.$get("/news/all");
        this.data = a.data;
    },
    methods: {
        async changeStatus(item) {
            let status = item.status;
            await this.$axios
                .$put("/news/" + item._id, {
                    status
                })
                .then(async res => {
                    let a = await this.$axios.$get("/news/all");
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

                let a = await this.$axios.$get("/news/all");
                this.data = a.data;
            });
        }
    }
};
</script>

<style></style>
