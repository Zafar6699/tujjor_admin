<template>
    <li class="parent-li">
        <button class="value" @click="clickButton">
            {{ node.name.uz }}

            <div class="actions">
                <button @click="openAdd(node)" type="button" class="__eye mr-3">
                    <fa class="eye-icon" icon="plus" />
                </button>
                <button
                    to="/product/edit"
                    class="__edit mr-3"
                    @click="openEdit(node)"
                >
                    <fa class="edit-icon" icon="edit" />
                </button>
                <button
                    type="button"
                    class="__delete mr-3"
                    @click="clickDelete(node._id)"
                >
                    <fa class="delete-icon" icon="trash" />
                </button>

                <fa
                    class="ml-4"
                    icon="angle-down"
                    v-if="node.children && node.children.length"
                />
            </div>
        </button>

        <ul class="children-ul" v-if="node.children && node.children.length">
            <children
                v-for="(child, index) in node.children"
                :key="index"
                :node="child"
            ></children>
        </ul>
    </li>
</template>

<script>
export default {
    name: "children",
    props: {
        node: Object
    },
    data() {
        return {};
    },
    methods: {
        clickButton(event) {
            if (event.target.nextElementSibling != null) {
                event.target.nextElementSibling.classList.toggle("active");
                event.target.lastChild.lastChild.classList.toggle("rotate");
            }
        },
        clickDelete(id) {
            this.$store.commit("category/isOpen");
            this.$store.commit("category/idCategory", id);
        },
        openAdd(info) {
            this.$store.commit("category/openModal", info);
        },
        openEdit(info) {
            this.$store.commit("category/openEdit", info);
        }
    }
};
</script>
