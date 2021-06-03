<template>
    <div>
        <div class="page-title-box">
            <h2>Info</h2>
        </div>

        <Delete
            ref="del"
            :isOpen="isOpen"
            :id="id"
            @deleteRequest="deleteRequest"
            @deleteClose="deleteClose"
        />

        <div class="box-white">
            <div class="box-title-top">
                <h4>Barcha infolar</h4>
                <nuxt-link class="add-form" to="/info/add">
                    <fa icon="plus" /> Info qo'shish</nuxt-link
                >
            </div>

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
            type: "info",
            isOpen: false,
            id: ""
        };
    },
    async mounted() {
        let a = await this.$axios.$get("/info/all");
        this.data = a.data;
    },
    methods: {
        async changeStatus(item) {
            let status = item.status;
            await this.$axios
                .$put("/info/" + item._id, {
                    status
                })
                .then(async res => {
                    let a = await this.$axios.$get("/info/all");
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

                let a = await this.$axios.$get("/info/all");
                this.data = a.data;
            });
        }
    }
};
</script>

<style></style>
