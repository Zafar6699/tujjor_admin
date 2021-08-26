<template>
    <div class="col-3">
        <v-select
            :items="category"
            item-text="name.uz"
            :label="'Kатегория'"
            return-object
            outlined
            dense
            :disabled="isDisabled"
            v-model="categoryModel"
            @change="changeSelect"
        ></v-select>

        <child
            v-if="
                categoryModel.children != undefined &&
                    categoryModel.children.length > 0
            "
            :category="categoryModel.children"
        ></child>
    </div>
</template>

<script>
export default {
    name: "child",
    props: {
        category: {
            type: Array
        }
    },
    data() {
        return {
            isDisabled: false,
            categoryModel: []
        };
    },

    methods: {
        changeSelect() {
            this.$store.commit("CATEGORY_BRAND", this.categoryModel);
        }
    }
};
</script>

<style></style>
